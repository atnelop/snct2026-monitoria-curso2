# Premissas da Frente 4 (Curso 2, Painel Verde)

Registradas na Fase 0, em 10/11/2026. Atualizar este arquivo sempre que uma
pendência for resolvida.

## Respostas

| # | Pergunta | Resposta | Situação |
| --- | --- | --- | --- |
| 1 | Sistema operacional do laboratório | Linux | Confirmado |
| 2 | Navegadores instalados | Chrome e Firefox | Confirmado (versões saem na Fase 3) |
| 3 | Número de bancadas | Entre 21 e 30 | Faixa informada; falta o número exato |
| 4 | Número esperado de participantes | Não informado | **Pendente** |
| 5 | `gh` (GitHub CLI) autenticado | Não se sabe | **Pendente** (conferir com `gh auth status`) |
| 6 | Caminho do micro-roteiro em PDF (Frente 1) | Ainda não disponível | **Pendente** |
| 7 | Caminho dos slides offline (Frente 3) | Ainda não disponível | **Pendente** |
| 8 | Stack do Curso 2 | Não confirmada | **Pendente** (ver abaixo) |

## Consequências para as próximas fases

1. Scripts de máquina (`montar-plano-b`, `verificar-plano-b`, `auditar-maquina`)
   serão escritos em **bash (`.sh`)**, sem privilégio de administrador.
2. A suíte de testes da Fase 1 roda em Chromium. Como o laboratório também tem
   Firefox, vale rodar a mesma suíte em Firefox.
3. Com 21 a 30 bancadas e a proporção de 1 monitor para 4 a 5 participantes, a
   escala precisa prever de 5 a 7 monitores se a sala lotar. A lista de
   presença de 30 linhas cobre a capacidade máxima.
4. Sem o micro-roteiro e os slides, a pasta `materiais/` do Plano B (Fase 2)
   fica com marcador de pendência até os arquivos chegarem.

## Pendência: stack do Curso 2

Há duas descrições diferentes do Curso 2:

- **Roteiro SNCT 02 (PDF da Frente 2), Seção 3:** JavaScript puro, com cartões
  responsivos, filtro por `.filter()` e link direto para o Google Maps, sem
  bibliotecas externas.
- **Dashboard da UC:** descreve o Curso 2 com jQuery, LocalStorage e cita
  IoT/ESP32.

O que o repositório do kit mostra hoje (commit `8d03680`, de 04/11/2026):
`index.html`, `css/estilo.css` e `js/app.js`, sem nenhuma ocorrência de jQuery
ou LocalStorage. Ou seja, o kit publicado segue o PDF da Frente 2.

Onde confirmar:

1. Com o Prof. André Moraes (quem define o conteúdo da oficina).
2. Com a Frente 1: o micro-roteiro precisa bater linha a linha com o kit.
3. No card do Curso 2 do dashboard da UC:
   https://chameoandre.github.io/CST-Sistemas-para-internet-programacao-para-internet-2/

Até a confirmação, a Frente 4 trabalha com o que está no repositório do kit
(JS puro).

## Referências

- Starter Kit (Frente 2, somente leitura): https://github.com/fleithpi/sntc2026-starter-kit-curso2
- Deploy do kit: https://fleithpi.github.io/sntc2026-starter-kit-curso2/
- Sala Moodle do Curso 2: https://moodle.ifsc.edu.br/course/view.php?id=2664
- Clone local do kit: `vendor/starter-kit/` (commit `8d03680`)
