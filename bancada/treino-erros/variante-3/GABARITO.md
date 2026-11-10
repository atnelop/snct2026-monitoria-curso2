# Gabarito da variante 3: Aspas não fechadas

> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.

## Onde está a alteração

Arquivo `js/app.js`, linha 4.

## O que aparece na tela

A página abre com título e botões, mas nenhum cartão aparece. Clicar nos botões não faz nada. No VS Code, as cores do texto ficam "estranhas" a partir da linha 4.

Cartões ao abrir: 0. Cartões depois de clicar em cada botão: "Todos" 0, "Reciclaveis" 0, "Vidro" 0, "Eletronicos" 0, "Oleo de Cozinha" 0.

## Mensagem no Console (F12), Chrome/Chromium 153

- Ao abrir: `Uncaught SyntaxError: Invalid or unexpected token` (em `js/app.js:4`)
- Ao clicar em qualquer botão: `Uncaught ReferenceError: filtrarEcopontos is not defined` (em `index.html`)

No Firefox o texto da mensagem é diferente (não capturado aqui). O arquivo e a linha indicados costumam ser os mesmos.

## Causa

Na linha 4 o texto `"Centro` abre aspas e não fecha.

## Como apontar sem tocar no teclado

Mostre a linha que o Console indica e peça para comparar com a linha de cima: "todo texto começa e termina com aspas". As cores do VS Code ajudam a ver onde o texto "vazou".

## Correção

Escrever `bairro: "Centro",`.
