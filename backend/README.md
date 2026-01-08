# Crime Reporting & Tracking System - Backend API

Backend server for Online Crime Reporting & Tracking System built with Node.js, Express, and MySQL.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- MySQL Workbench

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
Edit `.env` file with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=crime_reporting_db
DB_PORT=3306
JWT_SECRET=your_secret_key
```

3. **Setup Database**
- Open MySQL Workbench
- Run the `database.sql` script to create tables

4. **Start Server**
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on: `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MySQL connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── complaintController.js
│   └── userController.js
├── middleware/
│   ├── auth.js            # JWT verification
│   └── upload.js          # Multer file upload
├── models/
│   ├── User.js            # User database queries
│   └── Complaint.js       # Complaint queries
├── routes/
│   ├── authRoutes.js
│   ├── complaintRoutes.js
│   └── userRoutes.js
├── uploads/               # Uploaded files storage
├── .env                   # Environment variables
├── server.js              # Entry point
└── database.sql           # Database schema
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Complaints
- `POST /api/complaints` - Create complaint (with file upload)
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/user/:id` - Get user complaints
- `GET /api/complaints/:id` - Get single complaint
- `PUT /api/complaints/:id/status` - Update complaint status

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id/profile` - Update user profile

## 📝 API Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## 🔐 Authentication

Protected routes require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

## 📤 File Upload

Send files as `multipart/form-data` with field name `evidence`.

Supported formats: JPG, PNG, PDF, DOC, MP4
Max size: 5MB

## 🗄️ Database Tables

### users
- id, name, email, phone, address, password, created_at

### complaints
- id, user_id, title, category, location, description, evidence_file, status, created_at, updated_at

### police_updates
- id, complaint_id, update_message, updated_at

## 🧪 Testing

Use the included Postman collection to test all endpoints.

## 📦 Dependencies

- express - Web framework
- mysql2 - MySQL client
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- multer - File uploads
- cors - CORS middleware
- dotenv - Environment variables

## ⚙️ Environment Variables

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crime_reporting_db
DB_PORT=3306
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
MAX_FILE_SIZE=5242880
```

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- SQL injection prevention
- File type validation
- File size limits
- CORS enabled

## 📞 Support

For issues or questions, contact: support@crimereport.gov.in
