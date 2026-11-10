# Gabarito da variante 7: Vírgula sobrando depois do último local (não é erro)

> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.

## Onde está a alteração

Arquivo `js/app.js`, linha 22.

## O que aparece na tela

Nenhum. A página funciona normalmente, com os 3 cartões e todos os filtros (o "Oleo de Cozinha" fica vazio, como no kit original).

Cartões ao abrir: 3. Cartões depois de clicar em cada botão: "Todos" 3, "Reciclaveis" 1, "Vidro" 1, "Eletronicos" 1, "Oleo de Cozinha" 0.

## Mensagem no Console (F12), Chrome/Chromium 153

Nenhuma. O Console fica limpo.

## Causa

Não há erro. O JavaScript aceita uma vírgula depois do último item de uma lista.

## Como apontar sem tocar no teclado

Se a pessoa perguntar se a vírgula da linha 22 está errada, diga que não: pode ficar. O problema é a vírgula que FALTA entre dois locais, não a que sobra no final.

## Correção

Nenhuma. Não peça para apagar: o monitor que "corrige" isso perde tempo e confunde o participante.
