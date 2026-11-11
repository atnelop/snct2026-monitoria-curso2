# Impressos e QR Codes (Fase 5)

- Data: 11/11/2026
- Fontes: `impressos/*.html` (com `impressos.css`)
- PDFs: `saida/impressos/` (gerados, fora do git)
- QR Codes: `saida/qr/` (gerados, fora do git)

## Situação

Os 6 impressos existem, cabem em 1 folha A4 e não têm letra menor que 14 pt.
Quatro deles ainda carregam um marcador visível de pendência e **não devem ser
impressos em quantidade** antes de a pendência ser resolvida.

| Impresso | Folha | Situação | O que falta |
| --- | --- | --- | --- |
| `lista-presenca` | A4 em pé | Pronto | nada |
| `escala-monitoria` | A4 deitada | Pronto | preencher nomes à mão |
| `termo-imagem-adulto` | A4 em pé | **Rascunho** | confirmar o modelo oficial com a Coordenação/Comunicação do IFSC |
| `termo-imagem-menor` | A4 em pé | **Rascunho** | idem |
| `mapa-bancadas` | A4 em pé | **Em branco** | auditoria das máquinas (Fase 3) |
| `cartaz-acesso` | A4 em pé | **Sem o QR da pesquisa** | endereço do formulário (Fase 6) |

### Sobre os termos de imagem

Os dois termos trazem no topo o marcador
`[CONFIRMAR MODELO OFICIAL COM COORDENAÇÃO/COMUNICAÇÃO DO IFSC]`. O texto é um
rascunho em linguagem simples: diz o que será registrado, para quê, e oferece
"autorizo" e "não autorizo". **Não cita lei nem cláusula jurídica**, de
propósito. Se o IFSC tiver formulário próprio, ele substitui estes arquivos.

### Sobre o mapa de bancadas

`impressos/mapa-bancadas.html` é gerado por `gerar-impressos.js`. Sem
`relatorios/mapa-maquinas.md`, sai um mapa em branco com 30 bancadas numeradas
em 6 colunas, para preencher à mão. A disposição real da sala não é conhecida;
a grade é só um ponto de partida.

Quando a Fase 3 gerar `relatorios/mapa-maquinas.md`, o mapa passa a mostrar
máquina e classificação. O gerador lê a primeira tabela que tenha uma coluna
"Bancada" e reconhece também "Hostname" (ou "Máquina"), "Classificação",
"Ilha" e "Monitor".

## QR Codes

| QR | Endereço | Situação |
| --- | --- | --- |
| `qr-moodle` | `https://moodle.ifsc.edu.br/course/view.php?id=2664` | Gerado |
| `qr-deploy` | `https://fleithpi.github.io/sntc2026-starter-kit-curso2/` | Gerado |
| `qr-pesquisa` | (sem endereço) | **Pendente** (Fase 6) |

Gerados com `segno`, sem internet, em SVG e PNG, com correção de erro nível M.
Os endereços ficam em `ferramentas/links.json` e nunca são digitados à mão (o
repositório do kit se chama "sntc2026", com "tc").

Conferência automática: os dois PNG foram decodificados por um leitor de QR em
software e devolveram exatamente os endereços acima. Isso não substitui o teste
com celulares.

O PNG da pesquisa para a Frente 3 (Tela 8) **ainda não existe**. Sai em
`saida/qr/qr-pesquisa.png` assim que houver endereço:

```bash
python3 ferramentas/gerar-qrcodes.py --pesquisa https://endereco-do-formulario
node ferramentas/gerar-impressos.js
```

## Como gerar tudo

```bash
pip install -r ferramentas/requirements.txt
python3 ferramentas/gerar-qrcodes.py
node ferramentas/gerar-impressos.js
```

`gerar-impressos.js` termina com erro se algum impresso passar de 1 página ou
tiver letra menor que 14 pt.

## Limites

1. Os PDFs foram conferidos na tela, não em papel. Margens e cortes dependem da
   impressora: imprimir 1 cópia de cada antes da tiragem.
2. A fonte usada é Liberation Sans (ou Arial, onde ela não existir). Em outra
   máquina a quebra de linha pode mudar; o gerador avisa se algum impresso
   passar de 1 página.
3. A lista de presença tem 30 linhas de 7,5 mm. Se a turma passar de 30,
   imprimir uma segunda folha (há o campo "Folha __ de __").
4. A lista pede e-mail (opcional) e os termos pedem nome: são dados pessoais em
   papel. Guardar com a coordenação e não fotografar para grupos de mensagem.

## Aceite manual

- [ ] Imprimir 1 cópia de cada PDF e conferir que nada foi cortado.
- [ ] Ler `qr-moodle` em 2 celulares diferentes: abre a sala do Curso 2.
- [ ] Ler `qr-deploy` em 2 celulares diferentes: abre o Painel Verde.
- [ ] Ler `qr-pesquisa` em 2 celulares diferentes (depois da Fase 6).
- [ ] Testar a chave `SNCT2026` na autoinscrição da sala.
- [ ] Confirmar o modelo dos termos de imagem e retirar o marcador.
- [ ] Enviar `saida/qr/qr-pesquisa.png` à Frente 3.

| QR | Celular 1 | Celular 2 | Quem testou | Data |
| --- | --- | --- | --- | --- |
| Moodle | | | | |
| Deploy | | | | |
| Pesquisa | | | | |
