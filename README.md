# E-Commerce Backend API

Backend application untuk toko fashion online dengan sistem autentikasi, manajemen produk, kategori, dan review.

## 🚀 Teknologi

- **Node.js** & **Express.js** - Framework backend
- **MySQL** - Database
- **JWT** - Authentication
- **Multer** & **Sharp** - Upload & resize gambar
- **Bcrypt** - Password hashing

## 📦 Instalasi

```bash
# Install dependencies
npm install

# Setup database
# Import database schema dari folder migrations (jika ada)

# Jalankan server
npm start

# Development mode
npm run dev
```

## ⚙️ Konfigurasi

Buat file `.env` di root directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=admin
DB_PASS=masuk
DB_NAME=baju_db
JWT_SECRET=rahasia_negara_api
```

## 🗄️ Setup Database & Admin

```bash
# Reset database dan seed admin secara otomatis
node reset-db.js
```

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `Admin123!`

> ⚠️ **PENTING**: Ganti password Admin saat deploy production!

## 📚 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| POST | `/api/auth/login` | Login admin | ❌ |

> **Catatan**: Fitur registrasi dan verifikasi email telah dihapus. Akun admin dibuat melalui seeder otomatis.

### 🛍️ Products

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| GET | `/api/products` | Get semua produk | ❌ |
| GET | `/api/products/:id` | Get detail produk | ❌ |
| POST | `/api/products` | Tambah produk baru | ✅ Admin |
| PUT | `/api/products/:id` | Update produk | ✅ Admin |
| DELETE | `/api/products/:id` | Hapus produk | ✅ Admin |
| PUT | `/api/products/:id/images` | Update gambar produk | ✅ Admin |

### 📂 Categories

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| GET | `/api/categories` | Get semua kategori | ❌ |
| GET | `/api/categories/:id` | Get detail kategori | ❌ |
| POST | `/api/categories` | Tambah kategori | ✅ Admin |
| PUT | `/api/categories/:id` | Update kategori | ✅ Admin |
| DELETE | `/api/categories/:id` | Hapus kategori | ✅ Admin |

### ⭐ Reviews

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| GET | `/api/reviews/product/:productId` | Get review produk | ❌ |
| POST | `/api/reviews` | Tambah review | ✅ |
| PUT | `/api/reviews/:id` | Update review | ✅ |
| DELETE | `/api/reviews/:id` | Hapus review | ✅ |

## 🔑 Authentication

Gunakan Bearer Token di header:

```http
Authorization: Bearer <your_jwt_token>
```

## 📝 Contoh Request

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "admin"
}
```

### Tambah Produk (Admin)

```bash
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "name": "Kemeja Formal",
  "description": "Kemeja formal berkualitas tinggi",
  "price": 250000,
  "stock": 50,
  "categoryId": 1,
  "mainImage": <file>,
  "galleryImages": [<file1>, <file2>]
}
```

## 🖼️ Upload Gambar

- **Format**: JPG, PNG
- **Max Size**: 10MB (auto-resize ke max 1024px)
- **Compression**: 80% quality
- **Storage**: `/uploads` directory

Gambar otomatis di-compress menggunakan Sharp untuk optimasi performa.

## 👨‍💼 Admin Access

Akun admin dibuat otomatis melalui seeder saat menjalankan `node reset-db.js`. Tidak ada fitur registrasi manual.

**Untuk menambah admin baru:**
1. Edit file `seeders/adminSeeder.js`
2. Tambahkan kredensial admin baru
3. Jalankan `node reset-db.js`

## 📁 Struktur Folder

```
backend/
├── config/          # Database & konfigurasi
├── controllers/     # Business logic
├── middleware/      # Auth, upload, admin check
├── models/          # Database models
├── routes/          # API routes
├── seeders/         # Database seeders (admin)
├── uploads/         # Uploaded images
├── .env             # Environment variables
├── index.js         # Entry point
└── reset-db.js      # Database reset & seed script
```

## 🐛 Debugging

Jika ada masalah, cek:
1. Permissions folder `/uploads`
2. Database connection di `.env`
3. Pastikan `node reset-db.js` sudah dijalankan

## 📞 Kontak & Support

Untuk pertanyaan atau masalah, silakan hubungi developer.
083872003995

**Version**: 1.0.0  
**Last Updated**: Desember 2025
