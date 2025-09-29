# Kelompok 10 - Case 6

## 👥 Nama Anggota Kelompok
- Kelompok 10
- Anggota:
  1. Indah Nurrohmah         | (23/523051/TK/57801)
  2. Kurniawan Surya Atmaja  | (23/516680/TK/56802)
  3. Nathania Ratnadewi      | (23/522605/TK/57712)
  4. Azfanova Sammy Rafif S. | (23/521764/TK/57572)
  5. Anggita Salsabilla      | (23/516001/TK/56775)
 
## 📚 Deskripsi Aplikasi
Aplikasi web ini merupakan platform komunitas untuk berbagi dan membaca karya tulis (sajak, esai, opini). Pengguna bisa mengunggah, mengedit, dan menghapus karya mereka secara bebas. Selain itu, pengguna juga bisa mengekpresikan diri mereka melalui kolom komentar terkait dengan karya (sajak) yang mereka baca.

### Fitur Utama
1. Autentikasi & Profil
   - Registrasi & login
   - Update dan kelola profil pengguna
2. Manajemen Karya (Sajak/Postingan)
   - Membuat, mengedit, menghapus sajak
   - Memberi tag/kategori pada sajak
   - Membaca dan menjelajahi karya
3. Komentar
   - Menambahkan komentar
   - Membaca dan menghapus komentar
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

## 📎 URL Google Drive Laporan
https://drive.google.com/drive/folders/1hbBO_teCQiXnrb-Kr0v4pIleM8jy5mHs?usp=sharing 
