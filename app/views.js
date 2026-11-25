// Japan in Numbers — the pages. Each view is a function that returns HTML
// for one hash route, built from the figures in data.js and the charts in
// charts.js. Every figure on a page names its source and year.

const VIEWS = {};

function kpiCards() {
  return '<div class="kpi-grid">' + JIN.kpis.map(function (k) {
    return '<article class="kpi"><p class="kpi-value">' + k.value + '</p>' +
      '<p class="kpi-label">' + k.label + '</p>' +
      '<p class="kpi-note">' + k.note + ' · ' + k.source + ', ' + k.year + '</p></article>';
  }).join('') + '</div>';
}

function figureNote(text) {
  return '<p class="fig-note">' + text + '</p>';
}

function sortableTable(headers, rows, id) {
  const head = headers.map(function (h, i) {
    return '<th data-sort="' + i + '" data-type="' + (h.type || 'text') + '">' + h.label + ' <span class="sort-hint">↕</span></th>';
  }).join('');
  const body = rows.map(function (r) {
    return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
  }).join('');
  return '<div class="table-wrap"><table class="data-table" id="' + id + '"><thead><tr>' + head +
    '</tr></thead><tbody>' + body + '</tbody></table></div>';
}

VIEWS.overview = function () {
  return '' +
    '<section class="hero">' +
    '<p class="eyebrow">Japan · National statistics · Updated November 2025</p>' +
    '<h1>Japan in numbers</h1>' +
    '<p class="lede">Population, the economy, jobs, prices, trade and the regions — the figures ' +
    'people look up, each with its source and year, on one fast page that works offline.</p>' +
    '<p class="hero-links"><a class="btn" href="#/population">Population</a> ' +
    '<a class="btn" href="#/economy">Economy</a> ' +
    '<a class="btn btn-ghost" href="#/data">Browse all indicators →</a></p>' +
    '</section>' +
    kpiCards() +
    '<section class="grid-2">' +
    '<article class="card"><h2>Gross domestic product</h2>' +
    CHARTS.barChart(JIN.gdpNominal, { title: 'Nominal GDP by year', unit: 'US$ trillion', color: '#1f3a5f' }) +
    figureNote('Nominal GDP, US$ trillion. Source: IMF World Economic Outlook, 2019–2024. ' +
    'The yen’s fall against the dollar after 2021 shrank the dollar figure even as yen GDP grew.') +
    '</article>' +
    '<article class="card"><h2>Population is shrinking</h2>' +
    CHARTS.lineChart(JIN.population, { title: 'Population by year', unit: 'millions', color: '#b3402e', decimals: 1 }) +
    figureNote('Total population, 1 October estimates, millions. Source: Statistics Bureau of Japan, 2019–2024. ' +
    'Japan has lost about 2.4 million people since 2019.') +
    '</article></section>' +
    '<section class="card"><h2>Latest releases</h2><ul class="releases">' +
    JIN.releases.map(function (r) {
      return '<li><strong>' + r.date + ' — ' + r.title + '</strong><br><span>' + r.detail + '</span></li>';
    }).join('') + '</ul></section>' +
    '<section class="card"><h2>At a glance</h2>' +
    '<p>Japan is the world’s fourth-largest economy and its most aged large society: 29.3% of ' +
    'people are 65 or older, the fertility rate fell to 1.15 children per woman in 2024, and the ' +
    'population has fallen every year since 2011. Unemployment stays low at 2.5%, prices rose 2.7% ' +
    'in 2024, and goods trade ran a ¥5.3 trillion deficit. Start with ' +
    '<a href="#/population">Population</a>, <a href="#/economy">Economy</a> or ' +
    '<a href="#/regions">Regions</a> — or search every indicator on the <a href="#/data">Data</a> page.</p>' +
    figureNote('All figures on this page: see Sources for the full list.') +
    '</section>';
};

