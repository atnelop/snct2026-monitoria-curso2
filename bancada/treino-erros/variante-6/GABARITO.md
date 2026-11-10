# Gabarito da variante 6: Nome da função errado no onclick

> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.

## Onde está a alteração

Arquivo `index.html`, linha 23.

## O que aparece na tela

A página abre normal, com os 3 cartões. Todos os botões funcionam, menos o "Vidro": ao clicar nele, nada muda.

Cartões ao abrir: 3. Cartões depois de clicar em cada botão: "Todos" 3, "Reciclaveis" 1, "Vidro" 1, "Eletronicos" 1, "Oleo de Cozinha" 0.

## Mensagem no Console (F12), Chrome/Chromium 153

- Ao clicar em "Vidro": `Uncaught ReferenceError: filtrarEcoponto is not defined` (em `index.html:23`)

No Firefox o texto da mensagem é diferente (não capturado aqui). O arquivo e a linha indicados costumam ser os mesmos.

## Causa

O botão "Vidro" chama `filtrarEcoponto` (sem o "s" final). A função se chama `filtrarEcopontos`.

## Como apontar sem tocar no teclado

O erro só aparece depois do clique: peça para deixar o Console aberto e clicar de novo. Mostre o nome que o Console diz não existir e peça para comparar com o botão de cima, letra por letra.

## Correção

Escrever `onclick="filtrarEcopontos('Vidro')"`.
