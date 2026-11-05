// Kit de artes Inviron. Cada template devolve HTML completo para o tamanho pedido.
const fs = require('fs');
const path = require('path');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, '..', 'inviron-logo-white.png')).toString('base64');

const SIZES = { feed: [1080, 1350], story: [1080, 1920] };
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const CSS = (w, h, safe) => `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
:root{--orange:#F58220;--black:#0A0A0B;--n50:#F5F5F6;--n300:#9D9EA3;--n500:#55565C;--n700:#29292D;--n800:#1C1C1F;--n900:#141416;--card:#1A1A1D;--hair:rgba(255,255,255,.12);--info:#06B6D4;--ok:#10B981;--sec:#8B5CF6}
*{box-sizing:border-box;margin:0}
html,body{width:${w}px;height:${h}px;background:radial-gradient(ellipse 70% 40% at 85% 105%,rgba(245,130,32,.18),transparent 70%),var(--n900);color:var(--n50);font-family:'Inter',sans-serif;overflow:hidden}
.art{width:${w}px;height:${h}px;display:flex;flex-direction:column;padding:${safe.t}px ${safe.r}px ${safe.b}px ${safe.l}px;gap:48px}
.top{display:flex;justify-content:space-between;align-items:center}
.logo{height:46px}
.eyebrow{font:600 24px/1.3 'Inter';letter-spacing:.06em;text-transform:uppercase;color:var(--orange)}
.idx{font:500 24px 'JetBrains Mono';color:var(--n300)}
h1{font:700 84px/1.04 'Space Grotesk';letter-spacing:-.01em}
h1 em{font-style:normal;color:var(--orange)}
.sub{font:400 36px/1.45 'Inter';color:var(--n300)}
.swipe{position:fixed;right:24px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:18px}.swipe-btn{width:124px;height:124px;border-radius:50%;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center}.swipe-btn svg{width:64px;height:28px}.swipe-txt{font:600 20px Inter;letter-spacing:.2em;text-transform:uppercase;color:var(--orange);padding-left:.2em}
.pill{align-self:flex-start;display:inline-flex;gap:10px;align-items:center;font:600 22px Inter;letter-spacing:.06em;text-transform:uppercase;color:var(--n50);border:1px solid var(--hair);background:rgba(255,255,255,.06);border-radius:999px;padding:10px 20px}.pill::before{content:'';width:10px;height:10px;border-radius:50%;background:var(--orange)}.frame{flex:1;min-height:0;width:100%;border:1px solid var(--hair);border-radius:14px;background:var(--card);padding:14px;display:flex}.frame img{width:100%;height:100%;object-fit:contain;border-radius:8px}
.card{background:var(--card);border:1px solid var(--hair);border-radius:14px}
.grow{flex:1;min-height:0;display:flex}
.cta{display:flex;justify-content:space-between;align-items:center;font:600 30px 'Space Grotesk';border-top:1px solid var(--hair);padding-top:32px}
.cta b{color:var(--orange);font-weight:600}
.screens{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:1fr;gap:20px;width:100%}
.scr{background:var(--card);border:1px solid var(--hair);border-radius:10px;position:relative}
.scr::after{content:'';position:absolute;left:14px;right:14px;bottom:14px;height:6px;border-radius:3px;background:var(--n700)}
.scr.on{border-color:var(--orange);background:rgba(245,130,32,.14)}
.scr.on::after{background:var(--orange)}
.scr.ok::after{background:var(--ok)}
.list{display:flex;flex-direction:column;gap:20px;width:100%}.list .item{flex:1;align-items:center}
.item{display:flex;gap:28px;align-items:flex-start;padding:30px 34px;font:400 36px/1.35 'Inter'}
.item i{font:500 28px 'JetBrains Mono';font-style:normal;color:var(--orange);padding-top:4px}
.item b{font:600 38px 'Space Grotesk';display:block;color:var(--n50);margin-bottom:6px}
.big{font:700 280px/1 'Space Grotesk';color:var(--orange);letter-spacing:-.03em}
.quote{font:700 92px/1.08 'Space Grotesk'}
`;