VIEWS.population = function () {
  const prefRows = JIN.prefectures.map(function (p) {
    return [p.name, p.value.toFixed(1), 'Statistics Bureau, 2024'];
  });
  return '' +
    '<h1>Population</h1>' +
    '<p class="lede">123.8 million people on 1 October 2024 — down 550,000 on the year, the ' +
    '14th straight annual fall. Source: Statistics Bureau.</p>' +
    '<section class="grid-2">' +
    '<article class="card"><h2>Population, 2019–2024</h2>' +
    CHARTS.lineChart(JIN.population, { title: 'Population by year', unit: 'millions', color: '#1f3a5f', decimals: 1 }) +
    figureNote('Total population, 1 October estimates. Source: Statistics Bureau, 2019–2024.') +
    '</article>' +
    '<article class="card"><h2>Who lives here</h2>' +
    CHARTS.donutChart(JIN.ageStructure, { title: 'Age structure', centre: 'of people' }) +
    figureNote('Share of the population by age group. Source: Statistics Bureau, 2024. ' +
    'Almost three in ten people are 65 or older — the highest share of any large country.') +
    '</article></section>' +
    '<section class="card"><h2>Age bands</h2>' +
    CHARTS.hbarChart(JIN.ageBands.map(function (b) { return { label: b.band, value: b.value }; }),
      { title: 'Population by age band', unit: 'Millions of people, 2024', color: '#2e7d6b' }) +
    figureNote('Population by five-year age band, millions. Source: Statistics Bureau, 2024 estimate. ' +
    'The bulges at 45–54 and 70–74 are the post-war baby boomers’ children and the boomers themselves.') +
    '</section>' +
    '<section class="grid-3">' +
    '<article class="stat-box"><p class="stat-num">49.5</p><p>Median age, years (UN WPP 2024)</p></article>' +
    '<article class="stat-box"><p class="stat-num">1.15</p><p>Children per woman, total fertility rate (MHLW, 2024)</p></article>' +
    '<article class="stat-box"><p class="stat-num">720,988</p><p>Births in 2024 — the fewest on record (MHLW)</p></article>' +
    '</section>' +
    '<section class="card"><h2>Largest prefectures</h2>' +
    sortableTable(
      [{ label: 'Prefecture' }, { label: 'Population (millions)', type: 'num' }, { label: 'Source' }],
      prefRows, 'pref-table') +
    figureNote('Click a column heading to sort. Source: Statistics Bureau, 2024 estimates, rounded. ' +
    'Tokyo alone holds about one in nine people in Japan.') +
    '</section>';
};

VIEWS.economy = function () {
  const rows = JIN.gdpNominal.map(function (g, i) {
    return [String(g.year), '$' + g.value.toFixed(2) + 'tr', JIN.gdpGrowth[i].value + '%', 'IMF / Cabinet Office'];
  });
  return '' +
    '<h1>Economy</h1>' +
    '<p class="lede">Nominal GDP was $4.03 trillion in 2024 — the world’s fourth-largest economy — ' +
    'and real GDP shrank 0.1%. Source: IMF World Economic Outlook; Cabinet Office.</p>' +
    '<section class="grid-2">' +
    '<article class="card"><h2>GDP, nominal</h2>' +
    CHARTS.barChart(JIN.gdpNominal, { title: 'Nominal GDP by year', unit: 'US$ trillion', color: '#1f3a5f' }) +
    figureNote('Nominal GDP, US$ trillion. Source: IMF World Economic Outlook, 2019–2024.') +
    '</article>' +
    '<article class="card"><h2>Real growth</h2>' +
    CHARTS.barChart(JIN.gdpGrowth, { title: 'Real GDP growth by year', unit: '% year on year', color: '#2e7d6b' }) +
    figureNote('Real GDP growth, % year on year. Source: Cabinet Office / IMF, 2019–2024. ' +
    'The 2020 fall of 4.2% was the pandemic recession; growth has averaged under 1% a year since.') +
    '</article></section>' +
    '<section class="grid-2">' +
    '<article class="card"><h2>What the economy makes</h2>' +
    CHARTS.donutChart(JIN.gdpSectors, { title: 'GDP by sector', centre: 'of value added' }) +
    figureNote('Share of gross value added. Source: World Bank, World Development Indicators, 2023.') +
    '</article>' +
    '<article class="card"><h2>Year by year</h2>' +
    sortableTable(
      [{ label: 'Year', type: 'num' }, { label: 'Nominal GDP' }, { label: 'Real growth' }, { label: 'Source' }],
      rows, 'gdp-table') +
    figureNote('Click a column heading to sort. Nominal GDP: IMF WEO. Real growth: Cabinet Office.') +
    '</article></section>' +
    '<section class="card"><h2>Reading the numbers</h2>' +
    '<p>Japan’s nominal GDP in dollars fell sharply after 2021, but that is mostly the yen: ' +
    'at ¥151 to the dollar in 2024, each yen of output buys fewer dollars. In yen terms the economy ' +
    'kept growing. Government debt is about 237% of GDP (IMF, 2024) — the highest of any advanced ' +
    'economy — yet almost all of it is held at home, which is why borrowing costs stay low.</p></section>';
};

