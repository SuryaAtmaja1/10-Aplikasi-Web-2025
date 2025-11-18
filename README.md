# Kelompok 10 - Case 6

## 👥 Nama Anggota Kelompok

- Kelompok 10
- Anggota:
  1. Indah Nurrohmah | (23/523051/TK/57801)
  2. Kurniawan Surya Atmaja | (23/516680/TK/56802)
  3. Nathania Ratnadewi | (23/522605/TK/57712)
  4. Azfanova Sammy Rafif S. | (23/521764/TK/57572)
  5. Anggita Salsabilla | (23/516001/TK/56775)

## 📚 Deskripsi Aplikasi

Aplikasi web ini merupakan platform komunitas untuk berbagi dan membaca karya tulis (sajak, esai, opini). Pengguna bisa mengunggah, mengedit, dan menghapus karya mereka secara bebas. Selain itu, pengguna juga bisa mengekpresikan diri mereka melalui kolom komentar terkait dengan karya (sajak) yang mereka baca.

## Link Demo & Penjelasan Singkat

**[Presentasi](https://drive.google.com/drive/folders/1_X2Isfb1RTB0u65Dp2N7mGgMAcYckBiY?usp=sharing)**

**[Video](https://drive.google.com/drive/folders/1PIVf5Id8_Bcd9YOOCnhitDvE9bA0qdaY?usp=drive_link)**

### Fitur Utama

1. Autentikasi & Profil
   - Registrasi & login
   - Update dan kelola profil pengguna
   - Hapus Akun Pengguna
2. Manajemen Karya (Sajak/Postingan)
   - Membuat, mengedit, menghapus sajak
   - Memberi tag/kategori pada sajak
   - Membaca dan menjelajahi karya
3. Komentar
   - Menambahkan komentar
   - Membaca komentar
   - Menghapus komentar
   - Membalas Komentar
4. Eksplorasi Konten
   - Timeline sajak atau postingan
   - Menelusuri karya berdasarkan kategori/tag
   - Filter berdasarkan urutan recent atau trending
   - Fitur pencarian

## 📂 Struktur Folder & File

```
backend/
├── src/
│ ├── config/
| | ├── config.env
| | ├── db.js
| | ├── goggleDrive.js
│ │ └── passport.js
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── commentController.js
│ │ ├── sajakController.js
│ │ └── userController.js
│ ├── middlewares/
│ │ ├── auth.js
│ │ └── upload.js
│ ├── models/
│ │ ├── commentModel.js
│ │ ├── sajakModel.js
│ │ └── userModel.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── commentRoutes.js
│ │ ├── sajakRoutes.js
│ │ └── userRoutes.js
│ └── utils/
│ └── tokens.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## 🛠️ Teknologi yang Digunakan

Backend aplikasi ini dibangun menggunakan berbagai teknologi dan library utama sebagai berikut.

### 1. Core Backend

- **[Express](https://expressjs.com/)**  
  Framework Node.js untuk membangun REST API dengan dukungan routing, middleware, dan manajemen request/response.
- **[Mongoose](https://mongoosejs.com/)**  
  ODM (Object Data Modeling) untuk MongoDB, digunakan dalam pendefinisian schema dan operasi basis data.
- **[dotenv](https://github.com/motdotla/dotenv)**  
  Digunakan untuk mengelola variabel lingkungan (environment variables) seperti `MONGO_URI`, `JWT_SECRET`, dan konfigurasi Google Drive.

### 2. Autentikasi & Keamanan

- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**  
  Implementasi JWT untuk proses autentikasi (signing, verifikasi, dan decoding token).
- **[passport](http://www.passportjs.org/)** & **[passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/)**  
  Mendukung autentikasi menggunakan akun Google melalui OAuth 2.0.
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)**  
  Untuk hashing dan verifikasi password secara aman.
- **[cookie-parser](https://github.com/expressjs/cookie-parser)**  
  Middleware untuk parsing cookie yang digunakan dalam penyimpanan token.
- **[cors](https://github.com/expressjs/cors)**  
  Mengatur izin Cross-Origin Resource Sharing agar frontend dapat berkomunikasi dengan backend secara aman.

### 3. Manajemen File & Integrasi Google

- **[multer](https://github.com/expressjs/multer)**  
  Middleware untuk menangani upload file (contohnya foto profil dan gambar sajak).
- **[googleapis](https://github.com/googleapis/google-api-nodejs-client)**  
  Library resmi Google API, digunakan untuk integrasi Google Drive (upload, akses publik, dan penghapusan file).

### 4. Tools Pengembangan

- **[nodemon](https://github.com/remy/nodemon)**  
  Alat bantu development yang memantau perubahan kode dan otomatis melakukan restart server.

---

## 📎 URL Google Drive Laporan

https://drive.google.com/drive/folders/1hbBO_teCQiXnrb-Kr0v4pIleM8jy5mHs?usp=sharing
