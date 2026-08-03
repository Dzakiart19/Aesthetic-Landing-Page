#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "================================================"
echo "  VIDEO SHOWCASE — Install Script"
echo "================================================"

# ── pnpm ──────────────────────────────────────────
echo ""
echo "[1/4] Memastikan pnpm tersedia..."
if ! command -v pnpm &>/dev/null; then
  echo "      pnpm tidak ditemukan — menginstall via npm..."
  npm install -g pnpm
fi
echo "      pnpm: $(pnpm --version)"

# ── Project dependencies ───────────────────────────
echo ""
echo "[2/4] Menginstall semua dependencies project (workspace)..."
cd "$ROOT_DIR"
pnpm install --frozen-lockfile
echo "      Done."

# ── Build libs ────────────────────────────────────
echo ""
echo "[3/4] Build shared libraries (codegen output)..."
pnpm run typecheck:libs
echo "      Done."

# ── Firebase Tools ────────────────────────────────
echo ""
echo "[4/4] Menginstall Firebase Tools (global)..."
npm install -g firebase-tools
echo "      Done."

# ── Firebase Login ────────────────────────────────
echo ""
echo "[5/4] Firebase Login"
echo "      Akan membuka URL — buka di browser, login,"
echo "      lalu paste token yang diberikan di sini."
echo ""
firebase login --no-localhost

echo ""
echo "================================================"
echo "  Semua selesai! Sekarang jalankan:"
echo "  bash deploy.sh   — untuk build & deploy"
echo "================================================"