VIEWS.labour = function () {
  const rows = JIN.unemployment.map(function (u) {
    return [String(u.year), u.value.toFixed(1) + '%', 'Statistics Bureau'];
  });
  return '' +
    '<h1>Labour</h1>' +
    '<p class="lede">67.7 million people in work and unemployment at 2.5% in 2024 — one of the ' +
    'lowest jobless rates in the developed world. Source: Statistics Bureau.</p>' +
    '<section class="grid-2">' +
    '<article class="card"><h2>Unemployment, 2019–2024</h2>' +
    CHARTS.lineChart(JIN.unemployment, { title: 'Unemployment rate by year', unit: '%', color: '#b3402e', decimals: 1 }) +
    figureNote('Unemployment rate, annual average, %. Source: Statistics Bureau, Labour Force Survey, 2019–2024.') +
    '</article>' +
    '<article class="card"><h2>Where people work</h2>' +
    CHARTS.donutChart(JIN.employmentSectors, { title: 'Employment by sector', centre: 'of workers' }) +
    figureNote('Share of employed persons by sector. Source: Statistics Bureau, 2024, approximate.') +
    '</article></section>' +
    '<section class="grid-3">' +
    '<article class="stat-box"><p class="stat-num">67.7m</p><p>Employed persons (Statistics Bureau, 2024)</p></article>' +
    '<article class="stat-box"><p class="stat-num">69.4m</p><p>Labour force, employed plus unemployed (2024)</p></article>' +
    '<article class="stat-box"><p class="stat-num">¥318,000</p><p>Average monthly cash earnings, about (MHLW, 2024)</p></article>' +
    '</section>' +
    '<section class="card"><h2>Unemployment by year</h2>' +
    sortableTable(
      [{ label: 'Year', type: 'num' }, { label: 'Unemployment rate', type: 'num' }, { label: 'Source' }],
      rows, 'unemp-table') +
    figureNote('Click a column heading to sort. Source: Statistics Bureau, Labour Force Survey. ' +
    'The rate barely moved during the pandemic — firms kept workers on reduced hours instead of laying them off.') +
    '</section>';
};

