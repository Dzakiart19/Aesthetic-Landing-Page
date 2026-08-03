# Video Bokep Gratis — Inferno Studios

## Project Overview

Website landing page streaming video dewasa Indonesia. Dibangun dengan React + Vite sebagai frontend, Express.js sebagai backend API.

### Struktur Project

```
artifacts/
├── video-showcase/     # Frontend — halaman utama website
├── api-server/         # Backend — Express.js API
└── mockup-sandbox/     # Canvas UI prototype (tidak digunakan di produksi)

lib/
├── api-spec/           # OpenAPI spec
├── api-client-react/   # Generated React Query hooks
├── api-zod/            # Generated Zod schemas
└── db/                 # Database schema (Drizzle ORM)
```

### Halaman & Section

- **Hero Section** — Judul besar + video player full width 9:16 (portrait, sesuai HP)
- **Vision Section** — Deskripsi website + foto still
- **Gallery Section** — Grid foto preview konten
- **Credits Section** — Info website (kategori, kualitas, akses, dll)
- **Footer** — Copyright Inferno Studios

---

## Monetisasi

Website menggunakan 3 lapis monetisasi:

### 1. rm358.com — Pop-under Ad
- Script: `<script src="//rm358.com/4/11491388" async></script>`
- Cara kerja: Tab iklan terbuka di belakang saat pengunjung buka halaman
- Bayar per 1000 tayangan (CPM)

### 2. PropushMe — Push Notification
- Zone ID: `11491420`
- Domain: `p2pdh.com`
- SW file: `public/sw-check-permissions-fbd98.js` (harus ada di root site)
- Script ada di `index.html`
- Cara kerja: Minta izin notifikasi → subscriber = penghasilan pasif jangka panjang
- Jika user Allow → redirect ke rm358.com
- Jika user Block → redirect ke rm358.com

### 3. Facebook In-App Redirect
- Pengguna buka lewat Facebook/Instagram browser → otomatis redirect ke Chrome
- Tujuan: agar push notification bisa berfungsi di traffic sosmed

---

## Fitur Khusus

### Back Button Guard
- File: `src/hooks/use-back-guard.ts`
- Cara kerja: History API di-push saat halaman load, saat user tekan Back muncul dialog konfirmasi
- Dialog: "Yakin ingin keluar?" + tombol [Tetap di Sini] / [Keluar]
- Tujuan: menahan pengunjung agar tidak langsung kabur setelah kena redirect iklan

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animasi | Framer Motion |
| Backend | Express.js + Pino logger |
| Package manager | pnpm (monorepo) |

---

## User Preferences

- Bahasa komunikasi: Indonesia
- Foto/gambar: tampil penuh tanpa crop (`object-contain`)
- Video: full width edge-to-edge di mobile, rasio 9:16
- Teks harus sinkron dengan konten website (bokep Indo, update harian, gratis)
- Iklan tidak boleh terlalu agresif sampai pengunjung kabur sebelum subscribe push
