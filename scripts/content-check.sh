#!/usr/bin/env bash
# Content gate for Max's daily PRs on premieralive.com.
# Usage: content-check.sh <files.tsv> <pr.diff>
#   files.tsv : one line per changed file, "<status>\t<filename>"
#   pr.diff   : unified diff of the pull request
# Exits 1 if any rule is broken. Only lines ADDED by the PR are inspected.
set -u
export LC_ALL=C.UTF-8

FILES="$1"
DIFF="$2"
fail=0
report() { echo ""; echo "FAIL: $1"; fail=1; }

if [ ! -s "$FILES" ] || [ ! -s "$DIFF" ]; then
  echo "FAIL: could not read the PR file list or diff (empty input)."
  exit 1
fi

# ---------- Rule 1: size ----------
count=$(grep -c . "$FILES" || true)
if [ "$count" -gt 15 ]; then
  report "PR changes $count files (limit is 15)."
fi

# ---------- Rule 2: no deleted or renamed files ----------
bad=$(awk -F'\t' '$1=="removed" || $1=="renamed" {print "    " $1 ": " $2}' "$FILES")
if [ -n "$bad" ]; then
  report "PR deletes or renames existing files."
  echo "$bad"
fi

# ---------- Rule 3: protected files ----------
prot=$(cut -f2 "$FILES" | grep -E '^(\.github/|scripts/content-check|src/config/analytics\.|package\.json$|package-lock\.json$|pnpm-lock\.yaml$|yarn\.lock$|bun\.lockb?$|next\.config\.|vercel\.json$|tsconfig\.json$|tailwind\.config\.|postcss\.config\.|\.env)|(^|/)(middleware|robots)\.' || true)
if [ -n "$prot" ]; then
  report "PR touches protected files (tracking, dependencies, config, CI)."
  echo "$prot" | sed 's/^/    /'
fi

# ---------- Rules 4+: scan added lines ----------
ADDED=$(mktemp)
grep '^+' "$DIFF" | grep -v '^+++ ' > "$ADDED" || true

check() {
  local label="$1" pattern="$2" opts="${3:-}"
  local hits
  hits=$(grep -nP $opts -- "$pattern" "$ADDED" | head -5 || true)
  if [ -n "$hits" ]; then
    report "$label"
    echo "$hits" | cut -c1-220 | sed 's/^/    /'
  fi
}

check "Eastern Arabic numerals found (use 1, 2, 3)." \
  '[٠-٩۰-۹]'

check "Arabic brand name misspelled (must be بريمييرا لايف)." \
  'بريم(?!ييرا)'

check "Price or currency amount found (no public prices)." \
  '(\b(SAR|BHD|USD|AED)\b\s?\d|\d[\d,.]*\s?(SAR|BHD|USD|AED)\b|\d[\d,.]*\s?(riyals?|dinars?|dollars?)\b|\$\d{2,}|[€£﷼]\s?\d|\d[\d,.]*\s?(ريال|دينار|دولار|ر\.س)|(ريال|دينار|دولار|ر\.س)\s?\d)'

check "Camera or equipment model/brand found (not allowed on site)." \
  '\b(A7S|A7R|A7 ?IV|FX3|FX6|FX9|FX30|Alexa|ARRI|Komodo|V-Raptor|URSA|Blackmagic|BMPCC|C70|C300|C500|EOS R\d|Mavic|Inspire \d|Ronin|SM7B|Shure|Aputure)\b' \
  '-i'

check "Unverified company statistic found (real stats only)." \
  '(\d{2,}\s?\+|\+\s?\d{2,}\s?(projects|clients|films|videos|brands|companies|years|مشروع|عميل)|\b(over|more than)\s+\d{2,}\s+(projects|clients|films|videos|brands|companies|years)|أكثر من\s+\d{2,})' \
  '-i'

check "Claim of an office or studio outside Al Khobar." \
  '((office|offices|studio|studios|branch|headquarters)\s+in\s+(Riyadh|Jeddah|Dammam|Jubail|Makkah|Mecca|Madinah|Medina|Tabuk|NEOM|Abha)|(مكتب|فرع|استوديو)\S*\s+في\s+(الرياض|جدة|الدمام|الجبيل|مكة|المدينة|تبوك|نيوم|أبها))' \
  '-i'

check "Review or rating structured data found (not allowed)." \
  '(aggregateRating|"@type"\s*:\s*"Review")'

check "Google Indexing API reference found (permanently banned)." \
  'indexing\.googleapis\.com'

rm -f "$ADDED"

echo ""
if [ "$fail" -ne 0 ]; then
  echo "RESULT: FAILED. This PR must not be merged."
  exit 1
fi
echo "RESULT: PASSED. $count files changed, all content rules satisfied."
