import log from '@apify/log';

const FRED_API_BASE_URL = 'https://api.stlouisfed.org/fred';
const FRED_API_KEY = 'f16f5517acf14df7a0638ef4435699da';
const MAX_API_PAGE_SIZE = 1000;
const RATE_LIMIT_REQUESTS_PER_MINUTE = 120;
const RATE_LIMIT_INTERVAL_MS = 60 * 1000; // 1 minute in milliseconds
const MIN_TIME_BETWEEN_REQUESTS_MS = RATE_LIMIT_INTERVAL_MS / RATE_LIMIT_REQUESTS_PER_MINUTE; // ~500ms

// Rate limiting: track request timestamps
const requestTimestamps: number[] = [];

export interface ApiRequestParams {
    search_text?: string;
    series_id?: string;
    category_id?: number;
    frequency?: string;
    units?: string;
    seasonal_adjustment?: string;
    search_type?: 'full_text' | 'series_id';
    order_by?: string;
    sort_order?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
    file_type?: 'json' | 'xml';
}

function buildQueryParams(params: ApiRequestParams): URLSearchParams {
    const queryParams = new URLSearchParams();
    
    queryParams.append('api_key', FRED_API_KEY);
    queryParams.append('file_type', params.file_type || 'json');
    
    if (params.search_text) {
        queryParams.append('search_text', params.search_text);
    }
    
    if (params.series_id) {
        queryParams.append('series_id', params.series_id);
    }
    
    if (params.category_id !== undefined) {
        queryParams.append('category_id', params.category_id.toString());
    }
    
    if (params.frequency) {
        queryParams.append('frequency', params.frequency);
    }
    
    if (params.units) {
        queryParams.append('units', params.units);
    }
    
    if (params.seasonal_adjustment) {
        queryParams.append('seasonal_adjustment', params.seasonal_adjustment);
    }
    
    if (params.search_type) {
        queryParams.append('search_type', params.search_type);
    }
    
    queryParams.append('order_by', params.order_by || 'search_rank');
    queryParams.append('sort_order', params.sort_order || 'desc');
    
    if (params.limit !== undefined) {
        queryParams.append('limit', params.limit.toString());
    }
    
    if (params.offset !== undefined) {
        queryParams.append('offset', params.offset.toString());
    }
    
    return queryParams;
}

