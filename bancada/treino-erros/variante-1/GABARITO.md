# Gabarito da variante 1: Vírgula faltando entre dois locais

> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.

## Onde está a alteração

Arquivo `js/app.js`, linha 8.

## O que aparece na tela

A página abre com título e botões, mas nenhum cartão aparece. Clicar nos botões não faz nada.

Cartões ao abrir: 0. Cartões depois de clicar em cada botão: "Todos" 0, "Reciclaveis" 0, "Vidro" 0, "Eletronicos" 0, "Oleo de Cozinha" 0.

## Mensagem no Console (F12), Chrome/Chromium 153

- Ao abrir: `Uncaught SyntaxError: Unexpected token '{'` (em `js/app.js:9`)
- Ao clicar em qualquer botão: `Uncaught ReferenceError: filtrarEcopontos is not defined` (em `index.html`)

No Firefox o texto da mensagem é diferente (não capturado aqui). O arquivo e a linha indicados costumam ser os mesmos.

## Causa

Falta a vírgula depois do `}` que fecha o primeiro local (linha 8). O Console aponta a linha seguinte (9), onde encontrou um `{` que não esperava.

## Como apontar sem tocar no teclado

Peça para a pessoa olhar o final de cada local do array: "o que separa um local do outro?". Aponte na tela a linha 8 e compare com a linha 15, que tem a vírgula.

## Correção

Escrever `},` na linha 8.
