#!/usr/bin/env python3
"""Sorteia variantes de treino para cada monitor e gera as fichas do ensaio.

Uso:
    python3 ferramentas/rodizio-ensaio.py Ana Bia Caio
    python3 ferramentas/rodizio-ensaio.py --arquivo monitores.txt --semente 21

Saida: saida/rodizio/fichas.html (uma ficha por monitor, para imprimir em A4).
A ficha fica com quem avalia e traz a resposta de cada variante.
Os nomes ficam so em saida/, que nao vai para o git.
"""
import argparse
import html
import json
import random
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
GABARITOS = RAIZ / "bancada" / "treino-erros" / "gabaritos.json"
DESTINO = RAIZ / "saida" / "rodizio"


def sortear(monitores, variantes, por_monitor, gerador):
    """Distribui as variantes de forma equilibrada, sem repetir para o mesmo monitor."""
    usos = {v["id"]: 0 for v in variantes}
    resultado = {}
    for nome in monitores:
        escolhidas = []
        for _ in range(por_monitor):
            disponiveis = [v for v in variantes if v["id"] not in {e["id"] for e in escolhidas}]
            menor = min(usos[v["id"]] for v in disponiveis)
            escolha = gerador.choice([v for v in disponiveis if usos[v["id"]] == menor])
            usos[escolha["id"]] += 1
            escolhidas.append(escolha)
        resultado[nome] = escolhidas
    return resultado


def ficha(nome, variantes):
    linhas = []
    for ordem, v in enumerate(variantes, start=1):
        console = v["console"][0] if v["console"] else "Console limpo"
        linhas.append(f"""
      <tr>
        <td class="centro">{ordem}</td>
        <td><strong>{html.escape(v["pasta"])}</strong><br>
            <span class="resposta">{html.escape(v["titulo"])}<br>
            {html.escape(v["arquivo"])}, linha {v["linha"]}<br>
            {html.escape(console)}</span></td>
        <td></td><td></td><td class="centro">S &nbsp; N</td><td class="centro">S &nbsp; N</td>
      </tr>""")
    return f"""
  <section class="ficha">
    <h1>Ensaio de monitoria · Painel Verde · SNCT 2026</h1>
    <p class="quem">Monitor em treino: <strong>{html.escape(nome)}</strong>
       &nbsp;&nbsp; Quem avaliou: ____________________ &nbsp;&nbsp; Data: ____/____</p>
    <p>Cronometre do momento em que o "participante" diz o sintoma até o monitor
       <strong>apontar a causa</strong>. Não mostre esta ficha ao monitor.</p>
    <table>
      <thead>
        <tr><th>Nº</th><th>Variante e resposta (só para quem avalia)</th><th>Tempo até apontar a causa</th>
            <th>O que o monitor disse ser a causa</th><th>Acertou?</th><th>Tocou no teclado ou mouse?</th></tr>
      </thead>
      <tbody>{"".join(linhas)}
      </tbody>
    </table>
    <p class="obs">Observações: ______________________________________________________________</p>
  </section>"""


def main():
    parser = argparse.ArgumentParser(description="Sorteia variantes de treino por monitor e gera fichas.")
    parser.add_argument("monitores", nargs="*", help="nomes dos monitores")
    parser.add_argument("--arquivo", help="arquivo de texto com um nome por linha")
    parser.add_argument("--por-monitor", type=int, default=3, help="variantes por monitor (padrao: 3)")
    parser.add_argument("--semente", type=int, help="numero para repetir o mesmo sorteio")
    args = parser.parse_args()

    monitores = list(args.monitores)
    if args.arquivo:
        monitores += [l.strip() for l in Path(args.arquivo).read_text(encoding="utf-8").splitlines() if l.strip()]
    if not monitores:
        parser.error("informe pelo menos um nome de monitor")
    if not GABARITOS.exists():
        sys.exit("ERRO: rode antes: node ferramentas/gerar-treino-erros.js")
    variantes = json.loads(GABARITOS.read_text(encoding="utf-8"))
    if not 1 <= args.por_monitor <= len(variantes):
        parser.error(f"--por-monitor deve ficar entre 1 e {len(variantes)}")

    sorteio = sortear(monitores, variantes, args.por_monitor, random.Random(args.semente))

    pagina = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Fichas do ensaio de monitoria</title>
<style>
  @page {{ size: A4 landscape; margin: 10mm; }}
  body {{ font-family: system-ui, sans-serif; font-size: 14pt; color: #000; }}
  .ficha {{ page-break-after: always; }}
  .ficha:last-child {{ page-break-after: auto; }}
  h1 {{ font-size: 18pt; margin-bottom: 6pt; }}
  p {{ margin: 6pt 0; }}
  table {{ width: 100%; border-collapse: collapse; margin-top: 8pt; }}
  th, td {{ border: 1px solid #000; padding: 5pt; vertical-align: top; }}
  th {{ font-size: 14pt; background: #e5e5e5; }}
  td {{ height: 24mm; }}
  th:nth-child(2) {{ width: 42%; }}
  th:nth-child(3) {{ width: 13%; }}
  th:nth-child(5), th:nth-child(6) {{ width: 10%; }}
  .centro {{ text-align: center; }}
  .resposta {{ font-size: 14pt; }}
  .obs {{ margin-top: 10pt; }}
</style>
</head>
<body>{"".join(ficha(nome, vs) for nome, vs in sorteio.items())}
</body>
</html>
"""
    DESTINO.mkdir(parents=True, exist_ok=True)
    saida = DESTINO / "fichas.html"
    saida.write_text(pagina, encoding="utf-8")

    for nome, vs in sorteio.items():
        print(f"{nome}: " + ", ".join(v["pasta"] for v in vs))
    print(f"\nFichas: {saida.relative_to(RAIZ)} (abra no navegador e imprima)")
    print("Entregue aos monitores as pastas de saida/TREINO/ (sem gabarito).")


if __name__ == "__main__":
    main()
