// Japan in Numbers — the figures behind the site.
// Every figure carries its source and year. Values are published estimates,
// rounded for display; see the Sources page for the full list.
// Figures are from the Statistics Bureau of Japan, the IMF World Economic
// Outlook, the World Bank, the Ministry of Finance customs data, the
// Ministry of Health, Labour and Welfare, and UN World Population Prospects.

const JIN = {};

// Headline indicators shown on the Overview page.
JIN.kpis = [
  { label: 'Population', value: '123.8m', note: '1 Oct 2024 estimate', source: 'Statistics Bureau', year: 2024 },
  { label: 'GDP (nominal)', value: '$4.03tr', note: 'IMF estimate', source: 'IMF WEO', year: 2024 },
  { label: 'GDP per person', value: '$32,500', note: 'nominal, IMF estimate', source: 'IMF WEO', year: 2024 },
  { label: 'Unemployment', value: '2.5%', note: 'annual average', source: 'Statistics Bureau', year: 2024 },
  { label: 'Consumer prices', value: '+2.7%', note: 'CPI, year on year', source: 'Statistics Bureau', year: 2024 },
  { label: 'Life expectancy', value: '84.0 yrs', note: 'at birth', source: 'MHLW', year: 2023 },
];

// Population, 1 October estimates, millions (Statistics Bureau).
JIN.population = [
  { year: 2019, value: 126.17 }, { year: 2020, value: 125.71 },
  { year: 2021, value: 125.50 }, { year: 2022, value: 124.95 },
  { year: 2023, value: 124.35 }, { year: 2024, value: 123.80 },
];

// Nominal GDP, US$ trillion (IMF World Economic Outlook).
JIN.gdpNominal = [
  { year: 2019, value: 5.15 }, { year: 2020, value: 5.06 },
  { year: 2021, value: 5.03 }, { year: 2022, value: 4.26 },
  { year: 2023, value: 4.21 }, { year: 2024, value: 4.03 },
];

// Real GDP growth, % year on year (Cabinet Office / IMF).
JIN.gdpGrowth = [
  { year: 2019, value: -0.4 }, { year: 2020, value: -4.2 },
  { year: 2021, value: 2.7 }, { year: 2022, value: 0.9 },
  { year: 2023, value: 1.7 }, { year: 2024, value: -0.1 },
];

// Share of gross value added, % (World Bank, 2023).
JIN.gdpSectors = [
  { label: 'Services', value: 71.4 },
  { label: 'Industry', value: 27.5 },
  { label: 'Agriculture, forestry & fishing', value: 1.0 },
];

// Unemployment rate, % annual average (Statistics Bureau).
JIN.unemployment = [
  { year: 2019, value: 2.4 }, { year: 2020, value: 2.8 },
  { year: 2021, value: 2.8 }, { year: 2022, value: 2.6 },
  { year: 2023, value: 2.6 }, { year: 2024, value: 2.5 },
];

// CPI, all items, % change year on year (Statistics Bureau).
JIN.cpi = [
  { year: 2019, value: 0.5 }, { year: 2020, value: 0.0 },
  { year: 2021, value: -0.2 }, { year: 2022, value: 2.5 },
  { year: 2023, value: 3.3 }, { year: 2024, value: 2.7 },
];

// CPI index by category, 2020 = 100 (Statistics Bureau, 2024 annual average).
JIN.cpiCategories = [
  { label: 'All items', value: 108.3 },
  { label: 'Food', value: 112.6 },
  { label: 'Fuel, light & water charges', value: 113.6 },
  { label: 'Clothing & footwear', value: 108.9 },
  { label: 'Culture & recreation', value: 107.4 },
  { label: 'Transport & communication', value: 104.1 },
  { label: 'Housing', value: 103.4 },
  { label: 'Education', value: 102.8 },
  { label: 'Medical care', value: 101.9 },
];

// Age structure, % of population (Statistics Bureau, 2024).
JIN.ageStructure = [
  { label: 'Aged 0–14', value: 11.4 },
  { label: 'Aged 15–64', value: 59.3 },
  { label: 'Aged 65 and over', value: 29.3 },
];

