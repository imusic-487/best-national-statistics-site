// Japan in Numbers — router and page wiring.
// Hash routes: #/overview, #/population, #/economy, #/labour, #/prices,
// #/trade, #/regions, #/data, #/sources. After each render, wire up the
// controls on that page: sortable tables, the data search box, CSV download.

const ROUTES = {
  '': 'overview', overview: 'overview', population: 'population',
  economy: 'economy', labour: 'labour', prices: 'prices',
  trade: 'trade', regions: 'regions', data: 'data', sources: 'sources',
};

const NAV_LABELS = {
  overview: 'Overview', population: 'Population', economy: 'Economy',
  labour: 'Labour', prices: 'Prices', trade: 'Trade',
  regions: 'Regions', data: 'Data', sources: 'Sources',
};

function routeName() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return ROUTES[hash] || 'overview';
}

function render() {
  const name = routeName();
  const view = document.getElementById('view');
  view.innerHTML = VIEWS[name]();
  document.querySelectorAll('#site-nav a').forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('data-route') === name);
    if (a.getAttribute('data-route') === name) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.title = NAV_LABELS[name] + ' — Japan in Numbers';
  wireTables(view);
  wireDataPage(view);
  window.scrollTo(0, 0);
}

// Click a column heading to sort that table, ascending then descending.
// Numeric columns sort numerically, the rest alphabetically.
function wireTables(root) {
  root.querySelectorAll('table.data-table').forEach(function (table) {
    table.querySelectorAll('th[data-sort]').forEach(function (th) {
      th.addEventListener('click', function () {
        const col = Number(th.getAttribute('data-sort'));
        const numeric = th.getAttribute('data-type') === 'num';
        const body = table.querySelector('tbody');
        const rows = Array.from(body.querySelectorAll('tr'));
        const ascending = th.getAttribute('data-dir') !== 'asc';
        table.querySelectorAll('th').forEach(function (h) { h.removeAttribute('data-dir'); });
        th.setAttribute('data-dir', ascending ? 'asc' : 'desc');
        rows.sort(function (a, b) {
          const av = a.children[col].textContent.trim();
          const bv = b.children[col].textContent.trim();
          if (numeric) {
            return (parseFloat(av.replace(/[^0-9.\-]/g, '')) - parseFloat(bv.replace(/[^0-9.\-]/g, ''))) * (ascending ? 1 : -1);
          }
          return av.localeCompare(bv) * (ascending ? 1 : -1);
        });
        rows.forEach(function (r) { body.appendChild(r); });
      });
    });
  });
}

// Data page: live search filter over the indicator table, plus CSV download.
function wireDataPage(root) {
  const search = root.querySelector('#data-search');
  if (search) {
    search.addEventListener('input', function () {
      const q = search.value.trim().toLowerCase();
      root.querySelectorAll('#indicator-table tbody tr').forEach(function (tr) {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
  const btn = root.querySelector('#csv-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      const lines = [['Indicator', 'Value', 'Year', 'Source']];
      JIN.indicators.forEach(function (d) {
        lines.push([d.name, d.value, String(d.year), d.source]);
      });
      const csv = lines.map(function (row) {
        return row.map(function (c) { return '"' + c.replace(/"/g, '""') + '"'; }).join(',');
      }).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'japan-indicators.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      btn.textContent = 'Downloaded ✓';
      setTimeout(function () { btn.textContent = 'Download CSV'; }, 2000);
    });
  }
}

window.addEventListener('hashchange', render);
render();
