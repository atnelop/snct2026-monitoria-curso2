// Base comum: abre o kit ja registrando erros do Console e requisicoes falhas.
const path = require('path');
const base = require('@playwright/test');

const PASTA_IMG = path.resolve(__dirname, '..', '..', '..', 'relatorios', 'img');

const test = base.test.extend({
  modo: ['offline', { option: true }],
  enderecoKit: ['', { option: true }],
  pastaKit: ['', { option: true }],

  // Pagina do kit ja carregada. No modo offline a rede fica desligada.
  kit: async ({ page, context, modo, enderecoKit }, use) => {
    const problemas = { console: [], excecoes: [], requisicoes: [] };
    page.on('console', (msg) => {
      if (msg.type() === 'error') problemas.console.push(msg.text());
    });
    page.on('pageerror', (erro) => problemas.excecoes.push(String(erro)));
    page.on('requestfailed', (req) => {
      problemas.requisicoes.push(`${req.url()} (${req.failure() ? req.failure().errorText : 'falhou'})`);
    });
    page.on('response', (resp) => {
      if (resp.status() >= 400) problemas.requisicoes.push(`${resp.url()} (HTTP ${resp.status()})`);
    });
    if (modo === 'offline') await context.setOffline(true);
    await page.goto(enderecoKit, { waitUntil: 'load' });
    await use({ page, problemas });
  },
});

// Categoria que cada botao de filtro envia para filtrarEcopontos('...').
async function lerBotoes(page) {
  return page.locator('.btn-filtro').evaluateAll((botoes) =>
    botoes.map((b) => {
      const onclick = b.getAttribute('onclick') || '';
      const achado = onclick.match(/\(\s*['"](.*?)['"]\s*\)/);
      return { texto: b.textContent.trim(), onclick, categoria: achado ? achado[1] : null };
    })
  );
}

module.exports = { test, expect: base.expect, lerBotoes, PASTA_IMG };
