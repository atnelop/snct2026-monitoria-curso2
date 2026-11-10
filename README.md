# snct2026-monitoria-curso2

Ferramentas e materiais da **Frente 4 (Monitoria de Bancada & Logística)** do
Curso 2, Painel Verde: Coleta Seletiva & Ecopontos, na SNCT 2026 do IFSC Câmpus
Garopaba (UC Programação para a Internet 2, Prof. André Moraes).

- Ensaio geral no laboratório: 21/11/2026
- Oficina (120 min): 26/11/2026
- Plano de trabalho completo: [PLANO.md](PLANO.md)
- Premissas e pendências: [relatorios/premissas.md](relatorios/premissas.md)

## Pastas

| Pasta | Para que serve |
| --- | --- |
| `ferramentas/` | Scripts internos da equipe (testes do kit, Plano B, auditoria, QR Codes, impressos) |
| `bancada/` | O que vai para o pen-drive: tela de triagem e kit de treino de erros |
| `impressos/` | Lista de presença, termos de imagem, escala, mapa e cartaz (HTML para A4) |
| `relatorios/` | Premissas, auditorias e rascunhos de issues para a Frente 2 |
| `vendor/` | Clone do Starter Kit da Frente 2 (não versionado) |
| `dados/` | Exports do Moodle e do Forms (não versionado) |
| `saida/` | Arquivos gerados: Plano B, PDFs, QR Codes (não versionado) |

## Como começar

```bash
git clone --depth 1 https://github.com/fleithpi/sntc2026-starter-kit-curso2 vendor/starter-kit
```

O repositório do Starter Kit pertence à Frente 2 e é somente leitura para esta
equipe: problemas encontrados viram rascunho em `relatorios/issues-frente2.md`.

## Testes do Starter Kit

```bash
cd ferramentas/testes-kit
npm install
npx playwright install chromium
npx playwright test
```

Hoje a suíte aponta 3 problemas do kit, todos descritos em
`relatorios/auditoria-kit.md`.

## Regras

1. Tudo que vai para a bancada ou pen-drive é HTML, CSS e JS puros, sem
   dependências, e abre por duplo clique (`file://`).
2. Node e Python só nas ferramentas internas da equipe.
3. Nenhuma senha ou dado pessoal no repositório.
4. Commits pequenos, com mensagens em português.

## Andamento

- [x] Fase 0: Setup
- [x] Fase 1: Auditoria automatizada do Starter Kit ([relatório](relatorios/auditoria-kit.md), [issues rascunhadas](relatorios/issues-frente2.md))
- [ ] Fase 2: Plano B Offline
- [ ] Fase 3: Auditoria das máquinas do laboratório
- [ ] Fase 4: Kit de treinamento de monitores
- [ ] Fase 5: Impressos e QR Codes
- [ ] Fase 6: Pesquisa de satisfação
- [ ] Fase 7: Consolidação de evidências (após 26/11)
