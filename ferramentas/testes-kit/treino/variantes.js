// Definicao das 8 variantes de treino (Fase 4 do PLANO.md).
// Cada variante e uma copia do Starter Kit com UMA alteracao.
//
// troca:    arquivo + texto original + texto novo (o original precisa existir 1 vez)
// esperado: o que o Console do Chrome deve mostrar; escrito a mao e conferido
//           pelo gerador e pelo teste treino.spec.js. Lista vazia = sem erro.
module.exports = [
  {
    id: 1,
    titulo: 'Vírgula faltando entre dois locais',
    troca: {
      arquivo: 'js/app.js',
      de: '    },\n    {\n        nome: "Ponto Verde IFSC Campus Garopaba",',
      para: '    }\n    {\n        nome: "Ponto Verde IFSC Campus Garopaba",',
    },
    linhaDoErro: 8,
    sintoma: 'A página abre com título e botões, mas nenhum cartão aparece. Clicar nos botões não faz nada.',
    esperado: [
      { quando: 'ao abrir', mensagem: "Uncaught SyntaxError: Unexpected token '{'", arquivo: 'js/app.js', linha: 9 },
      { quando: 'ao clicar em qualquer botão', mensagem: 'Uncaught ReferenceError: filtrarEcopontos is not defined', arquivo: 'index.html' },
    ],
    causa: 'Falta a vírgula depois do `}` que fecha o primeiro local (linha 8). O Console aponta a linha seguinte (9), onde encontrou um `{` que não esperava.',
    comoApontar: 'Peça para a pessoa olhar o final de cada local do array: "o que separa um local do outro?". Aponte na tela a linha 8 e compare com a linha 15, que tem a vírgula.',
    correcao: 'Escrever `},` na linha 8.',
  },
  {
    id: 2,
    titulo: 'Chave } não fechada no último local',
    troca: {
      arquivo: 'js/app.js',
      de: '        mapaUrl: "https://maps.app.goo.gl/r5PxGL6jaeWf9rwJ7"\n    }\n];',
      para: '        mapaUrl: "https://maps.app.goo.gl/r5PxGL6jaeWf9rwJ7"\n];',
    },
    linhaDoErro: 22,
    sintoma: 'A página abre com título e botões, mas nenhum cartão aparece. Clicar nos botões não faz nada.',
    esperado: [
      { quando: 'ao abrir', mensagem: "Uncaught SyntaxError: Unexpected token ']'", arquivo: 'js/app.js', linha: 22 },
      { quando: 'ao clicar em qualquer botão', mensagem: 'Uncaught ReferenceError: filtrarEcopontos is not defined', arquivo: 'index.html' },
    ],
    causa: 'O último local abre com `{` (linha 16) e nunca fecha: falta o `}` antes do `];`.',
    comoApontar: 'Peça para contar as chaves do último local: "toda chave que abre precisa fechar". Aponte o `{` da linha 16 e pergunte onde ele termina.',
    correcao: 'Acrescentar uma linha com `}` antes do `];`.',
  },
  {
    id: 3,
    titulo: 'Aspas não fechadas',
    troca: { arquivo: 'js/app.js', de: 'bairro: "Centro",', para: 'bairro: "Centro,' },
    linhaDoErro: 4,
    sintoma: 'A página abre com título e botões, mas nenhum cartão aparece. Clicar nos botões não faz nada. No VS Code, as cores do texto ficam "estranhas" a partir da linha 4.',
    esperado: [
      { quando: 'ao abrir', mensagem: 'Uncaught SyntaxError: Invalid or unexpected token', arquivo: 'js/app.js', linha: 4 },
      { quando: 'ao clicar em qualquer botão', mensagem: 'Uncaught ReferenceError: filtrarEcopontos is not defined', arquivo: 'index.html' },
    ],
    causa: 'Na linha 4 o texto `"Centro` abre aspas e não fecha.',
    comoApontar: 'Mostre a linha que o Console indica e peça para comparar com a linha de cima: "todo texto começa e termina com aspas". As cores do VS Code ajudam a ver onde o texto "vazou".',
    correcao: 'Escrever `bairro: "Centro",`.',
  },
  {
    id: 4,
    titulo: 'Categoria escrita diferente do botão ("Óleo" x "Oleo")',
    troca: {
      arquivo: 'js/app.js',
      de: '        categoria: "Vidro",\n        horario: "Sabados, 09h as 13h",',
      para: '        categoria: "Óleo",\n        horario: "Sabados, 09h as 13h",',
    },
    linhaDoErro: 19,
    sintoma: 'Os 3 cartões aparecem em "Todos", e o terceiro mostra a etiqueta "Óleo". Mas o botão "Oleo de Cozinha" mostra a grade vazia (o botão "Vidro" também).',
    esperado: [],
    causa: 'O botão envia `Oleo` (sem acento) e o local foi cadastrado como `Óleo` (com acento). Para o computador são textos diferentes; o mesmo vale para maiúsculas e minúsculas.',
    comoApontar: 'Não há erro no Console: diga isso à pessoa, para ela não procurar no lugar errado. Peça para ler em voz alta, letra por letra, o texto dentro do `onclick` do botão (index.html, linha 25) e a `categoria` do local (js/app.js, linha 19).',
    correcao: 'Deixar os dois textos idênticos: `categoria: "Oleo"`.',
  },
  {
    id: 5,
    titulo: 'Caminho errado no <script src>',
    troca: { arquivo: 'index.html', de: '<script src="js/app.js"></script>', para: '<script src="app.js"></script>' },
    linhaDoErro: 30,
    sintoma: 'A página abre com título e botões, mas nenhum cartão aparece. Clicar nos botões não faz nada.',
    esperado: [
      { quando: 'ao abrir', mensagem: 'Failed to load resource: net::ERR_FILE_NOT_FOUND', arquivo: 'app.js' },
      { quando: 'ao clicar em qualquer botão', mensagem: 'Uncaught ReferenceError: filtrarEcopontos is not defined', arquivo: 'index.html' },
    ],
    causa: 'O `index.html` procura `app.js` ao lado dele, mas o arquivo está dentro da pasta `js`.',
    comoApontar: 'Mostre no Console o nome do arquivo que não foi encontrado e peça para a pessoa achar esse arquivo no painel de pastas do VS Code: "em que pasta ele está?".',
    correcao: 'Escrever `<script src="js/app.js"></script>`.',
    observacao: 'Com o Live Server (em vez de dois cliques), a mensagem muda para `Failed to load resource: the server responded with a status of 404 (Not Found)`.',
  },
  {
    id: 6,
    titulo: 'Nome da função errado no onclick',
    troca: {
      arquivo: 'index.html',
      de: `onclick="filtrarEcopontos('Vidro')"`,
      para: `onclick="filtrarEcoponto('Vidro')"`,
    },
    linhaDoErro: 23,
    sintoma: 'A página abre normal, com os 3 cartões. Todos os botões funcionam, menos o "Vidro": ao clicar nele, nada muda.',
    esperado: [
      { quando: 'ao clicar em "Vidro"', mensagem: 'Uncaught ReferenceError: filtrarEcoponto is not defined', arquivo: 'index.html', linha: 23 },
    ],
    causa: 'O botão "Vidro" chama `filtrarEcoponto` (sem o "s" final). A função se chama `filtrarEcopontos`.',
    comoApontar: 'O erro só aparece depois do clique: peça para deixar o Console aberto e clicar de novo. Mostre o nome que o Console diz não existir e peça para comparar com o botão de cima, letra por letra.',
    correcao: "Escrever `onclick=\"filtrarEcopontos('Vidro')\"`.",
  },
  {
    id: 7,
    titulo: 'Vírgula sobrando depois do último local (não é erro)',
    troca: {
      arquivo: 'js/app.js',
      de: '        mapaUrl: "https://maps.app.goo.gl/r5PxGL6jaeWf9rwJ7"\n    }\n];',
      para: '        mapaUrl: "https://maps.app.goo.gl/r5PxGL6jaeWf9rwJ7"\n    },\n];',
    },
    linhaDoErro: 22,
    sintoma: 'Nenhum. A página funciona normalmente, com os 3 cartões e todos os filtros (o "Oleo de Cozinha" fica vazio, como no kit original).',
    esperado: [],
    causa: 'Não há erro. O JavaScript aceita uma vírgula depois do último item de uma lista.',
    comoApontar: 'Se a pessoa perguntar se a vírgula da linha 22 está errada, diga que não: pode ficar. O problema é a vírgula que FALTA entre dois locais, não a que sobra no final.',
    correcao: 'Nenhuma. Não peça para apagar: o monitor que "corrige" isso perde tempo e confunde o participante.',
  },
  {
    id: 8,
    titulo: 'Endereço do mapa sem https://',
    troca: {
      arquivo: 'js/app.js',
      de: 'mapaUrl: "https://maps.google.com/?q=IFSC+Garopaba"',
      para: 'mapaUrl: "maps.google.com/?q=IFSC+Garopaba"',
    },
    linhaDoErro: 14,
    sintoma: 'A página funciona normalmente. Mas, ao clicar em "Abrir localizacao no Google Maps" no cartão do Ponto Verde IFSC, abre uma aba com "arquivo não encontrado" (ou, no site publicado, uma página 404).',
    esperado: [],
    linkQuebrado: 'maps.google.com/?q=IFSC+Garopaba',
    causa: 'Sem `https://` no começo, o navegador acha que `maps.google.com/...` é o nome de uma pasta dentro do projeto.',
    comoApontar: 'Não há erro no Console da página. Peça para a pessoa olhar a barra de endereço da aba que abriu: o endereço começa com `file://` (ou com o endereço do próprio site), e não com `https://maps...`. Depois, peça para comparar a linha 14 com a linha 7.',
    correcao: 'Escrever `mapaUrl: "https://maps.google.com/?q=IFSC+Garopaba"`.',
  },
];
