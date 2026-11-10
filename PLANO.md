# PLANO.md: Frente 4 (Monitoria de Bancada & Logística) · Curso 2 Painel Verde · SNCT 2026

## 0. Contexto

1. Equipe: Frente 4, Curso 2 (Painel Verde: Coleta Seletiva & Ecopontos), UC Programação para a Internet 2, IFSC Câmpus Garopaba, Prof. André Moraes.
2. Datas: plano criado em 10/11/2026. Ensaio geral no lab: 21/11. Ministração: 26/11 (oficina de 120 min).
3. Links:
   1. Starter Kit (Frente 2, somente leitura): https://github.com/fleithpi/sntc2026-starter-kit-curso2
   2. Deploy do kit: https://fleithpi.github.io/sntc2026-starter-kit-curso2/
   3. Sala Moodle Curso 2: https://moodle.ifsc.edu.br/course/view.php?id=2664 (chave SNCT2026)
   4. Dashboard da UC: https://chameoandre.github.io/CST-Sistemas-para-internet-programacao-para-internet-2/
   5. Roteiro Frente 4: https://chameoandre.github.io/CST-Sistemas-para-internet-programacao-para-internet-2/snct-frentes/frente-monitoria/main.pdf
   6. Roteiro Frente 2: https://chameoandre.github.io/CST-Sistemas-para-internet-programacao-para-internet-2/snct-frentes/frente-starterkit/main.pdf
4. Nome oficial do pacote do Curso 2: `starter-kit-painel-verde.zip`.
5. Prioridade até o ensaio (21/11): Fases 0, 1, 2, 4 e 5. Fase 6 até 21/11. Fase 7 após 26/11.

## 1. Regras de execução

1. Executar uma fase por vez. Ao final, mostrar resumo, arquivos criados e aguardar "ok".
2. Nunca fazer push, abrir issue ou alterar repositório de terceiros sem confirmação explícita. O repo da Frente 2 é somente leitura: problemas viram rascunho em `relatorios/issues-frente2.md`.
3. Tudo que vai para a bancada ou pen-drive: HTML, CSS e JS puros, zero dependências, abrindo via `file://`. Node e Python apenas nas ferramentas internas da equipe.
4. Texto voltado ao participante: português simples, sem jargão; impressos com fonte mínima de 14 pt.
5. Não criar contas, não gravar senhas nem dados pessoais no repositório. `dados/` e `saida/` no `.gitignore`.
6. Perguntar o SO do laboratório antes de escrever scripts de máquina.
7. Commits pequenos, mensagens em português.

## 2. Estrutura alvo do repositório `snct2026-monitoria-curso2`

```
snct2026-monitoria-curso2/
├── PLANO.md
├── README.md
├── ferramentas/
│   ├── testes-kit/               Playwright: valida o Starter Kit offline e online
│   ├── montar-plano-b.(ps1|sh)
│   ├── verificar-plano-b.(ps1|sh)
│   ├── auditar-maquina.(ps1|sh)
│   ├── consolidar-maquinas.py
│   ├── gerar-qrcodes.py
│   ├── gerar-impressos.js        HTML -> PDF via Playwright page.pdf()
│   ├── forms-espelho.gs          Apps Script do Google Forms espelho
│   └── consolidar-evidencias.py
├── bancada/                      vai para o pen-drive
│   ├── triagem.html
│   └── treino-erros/
├── impressos/
│   ├── lista-presenca.html
│   ├── termo-imagem-adulto.html
│   ├── termo-imagem-menor.html
│   ├── escala-monitoria.html
│   ├── mapa-bancadas.html
│   └── cartaz-acesso.html
├── relatorios/
├── vendor/                       clone do kit (ignorado no git)
├── dados/                        exports CSV/XLSX (ignorado no git)
└── saida/                        builds (ignorado no git)
```

## Fase 0: Setup

1. `git init`, `README.md`, `.gitignore` (`vendor/`, `dados/`, `saida/`, `node_modules/`, `__pycache__/`).
2. `git clone --depth 1 https://github.com/fleithpi/sntc2026-starter-kit-curso2 vendor/starter-kit`.
3. Perguntar ao usuário: SO do lab, navegadores instalados, número de bancadas, número esperado de participantes, se `gh` está autenticado, caminhos locais do micro-roteiro (Frente 1) e dos slides (Frente 3).
4. Registrar respostas em `relatorios/premissas.md`.

Aceite: estrutura criada, commit inicial.

## Fase 1: Auditoria automatizada do Starter Kit (Membro B)

