# Gabarito da variante 2: Chave } não fechada no último local

> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.

## Onde está a alteração

Arquivo `js/app.js`, linha 22.

## O que aparece na tela

A página abre com título e botões, mas nenhum cartão aparece. Clicar nos botões não faz nada.

Cartões ao abrir: 0. Cartões depois de clicar em cada botão: "Todos" 0, "Reciclaveis" 0, "Vidro" 0, "Eletronicos" 0, "Oleo de Cozinha" 0.

## Mensagem no Console (F12), Chrome/Chromium 153

- Ao abrir: `Uncaught SyntaxError: Unexpected token ']'` (em `js/app.js:22`)
- Ao clicar em qualquer botão: `Uncaught ReferenceError: filtrarEcopontos is not defined` (em `index.html`)

No Firefox o texto da mensagem é diferente (não capturado aqui). O arquivo e a linha indicados costumam ser os mesmos.

## Causa

O último local abre com `{` (linha 16) e nunca fecha: falta o `}` antes do `];`.

## Como apontar sem tocar no teclado

Peça para contar as chaves do último local: "toda chave que abre precisa fechar". Aponte o `{` da linha 16 e pergunte onde ele termina.

## Correção

Acrescentar uma linha com `}` antes do `];`.
