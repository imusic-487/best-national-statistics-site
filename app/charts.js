// Japan in Numbers — small SVG chart builders.
// No library: every chart is plain SVG drawn from the figures in data.js,
// so the first load stays tiny and the site works with no network at all.

const CHARTS = {};

function svgOpen(w, h, label) {
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" role="img" aria-label="' + label + '">';
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Vertical bars with a value label on each bar.
CHARTS.barChart = function (series, opts) {
  const w = 560, h = 300, padL = 46, padB = 30, padT = 26;
  const vals = series.map(function (d) { return d.value; });
  const max = Math.max.apply(null, vals) * 1.12;
  const min = Math.min(0, Math.min.apply(null, vals) * 1.12);
  const iw = w - padL - 14, ih = h - padT - padB;
  const bw = iw / series.length;
  const y = function (v) { return padT + ih - ((v - min) / (max - min)) * ih; };
  let s = svgOpen(w, h, opts.title || 'Bar chart');
  s += '<line x1="' + padL + '" y1="' + y(0) + '" x2="' + (w - 14) + '" y2="' + y(0) + '" stroke="#c9cdd6" stroke-width="1"/>';
  s += '<text x="8" y="' + (padT + 4) + '" font-size="11" fill="#5b6472">' + esc(opts.unit || '') + '</text>';
  series.forEach(function (d, i) {
    const x = padL + i * bw + bw * 0.18;
    const bwBar = bw * 0.64;
    const negative = d.value < 0;
    const top = negative ? y(0) : y(d.value);
    const height = Math.abs(y(d.value) - y(0));
    const fill = negative ? '#c0392b' : (opts.color || '#1f3a5f');
    s += '<rect x="' + x.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bwBar.toFixed(1) +
      '" height="' + Math.max(height, 2).toFixed(1) + '" rx="3" fill="' + fill + '"/>';
    s += '<text x="' + (x + bwBar / 2).toFixed(1) + '" y="' + (top - 6).toFixed(1) +
      '" text-anchor="middle" font-size="12" font-weight="600" fill="#1f2937">' + d.value + '</text>';
    s += '<text x="' + (x + bwBar / 2).toFixed(1) + '" y="' + (h - 10) +
      '" text-anchor="middle" font-size="11" fill="#5b6472">' + d.year + '</text>';
  });
  return s + '</svg>';
};

// Line chart with dots and value labels.
CHARTS.lineChart = function (series, opts) {
  const w = 560, h = 300, padL = 52, padB = 30, padT = 26;
  const vals = series.map(function (d) { return d.value; });
  let max = Math.max.apply(null, vals), min = Math.min.apply(null, vals);
  const span = (max - min) || 1;
  max += span * 0.15; min -= span * 0.15;
  const iw = w - padL - 18, ih = h - padT - padB;
  const x = function (i) { return padL + (i / (series.length - 1)) * iw; };
  const y = function (v) { return padT + ih - ((v - min) / (max - min)) * ih; };
  let s = svgOpen(w, h, opts.title || 'Line chart');
  s += '<text x="' + (w - 18) + '" y="14" text-anchor="end" font-size="11" fill="#5b6472">' + esc(opts.unit || '') + '</text>';
  for (let g = 0; g <= 3; g++) {
    const gv = min + ((max - min) * g) / 3;
    s += '<line x1="' + padL + '" y1="' + y(gv).toFixed(1) + '" x2="' + (w - 18) + '" y2="' + y(gv).toFixed(1) +
      '" stroke="#e5e8ee" stroke-width="1"/>';
    s += '<text x="' + (padL - 6) + '" y="' + (y(gv) + 4).toFixed(1) +
      '" text-anchor="end" font-size="11" fill="#5b6472">' + gv.toFixed(opts.decimals == null ? 1 : opts.decimals) + '</text>';
  }
  const pts = series.map(function (d, i) { return x(i).toFixed(1) + ',' + y(d.value).toFixed(1); }).join(' ');
  s += '<polyline points="' + pts + '" fill="none" stroke="' + (opts.color || '#b3402e') +
    '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>';
  series.forEach(function (d, i) {
    s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(d.value).toFixed(1) + '" r="4.5" fill="#fff" stroke="' +
      (opts.color || '#b3402e') + '" stroke-width="2.5"/>';
    s += '<text x="' + x(i).toFixed(1) + '" y="' + (y(d.value) - 10).toFixed(1) +
      '" text-anchor="middle" font-size="12" font-weight="600" fill="#1f2937">' + d.value + '</text>';
    s += '<text x="' + x(i).toFixed(1) + '" y="' + (h - 10) +
      '" text-anchor="middle" font-size="11" fill="#5b6472">' + d.year + '</text>';
  });
  return s + '</svg>';
};

// Donut with a legend beside it.
CHARTS.donutChart = function (parts, opts) {
  const colors = ['#1f3a5f', '#b3402e', '#2e7d6b', '#c98a2e', '#6b5b95'];
  const total = parts.reduce(function (a, p) { return a + p.value; }, 0);
  const cx = 110, cy = 110, r = 82, inner = 52;
  let a0 = -Math.PI / 2, s = svgOpen(440, 220, opts.title || 'Donut chart');
  parts.forEach(function (p, i) {
    const frac = p.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    s += '<path d="M ' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A ' + r + ' ' + r + ' 0 ' + large +
      ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L ' + xi1.toFixed(1) + ' ' + yi1.toFixed(1) +
      ' A ' + inner + ' ' + inner + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ' ' + yi0.toFixed(1) +
      ' Z" fill="' + colors[i % colors.length] + '"/>';
    a0 = a1;
  });
  s += '<text x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle" font-size="20" font-weight="700" fill="#1f2937">' +
    total.toFixed(0) + '%</text>';
  s += '<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" font-size="11" fill="#5b6472">' +
    esc(opts.centre || 'of total') + '</text>';
  parts.forEach(function (p, i) {
    const ly = 42 + i * 34;
    s += '<rect x="228" y="' + (ly - 11) + '" width="12" height="12" rx="3" fill="' + colors[i % colors.length] + '"/>';
    s += '<text x="248" y="' + ly + '" font-size="13" fill="#1f2937">' + esc(p.label) + ' — ' + p.value + '%</text>';
  });
  return s + '</svg>';
};

// Horizontal bars, for ranked lists such as regions or trade partners.
CHARTS.hbarChart = function (items, opts) {
  const rowH = 34, padL = 150, padR = 56, w = 560;
  const h = items.length * rowH + 34;
  const max = Math.max.apply(null, items.map(function (d) { return d.value; }));
  let s = svgOpen(w, h, opts.title || 'Horizontal bar chart');
  s += '<text x="8" y="16" font-size="11" fill="#5b6472">' + esc(opts.unit || '') + '</text>';
  items.forEach(function (d, i) {
    const y = 26 + i * rowH;
    const bw = ((w - padL - padR) * d.value) / max;
    s += '<text x="' + (padL - 8) + '" y="' + (y + 12) + '" text-anchor="end" font-size="12" fill="#1f2937">' + esc(d.label) + '</text>';
    s += '<rect x="' + padL + '" y="' + y + '" width="' + Math.max(bw, 2).toFixed(1) + '" height="18" rx="3" fill="' +
      (opts.color || '#1f3a5f') + '"/>';
    s += '<text x="' + (padL + bw + 8).toFixed(1) + '" y="' + (y + 13) + '" font-size="12" font-weight="600" fill="#1f2937">' + d.value + '</text>';
  });
  return s + '</svg>';
};

// Grouped bars for two series sharing the same years (exports vs imports).
CHARTS.groupedBarChart = function (rows, opts) {
  const w = 560, h = 300, padL = 46, padB = 52, padT = 26;
  const max = Math.max.apply(null, rows.map(function (d) { return Math.max(d.a, d.b); })) * 1.12;
  const iw = w - padL - 14, ih = h - padT - padB;
  const bw = iw / rows.length;
  const y = function (v) { return padT + ih - (v / max) * ih; };
  let s = svgOpen(w, h, opts.title || 'Grouped bar chart');
  s += '<text x="8" y="' + (padT + 4) + '" font-size="11" fill="#5b6472">' + esc(opts.unit || '') + '</text>';
  rows.forEach(function (d, i) {
    const x = padL + i * bw + bw * 0.12;
    const barW = bw * 0.36;
    s += '<rect x="' + x.toFixed(1) + '" y="' + y(d.a).toFixed(1) + '" width="' + barW.toFixed(1) +
      '" height="' + (y(0) - y(d.a)).toFixed(1) + '" rx="3" fill="#1f3a5f"/>';
    s += '<rect x="' + (x + barW + 3).toFixed(1) + '" y="' + y(d.b).toFixed(1) + '" width="' + barW.toFixed(1) +
      '" height="' + (y(0) - y(d.b)).toFixed(1) + '" rx="3" fill="#b3402e"/>';
    s += '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (y(d.a) - 5).toFixed(1) +
      '" text-anchor="middle" font-size="11" font-weight="600" fill="#1f2937">' + d.a + '</text>';
    s += '<text x="' + (x + barW * 1.5 + 3).toFixed(1) + '" y="' + (y(d.b) - 5).toFixed(1) +
      '" text-anchor="middle" font-size="11" font-weight="600" fill="#1f2937">' + d.b + '</text>';    s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (h - 28) + '" text-anchor="middle" font-size="11" fill="#5b6472">' + d.year + '</text>';
  });
  s += '<rect x="' + padL + '" y="' + (h - 14) + '" width="12" height="12" rx="3" fill="#1f3a5f"/>';
  s += '<text x="' + (padL + 18) + '" y="' + (h - 4) + '" font-size="12" fill="#1f2937">' + esc(opts.labelA || 'A') + '</text>';
  s += '<rect x="' + (padL + 130) + '" y="' + (h - 14) + '" width="12" height="12" rx="3" fill="#b3402e"/>';
  s += '<text x="' + (padL + 148) + '" y="' + (h - 4) + '" font-size="12" fill="#1f2937">' + esc(opts.labelB || 'B') + '</text>';
  return s + '</svg>';
};
