# FRED Scraper

🚀 Supercharge your economic research with automated collection of economic data from the Federal Reserve Economic Data (FRED) database!

The FRED Scraper automates the collection of economic data series from the Federal Reserve Economic Data API, giving you access to thousands of economic indicators including CPI, GDP, unemployment rates, interest rates, and much more. Perfect for economists, researchers, analysts, and data scientists who need accurate, up-to-date economic intelligence without manual work.

**Target Audience:** Economists, researchers, financial analysts, data scientists, academics, policy makers
**Primary Use Cases:** Economic research, market analysis, data collection for reports, academic studies, financial modeling

## What Does FRED Scraper Do?

This tool collects economic data series from the Federal Reserve Economic Data (FRED) database, supporting both search-based discovery and direct series access. It delivers:

- **Series Metadata**: Complete information about each economic data series including title, units, frequency, and seasonal adjustment
- **Search Capabilities**: Full-text search across thousands of economic indicators
- **Filtering Options**: Filter by category, frequency, units, and seasonal adjustment
- **Observation Data**: Optional historical data points (date-value pairs) for each series
- **Popularity Metrics**: Series popularity and group popularity rankings
- **Complete Metadata**: Last updated dates, observation ranges, realtime periods, and notes

**Business Value:** Access comprehensive economic data for research, analysis, and decision-making. Save hours of manual data collection and ensure you have the most up-to-date economic indicators for your projects.

## How to use the FRED Scraper - Full Demo

_Watch this demo to see how easy it is to get started!_

## Input

To start collecting FRED economic data, simply fill in the input form. You can search for economic series using:

- **Search Text** - Enter keywords to find economic data series (e.g., "cpi", "unemployment", "gdp")
- **Series ID** - Enter a specific FRED series identifier (e.g., "CPIAUCSL", "UNRATE", "GDP")
- **Filters** - Refine results by category, frequency, units, and seasonal adjustment
- **Max Items** - Set the maximum number of series to collect (Free users: Limited to 100. Paid users: Optional, max 1,000,000)

Here's what the input configuration looks like in JSON:

```json
{
    "searchText": "cpi",
    "maxItems": 10,
    "includeObservations": false
}
```

**Example with Filters:**

```json
{
    "searchText": "unemployment",
    "frequency": "Monthly",
    "units": "Percent",
    "seasonalAdjustment": "Seasonally Adjusted",
    "maxItems": 50
}
```

## Output

After the Actor finishes its run, you'll get a dataset with the output. The length of the dataset depends on the amount of results you've set. You can download those results as an Excel, HTML, XML, JSON, and CSV document.

Here's an example of scraped FRED data you'll get if you search for "cpi":

```json
{
    "seriesId": "CPIAUCSL",
    "title": "Consumer Price Index for All Urban Consumers: All Items in U.S. City Average",
    "units": "Index 1982-1984=100",
    "unitsShort": "Index 1982-84=100",
    "frequency": "Monthly",
    "frequencyShort": "M",
    "seasonalAdjustment": "Seasonally Adjusted",
    "seasonalAdjustmentShort": "SA",
    "lastUpdated": "2024-01-11 08:30:00-06",
    "observationStart": "1913-01-01",
    "observationEnd": "2024-12-01",
    "realtimeStart": "2024-01-01",
    "realtimeEnd": "2024-12-31",
    "popularity": 95,
    "groupPopularity": 100,
    "notes": "The Consumer Price Index for All Urban Consumers...",
    "seriesUrl": "https://fred.stlouisfed.org/series/CPIAUCSL",
    "scrapedTimestamp": "2024-12-10T10:00:00.000Z"
}
```

**What You Get:**
- **Series Identification**: Series ID and title for easy reference
- **Measurement Details**: Units and frequency information
- **Data Range**: Observation start and end dates
- **Update Information**: Last updated timestamp and realtime periods
- **Popularity Metrics**: How popular each series is among users
- **Direct Links**: Direct URL to view the series on FRED website
- **Optional Observations**: Historical data points if requested

**Download Options:** CSV, Excel, or JSON formats for easy analysis in your preferred tools

## Why Choose the FRED Scraper?

- **Comprehensive Coverage**: Access thousands of economic data series from the Federal Reserve
- **Time Savings**: Automate data collection that would take hours manually
- **Up-to-Date Data**: Get the latest economic indicators automatically
- **Flexible Search**: Find data by keywords, series ID, or advanced filters
- **Complete Metadata**: Get all series information including notes and popularity metrics
- **Optional Observations**: Include historical data points when needed
- **Easy Integration**: Export to CSV, Excel, or JSON for use in your analysis tools

**Time Savings:** Collect hundreds of economic series in minutes instead of hours of manual searching and downloading
**Efficiency:** Automated collection ensures you never miss important economic indicators

## How to Use

