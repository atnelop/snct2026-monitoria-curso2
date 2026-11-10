// Configuracao da auditoria do Starter Kit (Fase 1 do PLANO.md).
//
// Dois projetos rodam a mesma suite:
//   offline -> abre o kit por file://, com a rede desligada
//   online  -> abre o deploy do GitHub Pages
//
// Variaveis de ambiente:
//   KIT_DIR  pasta do kit a testar no modo offline
//            (padrao: vendor/starter-kit; na Fase 2 aponte para saida/PLANO-B/starter-kit-painel-verde)
//   KIT_URL  endereco do deploy a testar no modo online
const path = require('path');
const { pathToFileURL } = require('url');
const { defineConfig } = require('@playwright/test');

const RAIZ = path.resolve(__dirname, '..', '..');
const KIT_DIR = path.resolve(process.env.KIT_DIR || path.join(RAIZ, 'vendor', 'starter-kit'));
const KIT_URL = process.env.KIT_URL || 'https://fleithpi.github.io/sntc2026-starter-kit-curso2/';

// Em redes com proxy (HTTPS_PROXY definido), o navegador precisa ser avisado.
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;

module.exports = defineConfig({
  testDir: './testes',
  outputDir: path.join(RAIZ, 'saida', 'testes-kit'),
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: { browserName: 'chromium', trace: 'off' },
  metadata: { KIT_DIR, KIT_URL },
  projects: [
    {
      name: 'offline',
      use: {
        modo: 'offline',
        enderecoKit: pathToFileURL(path.join(KIT_DIR, 'index.html')).href,
        pastaKit: KIT_DIR,
      },
    },
    {
      name: 'online',
      testIgnore: /pdf\.spec\.js/,
      use: { modo: 'online', enderecoKit: KIT_URL, pastaKit: KIT_DIR, proxy },
    },
  ],
});
