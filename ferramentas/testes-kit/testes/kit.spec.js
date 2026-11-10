// Testes 1 a 7 da Fase 1: comportamento do Starter Kit no navegador.
// A mesma suite roda offline (file://) e online (GitHub Pages).
const path = require('path');
const { test, expect, lerBotoes, PASTA_IMG } = require('./base');

test('1. pagina carrega sem erros no Console e sem requisicoes falhas', async ({ kit, modo }) => {
  const { page, problemas } = kit;
  await expect(page.locator('#gradeEcopontos')).toBeAttached();
  await page.waitForTimeout(500); // da tempo de recursos atrasados (ex.: favicon) falharem
  if (modo === 'offline') {
    await page.screenshot({ path: path.join(PASTA_IMG, 'kit-desktop-todos.png'), fullPage: true });
  }
  expect.soft(problemas.excecoes, 'excecoes de JavaScript').toEqual([]);
  expect.soft(problemas.console, 'erros no Console').toEqual([]);
  expect.soft(problemas.requisicoes, 'requisicoes falhas').toEqual([]);
});

test('2. botao "Todos" renderiza N cartoes (N = LOCAIS_COLETA.length)', async ({ kit }) => {
  const { page } = kit;
  const total = await page.evaluate(() => LOCAIS_COLETA.length);
  expect(total, 'o array LOCAIS_COLETA nao pode estar vazio').toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await expect(page.locator('#gradeEcopontos .cartao-ecoponto')).toHaveCount(total);
});

test('3. cada botao de filtro renderiza pelo menos 1 cartao', async ({ kit, modo }) => {
  const { page } = kit;
  const botoes = await lerBotoes(page);
  expect(botoes.length, 'a pagina precisa ter botoes de filtro').toBeGreaterThan(0);
  for (let i = 0; i < botoes.length; i++) {
    await page.locator('.btn-filtro').nth(i).click();
    const cartoes = await page.locator('#gradeEcopontos .cartao-ecoponto').count();
    if (cartoes === 0 && modo === 'offline') {
      const nome = `kit-filtro-vazio-${(botoes[i].categoria || 'sem-categoria').toLowerCase()}.png`;
      await page.screenshot({ path: path.join(PASTA_IMG, nome), fullPage: true });
    }
    expect.soft(cartoes, `botao "${botoes[i].texto}" (${botoes[i].onclick})`).toBeGreaterThan(0);
  }
});

test('4. cada categoria usada no array tem botao correspondente (comparacao exata)', async ({ kit }) => {
  const { page } = kit;
  const categoriasDosBotoes = (await lerBotoes(page)).map((b) => b.categoria);
  const categoriasDoArray = await page.evaluate(() => [...new Set(LOCAIS_COLETA.map((l) => l.categoria))]);
  for (const categoria of categoriasDoArray) {
    expect.soft(categoriasDosBotoes, `categoria "${categoria}" usada no array`).toContain(categoria);
  }
});

test('5. links do mapa abrem em nova aba com rel="noopener"', async ({ kit }) => {
  const { page } = kit;
  const links = await page.locator('#gradeEcopontos a.link-mapa').evaluateAll((as) =>
    as.map((a) => ({ href: a.getAttribute('href'), target: a.getAttribute('target'), rel: a.getAttribute('rel') || '' }))
  );
  expect(links.length, 'cada cartao precisa ter link do mapa').toBeGreaterThan(0);
  for (const link of links) {
    expect.soft(link.target, `target de ${link.href}`).toBe('_blank');
    expect.soft(link.rel.split(/\s+/), `rel de ${link.href}`).toContain('noopener');
    expect.soft(link.href, 'endereco do mapa comeca com https://').toMatch(/^https:\/\//);
  }
});

test('6. celular 360x740: sem rolagem horizontal e botoes com toque minimo de 44 px', async ({ kit, modo }) => {
  const { page } = kit;
  await page.setViewportSize({ width: 360, height: 740 });
  if (modo === 'offline') {
    await page.screenshot({ path: path.join(PASTA_IMG, 'kit-celular-360x740.png'), fullPage: true });
  }
  const larguras = await page.evaluate(() => ({
    conteudo: document.documentElement.scrollWidth,
    tela: document.documentElement.clientWidth,
  }));
  expect.soft(larguras.conteudo, 'largura do conteudo nao passa da tela').toBeLessThanOrEqual(larguras.tela);

  const botoes = page.locator('.btn-filtro');
  const quantidade = await botoes.count();
  for (let i = 0; i < quantidade; i++) {
    const caixa = await botoes.nth(i).boundingBox();
    const texto = (await botoes.nth(i).textContent()).trim();
    expect.soft(Math.round(caixa.height), `altura do botao "${texto}"`).toBeGreaterThanOrEqual(44);
    expect.soft(Math.round(caixa.width), `largura do botao "${texto}"`).toBeGreaterThanOrEqual(44);
  }
});
