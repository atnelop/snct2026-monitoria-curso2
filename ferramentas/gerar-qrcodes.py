#!/usr/bin/env python3
"""Gera os QR Codes da oficina em SVG e PNG, sem internet.

Uso:
    python3 ferramentas/gerar-qrcodes.py
    python3 ferramentas/gerar-qrcodes.py --pesquisa https://forms.gle/...

Le os enderecos de ferramentas/links.json e grava em saida/qr/:
    qr-moodle.svg / .png     sala Moodle do Curso 2
    qr-deploy.svg / .png     deploy do Starter Kit
    qr-pesquisa.svg / .png   pesquisa de satisfacao (PNG vai para a Frente 3, Tela 8)

Correcao de erro nivel M. Depende da biblioteca segno (pip install segno).
Os enderecos sao sempre copiados de links.json, nunca digitados: o repositorio
do kit se chama "sntc2026" (com "tc"), e um erro de digitacao gera QR quebrado.
"""
import argparse
import json
import sys
from pathlib import Path

try:
    import segno
except ImportError:
    sys.exit("ERRO: falta a biblioteca segno. Rode: pip install -r ferramentas/requirements.txt")

RAIZ = Path(__file__).resolve().parent.parent
LINKS = RAIZ / "ferramentas" / "links.json"
DESTINO = RAIZ / "saida" / "qr"


def main():
    parser = argparse.ArgumentParser(description="Gera os QR Codes da oficina (SVG e PNG).")
    parser.add_argument("--pesquisa", help="endereco da pesquisa de satisfacao; grava em links.json")
    args = parser.parse_args()

    links = json.loads(LINKS.read_text(encoding="utf-8"))
    if args.pesquisa:
        links["pesquisa"]["url"] = args.pesquisa
        LINKS.write_text(json.dumps(links, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"links.json atualizado com a pesquisa: {args.pesquisa}")

    DESTINO.mkdir(parents=True, exist_ok=True)
    pendentes = []
    for chave, dados in links.items():
        url = dados.get("url")
        for antigo in DESTINO.glob(f"qr-{chave}.*"):
            antigo.unlink()
        if not url:
            pendentes.append(chave)
            print(f"[PENDENTE] qr-{chave}: sem endereco em links.json")
            continue
        if not url.startswith("https://"):
            sys.exit(f"ERRO: o endereco de '{chave}' precisa comecar com https:// ({url})")
        qr = segno.make(url, error="m", micro=False)
        qr.save(DESTINO / f"qr-{chave}.svg", scale=10, border=4, xmldecl=False, svgns=True, nl=False)
        qr.save(DESTINO / f"qr-{chave}.png", scale=12, border=4)
        print(f"[OK]       qr-{chave}.svg e .png  (versao {qr.version}, correcao {qr.error})  {url}")

    print(f"\nArquivos em: {DESTINO.relative_to(RAIZ)}/")
    if "pesquisa" in pendentes:
        print("Falta o QR da pesquisa: rode de novo com --pesquisa <endereco do Forms> (Fase 6).")
    else:
        print("Envie saida/qr/qr-pesquisa.png para a Frente 3 (Tela 8 dos slides).")


if __name__ == "__main__":
    main()
