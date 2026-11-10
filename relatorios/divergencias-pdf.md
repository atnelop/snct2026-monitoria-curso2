# Divergências entre o Starter Kit e o PDF da Frente 2

Gerado por `ferramentas/testes-kit/comparar-pdf.js`. Não editar à mão.

- Kit comparado: `vendor/starter-kit`
- Referência: Roteiro Prático SNCT 02, Passos 2.5, 2.6 e 2.7 (páginas 7 a 9)
- Recuo e linhas em branco não contam como divergência.
- No CSS, cada declaração é comparada separadamente, porque o PDF junta várias na mesma linha.

**Total: 3 linha(s) divergente(s).**

## `index.html` (Passo 2.5)

Conteúdo igual ao PDF.

Formatação (não conta como divergência): recuo de 4 espaços no repo (o PDF usa 2); 33 linhas no repo e 33 no PDF; o arquivo do repo não termina com quebra de linha.

## `js/app.js` (Passo 2.6)

3 linha(s) divergente(s):

| Onde | Linha | Conteúdo |
| --- | --- | --- |
| Só no PDF | 1 | `// BLOCO 2: Adicione novos ecopontos ou pontos de entrega voluntaria de Garopaba` |
| Só no repo | 21 | `mapaUrl: "https://maps.app.goo.gl/r5PxGL6jaeWf9rwJ7"` |
| Só no PDF | 22 | `mapaUrl: "https://maps.google.com/?q=Praia+da+Ferrugem+Garopaba"` |

Formatação (não conta como divergência): recuo de 4 espaços no repo (o PDF usa 2); 40 linhas no repo e 44 no PDF; o arquivo do repo não termina com quebra de linha.

## `css/estilo.css` (Passo 2.7)

Conteúdo igual ao PDF.

Formatação (não conta como divergência): recuo de 4 espaços no repo (o PDF usa 2); 86 linhas no repo e 25 no PDF; o arquivo do repo não termina com quebra de linha.
