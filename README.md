📊 Automate your economic research with comprehensive data collection from the Federal Reserve Economic Data (FRED) database.

This tool makes it easy to collect economic data series from the Federal Reserve, giving you access to thousands of economic indicators like CPI, GDP, unemployment rates, interest rates, and much more. Perfect for economists, researchers, analysts, and data scientists who need accurate, up-to-date economic data without spending hours searching and downloading manually.

**Target Audience:** 👥 Economists, researchers, financial analysts, data scientists, academics, policy makers  
**Primary Use Cases:** 📈 Economic research, market analysis, data collection for reports, academic studies, financial modeling

## 🎯 What Does This Tool Do?

This tool automatically collects economic data series from the Federal Reserve Economic Data (FRED) database. Simply enter what you're looking for, and it finds all matching economic indicators for you. Here's what you get:

✅ **Complete Series Information** - Title, units, frequency, and seasonal adjustment details  
✅ **Smart Search** - Find data by keywords across thousands of economic indicators  
✅ **Powerful Filters** - Narrow down results by category, frequency, units, and seasonal adjustment  
✅ **Historical Data** - Optionally get all historical data points (date-value pairs) for each series  
✅ **Popularity Rankings** - See which series are most popular among users  
✅ **Full Metadata** - Last updated dates, data ranges, and detailed notes  

💡 **Why This Matters:** Save hours of manual work. Instead of searching through the FRED website one series at a time, this tool finds and collects everything you need in minutes.

## 🎬 How to Use - Full Demo

_Watch this demo to see how easy it is to get started!_

## 📥 Input - What You Need to Provide

Getting started is simple! Just fill in the input form with:

🔍 **Search Text** - Type keywords to find economic data (e.g., "cpi", "unemployment", "gdp")  
🎛️ **Filters** - Narrow results by category, frequency, units, and seasonal adjustment  
📊 **Sort Options** - Choose how to sort results (by popularity, title, date, etc.)  
🔢 **Max Items** - Set how many series to collect (Free users: up to 100. Paid users: up to 1,000,000)  
📈 **Include Observations** - Check this box to get historical data points (takes longer and costs more)

Here's a simple example:

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

## 📤 Output - What You Get

After the tool finishes, you'll get a complete dataset with all the economic data you requested. You can download your results as Excel, HTML, XML, JSON, or CSV files.

Here's an example of what you'll get when searching for "cpi":

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

**What's Included:**
- ✅ Series ID and title for easy reference
- ✅ Measurement details (units and frequency)
- ✅ Data date ranges
- ✅ Last updated information
- ✅ Popularity rankings
- ✅ Direct links to view on FRED website
- ✅ Optional historical data points (if requested)

💾 **Download Options:** Get your data in CSV, Excel, or JSON formats - perfect for analysis in Excel, Python, R, or any tool you prefer!

## ⭐ Why Choose This Tool?

🎯 **Comprehensive Coverage** - Access thousands of economic data series from the Federal Reserve  
⏱️ **Save Time** - Automate data collection that would take hours manually  
🔄 **Always Up-to-Date** - Get the latest economic indicators automatically  
🔍 **Easy Search** - Find data by keywords or use powerful filters  
📋 **Complete Information** - Get all series details including notes and popularity  
📊 **Historical Data** - Optionally include all historical data points  
🔗 **Easy Export** - Download as CSV, Excel, or JSON for your analysis tools  

⏰ **Time Savings:** Collect hundreds of economic series in minutes instead of hours  
🚀 **Efficiency:** Never miss important economic indicators - automated collection ensures completeness

## 🚀 How to Get Started