VIEWS.prices = function () {
  const catRows = JIN.cpiCategories.map(function (c) {
    return [c.label, c.value.toFixed(1), 'Statistics Bureau, 2024'];
  });
  return '' +
    '<h1>Prices</h1>' +
    '<p class="lede">Consumer prices rose 2.7% in 2024 — the third straight year above the Bank of ' +
    'Japan’s 2% target, after decades near zero. Source: Statistics Bureau.</p>' +
    '<section class="grid-2">' +
    '<article class="card"><h2>Inflation, 2019–2024</h2>' +
    CHARTS.barChart(JIN.cpi, { title: 'CPI change by year', unit: '% year on year', color: '#c98a2e' }) +
    figureNote('Consumer Price Index, all items, % change year on year. Source: Statistics Bureau, 2019–2024.') +
    '</article>' +
    '<article class="card"><h2>What rose most</h2>' +
    CHARTS.hbarChart(JIN.cpiCategories.slice(1).map(function (c) { return { label: c.label, value: c.value }; }),
      { title: 'CPI index by category', unit: 'Index, 2020 = 100, 2024', color: '#c98a2e' }) +
    figureNote('CPI index by category, 2020 = 100. Source: Statistics Bureau, 2024 annual average. ' +
    'Food prices sit 12.6% above their 2020 level; housing barely moved.') +
    '</article></section>' +
    '<section class="card"><h2>Price index by category</h2>' +
    sortableTable(
      [{ label: 'Category' }, { label: 'Index (2020 = 100)', type: 'num' }, { label: 'Source' }],
      catRows, 'cpi-table') +
    figureNote('Click a column heading to sort. Source: Statistics Bureau, 2024 annual average.') +
    '</section>' +
    '<section class="card"><h2>Reading the numbers</h2>' +
    '<p>Japan spent most of the 2010s fighting deflation: prices fell in 2021. The turnaround came ' +
    'with the weak yen and higher import costs in 2022–2023. Food is the pressure point for households — ' +
    'its index reached 112.6 in 2024 — while housing, the biggest item in the basket, rose only 3.4% ' +
    'over four years.</p></section>';
};

VIEWS.trade = function () {
  const partnerRows = JIN.tradePartners.map(function (p) {
    return [p.name, p.value.toFixed(1) + '%', 'Ministry of Finance, 2024'];
  });
  const balance = JIN.trade.map(function (t) {
    return [String(t.year), '¥' + t.exports.toFixed(1) + 'tr', '¥' + t.imports.toFixed(1) + 'tr',
      '¥' + (t.exports - t.imports).toFixed(1) + 'tr'];
  });
  return '' +
    '<h1>Trade</h1>' +
    '<p class="lede">Japan exported ¥107.9 trillion of goods in 2024 and imported ¥113.2 trillion — ' +
    'a goods deficit of ¥5.3 trillion, the fourth straight year in the red. Source: Ministry of Finance.</p>' +
    '<section class="card"><h2>Exports vs imports</h2>' +
    CHARTS.groupedBarChart(JIN.trade.map(function (t) { return { year: t.year, a: t.exports, b: t.imports }; }),
      { title: 'Trade in goods', unit: '¥ trillion', labelA: 'Exports', labelB: 'Imports' }) +
    figureNote('Trade in goods, ¥ trillion. Source: Ministry of Finance customs data, 2019–2024. ' +
    'Imports jumped in 2022 as energy prices spiked and the yen fell; the gap has narrowed since.') +
    '</section>' +
    '<section class="grid-2">' +
    '<article class="card"><h2>Top export markets</h2>' +
    CHARTS.hbarChart(JIN.tradePartners.slice(0, 6).map(function (p) { return { label: p.name, value: p.value }; }),
      { title: 'Export destinations', unit: 'Share of exports, %, 2024', color: '#1f3a5f' }) +
    figureNote('Share of goods exports, %. Source: Ministry of Finance, 2024. The top two markets — ' +
    'the United States and China — take 38.4% of exports between them.') +
    '</article>' +
    '<article class="card"><h2>All top ten markets</h2>' +
    sortableTable(
      [{ label: 'Destination' }, { label: 'Share of exports', type: 'num' }, { label: 'Source' }],
      partnerRows, 'partner-table') +
    figureNote('Click a column heading to sort. The ten largest destinations take about 81% of exports.') +
    '</article></section>' +
    '<section class="card"><h2>Balance by year</h2>' +
    sortableTable(
      [{ label: 'Year', type: 'num' }, { label: 'Exports' }, { label: 'Imports' }, { label: 'Balance' }],
      balance, 'balance-table') +
    figureNote('Trade in goods, ¥ trillion. Source: Ministry of Finance. Japan last ran a goods surplus in 2020.') +
    '</section>';
};