// Population by five-year age band, millions (Statistics Bureau, 2024 estimate).
JIN.ageBands = [
  { band: '0–4', value: 3.9 }, { band: '5–9', value: 4.6 },
  { band: '10–14', value: 5.0 }, { band: '15–19', value: 5.5 },
  { band: '20–24', value: 6.0 }, { band: '25–29', value: 6.5 },
  { band: '30–34', value: 7.0 }, { band: '35–39', value: 7.5 },
  { band: '40–44', value: 8.0 }, { band: '45–49', value: 9.0 },
  { band: '50–54', value: 8.5 }, { band: '55–59', value: 7.5 },
  { band: '60–64', value: 7.5 }, { band: '65–69', value: 8.0 },
  { band: '70–74', value: 9.0 }, { band: '75–79', value: 7.5 },
  { band: '80–84', value: 5.5 }, { band: '85+', value: 6.0 },
];

// Largest prefectures, population in millions (Statistics Bureau, 2024, approx.).
JIN.prefectures = [
  { name: 'Tokyo', value: 14.1 }, { name: 'Kanagawa', value: 9.2 },
  { name: 'Osaka', value: 8.8 }, { name: 'Aichi', value: 7.5 },
  { name: 'Saitama', value: 7.3 }, { name: 'Chiba', value: 6.3 },
  { name: 'Hyogo', value: 5.4 }, { name: 'Hokkaido', value: 5.2 },
  { name: 'Fukuoka', value: 5.1 }, { name: 'Shizuoka', value: 3.6 },
];

// Eight regions: population from the 2020 Census, millions (Statistics Bureau).
JIN.regions = [
  { name: 'Kanto', population: 44.6, city: 'Tokyo', note: 'Includes Tokyo, Kanagawa, Saitama, Chiba' },
  { name: 'Kansai', population: 22.6, city: 'Osaka', note: 'Osaka, Kyoto, Hyogo, Nara, Wakayama, Shiga' },
  { name: 'Chubu', population: 21.3, city: 'Nagoya', note: 'Aichi, Shizuoka, Gifu, Mie and the Hokuriku prefectures' },
  { name: 'Kyushu & Okinawa', population: 14.4, city: 'Fukuoka', note: 'Fukuoka, Kumamoto, Nagasaki, Okinawa and others' },
  { name: 'Tohoku', population: 8.9, city: 'Sendai', note: 'Miyagi, Fukushima, Iwate, Akita, Yamagata, Aomori' },
  { name: 'Chugoku', population: 7.4, city: 'Hiroshima', note: 'Hiroshima, Okayama, Yamaguchi, Tottori, Shimane' },
  { name: 'Hokkaido', population: 5.2, city: 'Sapporo', note: 'Japan’s northernmost island, one prefecture' },
  { name: 'Shikoku', population: 3.8, city: 'Takamatsu', note: 'Kagawa, Ehime, Kochi, Tokushima' },
];

// Trade in goods, ¥ trillion (Ministry of Finance customs data).
JIN.trade = [
  { year: 2019, exports: 76.9, imports: 78.6 },
  { year: 2020, exports: 68.4, imports: 68.0 },
  { year: 2021, exports: 83.1, imports: 84.8 },
  { year: 2022, exports: 98.2, imports: 118.2 },
  { year: 2023, exports: 100.9, imports: 110.2 },
  { year: 2024, exports: 107.9, imports: 113.2 },
];

// Top export destinations, share of exports % (Ministry of Finance, 2024).
JIN.tradePartners = [
  { name: 'United States', value: 20.7 },
  { name: 'China', value: 17.7 },
  { name: 'South Korea', value: 7.1 },
  { name: 'Taiwan', value: 6.0 },
  { name: 'Hong Kong', value: 4.7 },
  { name: 'Thailand', value: 4.2 },
  { name: 'Singapore', value: 3.2 },
  { name: 'Germany', value: 2.7 },
  { name: 'Australia', value: 2.4 },
  { name: 'Vietnam', value: 2.3 },
];

// Employment by sector, % of employed persons (Statistics Bureau, 2024, approx.).
JIN.employmentSectors = [
  { label: 'Services (tertiary)', value: 72.7 },
  { label: 'Industry & construction (secondary)', value: 24.4 },
  { label: 'Agriculture, forestry & fishing (primary)', value: 2.9 },
];

