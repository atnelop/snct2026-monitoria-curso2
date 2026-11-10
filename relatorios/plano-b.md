# Plano B Offline (Fase 2)

- Data: 10/11/2026
- Kit empacotado: commit `8d03680` (04/11/2026) de `vendor/starter-kit`
- Scripts: `ferramentas/montar-plano-b.sh` e `ferramentas/verificar-plano-b.sh` (bash, sem privilégio de administrador)

## Situação

O pacote é montado e verificado automaticamente, mas **ainda está incompleto**:
faltam 3 itens que dependem de outras entregas. Enquanto faltarem, o pacote
leva um arquivo `PENDENCIAS.txt` e o verificador termina com "OK COM AVISOS".

| Item do plano | Situação |
| --- | --- |
| `starter-kit-painel-verde/` sem `.git` e `.github` | Pronto |
| `starter-kit-painel-verde.zip` com a pasta na raiz | Pronto |
| `materiais/` com micro-roteiro em PDF | **Pendente** (Frente 1) |
| `materiais/` com slides offline | **Pendente** (Frente 3) |
| `bancada/triagem.html` | **Pendente** (Fase 4) |
| `LEIA-ME.txt` com até 5 passos | Pronto |
| `SHA256SUMS.txt` | Pronto |
| `verificar-plano-b.sh` dentro do pacote | Pronto |

## Como montar

```bash
bash ferramentas/montar-plano-b.sh
```

Quando o micro-roteiro e os slides chegarem:

```bash
bash ferramentas/montar-plano-b.sh --micro-roteiro caminho/micro-roteiro.pdf --slides caminho/pasta-dos-slides
```

O resultado fica em `saida/PLANO-B/` (não versionado). Copie **todo o conteúdo**
dessa pasta para a raiz de cada pen-drive.

## Como verificar um pen-drive

Com o pen-drive ligado na máquina do laboratório, abra um terminal na pasta do
pen-drive e rode:

```bash
bash verificar-plano-b.sh
```

O verificador:

1. confere se os arquivos principais existem;
2. confere os hashes de todos os arquivos com `SHA256SUMS.txt` e avisa se há
   arquivo a mais;
3. garante que não há `.git` nem `.github`, nem no pen-drive nem dentro do zip,
   e que o zip tem a pasta `starter-kit-painel-verde/` na raiz;
4. lista as pendências do pacote;
5. abre `starter-kit-painel-verde/index.html` no navegador padrão.

Termina com `RESULTADO: OK`, `OK COM AVISOS` ou `REPROVADO`. Use `--sem-abrir`
para só conferir, sem abrir o navegador.

## Testes feitos nesta fase

| Teste | Resultado |
| --- | --- |
| Montagem sem materiais | 8 arquivos, 3 pendências listadas |
| Montagem com micro-roteiro e pasta de slides de teste | Arquivos copiados para `materiais/`; `.git` dos slides removido; resta 1 pendência (triagem) |
| Verificador em cópia íntegra, em pasta com espaço no nome | OK COM AVISOS (só as pendências) |
| Verificador com arquivo alterado, arquivo apagado, arquivo a mais e pasta `.git` | REPROVADO, apontando cada problema |
| Suíte da Fase 1 contra `saida/PLANO-B/starter-kit-painel-verde/` | 6 passaram, 3 falharam |
| Suíte da Fase 1 contra a pasta extraída do zip | 6 passaram, 3 falharam |

As 3 falhas da suíte são as mesmas do kit original (botão "Oleo de Cozinha"
vazio, botões com 35 px de altura e 3 linhas de `js/app.js` diferentes do PDF),
já descritas em [auditoria-kit.md](auditoria-kit.md). O empacotamento não
introduziu nenhuma falha nova: o kit do Plano B se comporta igual ao do
repositório.

## O que não foi testado aqui

1. **A abertura no navegador.** A máquina onde os scripts foram escritos não
   tem `xdg-open`; só o caminho alternativo (mensagem pedindo para abrir com
   dois cliques) foi exercitado.
2. **Pen-drive de verdade.** Os testes usaram uma pasta comum. Pen-drives em
   FAT32 ou exFAT não guardam a permissão de execução, por isso a instrução é
   sempre `bash verificar-plano-b.sh`.
3. **Máquina do laboratório sem rede.** É o aceite manual abaixo.

## Aceite manual (antes do ensaio de 21/11)

Repetir para cada um dos 2 pen-drives, numa máquina do laboratório:

- [ ] Remontar o pacote com micro-roteiro, slides e triagem (sem `PENDENCIAS.txt`).
- [ ] Copiar o conteúdo de `saida/PLANO-B/` para a raiz do pen-drive e ejetar com segurança.
- [ ] Desconectar o cabo de rede da máquina (e desligar o Wi-Fi, se houver).
- [ ] Rodar `bash verificar-plano-b.sh`: resultado `OK`, sem avisos.
- [ ] A página abre com 3 cartões e os filtros "Reciclaveis", "Vidro" e "Eletronicos" respondem.
- [ ] Copiar a pasta para a Área de Trabalho, abrir no VS Code, mudar uma cor no `:root` e ver a mudança ao recarregar.
- [ ] Extrair o `starter-kit-painel-verde.zip` pelo gerenciador de arquivos e abrir o `index.html` extraído.
- [ ] Abrir `materiais/micro-roteiro.pdf` e os slides sem internet.
- [ ] Repetir no Firefox, se o navegador padrão for o Chrome (ou o contrário).

| Pen-drive | Máquina | Data | Quem testou | Resultado |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
