# Checklist do Moodle e da Pesquisa de Satisfação (Fase 6)

Sala do Curso 2: https://moodle.ifsc.edu.br/course/view.php?id=2664

Quem faz: Membro A, com papel de **Professor** na sala. A configuração é
manual; este arquivo traz o passo a passo e os textos prontos para copiar.

> Os nomes dos menus podem mudar um pouco conforme a versão do Moodle do IFSC.
> Este roteiro não foi executado na sala real: se algum nome não bater, procure
> o item mais parecido e anote aqui a diferença.

## Parte 1: acesso dos participantes

### 1.1 Autoinscrição com chave (estudantes do IFSC)

- [ ] Abrir a sala e entrar em **Participantes**.
- [ ] No seletor do topo da página, escolher **Métodos de inscrição**.
- [ ] Se **Autoinscrição (Estudante)** não estiver na lista, usar "Adicionar método" e escolher **Autoinscrição**.
- [ ] Clicar no ícone de olho para **ativar** o método (o olho não pode estar riscado).
- [ ] Clicar na engrenagem para editar e preencher:

| Campo | Valor |
| --- | --- |
| Permitir autoinscrições | Sim |
| Chave de inscrição | `SNCT2026` |
| Papel atribuído por padrão | Estudante |

- [ ] Salvar.

### 1.2 Acesso de visitante (público externo, sem conta)

- [ ] Ainda em **Métodos de inscrição**, localizar **Acesso como visitante** (adicionar, se não existir).
- [ ] Ativar com o ícone de olho.
- [ ] Editar e deixar o campo **Senha** vazio.
- [ ] Salvar.
- [ ] Em **Configurações** da sala, conferir que **Visibilidade do curso** está em "Mostrar".

### 1.3 Testes de acesso (em janela anônima)

- [ ] Sem fazer login: abrir o endereço da sala. Deve aparecer a opção de entrar como visitante e, depois, o conteúdo da Seção 1.
- [ ] Como visitante: baixar o `starter-kit-painel-verde.zip` e o PDF do micro-roteiro.
- [ ] Com uma conta de estudante que ainda não está na sala: entrar e digitar a chave `SNCT2026`. A inscrição deve funcionar.
- [ ] Digitar uma chave errada: deve ser recusada.
- [ ] Repetir o primeiro teste numa máquina do laboratório.

## Parte 2: Pesquisa de Satisfação na Seção 4

### 2.1 Criar a atividade

- [ ] Ativar o **Modo de edição**.
- [ ] Na **Seção 4 (Avaliação & Certificado)**, clicar em **Adicionar uma atividade ou recurso**.
- [ ] Escolher **Pesquisa** (em inglês, *Feedback*).
  Atenção: não é "Pesquisa de avaliação", nem "Questionário", nem "Escolha".
- [ ] Preencher:

| Campo | Valor |
| --- | --- |
| Nome | `Pesquisa de Satisfação` |
| Descrição | `São 3 perguntas rápidas sobre a oficina de hoje. Não pedimos nome nem e-mail.` |
| Registrar nomes de usuários | Anônimo |
| Permitir múltiplos envios | Não |
| Mensagem após o envio | `Obrigado! Sua resposta foi registrada.` |

- [ ] Salvar e mostrar.

### 2.2 Adicionar as 3 perguntas

Na atividade, abrir a aba **Editar questões** e adicionar, nesta ordem:

**Pergunta 1** · tipo **Múltipla escolha**, resposta única · Obrigatória: **Sim**

```text
De 1 a 5, o quanto o Micro-Roteiro e a explicação ajudaram você a colocar seu projeto no ar?
```

Valores de múltipla escolha (um por linha):

```text
1
2
3
4
5 (Excelente)
```

**Pergunta 2** · tipo **Múltipla escolha**, resposta única · Obrigatória: **Sim**

```text
Você conseguiu abrir o projeto publicado no seu smartphone via QR Code?
```

Valores de múltipla escolha (um por linha):

```text
Sim, abriu perfeitamente no celular!
Abriu no computador do laboratório, mas não testei no celular.
Tive dificuldade na etapa do GitHub Pages.
```

**Pergunta 3** · tipo **Resposta de texto curta** · Obrigatória: **Não**

```text
O que você mais gostou na oficina de hoje e que tema gostaria de ver na próxima edição?
```

- [ ] Conferir que há exatamente 3 perguntas, na ordem acima.
- [ ] Na aba de visualização, conferir a ortografia.

### 2.3 Resposta de teste no Moodle

