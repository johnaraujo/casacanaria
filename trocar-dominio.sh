#!/usr/bin/env bash
# Troca o domínio do site em todos os arquivos.
# Uso: ./trocar-dominio.sh casacaju.com.br
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Uso: $0 <dominio>    (ex.: $0 casacaju.com.br)" >&2
  exit 1
fi

NOVO="$1"
NOVO="${NOVO#http://}"; NOVO="${NOVO#https://}"; NOVO="${NOVO%/}"
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$BASE_DIR"

# descobre a URL atual a partir do canonical
ATUAL=$(grep -o 'rel="canonical" href="[^"]*"' index.html | sed 's/.*href="//;s/"$//')
ATUAL="${ATUAL%/}"

echo "De : $ATUAL"
echo "Para: https://$NOVO"

for arquivo in index.html sitemap.xml robots.txt README.md; do
  [ -f "$arquivo" ] || continue
  perl -pi -e "s{\Q$ATUAL\E}{https://$NOVO}g" "$arquivo"
done

echo "$NOVO" > CNAME

echo
echo "Pronto. Agora:"
echo "  1. git add -A && git commit -m 'aponta para $NOVO' && git push"
echo "  2. Settings > Pages > Custom domain: $NOVO (e marque Enforce HTTPS)"
echo "  3. No DNS do domínio, aponte os registros A para o GitHub Pages:"
echo "     185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153"
echo "     e um CNAME 'www' para johnaraujo.github.io"
