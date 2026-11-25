# Japan in Numbers — National Statistics

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/imusic-487/best-national-statistics-site/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/imusic-487/best-national-statistics-site/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

An entry for the [make.fun best national statistics site bounty](https://make.fun/c/best-national-statistics-site-20261126-0539).

Japan in Numbers presents Japan's national statistics — population, economy, labour, prices, trade and regions — as a fast, working website. Every figure names its source and year. It is a static site with no build step and no network request: open `app/index.html` through any static server and it works on a desktop and on a phone, offline.

## What it covers

- **Overview** — headline indicators (population, GDP, unemployment, prices, life expectancy), GDP and population charts, latest releases
- **Population** — population trend, age structure, age bands, largest prefectures
- **Economy** — nominal GDP, real growth, GDP by sector, year-by-year table
- **Labour** — unemployment trend, employment by sector, earnings
- **Prices** — CPI trend and price index by category (2020 = 100)
- **Trade** — exports vs imports, top export markets, balance by year
- **Regions** — the eight regions, population and largest city
- **Data** — every indicator in one searchable, sortable table with CSV download
- **Sources** — where every figure comes from and how to read it

Charts are hand-drawn SVG (no library, no framework), tables sort by clicking a heading, and the whole site is split into files with one job each: `app/data.js` holds the figures, `app/charts.js` draws the charts, `app/views.js` renders the pages, `app/main.js` routes and wires the controls.

## Run it

```sh
node serve.ts
# then open http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.

## License

MIT — see [LICENSE](LICENSE).
