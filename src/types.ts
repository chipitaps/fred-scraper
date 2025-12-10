export interface FredSeries {
    id: string;
    realtime_start: string;
    realtime_end: string;
    title: string;
    observation_start: string;
    observation_end: string;
    frequency: string;
    frequency_short: string;
    units: string;
    units_short: string;
    seasonal_adjustment: string;
    seasonal_adjustment_short: string;
    last_updated: string;
    popularity: number;
    group_popularity: number;
    notes?: string;
}

export interface FredSeriesSearchResponse {
    seriess: FredSeries[];
    limit: number;
    offset: number;
    count: number;
    search_type: string;
    sort_order: string;
    order_by: string;
}

export interface FredObservation {
    realtime_start: string;
    realtime_end: string;
    date: string;
    value: string;
}

export interface FredObservationsResponse {
    realtime_start: string;
    realtime_end: string;
    observation_start: string;
    observation_end: string;
    units: string;
    output_type: number;
    file_type: string;
    order_by: string;
    sort_order: string;
    count: number;
    offset: number;
    limit: number;
    observations: FredObservation[];
}

export interface Input {
    searchText?: string;
    seriesId?: string;
    categoryId?: number;
    frequency?: string;
    units?: string;
    seasonalAdjustment?: string;
    searchType?: 'full_text' | 'series_id';
    sortOrder?: string;
    orderBy?: 'asc' | 'desc';
    includeObservations?: boolean;
    maxItems?: number;
}

export interface OutputSeries {
    seriesId: string;
    title: string;
    units: string;
    unitsShort: string;
    frequency: string;
    frequencyShort: string;
    seasonalAdjustment: string;
    seasonalAdjustmentShort: string;
    lastUpdated: string;
    observationStart: string;
    observationEnd: string;
    realtimeStart: string;
    realtimeEnd: string;
    popularity: number;
    groupPopularity: number;
    notes?: string;
    seriesUrl: string;
    observations?: FredObservation[];
    scrapedTimestamp: string;
}