1. **Sign Up** - [Create a free account w/ $5 credit](https://console.apify.com/sign-up?fpr=vmoqkp) (takes 2 minutes)
2. **Find the Tool** - Visit the FRED Scraper page
3. **Enter Your Search** - Type what you're looking for (e.g., "unemployment", "inflation")
4. **Configure Options** - Set filters, sorting, and how many results you want
5. **Click Start** - Let the tool collect your economic data
6. **Download Results** - Get your data from the "Dataset" tab in CSV, Excel, or JSON format

⏱️ **Total Time:** Less than 5 minutes from sign-up to downloaded data  
👆 **No Technical Skills Required:** Everything is point-and-click - no coding needed!

## 💼 Business Use Cases

### 📚 Economic Researchers
- Collect comprehensive datasets for academic research
- Monitor economic indicators across multiple categories
- Build historical databases for analysis

### 💹 Financial Analysts
- Track key economic indicators for market analysis
- Collect data for financial modeling and forecasting
- Monitor inflation, unemployment, and GDP trends

### 🤖 Data Scientists
- Build economic datasets for machine learning models
- Collect time-series data for analysis
- Create comprehensive economic data repositories

### 🏛️ Policy Makers
- Monitor economic trends and indicators
- Collect data for policy analysis and reports
- Track economic performance metrics

### 📊 Business Analysts
- Understand economic conditions affecting business
- Collect data for market research and analysis
- Monitor economic trends relevant to your industry

## 🔌 Using with the Apify API

For advanced users who want to automate this process, you can control the tool programmatically with the Apify API. This allows you to schedule regular data collection and integrate with your existing business tools.

- **Node.js**: Install the apify-client NPM package
- **Python**: Use the apify-client PyPI package
- See the [Apify API reference](https://docs.apify.com/api/v2) for full details

## ❓ Frequently Asked Questions

**Q: How does it work?**  
A: Simply enter your search query, and the tool automatically finds and collects all matching economic data series from the FRED database. No technical knowledge required!

**Q: How accurate is the data?**  
A: All data comes directly from the Federal Reserve Economic Data (FRED) database, ensuring accuracy and reliability. The data matches exactly what you would find on the FRED website.

**Q: Can I get historical data points?**  
A: Yes! Enable the "Include Observations" option to get historical data points (date-value pairs) for each series. This gives you complete time-series data for analysis. ⚠️ Note: This increases processing time and cost.

**Q: What economic indicators are available?**  
A: FRED contains thousands of economic indicators including CPI, GDP, unemployment rates, interest rates, employment data, production indices, and much more. Use the search function to discover what's available!

**Q: Can I schedule regular runs?**  
A: Yes! Use the Apify API or scheduler to run the tool automatically on a schedule, ensuring you always have the latest economic data.

**Q: What if I need help?**  
A: Our support team is here to help you get the most out of this tool. Contact us through the Apify platform for assistance.

**Q: Is my data secure?**  
A: Yes, all data collection happens securely through Apify's platform. Your data is private and secure.

## 🔗 Integrate with Any App and Automate Your Workflow

This tool can be connected with almost any cloud service or web app thanks to [integrations](https://apify.com/integrations) on the Apify platform.

These include:

- [Make](https://docs.apify.com/platform/integrations/make)
- [Zapier](https://docs.apify.com/platform/integrations/zapier)
- [Slack](https://docs.apify.com/platform/integrations/slack)
- [Airbyte](https://docs.apify.com/platform/integrations/airbyte)
- [GitHub](https://docs.apify.com/platform/integrations/github)
- [Google Drive](https://docs.apify.com/platform/integrations/drive)
- and [much more](https://docs.apify.com/platform/integrations).

Alternatively, you can use webhooks to carry out an action whenever an event occurs, e.g. get a notification whenever the scraper successfully finishes a run.

## 🌟 Recommended Actors

Looking for more data collection tools? Check out these related actors:

| Actor | Description | Link |
|-------|-------------|------|
| FINRA BrokerCheck Scraper | Collects broker and investment advisor information from FINRA's BrokerCheck database | [https://apify.com/parseforge/finra-brokercheck-scraper](https://apify.com/parseforge/finra-brokercheck-scraper) |
| US Census Bureau Scraper | Extracts demographic and economic data from the US Census Bureau | [https://apify.com/parseforge/us-census-bureau-scraper](https://apify.com/parseforge/us-census-bureau-scraper) |
| PubMed Scraper | Collects research papers and publications from PubMed database | [https://apify.com/parseforge/pubmed-scraper](https://apify.com/parseforge/pubmed-scraper) |
| ArXiv Scraper | Extracts research papers from ArXiv preprint repository | [https://apify.com/parseforge/arxiv-scraper](https://apify.com/parseforge/arxiv-scraper) |
| Semantic Scholar Scraper | Collects academic papers and citations from Semantic Scholar | [https://apify.com/parseforge/semantic-scholar-scraper](https://apify.com/parseforge/semantic-scholar-scraper) |

💡 **Pro Tip:** Browse our complete collection of [data collection actors](https://apify.com/parseforge) to find the perfect tool for your business needs.

**Need Help?** Our support team is here to help you get the most out of this tool.

---

> **⚠️ Disclaimer:** This Actor is an independent tool and is not affiliated with, endorsed by, or sponsored by the Federal Reserve Bank of St. Louis, FRED, or any of its subsidiaries. All trademarks mentioned are the property of their respective owners.
