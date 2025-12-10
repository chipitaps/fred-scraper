# FRED Scraper

**Repository Name:** fred-scraper
**Repository URL:** https://github.com/chipitaps/fred-scraper
**Name:** FRED Scraper
**Main Website URL:** https://fred.stlouisfed.org/

## Description
Scrapes economic data series from the Federal Reserve Economic Data (FRED) API, including series information, observations, categories, releases, and related metadata.

## Search and Filtering

### Start URL Support
- **Supports startUrl**: No
- **Reason**: FRED uses an API-based approach with search queries and filters. Direct URL scraping is not the primary method for accessing FRED data.

### Available Filters

#### API Parameter Filters
- **Search Query**: 
  - Parameter: `search_text`
  - Format: String
  - Example: `"cpi"` or `"unemployment"`
  - Required: No
  - Description: Full-text search across series titles, units, frequency, and tags

- **Series ID**: 
  - Parameter: `series_id`
  - Format: String
  - Example: `"CPIAUCSL"`
  - Required: No
  - Description: Specific series identifier

- **Category ID**: 
  - Parameter: `category_id`
  - Format: Integer
  - Example: `10` (National Accounts)
  - Required: No
  - Description: Filter by category

- **Frequency**: 
  - Parameter: `frequency`
  - Format: String
  - Example: `"Monthly"`, `"Quarterly"`, `"Annual"`
  - Required: No
  - Description: Data frequency filter

- **Units**: 
  - Parameter: `units`
  - Format: String
  - Example: `"Percent"`, `"Index"`
  - Required: No
  - Description: Units of measurement filter

- **Seasonal Adjustment**: 
  - Parameter: `seasonal_adjustment`
  - Format: String
  - Example: `"Seasonally Adjusted"`, `"Not Seasonally Adjusted"`
  - Required: No
  - Description: Seasonal adjustment filter


- **Search Type**: 
  - Parameter: `search_type`
  - Format: String
  - Example: `"full_text"` (default) or `"series_id"`
  - Required: No
  - Description: Type of search to perform

- **Sort Order**: 
  - Parameter: `sort_order`
  - Format: String
  - Example: `"search_rank"`, `"series_id"`, `"title"`, `"units"`, `"frequency"`, `"seasonal_adjustment"`, `"realtime_start"`, `"realtime_end"`, `"last_updated"`, `"observation_start"`, `"observation_end"`, `"popularity"`, `"group_popularity"`
  - Required: No
  - Description: Field to sort by

- **Order**: 
  - Parameter: `order_by`
  - Format: String
  - Example: `"asc"` or `"desc"`
  - Required: No
  - Description: Sort order direction

- **Limit**: 
  - Parameter: `limit`
  - Format: Integer
  - Example: `1000` (max per request)
  - Required: No
  - Description: Maximum results per request (API limit: 1000)

- **Offset**: 
  - Parameter: `offset`
  - Format: Integer
  - Example: `0`, `1000`, `2000`
  - Required: No
  - Description: Pagination offset

### Filter Combinations
- **Multiple Parameters**: Can combine multiple filters: `search_text=cpi&frequency=Monthly&units=Index`
- **All filters are optional**: Can use any combination of filters
- **Pagination**: Use `limit` (max 1000) and `offset` for pagination

### API Limitations
- **Rate Limit**: 120 requests per minute per API key
- **Max Results per Request**: 1,000 (via `limit` parameter)
- **Pagination**: Use `offset` parameter for additional pages
- **Filter Limitations**: Only `frequency`, `units`, and `seasonal_adjustment` can be used with `filter_variable`
- **Search Types**: `full_text` (default) or `series_id` only
- **No Advanced Search**: No AND/OR/NOT operators, no fuzzy matching

Fields from listing (search results):
- **Series ID**: API response: `series[].id`
- **Title**: API response: `series[].title`
- **Units**: API response: `series[].units`
- **Frequency**: API response: `series[].frequency`
- **Seasonal Adjustment**: API response: `series[].seasonal_adjustment`
- **Last Updated**: API response: `series[].last_updated`
- **Observation Start**: API response: `series[].observation_start`
- **Observation End**: API response: `series[].observation_end`
- **Realtime Start**: API response: `series[].realtime_start`
- **Realtime End**: API response: `series[].realtime_end`
- **Popularity**: API response: `series[].popularity`
- **Notes**: API response: `series[].notes`
- **Series URL**: Constructed: `https://fred.stlouisfed.org/series/{series_id}`

Fields from details (series observations):
- **Series ID**: API response: `observations[].series_id`
- **Date**: API response: `observations[].date`
- **Value**: API response: `observations[].value`
- **Realtime Start**: API response: `observations[].realtime_start`
- **Realtime End**: API response: `observations[].realtime_end`
- **All Series Metadata**: From series search response

## Extraction Notes:
- FRED API uses REST endpoints with JSON responses
- API base URL: `https://api.stlouisfed.org/fred/`
- API key required: `f16f5517acf14df7a0638ef4435699da`
- Rate limiting: 120 requests/minute (implement delay between requests)
- Pagination: Use `limit=1000` and `offset` for large result sets
- Search endpoint: `/series/search`
- Observations endpoint: `/series/observations`
- File format: JSON (default) or XML
- Some series may have copyright restrictions (check notes field)
- Data revisions: Current data may be revised; use ALFRED for historical versions

