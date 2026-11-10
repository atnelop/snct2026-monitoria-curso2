# Kit de treinamento dos monitores

Oito cópias do Starter Kit, cada uma com **uma** alteração. Servem para o
monitor treinar a achar a causa pelo sintoma e pelo Console (F12), sem tocar no
teclado de quem está sendo atendido.

| Pasta | Conteúdo |
| --- | --- |
| `variante-1/` a `variante-8/` | Cópia do kit com uma alteração e o `GABARITO.md` |
| `gabaritos.json` | Resumo dos gabaritos, usado por `ferramentas/rodizio-ensaio.py` |
| `FALHAS-SEM-ARQUIVO.md` | Roteiro para simular falhas que não cabem num arquivo |

Os nomes das pastas não dizem qual é o erro, de propósito. Nem toda variante
tem erro: uma delas está correta.

## Cuidados

1. **Os gabaritos são só da equipe organizadora.** Para o ensaio, entregue aos
   monitores as cópias de `saida/TREINO/`, que saem sem `GABARITO.md`.
2. **Nada daqui vai para o pen-drive dos participantes.** O Plano B copia
   apenas `bancada/triagem.html`.
3. Não edite as variantes à mão. Elas são geradas a partir de
   `vendor/starter-kit`.

## Como gerar de novo

Se a Frente 2 atualizar o kit:

```bash
node ferramentas/gerar-treino-erros.js
```

O gerador recria as 8 pastas, abre cada uma no Chromium, confere se o Console
mostra o que o gabarito diz e reescreve os `GABARITO.md`. Se o kit tiver mudado
no trecho alterado, o gerador avisa e é preciso revisar
`ferramentas/testes-kit/treino/variantes.js`.

Para conferir sem gerar:

```bash
cd ferramentas/testes-kit && npx playwright test --project=treino
```

## Como usar no ensaio

1. Sorteie 3 variantes por monitor: `python3 ferramentas/rodizio-ensaio.py Ana Bia Caio`.
2. Uma pessoa faz o papel de participante, abre a variante e diz só o sintoma
   ("não aparece nada").
3. O monitor em treino conduz o atendimento com as mãos atrás das costas.
4. Quem avalia cronometra até o monitor **apontar a causa** e anota na ficha.