1. Criar `ferramentas/testes-kit/` com Playwright (Chromium). Modo offline com `context.setOffline(true)` abrindo `file://<abs>/vendor/starter-kit/index.html`.
2. Testes:
   1. página carrega sem erros no Console e sem requisições falhas;
   2. botão "Todos" renderiza N cartões, N = `LOCAIS_COLETA.length`;
   3. cada botão de filtro renderiza pelo menos 1 cartão (no código do PDF da Frente 2 nenhum item tem `categoria: "Oleo"`, então "Oleo de Cozinha" gera grade vazia; confirmar no repo);
   4. cada categoria usada no array tem botão correspondente (comparação exata, sensível a acento e maiúscula);
   5. links do mapa com `target="_blank"` e `rel="noopener"`;
   6. viewport 360x740: sem rolagem horizontal, botões com área de toque mínima de 44 px;
   7. mesma suíte contra o deploy do GitHub Pages (online);
   8. diff textual entre o código do repo e os Passos 2.5, 2.6 e 2.7 do PDF da Frente 2 (regra "código 100% igual ao PDF"); listar divergências linha a linha.
3. Registrar também, sem corrigir:
   1. nome do repo usa "sntc" e não "snct" (impacta digitação e QR);
   2. o zip baixado do GitHub chama `sntc2026-starter-kit-curso2-main.zip` e tem pasta aninhada, diferente de `starter-kit-painel-verde.zip`.
4. Saída: `relatorios/auditoria-kit.md`, screenshots em `relatorios/img/`, rascunhos em `relatorios/issues-frente2.md`.

Aceite: `npx playwright test` verde, ou cada falha com issue rascunhada.

## Fase 2: Plano B Offline (Membro B)

1. `montar-plano-b` gera `saida/PLANO-B/`:
   1. `starter-kit-painel-verde/` descompactado, sem `.git` e `.github`;
   2. `starter-kit-painel-verde.zip` com a pasta na raiz;
   3. `materiais/` com micro-roteiro PDF e slides offline (caminhos da Fase 0);
   4. `bancada/triagem.html` (Fase 4);
   5. `LEIA-ME.txt` com até 5 passos;
   6. `SHA256SUMS.txt`.
2. `verificar-plano-b` roda a partir do pen-drive: confere hashes, garante ausência de `.git`, abre `index.html` no navegador padrão.
3. Rodar a suíte da Fase 1 contra `saida/PLANO-B/starter-kit-painel-verde/`.

Aceite: verificador OK em 2 pen-drives, numa máquina do lab, com cabo de rede desconectado (passo manual).

## Fase 3: Auditoria das máquinas do laboratório (Membro B)

1. `auditar-maquina` (PowerShell se Windows, bash se Linux), sem privilégio de administrador, grava `<hostname>.csv` no próprio pen-drive com:
   1. hostname, SO, resolução de tela;
   2. navegadores e versões; VS Code e extensão Live Server; Git; descompactador;
   3. teste HTTPS (status e latência em ms) para github.com, fleithpi.github.io, moodle.ifsc.edu.br, maps.google.com, docs.google.com.
2. `consolidar-maquinas.py` junta os CSVs em `relatorios/mapa-maquinas.md` com classificação verde, amarelo ou vermelho por bancada e ação sugerida.

Aceite: 100% das bancadas auditadas antes de 21/11.

## Fase 4: Kit de treinamento de monitores (todos)

1. `bancada/treino-erros/`: cópias do kit com 1 erro cada:
   1. vírgula faltando entre objetos de `LOCAIS_COLETA`;
   2. `}` não fechada;
   3. aspas não fechadas;
   4. categoria com acento ou maiúscula diferente do botão ("Óleo" vs "Oleo");
   5. `<script src>` com caminho errado;
   6. `onclick` chamando função com nome errado;
   7. vírgula sobrando no último item (válido em JS; ensina que não é erro);
   8. `mapaUrl` sem `https://`.
   Cada variante com `GABARITO.md` contendo a mensagem exata do Console (capturada via Playwright) e a linha do erro. Gabaritos ficam fora do pen-drive dos participantes.
2. Instruções (sem código) para falhas não reproduzíveis por arquivo: arquivo editado e não salvo; cache do navegador; Pages com 404 por `index.html` fora da raiz ou deploy ainda em processamento; código 2FA do GitHub não recebido.
3. `bancada/triagem.html`: uma tela (1366x768), offline, tabela "Sintoma -> Mensagem no Console (F12) -> Onde apontar no roteiro". Lembrete fixo no topo: nunca tocar no mouse ou teclado do participante.
4. `ferramentas/rodizio-ensaio.py`: sorteia 3 variantes por monitor e gera ficha para cronometrar tempo até apontar a causa.

