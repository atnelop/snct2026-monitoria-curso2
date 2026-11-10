// Gera o kit de treinamento dos monitores (Fase 4 do PLANO.md).
//
// Uso:  node ferramentas/gerar-treino-erros.js
//
// Para cada variante definida em testes-kit/treino/variantes.js:
//   1. copia vendor/starter-kit para bancada/treino-erros/variante-N/
//   2. aplica UMA alteracao
//   3. abre no Chromium, captura as mensagens do Console e confere com o esperado
//   4. escreve bancada/treino-erros/variante-N/GABARITO.md
// Tambem gera saida/TREINO/ com as mesmas pastas SEM gabarito, para entregar
// aos monitores no ensaio.
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const TESTES = path.join(__dirname, 'testes-kit');
const { chromium } = require(path.join(TESTES, 'node_modules', '@playwright', 'test'));
const VARIANTES = require(path.join(TESTES, 'treino', 'variantes.js'));
const { capturar, resumir, conferir } = require(path.join(TESTES, 'treino', 'capturar.js'));

const KIT = path.join(RAIZ, 'vendor', 'starter-kit');
const DESTINO = path.join(RAIZ, 'bancada', 'treino-erros');
const ENSAIO = path.join(RAIZ, 'saida', 'TREINO');

function copiarKit(destino) {
  fs.rmSync(destino, { recursive: true, force: true });
  fs.cpSync(KIT, destino, {
    recursive: true,
    filter: (origem) => !['.git', '.github'].includes(path.basename(origem)),
  });
}

function aplicarTroca(pasta, troca) {
  const arquivo = path.join(pasta, troca.arquivo);
  const original = fs.readFileSync(arquivo, 'utf8');
  const partes = original.split(troca.de);
  if (partes.length !== 2) {
    throw new Error(`${troca.arquivo}: o trecho a alterar aparece ${partes.length - 1} vez(es); o kit mudou? Revise variantes.js`);
  }
  fs.writeFileSync(arquivo, partes.join(troca.para));
}

function linhaConsole(m) {
  const onde = m.arquivo ? ` (em \`${m.arquivo}${m.linha ? ':' + m.linha : ''}\`)` : '';
  return `- ${m.quando[0].toUpperCase()}${m.quando.slice(1)}: \`${m.mensagem}\`${onde}`;
}

function gabarito(v, captura, versaoChromium) {
  const mensagens = resumir(captura);
  const linhas = [
    `# Gabarito da variante ${v.id}: ${v.titulo}`,
    '',
    '> Só para a equipe. Não entregar aos monitores em treino nem copiar para o pen-drive dos participantes.',
    '',
    '## Onde está a alteração',
    '',
    `Arquivo \`${v.troca.arquivo}\`, linha ${v.linhaDoErro}.`,
    '',
    '## O que aparece na tela',
    '',
    v.sintoma,
    '',
    `Cartões ao abrir: ${captura.cartoesAoAbrir}. Cartões depois de clicar em cada botão: ` +
      captura.botoes.map((b) => `"${b.texto}" ${b.cartoes}`).join(', ') + '.',
    '',
    `## Mensagem no Console (F12), Chrome/Chromium ${versaoChromium}`,
    '',
  ];
  if (mensagens.length === 0) {
    linhas.push('Nenhuma. O Console fica limpo.');
  } else {
    linhas.push(...mensagens.map(linhaConsole));
  }
  if (v.linkQuebrado) {
    const link = captura.links.find((l) => l.escrito === v.linkQuebrado);
    linhas.push('', `O link do cartão aponta para \`${link.abre}\` em vez do Google Maps.`);
  }
  if (v.observacao) linhas.push('', v.observacao);
  linhas.push(
    '',
    ...(mensagens.length ? ['No Firefox o texto da mensagem é diferente (não capturado aqui). O arquivo e a linha indicados costumam ser os mesmos.', ''] : []),
    '## Causa',
    '',
    v.causa,
    '',
    '## Como apontar sem tocar no teclado',
    '',
    v.comoApontar,
    '',
    '## Correção',
    '',
    v.correcao,
    ''
  );
  return linhas.join('\n');
}

(async () => {
  if (!fs.existsSync(path.join(KIT, 'index.html'))) {
    console.error('ERRO: kit nao encontrado em vendor/starter-kit');
    process.exit(1);
  }
  const browser = await chromium.launch();
  const versao = browser.version().split('.')[0];
  fs.rmSync(ENSAIO, { recursive: true, force: true });
  let falhas = 0;
  const indice = [];

  for (const v of VARIANTES) {
    const nome = `variante-${v.id}`;
    const pasta = path.join(DESTINO, nome);
    copiarKit(pasta);
    aplicarTroca(pasta, v.troca);
    const captura = await capturar(browser, pasta);
    const diferencas = conferir(v.esperado, resumir(captura));
    if (v.linkQuebrado && !captura.links.some((l) => l.escrito === v.linkQuebrado && l.abre.startsWith('file:'))) {
      diferencas.push('o link sem https:// nao foi encontrado nos cartoes');
    }
    fs.cpSync(pasta, path.join(ENSAIO, nome), { recursive: true });
    fs.writeFileSync(path.join(pasta, 'GABARITO.md'), gabarito(v, captura, versao));
    indice.push({ id: v.id, pasta: nome, titulo: v.titulo, arquivo: v.troca.arquivo, linha: v.linhaDoErro,
      console: resumir(captura).map((m) => m.mensagem) });
    if (diferencas.length) {
      falhas++;
      console.log(`[FALHA] ${nome}: ${v.titulo}`);
      diferencas.forEach((d) => console.log(`          ${d}`));
    } else {
      console.log(`[OK]    ${nome}: ${v.titulo}`);
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(DESTINO, 'gabaritos.json'), JSON.stringify(indice, null, 2) + '\n');
  console.log(`\nVariantes com gabarito: ${path.relative(RAIZ, DESTINO)}/`);
  console.log(`Copias sem gabarito para o ensaio: ${path.relative(RAIZ, ENSAIO)}/`);
  process.exit(falhas ? 1 : 0);
})();
