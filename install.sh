#!/bin/bash
set -e

echo "================================================"
echo "  VIDEO SHOWCASE — Install Script"
echo "================================================"

# Firebase Tools (global)
echo ""
echo "[1/2] Installing Firebase Tools (global)..."
npm install -g firebase-tools
echo "      Done."

# Firebase Login
echo ""
echo "[2/2] Firebase Login"
echo "      Akan membuka URL — buka di browser Anda, login,"
echo "      lalu paste token yang diberikan di sini."
echo ""
firebase login --no-localhost

echo ""
echo "================================================"
echo "  Siap! Sekarang jalankan:"
echo "  bash deploy.sh   — untuk build & deploy"
echo "================================================"
