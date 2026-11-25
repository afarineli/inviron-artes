// Gera a assinatura de e-mail da Inviron de cada pessoa em pessoas.json.
// Uso: node gerar.js            -> usa as imagens do GitHub (branch main)
//      BASE=../img node gerar.js -> usa as imagens locais (para testar)
const fs = require('fs'), path = require('path');
const { gerarAssinatura } = require('./modelo.js');
const BASE = process.env.BASE || 'https://raw.githubusercontent.com/afarineli/inviron-artes/main/assinatura/img';
const pessoas = JSON.parse(fs.readFileSync(path.join(__dirname, 'pessoas.json'), 'utf8'));
fs.mkdirSync(path.join(__dirname, 'saida'), { recursive: true });
for (const p of pessoas) {
  const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Assinatura ' + p.nome + '</title></head><body style="margin:24px;background:#ffffff">\n' + gerarAssinatura(p, BASE) + '\n</body></html>';
  fs.writeFileSync(path.join(__dirname, 'saida', p.slug + '.html'), html);
  console.log('ok', p.slug);
}
