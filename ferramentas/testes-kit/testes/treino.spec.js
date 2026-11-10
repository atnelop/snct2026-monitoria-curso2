// Fase 4: cada variante de treino reproduz a mensagem descrita no gabarito.
// Roda com: npx playwright test --project=treino
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const VARIANTES = require('../treino/variantes');
const { capturar, resumir, conferir } = require('../treino/capturar');

const PASTA = path.resolve(__dirname, '..', '..', '..', 'bancada', 'treino-erros');
const KIT = path.resolve(__dirname, '..', '..', '..', 'vendor', 'starter-kit');

for (const v of VARIANTES) {
  test(`variante ${v.id}: ${v.titulo}`, async ({ browser }) => {
    const pasta = path.join(PASTA, `variante-${v.id}`);
    const captura = await capturar(browser, pasta);
    expect(conferir(v.esperado, resumir(captura)), 'Console diferente do gabarito').toEqual([]);

    // o gabarito escrito cita cada mensagem esperada
    const gabarito = fs.readFileSync(path.join(pasta, 'GABARITO.md'), 'utf8');
    for (const e of v.esperado) expect(gabarito).toContain(e.mensagem);

    // a variante difere do kit em exatamente 1 arquivo
    if (fs.existsSync(KIT)) {
      const diferentes = ['index.html', 'js/app.js', 'css/estilo.css'].filter(
        (a) => fs.readFileSync(path.join(pasta, a), 'utf8') !== fs.readFileSync(path.join(KIT, a), 'utf8')
      );
      expect(diferentes).toEqual([v.troca.arquivo]);
    }
  });
}

// Tela de triagem dos monitores: cabe em 1 tela e nao depende de rede.
const { pathToFileURL } = require('url');
const TRIAGEM = path.resolve(__dirname, '..', '..', '..', 'bancada', 'triagem.html');

for (const tela of [
  { nome: '1366x768 (tela cheia, F11)', width: 1366, height: 768 },
  { nome: '1366x640 (janela do navegador com barras)', width: 1366, height: 640 },
]) {
  test(`triagem cabe em 1 tela: ${tela.nome}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: tela.width, height: tela.height } });
    await context.setOffline(true);
    const page = await context.newPage();
    const pedidos = [];
    page.on('request', (r) => { if (!r.url().startsWith('file:')) pedidos.push(r.url()); });
    await page.goto(pathToFileURL(TRIAGEM).href);
    const medidas = await page.evaluate(() => ({
      altura: document.documentElement.scrollHeight,
      largura: document.documentElement.scrollWidth,
    }));
    if (tela.height === 768) {
      await page.screenshot({ path: path.resolve(__dirname, '..', '..', '..', 'relatorios', 'img', 'triagem-1366x768.png') });
    }
    expect(medidas.altura, 'sem rolagem vertical').toBeLessThanOrEqual(tela.height);
    expect(medidas.largura, 'sem rolagem horizontal').toBeLessThanOrEqual(tela.width);
    expect(pedidos, 'nenhum recurso externo').toEqual([]);
    await context.close();
  });
}

test('triagem cita as mensagens dos gabaritos', async () => {
  const html = fs.readFileSync(TRIAGEM, 'utf8');
  for (const v of VARIANTES) {
    for (const e of v.esperado) {
      // a triagem pode abreviar o prefixo e trocar o nome da funcao por "(nome)"
      const final = e.mensagem.split(': ').pop().replace('filtrarEcoponto is', '(nome) is');
      expect(html, e.mensagem).toContain(final);
    }
  }
});