Aceite: cada variante reproduz a mensagem descrita no gabarito; triagem cabe em 1 tela.

## Fase 5: Impressos e QR Codes (Membro C)

Todos em HTML com `@media print` A4, convertidos em PDF por `gerar-impressos.js` para `saida/impressos/`.

1. `lista-presenca.html`: 30 linhas numeradas; colunas nome, e-mail (opcional), autoriza imagem (S/N), assinatura. Cabeçalho: SNCT 2026, 26/11/2026, Curso 2 Painel Verde, IFSC Garopaba.
2. `termo-imagem-adulto.html` e `termo-imagem-menor.html` (assinado por responsável legal). Inserir marcador visível `[CONFIRMAR MODELO OFICIAL COM COORDENAÇÃO/COMUNICAÇÃO DO IFSC]`; não inventar fundamentação jurídica.
3. `escala-monitoria.html`: janelas do roteiro (−30 a 00, 00–15, 15–35, 35–70, 70–110, 110–120) x pessoa x função (telão, ilha, suporte, registro), proporção 1 monitor para 4 a 5 participantes.
4. `mapa-bancadas.html`: gerado a partir de `relatorios/mapa-maquinas.md`, com monitor responsável por ilha.
5. `cartaz-acesso.html`: QR da sala Moodle id=2664, chave SNCT2026 em destaque, QR do deploy, QR da pesquisa.
6. `gerar-qrcodes.py` (lib `segno`, offline, SVG e PNG, correção de erro nível M). Exportar PNG do QR da pesquisa em `saida/qr/` para envio à Frente 3 (Tela 8).

Aceite: cada impresso cabe em 1 folha A4; QR lidos em 2 celulares diferentes (manual).

## Fase 6: Pesquisa de satisfação (Membro A)

1. Gerar `relatorios/checklist-moodle.md` com passo a passo e textos prontos para copiar:
   1. Participantes -> Métodos de inscrição: Autoinscrição (Estudante) com chave SNCT2026; Acesso de visitante ativo;
   2. Seção 4 (Avaliação & Certificado): atividade Pesquisa/Feedback com as 3 perguntas exatas do Roteiro SNCT 04 (P1 escala 1 a 5; P2 múltipla escolha com 3 opções; P3 resposta curta opcional).
2. `forms-espelho.gs`: Apps Script com `FormApp` criando o Forms espelho com as mesmas 3 perguntas, sem coleta de e-mail, respostas em planilha vinculada; ao final, `Logger.log` da URL pública. Usuário cola em script.google.com e executa.
3. Atualizar `gerar-qrcodes.py` com a URL do Forms.

Aceite: 1 resposta de teste em cada canal; link e QR enviados à Frente 3.

## Fase 7: Consolidação de evidências (Membro C, após 26/11)

1. `consolidar-evidencias.py` (pandas, matplotlib) lê exports CSV/XLSX do Moodle e do Forms em `dados/`, unifica colunas e gera:
   1. total de respostas e taxa de resposta sobre presentes;
   2. histograma de P1 com média e mediana;
   3. barras de P2;
   4. lista de P3 sem nomes ou e-mails;
   5. `relatorios/evidencias.md` com gráficos PNG para o relatório extensionista.
2. Flag `--demo` gera dados fictícios para validar o pipeline antes do evento.

Aceite: `--demo` gera relatório completo; nenhum dado pessoal versionado.

## Fora do escopo do Claude Code (manual)

1. Configuração real da sala Moodle id=2664 (seguir `checklist-moodle.md`).
2. Gravação e teste físico dos pen-drives.
3. Contas GitHub de contingência.
4. Impressão, assinaturas e fotos.
5. Registro dos links na Central de Demandas do dashboard.

## Pendências a confirmar antes da Fase 1

1. Stack do Curso 2: o PDF da Frente 2 usa JS puro com `.filter()`; o dashboard da UC descreve o Curso 2 como jQuery e LocalStorage e cita IoT/ESP32. Confirmar com o Prof. André ou a Frente 1 qual vale.
2. SO e navegadores das máquinas do lab.
3. Caminhos do micro-roteiro (Frente 1) e dos slides offline (Frente 3).
4. Número esperado de participantes e de bancadas.
