# Gabarito da variante 8: Endereço do mapa sem https://

> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.

## Onde está a alteração

Arquivo `js/app.js`, linha 14.

## O que aparece na tela

A página funciona normalmente. Mas, ao clicar em "Abrir localizacao no Google Maps" no cartão do Ponto Verde IFSC, abre uma aba com "arquivo não encontrado" (ou, no site publicado, uma página 404).

Cartões ao abrir: 3. Cartões depois de clicar em cada botão: "Todos" 3, "Reciclaveis" 1, "Vidro" 1, "Eletronicos" 1, "Oleo de Cozinha" 0.

## Mensagem no Console (F12), Chrome/Chromium 153

Nenhuma. O Console fica limpo.

O link do cartão aponta para `file:///.../maps.google.com/?q=IFSC+Garopaba` em vez do Google Maps.

## Causa

Sem `https://` no começo, o navegador acha que `maps.google.com/...` é o nome de uma pasta dentro do projeto.

## Como apontar sem tocar no teclado

Não há erro no Console da página. Peça para a pessoa olhar a barra de endereço da aba que abriu: o endereço começa com `file://` (ou com o endereço do próprio site), e não com `https://maps...`. Depois, peça para comparar a linha 14 com a linha 7.

## Correção

Escrever `mapaUrl: "https://maps.google.com/?q=IFSC+Garopaba"`.