1. **Sign Up**: [Create a free account w/ $5 credit](https://console.apify.com/sign-up?fpr=vmoqkp) (takes 2 minutes)
2. **Find the Scraper**: Visit the FRED Scraper page
3. **Set Input**: Add your search query or series ID (we'll show you exactly what to enter)
4. **Run It**: Click "Start" and let it collect your economic data
5. **Download Data**: Get your results in the "Dataset" tab as CSV, Excel, or JSON

**Total Time:** Less than 5 minutes from sign-up to downloaded data
**No Technical Skills Required:** Everything is point-and-click

## Business Use Cases

**Economic Researchers:**

- Collect comprehensive datasets for academic research
- Monitor economic indicators across multiple categories
- Build historical databases for analysis

**Financial Analysts:**

- Track key economic indicators for market analysis
- Collect data for financial modeling and forecasting
- Monitor inflation, unemployment, and GDP trends

**Data Scientists:**

- Build economic datasets for machine learning models
- Collect time-series data for analysis
- Create comprehensive economic data repositories

**Policy Makers:**

- Monitor economic trends and indicators
- Collect data for policy analysis and reports
- Track economic performance metrics

**Business Analysts:**

- Understand economic conditions affecting business
- Collect data for market research and analysis
- Monitor economic trends relevant to industry

## Using FRED Scraper with the Apify API

For advanced users who want to automate this process, you can control the scraper programmatically with the Apify API. This allows you to schedule regular data collection and integrate with your existing business tools.

- **Node.js**: Install the apify-client NPM package
- **Python**: Use the apify-client PyPI package
- See the [Apify API reference](https://docs.apify.com/api/v2) for full details

## Frequently Asked Questions

**Q: How does it work?**
A: FRED Scraper collects economic data series from the Federal Reserve Economic Data (FRED) database. Simply enter your search query or series ID, and the tool automatically retrieves all matching economic data series with complete metadata.

**Q: How accurate is the data?**
A: All data comes directly from the Federal Reserve Economic Data (FRED) database, ensuring accuracy and reliability. The data is updated regularly and matches what you would find on the FRED website.

**Q: Can I get historical data points?**
A: Yes! Enable the "Include Observations" option to get historical data points (date-value pairs) for each series. This allows you to download complete time-series data.

**Q: What economic indicators are available?**
A: FRED contains thousands of economic indicators including CPI, GDP, unemployment rates, interest rates, employment data, production indices, and much more. Use the search function to discover available series.

**Q: Can I schedule regular runs?**
A: Yes! Use the Apify API or scheduler to run the scraper automatically on a schedule, ensuring you always have the latest economic data.

**Q: What if I need help?**
A: Our support team is here to help you get the most out of this tool. Contact us through the Apify platform for assistance.

**Q: Is my data secure?**
A: Yes, all data collection happens securely through Apify's platform. Your data is private and secure.

## Integrate FRED Scraper with any app and automate your workflow

Last but not least, FRED Scraper can be connected with almost any cloud service or web app thanks to [integrations](https://apify.com/integrations) on the Apify platform.

These includes:

- [Make](https://docs.apify.com/platform/integrations/make)
- [Zapier](https://docs.apify.com/platform/integrations/zapier)
- [Slack](https://docs.apify.com/platform/integrations/slack)
- [Airbyte](https://docs.apify.com/platform/integrations/airbyte)
- [GitHub](https://docs.apify.com/platform/integrations/github)
- [Google Drive](https://docs.apify.com/platform/integrations/drive)
- and [much more](https://docs.apify.com/platform/integrations).

Alternatively, you can use webhooks to carry out an action whenever an event occurs, e.g. get a notification whenever FRED Scraper successfully finishes a run.

## 🔗 Recommended Actors

Looking for more data collection tools? Check out these related actors:

| Actor | Description | Link |
|-------|-------------|------|
| FINRA BrokerCheck Scraper | Collects broker and investment advisor information from FINRA's BrokerCheck database | [https://apify.com/parseforge/finra-brokercheck-scraper](https://apify.com/parseforge/finra-brokercheck-scraper) |
| US Census Bureau Scraper | Extracts demographic and economic data from the US Census Bureau | [https://apify.com/parseforge/us-census-bureau-scraper](https://apify.com/parseforge/us-census-bureau-scraper) |
| PubMed Scraper | Collects research papers and publications from PubMed database | [https://apify.com/parseforge/pubmed-scraper](https://apify.com/parseforge/pubmed-scraper) |
| ArXiv Scraper | Extracts research papers from ArXiv preprint repository | [https://apify.com/parseforge/arxiv-scraper](https://apify.com/parseforge/arxiv-scraper) |
| Semantic Scholar Scraper | Collects academic papers and citations from Semantic Scholar | [https://apify.com/parseforge/semantic-scholar-scraper](https://apify.com/parseforge/semantic-scholar-scraper) |

**Pro Tip:** 💡 Browse our complete collection of [data collection actors](https://apify.com/parseforge) to find the perfect tool for your business needs.

**Need Help?** Our support team is here to help you get the most out of this tool.

---

> **⚠️ Disclaimer:** This Actor is an independent tool and is not affiliated with, endorsed by, or sponsored by the Federal Reserve Bank of St. Louis, FRED, or any of its subsidiaries. All trademarks mentioned are the property of their respective owners.

