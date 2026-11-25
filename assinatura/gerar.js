// Gera a assinatura de e-mail da Inviron (HTML em tabela, para Gmail) de cada pessoa em pessoas.json.
// Uso: node gerar.js            -> usa as imagens do GitHub (branch main)
//      BASE=./img node gerar.js -> usa as imagens locais (para testar)
const fs = require('fs'), path = require('path');
const BASE = process.env.BASE || 'https://raw.githubusercontent.com/afarineli/inviron-artes/main/assinatura/img';
const L = { linkedin: 'https://www.linkedin.com/company/inviron', instagram: 'https://www.instagram.com/invirontech/', facebook: 'https://www.facebook.com/inviron/', site: 'https://inviron.com.br' };
const digits = s => s.replace(/\D/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const F = "'Space Grotesk',Arial,Helvetica,sans-serif";
const img = (f, w, h, alt) => `<img src="${BASE}/${f}" width="${w}" height="${h}" alt="${alt}" style="display:block;border:0;outline:none;text-decoration:none">`;
const ico = (f, href, alt) => `<td style="padding:0 7px"><a href="${href}" target="_blank" style="text-decoration:none">${img(f, 36, 36, alt)}</a></td>`;
const contato = (f, alt, txt, href) => `<tr><td style="padding:0 10px 0 0;vertical-align:middle">${img(f, 22, 22, alt)}</td><td style="font-family:${F};font-size:15px;font-weight:500;line-height:22px;color:#F5F5F6;padding:4px 0"><a href="${href}" style="color:#F5F5F6;text-decoration:none">${esc(txt)}</a></td></tr>`;
const gerar = p => `<table cellpadding="0" cellspacing="0" border="0" width="580" bgcolor="#141416" style="width:580px;background-color:#141416;border-collapse:separate;border-radius:24px;font-family:${F}">
<tr><td style="padding:28px 32px 20px 32px">
<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td valign="middle" style="padding-right:22px">
<div style="font-family:${F};font-size:21px;font-weight:600;line-height:26px;color:#FFFFFF;white-space:nowrap">${esc(p.nome)}</div>
<div style="font-family:${F};font-size:15px;line-height:22px;color:#F5F5F6;padding-top:3px">${esc(p.cargo)}</div>
<table cellpadding="0" cellspacing="0" border="0"><tr><td width="96" height="2" bgcolor="#F58220" style="width:96px;height:2px;line-height:2px;font-size:2px;background-color:#F58220">&nbsp;</td></tr></table>
<table cellpadding="0" cellspacing="0" border="0" style="margin-top:12px">
${contato('icone-telefone.png', 'Telefone', p.telefone, 'tel:+55' + digits(p.telefone))}
${contato('icone-whatsapp.png', 'WhatsApp', p.whatsapp, 'https://wa.me/55' + digits(p.whatsapp))}
</table></td>
<td width="1" bgcolor="#2D2D31" style="width:1px;background-color:#2D2D31;font-size:1px;line-height:1px">&nbsp;</td>
<td valign="middle" align="center" style="padding:0 24px">${img('estampa-logo.png', 120, 121, 'Inviron: Media, DOOH, Metrics, Programmatic')}</td>
<td valign="middle" align="right">${img('grade.png', 76, 130, '')}</td>
</tr></table></td></tr>
<tr><td style="padding:0 32px"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td height="1" bgcolor="#2D2D31" style="height:1px;line-height:1px;font-size:1px;background-color:#2D2D31">&nbsp;</td></tr></table></td></tr>
<tr><td align="center" style="padding:16px 32px 22px 32px"><table cellpadding="0" cellspacing="0" border="0"><tr>
${ico('icone-linkedin.png', L.linkedin, 'LinkedIn')}${ico('icone-instagram.png', L.instagram, 'Instagram')}${ico('icone-facebook.png', L.facebook, 'Facebook')}${ico('icone-site.png', L.site, 'Site inviron.com.br')}
</tr></table></td></tr>
</table>`;
const pessoas = JSON.parse(fs.readFileSync(path.join(__dirname, 'pessoas.json'), 'utf8'));
fs.mkdirSync(path.join(__dirname, 'saida'), { recursive: true });
for (const p of pessoas) {
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Assinatura ${esc(p.nome)}</title></head><body style="margin:24px;background:#ffffff">\n${gerar(p)}\n</body></html>`;
  fs.writeFileSync(path.join(__dirname, 'saida', p.slug + '.html'), html);
  console.log('ok', p.slug);
}
