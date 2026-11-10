# Falhas que não cabem num arquivo

Quatro situações comuns na oficina que não dá para entregar como "variante".
Para cada uma: como simular no ensaio, como o monitor reconhece e o que dizer.
Em todas vale a regra: **mãos atrás das costas**.

## 1. Arquivo editado e não salvo

**Como simular:** quem faz o papel de participante abre o kit original no VS
Code, muda o título no `index.html` e **não salva**. Depois recarrega o
navegador e diz: "mudei e não mudou nada".

**Como reconhecer:** o Console está limpo. No VS Code, a aba do arquivo mostra
uma bolinha no lugar do "x".

**O que dizer:** "Olhe a aba do arquivo no VS Code. O que tem ao lado do
nome?" Depois: "Essa bolinha quer dizer que ainda não foi salvo. Qual é o
atalho para salvar?" (Ctrl+S). Peça para recarregar a página (F5).

**Para evitar que se repita:** sugira à pessoa conferir a bolinha sempre antes
de ir ao navegador.

## 2. Navegador mostrando versão antiga (cache)

**Como simular:** é difícil forçar com arquivo local. No ensaio, apenas
descreva o caso: "salvei, recarreguei com F5 e continua igual", normalmente no
site já publicado ou no CSS.

**Como reconhecer:** o arquivo está salvo (sem bolinha), o Console está limpo e
a pasta aberta é a certa, mas a tela mostra o conteúdo antigo.

**O que dizer:** "Vamos pedir para o navegador buscar tudo de novo: segure Ctrl
e Shift e aperte R." Se resolver, explique em uma frase: o navegador guarda uma
cópia para abrir mais rápido.

**Se não resolver:** confira se a pasta aberta no VS Code é a mesma do
navegador. Peça para a pessoa ler a barra de endereço e comparar com o caminho
da pasta no VS Code. É comum editar a cópia da Área de Trabalho e abrir a do
pen-drive, ou abrir o arquivo de dentro do `.zip` sem extrair.

## 3. GitHub Pages com erro 404

Há duas causas. O monitor precisa descobrir qual é antes de orientar.

**Causa A: `index.html` fora da raiz.** A pessoa enviou a pasta inteira, e o
arquivo ficou em `starter-kit-painel-verde/index.html` dentro do repositório.

- Como simular: num repositório de teste, envie a pasta em vez dos arquivos.
- Como reconhecer: na página do repositório, a primeira coisa que aparece é
  uma pasta, e não o `index.html`.
- O que dizer: "Abra a página do seu repositório. O `index.html` aparece logo
  na primeira lista, ou está dentro de uma pasta?" Oriente a enviar os
  arquivos de dentro da pasta (o `index.html` e as pastas `css` e `js`).

**Causa B: publicação ainda em andamento.** O site leva de 1 a 2 minutos para
ficar pronto depois de cada envio.

- Como simular: abra o endereço do site logo depois de ativar o Pages.
- Como reconhecer: o `index.html` está na raiz e a aba "Actions" do
  repositório mostra uma bolinha amarela girando.
- O que dizer: "Está tudo certo, o GitHub ainda está publicando. Veja na aba
  Actions: quando a bolinha ficar verde, recarregue a página."

**Atenção ao endereço:** o repositório do kit se chama `sntc2026-...` (com
"tc"). Quem digitar "snct" cai em 404. Use sempre o QR Code ou o link.

## 4. Código de verificação (2FA) do GitHub não chega

**Como simular:** não dá para simular. No ensaio, combine apenas quem faz o
quê.

**Como reconhecer:** a pessoa está parada na tela que pede um código enviado
por e-mail ou aplicativo, e o código não chega (ou ela não tem acesso ao
e-mail no laboratório).

**O que dizer:** "Isso acontece e não é culpa sua. Vou chamar quem cuida das
contas." Chame o monitor de **suporte**.

**O que o suporte faz:** entrega uma das contas de contingência preparadas
pela equipe e anota qual foi usada. A pessoa publica o site por ela e, depois
da oficina, pode refazer na própria conta com calma.

**O que não fazer:** não insista em várias tentativas (o GitHub bloqueia), não
peça a senha do e-mail da pessoa e não digite por ela.
