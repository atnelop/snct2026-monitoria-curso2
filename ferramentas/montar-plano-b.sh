#!/usr/bin/env bash
# Monta o pacote do Plano B Offline em saida/PLANO-B/ (Fase 2 do PLANO.md).
#
# Uso:
#   bash ferramentas/montar-plano-b.sh [--micro-roteiro arquivo.pdf] [--slides pasta-ou-arquivo]
#
# Tambem aceita as variaveis MICRO_ROTEIRO e SLIDES.
# Depois de montar, copie TODO o conteudo de saida/PLANO-B/ para o pen-drive e
# rode "bash verificar-plano-b.sh" a partir do pen-drive.
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KIT="$RAIZ/vendor/starter-kit"
DESTINO="$RAIZ/saida/PLANO-B"
NOME="starter-kit-painel-verde"
MICRO_ROTEIRO="${MICRO_ROTEIRO:-}"
SLIDES="${SLIDES:-}"

while [ $# -gt 0 ]; do
  case "$1" in
    --micro-roteiro) MICRO_ROTEIRO="${2:?faltou o caminho do micro-roteiro}"; shift 2 ;;
    --slides) SLIDES="${2:?faltou o caminho dos slides}"; shift 2 ;;
    -h|--ajuda) sed -n '2,9p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Opcao desconhecida: $1" >&2; exit 2 ;;
  esac
done

erro() { echo "ERRO: $*" >&2; exit 1; }

[ -f "$KIT/index.html" ] || erro "kit nao encontrado em vendor/starter-kit. Rode:
  git clone --depth 1 https://github.com/fleithpi/sntc2026-starter-kit-curso2 vendor/starter-kit"
command -v sha256sum >/dev/null || erro "sha256sum nao encontrado"
[ -z "$MICRO_ROTEIRO" ] || [ -f "$MICRO_ROTEIRO" ] || erro "micro-roteiro nao encontrado: $MICRO_ROTEIRO"
[ -z "$SLIDES" ] || [ -e "$SLIDES" ] || erro "slides nao encontrados: $SLIDES"

PENDENCIAS=()

echo "1/6 Limpando $DESTINO"
rm -rf "$DESTINO"
mkdir -p "$DESTINO/$NOME" "$DESTINO/materiais" "$DESTINO/bancada"

echo "2/6 Copiando o kit (sem .git e .github)"
(cd "$KIT" && tar --exclude=.git --exclude=.github -cf - .) | (cd "$DESTINO/$NOME" && tar -xf -)

echo "3/6 Gerando $NOME.zip com a pasta na raiz"
if command -v zip >/dev/null; then
  (cd "$DESTINO" && zip -q -r -X "$NOME.zip" "$NOME")
else
  (cd "$DESTINO" && python3 -m zipfile -c "$NOME.zip" "$NOME")
fi

echo "4/6 Copiando materiais e triagem"
if [ -n "$MICRO_ROTEIRO" ]; then
  cp "$MICRO_ROTEIRO" "$DESTINO/materiais/micro-roteiro.pdf"
else
  PENDENCIAS+=("materiais/micro-roteiro.pdf: falta o PDF do micro-roteiro (Frente 1)")
fi
if [ -n "$SLIDES" ]; then
  if [ -d "$SLIDES" ]; then
    mkdir -p "$DESTINO/materiais/slides"
    (cd "$SLIDES" && tar --exclude=.git --exclude=.github -cf - .) | (cd "$DESTINO/materiais/slides" && tar -xf -)
  else
    cp "$SLIDES" "$DESTINO/materiais/"
  fi
else
  PENDENCIAS+=("materiais/slides: faltam os slides offline (Frente 3)")
fi
if [ -f "$RAIZ/bancada/triagem.html" ]; then
  cp "$RAIZ/bancada/triagem.html" "$DESTINO/bancada/triagem.html"
else
  PENDENCIAS+=("bancada/triagem.html: falta a tela de triagem dos monitores (Fase 4)")
fi
# pastas vazias somem em alguns pen-drives; so mantemos as que tem conteudo
rmdir "$DESTINO/materiais" "$DESTINO/bancada" 2>/dev/null || true

echo "5/6 Escrevendo LEIA-ME.txt"
VERSAO_KIT="$(git -C "$KIT" log -1 --format='%h de %ad' --date=format:'%d/%m/%Y' 2>/dev/null || echo desconhecida)"
cat > "$DESTINO/LEIA-ME.txt" <<LEIAME
PAINEL VERDE - SNCT 2026 - IFSC GAROPABA
Use este pen-drive se a internet estiver lenta ou fora do ar.

1. Copie a pasta "$NOME" para a Area de Trabalho do computador.
2. Abra a pasta copiada e de dois cliques em "index.html".
   A pagina "Onde Descartar em Garopaba?" abre no navegador.
3. Para editar, abra a mesma pasta no VS Code (Arquivo > Abrir Pasta).
4. O roteiro da oficina e os slides estao na pasta "materiais".
5. Ficou com duvida? Levante a mao e chame um monitor.

Devolva o pen-drive ao monitor depois de copiar a pasta.

--
Para a equipe: confira o pen-drive com "bash verificar-plano-b.sh".
Kit: versao $VERSAO_KIT. Pacote montado em $(date '+%d/%m/%Y %H:%M').
LEIAME

cp "$RAIZ/ferramentas/verificar-plano-b.sh" "$DESTINO/verificar-plano-b.sh"

if [ ${#PENDENCIAS[@]} -gt 0 ]; then
  {
    echo "ESTE PEN-DRIVE ESTA INCOMPLETO. Falta:"
    echo
    for p in "${PENDENCIAS[@]}"; do echo "- $p"; done
    echo
    echo "Monte de novo com ferramentas/montar-plano-b.sh quando os arquivos chegarem."
  } > "$DESTINO/PENDENCIAS.txt"
fi

echo "6/6 Calculando SHA256SUMS.txt"
(cd "$DESTINO" && find . -type f ! -name SHA256SUMS.txt -print0 | LC_ALL=C sort -z | xargs -0 sha256sum > SHA256SUMS.txt)

echo
echo "Pronto: $DESTINO ($(wc -l < "$DESTINO/SHA256SUMS.txt") arquivos, $(du -sh "$DESTINO" | cut -f1))"
if [ ${#PENDENCIAS[@]} -gt 0 ]; then
  echo
  echo "ATENCAO: pacote INCOMPLETO. Pendencias:"
  for p in "${PENDENCIAS[@]}"; do echo "  - $p"; done
fi
