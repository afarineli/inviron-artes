// Motor de Reels Inviron: grava uma cena HTML (que expõe window.seek(t) e window.DURATION) em MP4 1080x1920, 30 fps, sem áudio.
// Uso: node render-reel.js cena.html saida.mp4 [--frames pasta] [--poster t1,t2,...]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
(async () => {
  const [scene, out] = process.argv.slice(2, 4);
  const arg = n => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
  const dir = arg('--frames') || fs.mkdtempSync(path.join(require('os').tmpdir(), 'reel-'));
  fs.mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.resolve(scene));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const dur = await page.evaluate(() => window.DURATION);
  const fps = 30, n = Math.round(dur * fps);
  const posters = (arg('--poster') || '').split(',').filter(Boolean).map(Number);
  for (const t of posters) { await page.evaluate(t => seek(t), t); await page.screenshot({ path: path.join(dir, `poster-${t}.png`) }); }
  for (let i = 0; i < n; i++) {
    await page.evaluate(t => seek(t), i / fps);
    await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.png`) });
  }
  await browser.close();
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(dir, 'f%04d.png'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-movflags', '+faststart', '-an', out]);
  console.log('ok', out, n + ' quadros', dur + 's');
})();
