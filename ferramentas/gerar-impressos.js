// Converte os impressos (HTML) em PDF A4 em saida/impressos/ (Fase 5 do PLANO.md).
//
// Uso:  node ferramentas/gerar-impressos.js
//
// Antes de converter:
//   - recria impressos/mapa-bancadas.html a partir de relatorios/mapa-maquinas.md
//     (se a auditoria das maquinas ainda nao existir, sai um mapa em branco);
//   - coloca no cartaz os QR Codes de saida/qr/ (rode antes gerar-qrcodes.py).
// Confere em cada impresso: cabe em 1 folha A4 e nenhuma letra menor que 14 pt.
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const { chromium } = require(path.join(__dirname, 'testes-kit', 'node_modules', '@playwright', 'test'));
const { pathToFileURL } = require('url');

const IMPRESSOS = path.join(RAIZ, 'impressos');
const DESTINO = path.join(RAIZ, 'saida', 'impressos');
const QR = path.join(RAIZ, 'saida', 'qr');
const LINKS = JSON.parse(fs.readFileSync(path.join(__dirname, 'links.json'), 'utf8'));
const MAPA_MD = path.join(RAIZ, 'relatorios', 'mapa-maquinas.md');
const TOTAL_BANCADAS_PADRAO = 30;

const ARQUIVOS = [
  'lista-presenca.html',
  'termo-imagem-adulto.html',
  'termo-imagem-menor.html',
  'escala-monitoria.html',
  'mapa-bancadas.html',
  'cartaz-acesso.html',
];

// ---------- mapa de bancadas ----------

