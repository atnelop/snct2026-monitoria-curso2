#!/usr/bin/env bash
# Confere um pen-drive do Plano B. Rode a partir do proprio pen-drive:
#
#   bash verificar-plano-b.sh            confere e abre o kit no navegador
#   bash verificar-plano-b.sh --sem-abrir   so confere
#
# Confere: arquivos e hashes (SHA256SUMS.txt), ausencia de .git e .github
# (inclusive dentro do zip) e pendencias do pacote.
set -uo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")" || exit 1
NOME="starter-kit-painel-verde"
ABRIR=1
[ "${1:-}" = "--sem-abrir" ] && ABRIR=0

FALHAS=0
AVISOS=0
ok()    { echo "  [OK]    $*"; }
falha() { echo "  [FALHA] $*"; FALHAS=$((FALHAS + 1)); }
aviso() { echo "  [AVISO] $*"; AVISOS=$((AVISOS + 1)); }

echo "Verificando o Plano B em: $(pwd)"
echo

echo "1. Arquivos principais"
for item in "$NOME/index.html" "$NOME/css/estilo.css" "$NOME/js/app.js" "$NOME.zip" LEIA-ME.txt SHA256SUMS.txt; do
  if [ -f "$item" ]; then ok "$item"; else falha "faltando: $item"; fi
done

echo "2. Hashes (SHA256SUMS.txt)"
if [ ! -f SHA256SUMS.txt ]; then
  falha "sem SHA256SUMS.txt nao da para conferir os arquivos"
elif ! command -v sha256sum >/dev/null; then
  falha "comando sha256sum nao encontrado nesta maquina"
else
  SAIDA="$(sha256sum -c SHA256SUMS.txt 2>&1)"
  if [ $? -eq 0 ]; then
    ok "$(wc -l < SHA256SUMS.txt) arquivos conferem"
  else
    echo "$SAIDA" | grep -v ': OK$' | sed 's/^/          /'
    falha "ha arquivo alterado, corrompido ou faltando"
  fi
  # arquivos no pen-drive que nao estao na lista
  EXTRAS="$(find . -type f ! -name SHA256SUMS.txt ! -path './System Volume Information/*' ! -path './.Trash*' | LC_ALL=C sort \
    | while IFS= read -r f; do grep -qF "  $f" SHA256SUMS.txt || echo "$f"; done)"
  if [ -n "$EXTRAS" ]; then
    echo "$EXTRAS" | sed 's/^/          /'
    aviso "arquivos a mais no pen-drive (fora da lista)"
  fi
fi

echo "3. Sem .git e .github"
ACHADOS="$(find . \( -name .git -o -name .github \) 2>/dev/null)"
if [ -z "$ACHADOS" ]; then ok "nenhuma pasta .git ou .github"; else echo "$ACHADOS" | sed 's/^/          /'; falha "pasta .git ou .github encontrada"; fi
if [ -f "$NOME.zip" ]; then
  if command -v unzip >/dev/null; then LISTA="$(unzip -Z1 "$NOME.zip" 2>/dev/null)"
  elif command -v python3 >/dev/null; then LISTA="$(python3 -c 'import sys,zipfile; print("\n".join(zipfile.ZipFile(sys.argv[1]).namelist()))' "$NOME.zip" 2>/dev/null)"
  else LISTA=""; aviso "sem unzip nem python3: conteudo do zip nao conferido"; fi
  if [ -n "$LISTA" ]; then
    if echo "$LISTA" | grep -qE '(^|/)\.git(hub)?(/|$)'; then falha "o zip contem .git ou .github"; else ok "zip sem .git e .github"; fi
    if echo "$LISTA" | grep -qvE "^$NOME/"; then falha "o zip tem arquivos fora da pasta $NOME/"; else ok "zip com a pasta $NOME/ na raiz"; fi
    if echo "$LISTA" | grep -qx "$NOME/index.html"; then ok "zip contem $NOME/index.html"; else falha "zip sem $NOME/index.html"; fi
  fi
fi

echo "4. Pendencias do pacote"
if [ -f PENDENCIAS.txt ]; then
  grep '^- ' PENDENCIAS.txt | sed 's/^/          /'
  aviso "pacote incompleto (veja PENDENCIAS.txt)"
else
  ok "nenhuma pendencia"
fi

echo
if [ "$FALHAS" -gt 0 ]; then
  echo "RESULTADO: REPROVADO ($FALHAS falha(s), $AVISOS aviso(s)). Nao use este pen-drive."
  exit 1
fi
if [ "$AVISOS" -gt 0 ]; then
  echo "RESULTADO: OK COM AVISOS ($AVISOS aviso(s))."
else
  echo "RESULTADO: OK."
fi

if [ "$ABRIR" -eq 1 ]; then
  echo
  echo "Abrindo $NOME/index.html no navegador padrao..."
  if command -v xdg-open >/dev/null; then
    xdg-open "$NOME/index.html" >/dev/null 2>&1 &
  else
    echo "Nao achei o xdg-open. Abra o arquivo com dois cliques: $(pwd)/$NOME/index.html"
  fi
  echo "Confira na tela: 3 cartoes aparecem e os botoes de filtro respondem."
fi
exit 0
