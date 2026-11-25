// Modelo da assinatura Inviron (tabela HTML para Gmail). Usado por gerar.js e pelo widget do site.
(function (root) {
  var L = { linkedin: 'https://www.linkedin.com/company/inviron', instagram: 'https://www.instagram.com/invirontech/', facebook: 'https://www.facebook.com/inviron/', site: 'https://inviron.com.br' };
  var F = "Verdana,Geneva,Arial,sans-serif";
  function digits(s) { return String(s).replace(/\D/g, ''); }
  function formatarTelefone(s) {
    var d = digits(s);
    if ((d.length === 12 || d.length === 13) && d.indexOf('55') === 0) d = d.slice(2);
    if (d.length === 11) return d.slice(0, 2) + ' ' + d.slice(2, 7) + '-' + d.slice(7);
    if (d.length === 10) return d.slice(0, 2) + ' ' + d.slice(2, 6) + '-' + d.slice(6);
    return String(s).trim();
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function gerarAssinaturaBase(p, BASE) {
    var img = function (f, w, h, alt) { return '<img src="' + BASE + '/' + f + '" width="' + w + '" height="' + h + '" alt="' + alt + '" style="display:block;border:0;outline:none;text-decoration:none">'; };
    var ico = function (f, href, alt) { return '<td style="padding:0 7px"><a href="' + href + '" target="_blank" style="text-decoration:none">' + img(f, 36, 36, alt) + '</a></td>'; };
    var contato = function (f, alt, txt, href) { return '<tr><td style="padding:0 10px 0 0;vertical-align:middle"><a href="' + href + '" target="_blank" style="text-decoration:none">' + img(f, 22, 22, alt) + '</a></td><td style="font-family:' + F + ';font-size:15px;font-weight:500;line-height:22px;color:#F5F5F6;padding:4px 0"><a href="' + href + '" target="_blank" style="color:#F5F5F6;text-decoration:none">' + esc(txt) + '</a></td></tr>'; };
    var nome = p.email ? '<a href="mailto:' + esc(p.email) + '" style="color:#FFFFFF;text-decoration:none">' + esc(p.nome) + '</a>' : esc(p.nome);
    return '<table cellpadding="0" cellspacing="0" border="0" width="580" bgcolor="#141416" style="width:580px;background-color:#141416;background-image:url(' + BASE + '/fundo.png);border-collapse:separate;border-radius:24px;font-family:' + F + '">' +
'<tr><td style="padding:28px 32px 20px 32px"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>' +
'<td valign="middle" style="padding-right:22px">' +
'<table cellpadding="0" cellspacing="0" border="0"><tr><td>' +
'<div style="font-family:' + F + ';font-size:21px;font-weight:600;line-height:26px;color:#FFFFFF;white-space:nowrap">' + nome + '</div>' +
'<div style="font-family:' + F + ';font-size:15px;line-height:22px;color:#F5F5F6;padding-top:3px">' + esc(String(p.cargo||'').trim().replace(/^./,function (c) { return c.toUpperCase(); })) + '</div>' +
'<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td height="12" style="height:12px;line-height:12px;font-size:12px">&nbsp;</td></tr><tr><td height="2" bgcolor="#F58220" style="height:2px;line-height:2px;font-size:2px;background-color:#F58220;background-image:url(' + BASE + '/linha.png)">&nbsp;</td></tr><tr><td height="8" style="height:8px;line-height:8px;font-size:8px">&nbsp;</td></tr></table>' +
'</td></tr></table>' +
'<table cellpadding="0" cellspacing="0" border="0">' +
contato('icone-telefone.png', 'Telefone', formatarTelefone(p.telefone), 'tel:+55' + digits(p.telefone)) +
contato('icone-whatsapp.png', 'WhatsApp', formatarTelefone(p.whatsapp), 'https://wa.me/55' + digits(p.whatsapp)) +
'</table></td>' +
'<td width="1" bgcolor="#2D2D31" style="width:1px;font-size:1px;line-height:1px;background-color:#2D2D31;background-image:url(' + BASE + '/divisor.png)">&nbsp;</td>' +
'<td valign="middle" align="center" style="padding:0 24px">' + img('estampa-logo.png', 120, 121, 'Inviron: Media, DOOH, Metrics, Programmatic') + '</td>' +
'<td valign="middle" align="right">' + img('grade.png', 76, 130, '') + '</td>' +
'</tr></table></td></tr>' +
'<tr><td style="padding:0 32px"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td height="1" bgcolor="#2D2D31" style="height:1px;line-height:1px;font-size:1px;background-color:#2D2D31;background-image:url(' + BASE + '/divisor.png)">&nbsp;</td></tr></table></td></tr>' +
'<tr><td align="center" style="padding:16px 32px 22px 32px"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
ico('icone-linkedin.png', L.linkedin, 'LinkedIn') + ico('icone-instagram.png', L.instagram, 'Instagram') + ico('icone-facebook.png', L.facebook, 'Facebook') + ico('icone-site.png', L.site, 'Site inviron.com.br') +
'</tr></table></td></tr></table>';
  }
  // Reduz a assinatura inteira na mesma proporcao (tamanho final: 464 px de largura).
  var ESCALA = 0.8;
  function gerarAssinatura(p, BASE) {
    var k = function (n) { return Math.max(1, Math.round(n * ESCALA)); };
    return gerarAssinaturaBase(p, BASE)
      .replace(/(width|height)="(\d+)"/g, function (m, a, n) { return a + '="' + k(+n) + '"'; })
      .replace(/(\d+)px/g, function (m, n) { return k(+n) + 'px'; });
  }
  if (typeof module !== 'undefined') module.exports = { gerarAssinatura: gerarAssinatura }; else root.gerarAssinatura = gerarAssinatura;
})(this);