async function enforceRateLimit(): Promise<void> {
    const now = Date.now();
    
    // Remove timestamps older than 1 minute
    while (requestTimestamps.length > 0 && now - requestTimestamps[0] > RATE_LIMIT_INTERVAL_MS) {
        requestTimestamps.shift();
    }
    
    // If we've hit the rate limit, wait until we can make another request
    if (requestTimestamps.length >= RATE_LIMIT_REQUESTS_PER_MINUTE) {
        const oldestRequestTime = requestTimestamps[0];
        const waitTime = RATE_LIMIT_INTERVAL_MS - (now - oldestRequestTime) + 100; // Add 100ms buffer
        if (waitTime > 0) {
            // Rate limiting - no need to log to user
            await new Promise(resolve => setTimeout(resolve, waitTime));
            // Clean up again after waiting
            const newNow = Date.now();
            while (requestTimestamps.length > 0 && newNow - requestTimestamps[0] > RATE_LIMIT_INTERVAL_MS) {
                requestTimestamps.shift();
            }
        }
    }
    
    // Ensure minimum time between requests
    if (requestTimestamps.length > 0) {
        const timeSinceLastRequest = now - (requestTimestamps[requestTimestamps.length - 1] || 0);
        if (timeSinceLastRequest < MIN_TIME_BETWEEN_REQUESTS_MS) {
            const delay = MIN_TIME_BETWEEN_REQUESTS_MS - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    // Record this request
    requestTimestamps.push(Date.now());
}

export async function fetchSeriesSearch(params: ApiRequestParams): Promise<import('./types.js').FredSeriesSearchResponse> {
    await enforceRateLimit();
    
    const endpoint = '/series/search';
    const queryParams = buildQueryParams(params);
    const url = `${FRED_API_BASE_URL}${endpoint}?${queryParams.toString()}`;
    
    // Log removed - user doesn't need to know about API requests
    
    try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
            },
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorText = await response.text();
            if (response.status === 504) {
                throw new Error(`FRED API Gateway Timeout: The FRED API server is experiencing delays. Please try again later or simplify your query (fewer filters/tags).`);
            }
            throw new Error(`FRED API error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        
        const data = await response.json() as import('./types.js').FredSeriesSearchResponse;
        
        // Log removed - user doesn't need to know about API details
        
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('FRED API request timed out after 30 seconds. The API may be experiencing high load. Please try again later or simplify your query.');
        }
        throw error;
    }
}

export async function fetchSeriesObservations(
    seriesId: string,
    params?: {
        limit?: number;
        offset?: number;
        observation_start?: string;
        observation_end?: string;
    }
): Promise<import('./types.js').FredObservationsResponse> {
    await enforceRateLimit();
    
    const endpoint = '/series/observations';
    const queryParams = new URLSearchParams();
    
    queryParams.append('api_key', FRED_API_KEY);
    queryParams.append('series_id', seriesId);
    queryParams.append('file_type', 'json');
    
    if (params?.limit !== undefined) {
        queryParams.append('limit', params.limit.toString());
    }
    
    if (params?.offset !== undefined) {
        queryParams.append('offset', params.offset.toString());
    }
    
    if (params?.observation_start) {
        queryParams.append('observation_start', params.observation_start);
    }
    
    if (params?.observation_end) {
        queryParams.append('observation_end', params.observation_end);
    }
    
    const url = `${FRED_API_BASE_URL}${endpoint}?${queryParams.toString()}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
            },
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`FRED API error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        
        const data = await response.json() as import('./types.js').FredObservationsResponse;
        
        // Log removed - user doesn't need to know about API details
        
        return data;
    } catch (error) {
        // Error will be logged at higher level
        throw error;
    }
}

export function calculateApiRequests(
    desiredCount: number,
    input: import('./types.js').Input
): ApiRequestParams[] {
    const requests: ApiRequestParams[] = [];
    const totalRequests = Math.ceil(desiredCount / MAX_API_PAGE_SIZE);
    
    for (let i = 0; i < totalRequests; i++) {
        const offset = i * MAX_API_PAGE_SIZE;
        const limit = Math.min(MAX_API_PAGE_SIZE, desiredCount - offset);
        
        const params: ApiRequestParams = {
            limit,
            offset,
            file_type: 'json',
        };
        
        // Handle seriesId: if provided without searchText, use it as search_text with search_type='series_id'
        if (input.seriesId && !input.searchText) {
            params.search_text = input.seriesId;
            params.search_type = 'series_id';
        } else if (input.searchText) {
            params.search_text = input.searchText;
        }
        
        // series_id parameter is only used when both searchText and seriesId are provided (filtering)
        if (input.seriesId && input.searchText) {
            params.series_id = input.seriesId;
        }
        
        if (input.categoryId !== undefined) {
            params.category_id = input.categoryId;
        }
        
        if (input.frequency) {
            params.frequency = input.frequency;
        }
        
        if (input.units) {
            params.units = input.units;
        }
        
        if (input.seasonalAdjustment) {
            params.seasonal_adjustment = input.seasonalAdjustment;
        }
        
        // Only override search_type if explicitly provided (not when we set it for seriesId)
        if (input.searchType && !(input.seriesId && !input.searchText)) {
            params.search_type = input.searchType;
        }
        
        params.order_by = input.sortOrder || 'search_rank';
        params.sort_order = input.orderBy || 'desc';
        
        requests.push(params);
    }
    
    return requests;
}

export { MAX_API_PAGE_SIZE };

