# Toko Sepatu - Website E-Commerce

Website e-commerce toko sepatu profesional yang dibuat dengan HTML5, CSS3, dan JavaScript murni.

## 🌟 Fitur Utama

- **Desain Modern & Responsif** - Tampilan optimal di desktop, tablet, dan mobile
- **Hero Slider Otomatis** - Slider gambar dengan navigasi manual dan otomatis
- **Keranjang Belanja** - Sistem keranjang belanja dengan localStorage
- **Produk Unggulan** - Tampilan 8 produk dengan rating dan harga
- **Kategori Produk** - Navigasi kategori untuk kemudahan browsing
- **Newsletter Subscription** - Form berlangganan dengan validasi email
- **Form Kontak** - Halaman kontak lengkap dengan informasi
- **Animasi Smooth** - Transisi dan hover effects yang halus
- **SEO Friendly** - Struktur HTML semantic dan meta tags

## 📁 Struktur File

```
toko-sepatu/
├── index.html          # Struktur HTML utama
├── style.css           # Styling dan responsive design
├── script.js           # Fungsionalitas JavaScript
├── assets/             # Folder untuk aset
│   └── images/         # Folder untuk gambar produk
└── README.md           # Dokumentasi
```

## 🚀 Cara Menggunakan

1. Clone atau download repository ini
2. Buka file `index.html` di browser
3. Website siap digunakan!

## 💻 Teknologi yang Digunakan

- **HTML5** - Struktur semantik
- **CSS3** - Styling modern dengan Flexbox & Grid
- **JavaScript (Vanilla)** - Fungsionalitas interaktif
- **Font Awesome** - Icon library
- **Unsplash** - Gambar produk (placeholder)

## 🎨 Fitur CSS

- CSS Custom Properties (Variables)
- Flexbox & Grid Layout
- Media Queries untuk Responsive Design
- Smooth Transitions & Animations
- Hover Effects
- Custom Scrollbar

## ⚡ Fitur JavaScript

- **Image Slider**
  - Auto-play dengan interval 5 detik
  - Navigasi manual (previous/next)
  - Dot indicators
  - Pause on hover

- **Shopping Cart**
  - Tambah produk ke keranjang
  - Hapus produk dari keranjang
  - Counter jumlah item
  - Total harga otomatis
  - Data tersimpan di localStorage

- **Form Validation**
  - Validasi email dengan regex
  - Notifikasi sukses/error
  - Auto-clear form setelah submit

- **Navigation**
  - Smooth scroll ke section
  - Active link highlighting
  - Responsive mobile menu

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small Mobile: < 480px

## 🎯 Sections

1. **Header** - Logo, navigasi, dan ikon utilitas
2. **Hero** - Slider dengan 3 slides
3. **Kategori** - 4 kategori produk populer
4. **Produk** - 8 produk unggulan dengan detail
5. **Diskon** - Banner promo spesial
6. **Tentang Kami** - Informasi toko
7. **Kontak** - Form dan informasi kontak
8. **Footer** - Link, social media, dan newsletter

## 🛒 Cara Kerja Keranjang

1. Klik tombol "Tambahkan ke Keranjang" pada produk
2. Notifikasi akan muncul
3. Counter keranjang akan update
4. Klik ikon keranjang untuk melihat detail
5. Sidebar keranjang akan slide dari kanan
6. Data tersimpan otomatis di browser

## 🎨 Palet Warna

- Primary: #2563eb (Blue)
- Secondary: #1e40af (Dark Blue)
- Accent: #f59e0b (Orange)
- Success: #10b981 (Green)
- Danger: #ef4444 (Red)

## 📝 Catatan

- Gambar produk menggunakan Unsplash API (placeholder)
- Untuk production, ganti dengan gambar produk asli
- Form submission dan checkout adalah simulasi
- Untuk integrasi payment gateway, perlu backend

## 🔧 Kustomisasi

### Mengganti Gambar Produk
Edit URL gambar di `index.html` pada setiap product card:
```html
<img src="URL_GAMBAR_ANDA" alt="Nama Produk">
```

### Menambah Produk
Copy paste struktur product card di `index.html` dan sesuaikan:
- ID produk
- Nama produk
- Harga
- Gambar
- Rating

### Mengubah Warna
Edit CSS variables di `style.css`:
```css
:root {
    --primary-color: #warna-baru;
}
```

## 📦 Deploy ke GitHub Pages

1. Push code ke GitHub repository
2. Buka Settings > Pages
3. Pilih branch main dan folder root
4. Website akan live di `username.github.io/repo-name`

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📄 License

Free to use for personal and commercial projects.

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk pembelajaran dan portfolio

---

**Happy Coding! 🚀**
