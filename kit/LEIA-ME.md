# Kit de artes Inviron
- templates.js: 5 modelos (post, carrossel, dado, frase, story).
- render.js: `node render.js --lote linhas.json pasta_saida` gera os PNG (feed 1080x1350, story 1080x1920).
- exemplos.json: exemplo de entrada. Campos por modelo estão comentados em templates.js.
- Requer node + playwright e acesso ao Google Fonts. Logos em ../.
- reels/: motor de Reels. `node reels/render-reel.js cena.html saida.mp4` grava cena HTML (expõe window.seek(t) e window.DURATION) em MP4 1080x1920, 30 fps, sem áudio. Exemplo: reels/estoque-tempo-real.html. Áreas seguras: topo 90, base 400, direita 150, esquerda 60.