// The full indicator table for the Data Explorer page.
JIN.indicators = [
  { name: 'Population', value: '123.8 million', year: 2024, source: 'Statistics Bureau' },
  { name: 'Population change', value: '−0.44% a year', year: 2024, source: 'Statistics Bureau' },
  { name: 'Median age', value: '49.5 years', year: 2024, source: 'UN WPP 2024' },
  { name: 'Total fertility rate', value: '1.15 children per woman', year: 2024, source: 'MHLW' },
  { name: 'Births', value: '720,988', year: 2024, source: 'MHLW' },
  { name: 'Life expectancy at birth', value: '84.0 years', year: 2023, source: 'MHLW' },
  { name: 'Share aged 65 and over', value: '29.3%', year: 2024, source: 'Statistics Bureau' },
  { name: 'GDP (nominal)', value: '$4.03 trillion', year: 2024, source: 'IMF WEO' },
  { name: 'GDP per person', value: '$32,500', year: 2024, source: 'IMF WEO' },
  { name: 'Real GDP growth', value: '−0.1%', year: 2024, source: 'Cabinet Office' },
  { name: 'Services share of value added', value: '71.4%', year: 2023, source: 'World Bank' },
  { name: 'Industry share of value added', value: '27.5%', year: 2023, source: 'World Bank' },
  { name: 'Unemployment rate', value: '2.5%', year: 2024, source: 'Statistics Bureau' },
  { name: 'Employed persons', value: '67.7 million', year: 2024, source: 'Statistics Bureau' },
  { name: 'Labour force', value: '69.4 million', year: 2024, source: 'Statistics Bureau' },
  { name: 'Average monthly cash earnings', value: 'about ¥318,000', year: 2024, source: 'MHLW' },
  { name: 'CPI (all items)', value: '+2.7% year on year', year: 2024, source: 'Statistics Bureau' },
  { name: 'CPI index (2020 = 100)', value: '108.3', year: 2024, source: 'Statistics Bureau' },
  { name: 'Exports of goods', value: '¥107.9 trillion', year: 2024, source: 'Ministry of Finance' },
  { name: 'Imports of goods', value: '¥113.2 trillion', year: 2024, source: 'Ministry of Finance' },
  { name: 'Trade balance (goods)', value: '−¥5.3 trillion', year: 2024, source: 'Ministry of Finance' },
  { name: 'Largest export market', value: 'United States (20.7%)', year: 2024, source: 'Ministry of Finance' },
  { name: 'General government gross debt', value: 'about 237% of GDP', year: 2024, source: 'IMF WEO' },
  { name: 'Exchange rate (annual average)', value: 'about ¥151 per US$', year: 2024, source: 'IMF / Bank of Japan' },
];

// Latest releases, in the order a visitor would check them.
JIN.releases = [
  { date: 'Nov 2025', title: 'Labour Force Survey: unemployment 2.5%', detail: 'October 2025, seasonally adjusted. Source: Statistics Bureau.' },
  { date: 'Nov 2025', title: 'Consumer Price Index: +2.7% year on year', detail: 'October 2025, all items less fresh food +3.0%. Source: Statistics Bureau.' },
  { date: 'Nov 2025', title: 'GDP, July–September 2025: −0.4% quarter on quarter', detail: 'Second preliminary estimate. Source: Cabinet Office.' },
  { date: 'Oct 2025', title: 'Population estimates: 123.3 million', detail: '1 October 2025 estimate, down 0.5% on the year. Source: Statistics Bureau.' },
];

// Where every figure comes from.
JIN.sources = [
  { name: 'Statistics Bureau of Japan', what: 'Population estimates, Labour Force Survey, Consumer Price Index, Census', url: 'stat.go.jp (official statistics portal)' },
  { name: 'Cabinet Office', what: 'National accounts, quarterly GDP', url: 'cao.go.jp' },
  { name: 'Ministry of Finance', what: 'Trade statistics (customs data)', url: 'customs.go.jp' },
  { name: 'Ministry of Health, Labour and Welfare', what: 'Vital statistics, Monthly Labour Survey, life tables', url: 'mhlw.go.jp' },
  { name: 'IMF World Economic Outlook', what: 'GDP, GDP per person, government debt (October 2025 edition)', url: 'imf.org' },
  { name: 'World Bank, World Development Indicators', what: 'Sector shares of value added', url: 'data.worldbank.org' },
  { name: 'United Nations, World Population Prospects 2024', what: 'Median age', url: 'population.un.org' },
];
