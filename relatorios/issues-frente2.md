# Rascunhos de issues para a Frente 2

Repositório: https://github.com/fleithpi/sntc2026-starter-kit-curso2 (somente
leitura para a Frente 4). **Nenhuma issue foi aberta.** Estes textos são
rascunhos para revisar e enviar à Frente 2, pelo GitHub ou pessoalmente.

Origem: [auditoria-kit.md](auditoria-kit.md), commit `8d03680` do kit.

| # | Título | Gravidade | Situação |
| --- | --- | --- | --- |
| 1 | Botão "Oleo de Cozinha" mostra grade vazia | Alta | Rascunho |
| 2 | Botões de filtro pequenos para toque no celular | Baixa | Rascunho |
| 3 | `js/app.js` diferente do PDF em 3 linhas | Média | Rascunho |
| 4 | Nome do repositório usa "sntc" em vez de "snct" | Média | Rascunho |
| 5 | Zip do GitHub não é o `starter-kit-painel-verde.zip` | Média | Rascunho |
| 6 | README sem instruções para o participante | Baixa | Rascunho |

---

## Issue 1: Botão "Oleo de Cozinha" mostra grade vazia

**Onde:** `index.html`, linha 25; `js/app.js`, linhas 16 a 22.

**O que acontece:** ao clicar em "Oleo de Cozinha", a grade fica em branco. O
botão chama `filtrarEcopontos('Oleo')`, mas nenhum item de `LOCAIS_COLETA` tem
`categoria: "Oleo"`. O local "Coleta de Vidro e Oleo — Associacao Comunitaria"
está com `categoria: "Vidro"`.

**Como reproduzir:** abrir `index.html` e clicar em "Oleo de Cozinha".

**Esperado:** pelo menos 1 cartão, ou uma mensagem dizendo que não há locais
nessa categoria.

**Observação:** o código do PDF (Passo 2.6) tem o mesmo comportamento. Para
manter a regra "código 100% igual ao PDF", a correção precisa entrar no kit e
no roteiro ao mesmo tempo (combinar com a Frente 1).

**Sugestões (escolher uma):**

1. Acrescentar um quarto local com `categoria: "Oleo"`.
2. Assumir o caso como parte da oficina: o participante cadastra o primeiro
   ponto de coleta de óleo no Bloco 2. Nesse caso, avisar no micro-roteiro que
   o botão começa vazio.

---

## Issue 2: Botões de filtro pequenos para toque no celular

**Onde:** `css/estilo.css`, regra `.btn-filtro` (`padding: 8px 16px`).

**O que acontece:** em tela de 360x740 os botões têm 35 px de altura. A
recomendação usual para área de toque é 44 px.

**Esperado:** altura mínima de 44 px, por exemplo com `min-height: 44px` ou
`padding: 12px 16px`.

**Observação:** o CSS é igual ao do PDF (Passo 2.7); mudar aqui exige mudar o
roteiro. Não impede a oficina. Não há rolagem horizontal no celular.

---

## Issue 3: `js/app.js` diferente do PDF em 3 linhas

**Onde:** `js/app.js`.

**O que acontece:** a regra da revisão cruzada é "código 100% igual ao PDF".
Comparando com o Passo 2.6:

1. Falta a primeira linha do PDF:
   `// BLOCO 2: Adicione novos ecopontos ou pontos de entrega voluntaria de Garopaba`.
   É o marcador que mostra ao participante onde editar.
2. O `mapaUrl` do terceiro local é `https://maps.app.goo.gl/r5PxGL6jaeWf9rwJ7`
   no repositório e `https://maps.google.com/?q=Praia+da+Ferrugem+Garopaba` no
   PDF.

**Esperado:** incluir o comentário `// BLOCO 2` e decidir qual endereço vale
(o do PDF segue o mesmo formato dos outros dois locais e é mais fácil de o
participante imitar).

**Também vale alinhar (formatação):** recuo de 4 espaços no kit e 2 no PDF;
CSS com uma declaração por linha no kit (86 linhas) e compacto no PDF (25
linhas); o título do Passo 2.6 fala em "32 linhas", mas o arquivo tem 40 no
kit e 44 no PDF. Detalhes em [divergencias-pdf.md](divergencias-pdf.md).

---

## Issue 4: Nome do repositório usa "sntc" em vez de "snct"

**Onde:** nome do repositório e endereço do deploy
(`fleithpi.github.io/sntc2026-starter-kit-curso2/`).

**O que acontece:** o evento é SNCT e a chave do Moodle é `SNCT2026`, mas o
repositório se chama `sntc2026-...`. Quem digitar o endereço à mão vai trocar
as letras e cair num 404.

**Sugestões (escolher uma):**

1. Renomear para `snct2026-starter-kit-curso2`. O GitHub redireciona o
   endereço antigo do repositório, mas **o endereço do Pages muda** e o antigo
   deixa de funcionar: seria preciso atualizar Moodle, slides e QR Codes.
2. Manter o nome e nunca pedir para digitar: usar sempre link clicável ou QR
   Code. A Frente 4 seguirá este caminho se nada mudar.

Decidir antes do ensaio de 21/11, porque os QR Codes serão impressos.

---

## Issue 5: Zip do GitHub não é o `starter-kit-painel-verde.zip`

**Onde:** botão "Code > Download ZIP" do repositório.

**O que acontece:** o arquivo baixado se chama
`sntc2026-starter-kit-curso2-main.zip` e, ao extrair, cria a pasta
`sntc2026-starter-kit-curso2-main/`. O roteiro fala em
`starter-kit-painel-verde.zip` e na pasta `starter-kit-painel-verde/`.

**Esperado:** o participante encontra o arquivo e a pasta com os nomes do
roteiro.

**Sugestão:** publicar no Moodle (Seção 1) um `starter-kit-painel-verde.zip`
montado à mão, com a pasta `starter-kit-painel-verde/` na raiz e sem `.git`, e
orientar o download por lá em vez do botão do GitHub. A Frente 4 gera esse
mesmo pacote para o Plano B e pode compartilhar.

**Relacionado:** a branch `fleithpi-patch-1` contém só um arquivo
`Painel Verde.zip`. Se for sobra de upload, apagar para não confundir.

---

## Issue 6: README sem instruções para o participante

**Onde:** `README.md` (conteúdo atual: "Starter Kit").

**Esperado:** o Passo 2.4 do PDF descreve o README como "instruções curtas para
o participante da oficina". Sugestão: até 5 linhas dizendo como abrir o
`index.html`, onde ficam o Bloco 1 e o Bloco 2 e como publicar.
