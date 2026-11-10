# Gabarito da variante 4: Categoria escrita diferente do botão ("Óleo" x "Oleo")

> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.

## Onde está a alteração

Arquivo `js/app.js`, linha 19.

## O que aparece na tela

Os 3 cartões aparecem em "Todos", e o terceiro mostra a etiqueta "Óleo". Mas o botão "Oleo de Cozinha" mostra a grade vazia (o botão "Vidro" também).

Cartões ao abrir: 3. Cartões depois de clicar em cada botão: "Todos" 3, "Reciclaveis" 1, "Vidro" 0, "Eletronicos" 1, "Oleo de Cozinha" 0.

## Mensagem no Console (F12), Chrome/Chromium 153

Nenhuma. O Console fica limpo.

## Causa

O botão envia `Oleo` (sem acento) e o local foi cadastrado como `Óleo` (com acento). Para o computador são textos diferentes; o mesmo vale para maiúsculas e minúsculas.

## Como apontar sem tocar no teclado

Não há erro no Console: diga isso à pessoa, para ela não procurar no lugar errado. Peça para ler em voz alta, letra por letra, o texto dentro do `onclick` do botão (index.html, linha 25) e a `categoria` do local (js/app.js, linha 19).

## Correção

Deixar os dois textos idênticos: `categoria: "Oleo"`.
