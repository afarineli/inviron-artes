# Assinatura de e-mail Inviron

- `pessoas.json`: uma linha por pessoa (slug, nome, cargo, telefone, whatsapp).
- `node gerar.js`: gera `saida/<slug>.html` (tabela HTML, imagens em `img/` hospedadas no GitHub, branch main).
- `BASE=../img node gerar.js`: gera com imagens locais, só para testar.
- Instalar no Gmail: abrir `saida/<slug>.html` no navegador, selecionar a assinatura, copiar, e colar em Configurações > Ver todas as configurações > Assinatura. As imagens só aparecem depois que este conteúdo estiver na branch main.
- Fonte do texto: Space Grotesk, com Arial como reserva (o Gmail não carrega fontes da web). A estampa MEDIA&/DOOH& e o logo são imagem.
