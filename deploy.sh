#!/bin/bash
set -e

echo "================================================"
echo "  VIDEO SHOWCASE — Deploy to Firebase Hosting"
echo "================================================"

# ── Build project ─────────────────────────────────
echo ""
echo "[1/2] Building project..."
cd "$(dirname "$0")/artifacts/video-showcase"
BASE_PATH="/" PORT=3000 pnpm run build
echo "      Build selesai. Output: dist/public"

# ── Deploy ke Firebase Hosting ────────────────────
echo ""
echo "[2/2] Deploying ke Firebase Hosting..."
firebase deploy --only hosting --project bokephot

echo ""
echo "================================================"
echo "  Deploy selesai!"
echo "  Live di: https://bokephot.web.app"
echo "================================================"
