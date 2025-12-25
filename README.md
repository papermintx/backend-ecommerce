# E-Commerce Backend API

Backend application untuk toko fashion online dengan sistem autentikasi, manajemen produk, kategori, dan review.

## 🚀 Teknologi

- **Node.js** & **Express.js** - Framework backend
- **MySQL** - Database
- **JWT** - Authentication
- **Multer** & **Sharp** - Upload & resize gambar
- **Nodemailer** - Email OTP verification
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
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## 📚 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| POST | `/api/auth/register` | Register user baru | ❌ |
| POST | `/api/auth/verify-otp` | Verifikasi OTP email | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/forgot-password` | Kirim OTP reset password | ❌ |
| POST | `/api/auth/reset-password` | Reset password | ❌ |
| POST | `/api/auth/resend-otp` | Kirim ulang OTP | ❌ |

### 👤 User

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| GET | `/api/users/profile` | Get user profile | ✅ |
| PUT | `/api/users/profile` | Update profile | ✅ |

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

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
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

Untuk mengakses endpoint admin, user harus memiliki `role = 'admin'` di database.

## 📁 Struktur Folder

```
backend/
├── config/          # Database & konfigurasi
├── controllers/     # Business logic
├── middleware/      # Auth, upload, admin check
├── models/          # Database models
├── routes/          # API routes
├── uploads/         # Uploaded images
├── utils/           # Helper functions
├── .env             # Environment variables
└── server.js        # Entry point
```

## 🐛 Debugging

Jika ada masalah dengan upload gambar atau database, cek:
1. Permissions folder `/uploads`
2. Database connection di `.env`
3. Email SMTP settings untuk OTP

## 📞 Kontak & Support

Untuk pertanyaan atau masalah, silakan hubungi developer.

---

**Version**: 1.0.0  
**Last Updated**: Desember 2025