// Le a primeira tabela Markdown que tenha uma coluna "Bancada".
function lerMapaMaquinas() {
  if (!fs.existsSync(MAPA_MD)) return null;
  const linhas = fs.readFileSync(MAPA_MD, 'utf8').split('\n').filter((l) => l.trim().startsWith('|'));
  const celulas = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const inicio = linhas.findIndex((l) => /bancada/i.test(l));
  if (inicio === -1) return null;
  const titulos = celulas(linhas[inicio]).map((t) => t.toLowerCase());
  const coluna = (padrao) => titulos.findIndex((t) => padrao.test(t));
  const col = {
    bancada: coluna(/bancada/), maquina: coluna(/hostname|m[aá]quina/), cor: coluna(/classifica|cor|situa/),
    ilha: coluna(/ilha/), monitor: coluna(/monitor/),
  };
  const bancadas = [];
  for (const l of linhas.slice(inicio + 1)) {
    const c = celulas(l);
    if (c.every((x) => /^:?-+:?$/.test(x)) || !c[col.bancada]) continue;
    const pegar = (i) => (i >= 0 && c[i] ? c[i].replace(/[*`]/g, '') : '');
    bancadas.push({ numero: pegar(col.bancada), maquina: pegar(col.maquina), cor: pegar(col.cor).toLowerCase(),
      ilha: pegar(col.ilha), monitor: pegar(col.monitor) });
  }
  return bancadas.length ? bancadas : null;
}

function escapar(texto) {
  return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function gerarMapa() {
  const dados = lerMapaMaquinas();
  const bancadas = dados || Array.from({ length: TOTAL_BANCADAS_PADRAO }, (_, i) => ({ numero: String(i + 1).padStart(2, '0') }));
  const classe = (cor) => (/vermelh/.test(cor) ? 'vermelho' : /amarel/.test(cor) ? 'amarelo' : /verde/.test(cor) ? 'verde' : '');
  const caixas = bancadas.map((b) => `
      <div class="bancada ${classe(b.cor || '')}">
        <strong>${escapar(b.numero)}</strong>
        <span>${b.maquina ? escapar(b.maquina) : '&nbsp;'}</span>
        <span>${b.cor ? escapar(b.cor) : dados ? '&nbsp;' : 'V &nbsp; A &nbsp; X'}</span>
      </div>`).join('');

  const ilhas = new Map();
  for (const b of bancadas) {
    if (!b.ilha) continue;
    if (!ilhas.has(b.ilha)) ilhas.set(b.ilha, { bancadas: [], monitor: b.monitor || '' });
    ilhas.get(b.ilha).bancadas.push(b.numero);
  }
  const linhasIlha = ilhas.size
    ? [...ilhas].map(([nome, i]) => `<tr><td>${escapar(nome)}</td><td>${escapar(i.bancadas.join(', '))}</td><td>${escapar(i.monitor)}</td></tr>`)
    : ['A', 'B', 'C', 'D', 'E', 'F'].map((n) => `<tr><td class="centro">${n}</td><td></td><td></td></tr>`);

  const aviso = dados
    ? ''
    : '<p class="pendente">[PENDENTE] Mapa em branco: a auditoria das máquinas ainda não foi feita. Numere as bancadas conforme a sala e marque V (verde), A (amarelo) ou X (vermelho).</p>';

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Mapa de bancadas · Curso 2 Painel Verde · SNCT 2026</title>
<link rel="stylesheet" href="impressos.css">
<style>
  .cabecalho { margin-bottom: 2mm; }
  .telao { border: 0.5mm solid #000; text-align: center; font-weight: 700; padding: 1mm; margin-bottom: 2mm; background: #dcfce7; }
  .sala { display: grid; grid-template-columns: repeat(6, 1fr); gap: 2mm; margin-bottom: 2mm; }
  .bancada { border: 0.4mm solid #000; border-radius: 1.5mm; height: 23mm; padding: 1mm 1.5mm; display: flex;
             flex-direction: column; justify-content: space-between; overflow: hidden; }
  .bancada strong { font-size: 16pt; line-height: 1; }
  .bancada span { line-height: 1.05; white-space: nowrap; }
  .bancada.amarelo { border-style: dashed; border-width: 0.8mm; }
  .bancada.vermelho { border-width: 1.4mm; }
  td { height: 7mm; padding: 0 2mm; }
  th { padding: 0.5mm 2mm; }
  th:nth-child(1) { width: 20mm; }
  th:nth-child(2) { width: 70mm; }
  .legenda { margin: 0 0 1.5mm; }
  .pendente { margin-bottom: 2mm; padding: 1mm 2mm; }
</style>
</head>
<body>
  <div class="cabecalho">
    <h1>Mapa de bancadas<br>Curso 2 · Painel Verde</h1>
    <p>SNCT 2026 · 26/11/2026<br>IFSC Câmpus Garopaba</p>
  </div>
  ${aviso}
  <div class="telao">TELÃO · frente da sala</div>
  <div class="sala">${caixas}
  </div>
  <p class="legenda"><strong>Verde:</strong> pronta. <strong>Amarelo</strong> (borda tracejada): usar com atenção. <strong>Vermelho</strong> (borda grossa): não usar.</p>
  <table>
    <thead><tr><th class="centro">Ilha</th><th>Bancadas</th><th>Monitor responsável</th></tr></thead>
    <tbody>
      ${linhasIlha.join('\n      ')}
    </tbody>
  </table>
</body>
</html>
`;
  fs.writeFileSync(path.join(IMPRESSOS, 'mapa-bancadas.html'), html);
  return dados ? `${bancadas.length} bancadas de relatorios/mapa-maquinas.md` : 'em branco (sem relatorios/mapa-maquinas.md)';
}

// ---------- conversao ----------

function contarPaginas(pdf) {
  const achados = pdf.toString('latin1').match(/\/Type\s*\/Page(?![s\w])/g);
  return achados ? achados.length : 0;
}

async function prepararQr(page) {
  const qrs = {};
  for (const chave of Object.keys(LINKS)) {
    const arquivo = path.join(QR, `qr-${chave}.svg`);
    qrs[chave] = {
      url: LINKS[chave].url,
      imagem: LINKS[chave].url && fs.existsSync(arquivo)
        ? 'data:image/svg+xml;base64,' + fs.readFileSync(arquivo).toString('base64')
        : null,
    };
  }
  return page.evaluate((dados) => {
    const faltando = [];
    document.querySelectorAll('[data-qr]').forEach((caixa) => {
      const d = dados[caixa.dataset.qr];
      if (d && d.imagem) {
        caixa.innerHTML = `<img src="${d.imagem}" alt="QR Code">`;
      } else {
        caixa.classList.add('faltando');
        faltando.push(caixa.dataset.qr);
      }
    });
    document.querySelectorAll('[data-url]').forEach((p) => {
      const d = dados[p.dataset.url];
      p.textContent = d && d.url ? d.url.replace(/^https:\/\//, '') : '';
    });
    return faltando;
  }, qrs);
}

// Menor tamanho de letra entre os elementos que tem texto proprio, em pt.
function menorLetra(page) {
  return page.evaluate(() => {
    let menor = Infinity;
    for (const el of document.body.querySelectorAll('*')) {
      const temTexto = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!temTexto) continue;
      menor = Math.min(menor, parseFloat(getComputedStyle(el).fontSize) * 0.75);
    }
    return Math.round(menor * 10) / 10;
  });
}

(async () => {
  console.log(`mapa-bancadas.html: ${gerarMapa()}`);
  fs.mkdirSync(DESTINO, { recursive: true });
  const browser = await chromium.launch();
  let problemas = 0;
  const avisos = [];

  for (const arquivo of ARQUIVOS) {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(path.join(IMPRESSOS, arquivo)).href);
    await page.emulateMedia({ media: 'print' });
    const faltando = await prepararQr(page);
    const letra = await menorLetra(page);
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    const nome = arquivo.replace(/\.html$/, '.pdf');
    fs.writeFileSync(path.join(DESTINO, nome), pdf);
    const paginas = contarPaginas(pdf);
    const pendente = (await page.locator('.pendente, .confirmar, .faltando').count()) > 0;
    await page.close();

    const erros = [];
    if (paginas !== 1) erros.push(`${paginas} paginas (deveria ser 1)`);
    if (letra < 14) erros.push(`letra de ${letra} pt (minimo 14)`);
    if (faltando.length) avisos.push(`${arquivo}: QR faltando (${faltando.join(', ')})`);
    problemas += erros.length;
    const situacao = erros.length ? `[FALHA] ${erros.join('; ')}` : pendente ? '[OK, COM PENDENCIA]' : '[OK]';
    console.log(`${situacao.padEnd(22)} ${nome}  (${paginas} pagina, menor letra ${letra} pt)`);
  }
  await browser.close();
  avisos.forEach((a) => console.log(`[AVISO] ${a}`));
  console.log(`\nPDFs em: ${path.relative(RAIZ, DESTINO)}/`);
  process.exit(problemas ? 1 : 0);
})();
