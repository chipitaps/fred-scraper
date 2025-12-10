import { Actor } from 'apify';
import log from '@apify/log';

import { fetchSeriesSearch, fetchSeriesObservations, calculateApiRequests, MAX_API_PAGE_SIZE } from './api.js';
import { mapSeriesArray } from './mapper.js';
import type { Input, OutputSeries } from './types.js';

await Actor.init();

async function main() {
    const input = await Actor.getInput<Input>();
    if (!input) {
        log.error('❌ Input is missing!');
        await Actor.pushData([{ error: 'Input is missing' }]);
        await Actor.exit();
        return;
    }

    const userIsPaying = Boolean(Actor.getEnv()?.userIsPaying);
    log.info(userIsPaying ? '✅ Paid user detected' : '📋 Free user detected');

    log.info('🚀 Starting data collection...', {
        searchQuery: input.searchText || input.seriesId || 'Not specified',
        maxItems: input.maxItems || 'Unlimited',
    });

    if (!input.searchText && !input.seriesId) {
        const errorMessage = 'Either searchText or seriesId must be provided';
        log.error(`❌ ${errorMessage}`);
        await Actor.pushData([{ error: errorMessage }]);
        await Actor.exit();
        return;
    }

    let maxItems = input.maxItems;

    if (!userIsPaying) {
        if (maxItems === undefined || maxItems === null) {
            maxItems = 100;
            log.warning('⚠️ Free user did not specify maxItems. Automatically limiting to 100 items. Upgrade to a paid plan to process unlimited items (up to 1,000,000).');
        } else if (maxItems > 100) {
            log.warning(`⚠️ Free user specified maxItems=${maxItems}, which exceeds the free plan limit of 100. Automatically limiting to 100 items. Upgrade to a paid plan to process up to 1,000,000 items.`);
            maxItems = 100;
        }
    }

    if (userIsPaying && maxItems !== undefined && maxItems !== null && maxItems > 1000000) {
        const errorMessage = 'maxItems cannot exceed 1,000,000.';
        log.error('❌ maxItems exceeds maximum allowed value', { maxItems, maxAllowed: 1000000 });
        await Actor.pushData([{ error: errorMessage }]);
        await Actor.exit();
        return;
    }

    const isPayPerEvent = Actor.getChargingManager().getPricingInfo().isPayPerEvent;

    try {
        const startTime = Date.now();
        let totalProcessed = 0;
        let totalPushed = 0;
        let totalCount = 0;

        const desiredCount = maxItems || 1000;
        
        // Count how many filters are active (frequency, units, seasonalAdjustment)
        const activeFilters: string[] = [];
        if (input.frequency) activeFilters.push('frequency');
        if (input.units) activeFilters.push('units');
        if (input.seasonalAdjustment) activeFilters.push('seasonalAdjustment');
        
        // If multiple filters are active, fetch more results and filter client-side
        // This ensures all filters work together with equal priority
        const fetchCount = activeFilters.length > 1 
            ? Math.min(desiredCount * 5, 10000) // Fetch more to account for client-side filtering
            : desiredCount;
        
        // Create input with only the first filter for API call (FRED API limitation)
        const apiInput = { ...input };
        if (activeFilters.length > 1) {
            // Use frequency as primary filter if available, otherwise units, otherwise seasonalAdjustment
            if (input.frequency) {
                apiInput.units = undefined;
                apiInput.seasonalAdjustment = undefined;
            } else if (input.units) {
                apiInput.frequency = undefined;
                apiInput.seasonalAdjustment = undefined;
            } else if (input.seasonalAdjustment) {
                apiInput.frequency = undefined;
                apiInput.units = undefined;
            }
            apiInput.maxItems = fetchCount;
        }
        
        const apiRequests = calculateApiRequests(fetchCount, apiInput);
        const allSeries: OutputSeries[] = [];
        const seenSeriesIds = new Set<string>();

        // Fetch series in parallel with concurrency control
        const MAX_CONCURRENT_REQUESTS = 10; // Process up to 10 requests in parallel
        const seriesPromises: Promise<import('./types.js').FredSeriesSearchResponse | null>[] = [];

        for (let i = 0; i < apiRequests.length; i++) {
            const request = apiRequests[i];
            
            const fetchWithRetry = async (): Promise<import('./types.js').FredSeriesSearchResponse | null> => {
                let retryCount = 0;
                const maxRetries = 3;

                while (retryCount <= maxRetries) {
                    try {
                        return await fetchSeriesSearch(request);
                    } catch (error) {
                        retryCount++;
                        if (retryCount > maxRetries) {
                            log.error('Failed to fetch data after multiple attempts', {
                                error: error instanceof Error ? error.message : String(error),
                            });
                            return null;
                        }
                        const waitTime = Math.min(1000 * 2 ** (retryCount - 1), 5000);
                        await new Promise((resolve) => setTimeout(resolve, waitTime));
                    }
                }
                return null;
            };

            seriesPromises.push(fetchWithRetry());

            // Process in batches to control concurrency
            if (seriesPromises.length >= MAX_CONCURRENT_REQUESTS || i === apiRequests.length - 1) {
                const responses = await Promise.all(seriesPromises);
                seriesPromises.length = 0; // Clear the array

                for (const response of responses) {
                    if (maxItems && totalPushed >= maxItems) {
                        break;
                    }

                    if (response && response.seriess) {
                        if (totalCount === 0) {
                            totalCount = response.count;
                        }

                        if (response.seriess.length > 0) {
                            // First deduplicate
                            let uniqueSeries = response.seriess.filter(series => {
                                if (seenSeriesIds.has(series.id)) {
                                    return false;
                                }
                                seenSeriesIds.add(series.id);
                                return true;
                            });
                            
                            // Apply client-side filtering for all active filters (equal priority)
                            if (activeFilters.length > 1) {
                                uniqueSeries = uniqueSeries.filter(series => {
                                    // Check all filters - series must match ALL active filters
                                    if (input.frequency && series.frequency !== input.frequency) {
                                        return false;
                                    }
                                    if (input.units && series.units !== input.units) {
                                        return false;
                                    }
                                    if (input.seasonalAdjustment && series.seasonal_adjustment !== input.seasonalAdjustment) {
                                        return false;
                                    }
                                    return true;
                                });
                            }

                            if (input.includeObservations && uniqueSeries.length > 0) {
                                // Fetch observations in parallel
                                const observationPromises = uniqueSeries.map(async (series) => {
                                    try {
                                        const obsResponse = await fetchSeriesObservations(series.id, {
                                            limit: 100,
                                        });
                                        return { seriesId: series.id, observations: obsResponse.observations || [] };
                                    } catch (error) {
                                        log.warning(`⚠️ Failed to fetch observations for series ${series.id}`, {
                                            seriesId: series.id,
                                            error: error instanceof Error ? error.message : String(error),
                                        });
                                        return { seriesId: series.id, observations: [] };
                                    }
                                });

                                const observationResults = await Promise.all(observationPromises);
                                const observationsMap = new Map<string, import('./types.js').FredObservation[]>();
                                for (const result of observationResults) {
                                    if (result.observations.length > 0) {
                                        observationsMap.set(result.seriesId, result.observations);
                                    }
                                }

                                const mappedSeries = mapSeriesArray(uniqueSeries, observationsMap);
                                allSeries.push(...mappedSeries);
                            } else {
                                const mappedSeries = mapSeriesArray(uniqueSeries);
                                allSeries.push(...mappedSeries);
                            }

                            totalProcessed += response.seriess.length;

                            let seriesToPush = allSeries.slice(totalPushed);
                            if (maxItems) {
                                const remainingNeeded = maxItems - totalPushed;
                                if (remainingNeeded < seriesToPush.length) {
                                    seriesToPush = seriesToPush.slice(0, remainingNeeded);
                                }
                            }

                            if (seriesToPush.length > 0) {
                                if (isPayPerEvent) {
                                    await Actor.pushData(seriesToPush, 'result-item');
                                } else {
                                    await Actor.pushData(seriesToPush);
                                }
                                totalPushed += seriesToPush.length;
                            }

                            if (maxItems && totalPushed >= maxItems) {
                                break;
                            }
                        }
                    }
                }

                if (maxItems && totalPushed >= maxItems) {
                    break;
                }
            }
        }

        const endTime = Date.now();
        const duration = endTime - startTime;
        const durationSeconds = Math.round(duration / 1000);
        const durationMinutes = Math.round((duration / 60000) * 10) / 10;

        log.info('🎉 Data collection completed successfully!', {
            totalCollected: totalPushed,
            totalAvailable: totalCount,
            duration: `${durationSeconds} seconds`,
        });
    } catch (error) {
        log.error('❌ Error collecting data:', {
            error: error instanceof Error ? error.message : String(error),
        });
        if (error instanceof Error) {
            log.error('Error stack trace:', { stack: error.stack });
        }
        await Actor.pushData([{ error: error instanceof Error ? error.message : 'Unknown error occurred' }]);
        await Actor.exit();
        return;
    }
}

await main();

await Actor.exit();