const header = (d, idx) => `<div class="top"><img class="logo" src="${LOGO}"><span class="idx">${esc(idx ?? '')}</span></div>`;
const footer = () => ''; // sem CTA e sem site na arte: a chamada vai na legenda
const screens = (n = 12, on = [1, 6, 10]) =>
  `<div class="grow"><div class="screens">${Array.from({ length: n }, (_, i) => `<div class="scr ${on.includes(i) ? 'on' : ''}"></div>`).join('')}</div></div>`;
const swipe = `<div class="swipe"><span class="swipe-btn"><svg viewBox="0 0 64 28" fill="none" stroke="#F58220" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 14h58M48 3l12 11-12 11"/></svg></span><span class="swipe-txt">Arraste</span></div>`;
const wrap = (kind, body, d) => {
  const [w, h] = SIZES[kind === 'story' ? 'story' : 'feed'];
  const safe = kind === 'story' ? { t: 120, r: 150, b: 400, l: 80 } : { t: 80, r: d && d.deslize ? 176 : 80, b: 80, l: 80 };
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS(w, h, safe)}</style></head><body><div class="art">${body}</div>${d && d.deslize ? swipe : ''}</body></html>`;
};

const T = {
  // d: {titulo, destaque?, subtitulo
  post: d => wrap('feed', `${header(d)}${d.data ? `<span class="pill">${esc(d.data)}</span>` : ''}<div><h1>${esc(d.titulo)} <em>${esc(d.destaque || '')}</em></h1></div><p class="sub">${esc(d.subtitulo)}</p>${d.print ? `<div class="frame"><img src="${d.print}"></div>` : screens()}${footer(d)}`, d),
  // d: {titulo, itens:[{t,d}], indice:'02/05'
  carrossel: d => wrap('feed', `${header(d, d.indice)}<div><h1 style="font-size:76px">${esc(d.titulo)}</h1></div><div class="grow"><div class="list">${(d.itens || []).map((it, i) => `<div class="card item"><i>0${i + 1}</i><div><b>${esc(it.t)}</b>${esc(it.d)}</div></div>`).join('')}</div></div>${footer(d)}`, d),
  // d: {titulo, indice, numero, rotulo}  capa de carrossel com contador
  capa: d => wrap('feed', `${header(d, d.indice)}<div class="grow" style="flex-direction:column;justify-content:space-between;gap:24px;padding-top:80px"><h1 style="font-size:80px">${esc(d.titulo)}</h1><div style="display:flex;flex-direction:column;gap:0"><span class="big" style="font-size:520px;line-height:.82;letter-spacing:-.05em">${esc(d.numero)}</span><span style="font:700 60px/1.1 'Space Grotesk';margin-top:28px">${esc(d.rotulo)}</span></div></div>`, d),
  // d: {numero, unidade, legenda
  dado: d => wrap('feed', `${header(d)}<div class="grow" style="flex-direction:column;justify-content:center;gap:24px"><div class="big">${esc(d.numero)}</div><h1 style="font-size:64px">${esc(d.unidade)}</h1><p class="sub">${esc(d.legenda)}</p></div>${footer(d)}`, d),
  // d: {frase, destaque?
  frase: d => wrap('feed', `${header(d)}<div class="grow" style="flex-direction:column;justify-content:center;gap:40px"><div class="quote">${esc(d.frase)} <span style="color:var(--orange)">${esc(d.destaque || '')}</span></div></div>${footer(d)}`, d),
  // d: {titulo, subtitulo}; respeita zonas mortas de story/Reels
  story: d => wrap('story', `${header(d)}<div><h1 style="">${esc(d.titulo)}</h1></div><p class="sub">${esc(d.subtitulo)}</p>${screens(16, [2, 9, 12])}`, d),
};
module.exports = { T, SIZES };