- [ ] Usar "Mudar papel para... Estudante" (ou uma conta de estudante) e enviar 1 resposta.
- [ ] Voltar ao papel de Professor e abrir a aba **Análise**: a resposta aparece.
- [ ] Na aba **Mostrar respostas**, apagar a resposta de teste antes do evento.
- [ ] Copiar o endereço da atividade (termina em `mod/feedback/view.php?id=...`) e guardar.

### 2.4 Quem não tem conta

Em geral, **visitantes não conseguem enviar respostas** na atividade Pesquisa
do Moodle: só usuários inscritos. Por isso existe o Google Forms espelho.

- [ ] Testar como visitante se a Pesquisa aceita resposta. Anotar o resultado aqui: ____________
- [ ] Logo abaixo da Pesquisa, adicionar um recurso **URL** com o nome
      `Pesquisa de Satisfação (sem login)` apontando para o Forms (Parte 3).

## Parte 3: Google Forms espelho

O arquivo `ferramentas/forms-espelho.gs` cria o formulário com as mesmas 3
perguntas, sem coleta de e-mail, com as respostas numa planilha.

- [ ] Entrar em https://script.google.com com a conta Google **da equipe** (de preferência a institucional).
- [ ] Clicar em **Novo projeto**, apagar o conteúdo do editor e colar o arquivo `forms-espelho.gs` inteiro.
- [ ] Escolher a função `criarFormsEspelho` e clicar em **Executar**.
- [ ] Aceitar o pedido de autorização (aparece só na primeira vez).
- [ ] Abrir o **Registro de execução** e copiar os 3 endereços: edição, planilha e o "ENDEREÇO PARA O QR CODE".
- [ ] Executar **uma vez só**: cada execução cria outro formulário.

Conferir na tela do formulário (aba **Configurações**):

- [ ] "Coletar endereços de e-mail": **Não coletar**.
- [ ] "Restringir aos usuários da organização": **desligado** (se a conta for institucional).
- [ ] "Limitar a 1 resposta": **desligado**.
- [ ] O formulário está **publicado** e aceitando respostas.

Teste:

- [ ] Abrir o endereço público numa janela anônima, sem login, e enviar 1 resposta.
- [ ] Conferir que a resposta chegou à planilha, sem nome e sem e-mail.
- [ ] Apagar a resposta de teste (aba **Respostas** do formulário).

## Parte 4: QR Code e entrega à Frente 3

Com o endereço do Forms em mãos:

```bash
python3 ferramentas/gerar-qrcodes.py --pesquisa COLE_AQUI_O_ENDERECO_DO_FORMS
node ferramentas/gerar-impressos.js
```

- [ ] Ler `saida/qr/qr-pesquisa.png` em 2 celulares diferentes: abre o formulário.
- [ ] Enviar `saida/qr/qr-pesquisa.png` e o endereço à **Frente 3** (Tela 8 dos slides).
- [ ] Conferir que o cartaz (`saida/impressos/cartaz-acesso.pdf`) saiu com o QR da pesquisa.
- [ ] Registrar os endereços na Central de Demandas do dashboard da UC.

Opcional, se a equipe quiser também um QR direto para a atividade do Moodle:

```bash
python3 ferramentas/gerar-qrcodes.py --pesquisa-moodle COLE_AQUI_O_ENDERECO_DA_ATIVIDADE
```

## Decisão para a equipe: qual endereço vai na Tela 8

A Tela 8 tem espaço para um QR Code. Sugestão: **o do Forms espelho**, porque
abre para qualquer pessoa, sem login, no celular. A atividade do Moodle fica na
Seção 4 para quem já está logado na sala. As respostas dos dois canais são
somadas na Fase 7.

Risco de usar os dois canais: a mesma pessoa pode responder duas vezes. O
monitor de registro deve orientar: "responda uma vez só, pelo QR Code".

## Sobre o texto das perguntas

No Roteiro SNCT 04 as perguntas aparecem sem acentos ("voce", "explicacao"),
porque estão dentro de um quadro de código. Aqui as palavras são as mesmas, com
a acentuação correta, já que o texto vai para o público. O texto de referência
fica em `ferramentas/pesquisa.json` e é o mesmo no Moodle e no Forms; a Fase 7
depende de os dois canais terem perguntas idênticas.

## Aceite da Fase 6

| Item | Feito por | Data | Resultado |
| --- | --- | --- | --- |
| Chave `SNCT2026` testada | | | |
| Acesso de visitante testado | | | |
| 1 resposta de teste no Moodle | | | |
| 1 resposta de teste no Forms | | | |
| Link e QR enviados à Frente 3 | | | |