VIEWS.regions = function () {
  const rows = JIN.regions.map(function (r) {
    return [r.name, r.population.toFixed(1), r.city, r.note];
  });
  return '' +
    '<h1>Regions</h1>' +
    '<p class="lede">Eight regions, one country: Kanto alone holds 44.6 million people — more than ' +
    'a third of Japan — while Shikoku holds 3.8 million. Source: 2020 Census.</p>' +
    '<section class="card"><h2>Population by region</h2>' +
    CHARTS.hbarChart(JIN.regions.map(function (r) { return { label: r.name, value: r.population }; }),
      { title: 'Regional population', unit: 'Millions of people, 2020 Census', color: '#2e7d6b' }) +
    figureNote('Population by region, millions. Source: Statistics Bureau, 2020 Census.') +
    '</section>' +
    '<section class="card"><h2>All regions</h2>' +
    sortableTable(
      [{ label: 'Region' }, { label: 'Population (millions)', type: 'num' }, { label: 'Largest city' }, { label: 'Prefectures' }],
      rows, 'region-table') +
    figureNote('Click a column heading to sort. Population: 2020 Census. ' +
    'Kanto’s population exceeds the next two regions combined.') +
    '</section>' +
    '<section class="card"><h2>Reading the numbers</h2>' +
    '<p>Japan’s population is concentrated along the Pacific coast: the Tokyo–Nagoya–Osaka corridor ' +
    'holds roughly half the country. Rural regions are shrinking fastest — some Tohoku and Shikoku ' +
    'municipalities have lost a fifth of their people since 2000 — while Tokyo kept growing until 2023.</p></section>';
};

VIEWS.data = function () {
  const rows = JIN.indicators.map(function (d) {
    return [d.name, d.value, String(d.year), d.source];
  });
  return '' +
    '<h1>Data explorer</h1>' +
    '<p class="lede">Every headline indicator in one table. Type to filter, click a heading to sort, ' +
    'or download the table as a CSV file.</p>' +
    '<div class="toolbar"><label>Search <input id="data-search" type="search" placeholder="e.g. GDP, population, prices…" aria-label="Search indicators"></label>' +
    '<button class="btn" id="csv-btn" type="button">Download CSV</button></div>' +
    '<section class="card">' +
    sortableTable(
      [{ label: 'Indicator' }, { label: 'Value' }, { label: 'Year', type: 'num' }, { label: 'Source' }],
      rows, 'indicator-table') +
    figureNote(JIN.indicators.length + ' indicators. Every value names its source and year; ' +
    'the full source list is on the Sources page.') +
    '</section>';
};

VIEWS.sources = function () {
  return '' +
    '<h1>Sources &amp; method</h1>' +
    '<p class="lede">Where every figure on this site comes from, and how to read it.</p>' +
    '<section class="card"><h2>Sources</h2><ul class="sources">' +
    JIN.sources.map(function (s) {
      return '<li><strong>' + s.name + '</strong> — ' + s.what + '<br><span>' + s.url + '</span></li>';
    }).join('') + '</ul></section>' +
    '<section class="card"><h2>How the figures were prepared</h2>' +
    '<ul class="method">' +
    '<li>Figures are the latest published annual values available in November 2025, rounded for display.</li>' +
    '<li>Population is the Statistics Bureau’s 1 October estimate; regional populations are the 2020 Census.</li>' +
    '<li>GDP in dollars is the IMF World Economic Outlook; yen trade figures are Ministry of Finance customs data.</li>' +
    '<li>An index of 2020 = 100 means the 2020 average is set to 100; 108.3 is 8.3% above that level.</li>' +
    '<li>Where two sources disagree slightly (for example population estimates), the figure shown is the ' +
    'Statistics Bureau’s, and the source is named next to it.</li>' +
    '</ul></section>' +
    '<section class="card"><h2>About this site</h2>' +
    '<p>Japan in Numbers is an independent, original presentation of Japan’s published national ' +
    'statistics. It is not affiliated with the Statistics Bureau of Japan or any government body. ' +
    'All charts are drawn from the figures on this page; nothing is fetched from the network, so the ' +
    'site works offline once loaded. Figures are estimates as published by their sources — check the ' +
    'source before quoting a figure in print.</p></section>';
};
