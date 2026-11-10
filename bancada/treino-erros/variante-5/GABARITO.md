# Gabarito da variante 5: Caminho errado no <script src>

> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.

## Onde está a alteração

Arquivo `index.html`, linha 30.

## O que aparece na tela

A página abre com título e botões, mas nenhum cartão aparece. Clicar nos botões não faz nada.

Cartões ao abrir: 0. Cartões depois de clicar em cada botão: "Todos" 0, "Reciclaveis" 0, "Vidro" 0, "Eletronicos" 0, "Oleo de Cozinha" 0.

## Mensagem no Console (F12), Chrome/Chromium 153

- Ao abrir: `Failed to load resource: net::ERR_FILE_NOT_FOUND` (em `app.js`)
- Ao clicar em qualquer botão: `Uncaught ReferenceError: filtrarEcopontos is not defined` (em `index.html`)

Com o Live Server (em vez de dois cliques), a mensagem muda para `Failed to load resource: the server responded with a status of 404 (Not Found)`.

No Firefox o texto da mensagem é diferente (não capturado aqui). O arquivo e a linha indicados costumam ser os mesmos.

## Causa

O `index.html` procura `app.js` ao lado dele, mas o arquivo está dentro da pasta `js`.

## Como apontar sem tocar no teclado

Mostre no Console o nome do arquivo que não foi encontrado e peça para a pessoa achar esse arquivo no painel de pastas do VS Code: "em que pasta ele está?".

## Correção

Escrever `<script src="js/app.js"></script>`.
