// Uso: node render.js linha.json saida.png   (linha.json = {template, dados})
// ou:  node render.js --lote lote.json pasta_saida
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { T, SIZES } = require('./templates');
async function renderMany(jobs) {
  const b = await chromium.launch();
  for (const [spec, out] of jobs) {
    const [w, h] = SIZES[spec.template === 'story' ? 'story' : 'feed'];
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(T[spec.template](spec.dados), { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: out });
    await p.close();
    console.log('ok', out);
  }
  await b.close();
}
module.exports = { renderMany };
if (require.main === module) {
  const [a, b2, c] = process.argv.slice(2);
  if (a === '--lote') {
    const lote = JSON.parse(fs.readFileSync(b2)); fs.mkdirSync(c, { recursive: true });
    renderMany(lote.map((s, i) => [s, path.join(c, `${String(i + 1).padStart(2, '0')}-${s.template}.png`)]));
  } else renderMany([[JSON.parse(fs.readFileSync(a)), b2]]);
}
