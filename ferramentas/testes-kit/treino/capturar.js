// Abre uma copia do kit no Chromium e registra o que o Console (F12) mostra:
// ao abrir a pagina e ao clicar em cada botao de filtro.
const path = require('path');
const { pathToFileURL } = require('url');

function relativo(pasta, url) {
  const base = pathToFileURL(pasta + path.sep).href;
  return url && url.startsWith(base) ? decodeURIComponent(url.slice(base.length)) : url || '';
}

async function capturar(browser, pasta) {
  const context = await browser.newContext();
  await context.setOffline(true);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  let momento = 'ao abrir';
  const mensagens = [];

  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');
  cdp.on('Runtime.exceptionThrown', ({ exceptionDetails: d }) => {
    if (!momento) return;
    const descricao = (d.exception && d.exception.description) || d.text || '';
    mensagens.push({
      quando: momento,
      mensagem: descricao.split('\n')[0].replace(/^(Uncaught )?/, 'Uncaught '),
      arquivo: relativo(pasta, d.url || (d.stackTrace && d.stackTrace.callFrames[0] && d.stackTrace.callFrames[0].url)),
      linha: d.lineNumber + 1,
    });
  });
  cdp.on('Log.entryAdded', ({ entry }) => {
    if (entry.level !== 'error' || !momento) return;
    mensagens.push({ quando: momento, mensagem: entry.text, arquivo: relativo(pasta, entry.url), linha: entry.lineNumber || undefined });
  });

  await page.goto(pathToFileURL(path.join(pasta, 'index.html')).href, { waitUntil: 'load' });
  await page.waitForTimeout(200);
  const cartoesAoAbrir = await page.locator('.cartao-ecoponto').count();

  const botoes = [];
  const quantidade = await page.locator('.btn-filtro').count();
  for (let i = 0; i < quantidade; i++) {
    const botao = page.locator('.btn-filtro').nth(i);
    const texto = (await botao.textContent()).trim();
    momento = `ao clicar em "${texto}"`;
    await botao.click();
    await page.waitForTimeout(50);
    botoes.push({ texto, cartoes: await page.locator('.cartao-ecoponto').count() });
  }

  momento = null; // daqui em diante so lemos os links; nada entra no registro
  const links = [];
  if (await page.locator('.btn-filtro').count()) {
    await page.locator('.btn-filtro').first().click().catch(() => {});
    for (const a of await page.locator('a.link-mapa').all()) {
      const abre = await a.evaluate((el) => el.href);
      links.push({ escrito: await a.getAttribute('href'), abre: abre.startsWith('file:') ? 'file:///.../' + relativo(pasta, abre) : abre });
    }
  }
  await context.close();
  return { mensagens, cartoesAoAbrir, botoes, links };
}

// Junta as mensagens repetidas em todos os botoes em "ao clicar em qualquer botão".
function resumir(captura) {
  const total = captura.botoes.length;
  const porChave = new Map();
  for (const m of captura.mensagens) {
    const clique = m.quando.startsWith('ao clicar');
    const chave = clique ? `clique|${m.mensagem}|${m.arquivo}` : `${m.quando}|${m.mensagem}|${m.arquivo}|${m.linha}`;
    if (!porChave.has(chave)) porChave.set(chave, []);
    porChave.get(chave).push(m);
  }
  const saida = [];
  for (const grupo of porChave.values()) {
    const m = grupo[0];
    if (m.quando.startsWith('ao clicar') && grupo.length === total && total > 1) {
      saida.push({ quando: 'ao clicar em qualquer botão', mensagem: m.mensagem, arquivo: m.arquivo });
    } else {
      for (const g of grupo) saida.push(g);
    }
  }
  return saida;
}

// Compara o esperado (escrito a mao) com o capturado. Devolve lista de diferencas.
function conferir(esperado, capturado) {
  const texto = (m) => `${m.quando} | ${m.mensagem} | ${m.arquivo}${m.linha ? ':' + m.linha : ''}`;
  const diferencas = [];
  const sobra = [...capturado];
  for (const e of esperado) {
    const i = sobra.findIndex(
      (c) => c.quando === e.quando && c.mensagem === e.mensagem && c.arquivo === e.arquivo && (e.linha === undefined || c.linha === e.linha)
    );
    if (i === -1) diferencas.push(`esperado e nao apareceu: ${texto(e)}`);
    else sobra.splice(i, 1);
  }
  for (const c of sobra) diferencas.push(`apareceu e nao era esperado: ${texto(c)}`);
  return diferencas;
}

module.exports = { capturar, resumir, conferir };
