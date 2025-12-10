import type { OutputSeries, FredSeries, FredObservation } from './types.js';

export function mapSeries(series: FredSeries, observations?: FredObservation[]): OutputSeries {
    return {
        seriesId: series.id,
        title: series.title,
        units: series.units,
        unitsShort: series.units_short,
        frequency: series.frequency,
        frequencyShort: series.frequency_short,
        seasonalAdjustment: series.seasonal_adjustment,
        seasonalAdjustmentShort: series.seasonal_adjustment_short,
        lastUpdated: series.last_updated,
        observationStart: series.observation_start,
        observationEnd: series.observation_end,
        realtimeStart: series.realtime_start,
        realtimeEnd: series.realtime_end,
        popularity: series.popularity,
        groupPopularity: series.group_popularity,
        notes: series.notes,
        seriesUrl: `https://fred.stlouisfed.org/series/${series.id}`,
        observations: observations,
        scrapedTimestamp: new Date().toISOString(),
    };
}

export function mapSeriesArray(seriesArray: FredSeries[], observationsMap?: Map<string, FredObservation[]>): OutputSeries[] {
    return seriesArray.map(series => {
        const observations = observationsMap?.get(series.id);
        return mapSeries(series, observations);
    });
}

