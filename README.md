# @masum-xyz/terbilang

[![npm version](https://img.shields.io/npm/v/@masum-xyz/terbilang.svg)](https://www.npmjs.com/package/@masum-xyz/terbilang)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Konversi angka ke terbilang Bahasa Indonesia. Mendukung style output, angka negatif, angka desimal (koma), dan bisa dipakai di Node.js, ESM, maupun langsung di browser via CDN.

---

## ✨ Fitur
- Ubah angka ke teks Bahasa Indonesia  
  Contoh: `1057` → "Seribu Lima Puluh Tujuh"
- Style hasil: `sentence` | `title` | `upper` | `lower`
- Angka minus: `-42` → "Minus Empat Puluh Dua"
- Angka desimal: `12.34` → "Dua Belas koma tiga empat"
- Bisa dipakai di:
  - Node.js (CommonJS `require`)
  - ESM (`import`)
  - CDN (browser, global `terbilang`)

---

## 📦 Instalasi

### Via npm
```bash
npm install @masum-xyz/terbilang
```

### Via CDN (Browser)
Tambahkan script berikut ke halaman HTML Anda:
```html
<script src="https://cdn.jsdelivr.net/npm/@masum-xyz/terbilang/index.js"></script>
```
Setelah itu akan tersedia fungsi global `terbilang()` di window.

---

## 🚀 Penggunaan

### Node.js (CommonJS)
```js
const terbilang = require('@masum-xyz/terbilang');

console.log(terbilang(1057));
// Seribu Lima Puluh Tujuh

console.log(terbilang(-42));
// Minus Empat Puluh Dua

console.log(terbilang(12.34));
// Dua Belas koma tiga empat

console.log(terbilang(1057, { style: 'title' }));
// Seribu Lima Puluh Tujuh
```

### ESM (import)
```js
import terbilang from '@masum-xyz/terbilang';

console.log(terbilang(1057, { style: 'sentence' }));
// Seribu lima puluh tujuh
```

### Browser via CDN
Demo : https://codepen.io/Moh-Masum/pen/EaKdXJO

---

## 📄 Lisensi
MIT © 2025 Moh Masum Safrulihsan

---

## 🔗 Tautan
- npm: https://www.npmjs.com/package/@masum-xyz/terbilang
