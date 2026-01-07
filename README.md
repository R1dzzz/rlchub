# RLCHub

![RLCHub Screenshot](assets/images/screenshot.png) <!-- Ganti dengan screenshot asli kalau ada -->

RLCHub adalah platform web sederhana untuk rekomendasi game Android, iOS, dan PC. Proyek ini dibangun sepenuhnya dengan teknologi web native (tanpa framework seperti React atau Vue) untuk menunjukkan kekuatan HTML, CSS, dan JavaScript murni. Fitur utama termasuk autentikasi pengguna, berita game terbaru, download game, dan AI assistant khusus topik game.

## Fitur Utama
- **Autentikasi Pengguna**: Register/login dengan Supabase Auth, simpan session di localStorage, dan proteksi halaman.
- **Rekomendasi Game**: Daftar game dalam card layout, filter berdasarkan platform, genre, dan popularitas. Data dari Supabase DB.
- **Berita Game**: Artikel berita dengan kategori dan search, diambil dari database.
- **Sistem Download**: Tombol download dengan hitung jumlah unduhan, proteksi anti-spam sederhana.
- **AI Game Assistant**: Chatbot berbasis OpenAI API yang hanya jawab pertanyaan tentang game (dengan prompt sistem untuk tolak topik lain).
- **Desain**: Tema dark mode modern, responsive (mobile/desktop), animasi hover, menggunakan Flexbox & Grid.
- **Keamanan**: Validasi input, sanitasi data, rate limit untuk AI chat.

## Teknologi Stack
- **Frontend**: HTML5, CSS3 (Flexbox & Grid), Vanilla JavaScript.
- **Backend/Services**:
  - Supabase (Free Tier): Authentication, PostgreSQL Database, Storage untuk file game dan gambar.
  - OpenAI API / LLM API untuk AI chatbot.
- **Editor**: Visual Studio Code.
- **Tidak ada framework**: Semua kode modular dan pure JS.

## Struktur Folder
