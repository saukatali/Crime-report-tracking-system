# Postman API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## 1. Register User

**POST** `/auth/register`

Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "phone": "9876543210",
  "address": "123 Street, City",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 2. Login User

**POST** `/auth/login`

Body (JSON):
```json
{
  "email": "john@email.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@email.com",
      "phone": "9876543210",
      "address": "123 Street, City"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 3. Create Complaint

**POST** `/complaints`

Headers:
```
Authorization: Bearer <your_token>
```

Body (form-data):
```
title: Laptop Stolen
category: Theft
location: Office, MG Road
description: My laptop was stolen from my desk
evidence: [file upload]
```

Response:
```json
{
  "success": true,
  "message": "Complaint filed successfully",
  "data": {
    "complaintId": 1,
    "evidence_file": "evidence-1234567890.jpg"
  }
}
```

## 4. Get User Complaints

**GET** `/complaints/user/:userId`

Headers:
```
Authorization: Bearer <your_token>
```

Response:
```json
{
  "success": true,
  "message": "Complaints retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Laptop Stolen",
      "category": "Theft",
      "location": "Office, MG Road",
      "description": "My laptop was stolen...",
      "evidence_file": "evidence-1234567890.jpg",
      "status": "Pending",
      "created_at": "2025-11-29T10:00:00.000Z",
      "user_name": "John Doe",
      "user_email": "john@email.com"
    }
  ]
}
```

## 5. Get Single Complaint

**GET** `/complaints/:id`

Headers:
```
Authorization: Bearer <your_token>
```

Response:
```json
{
  "success": true,
  "message": "Complaint retrieved successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "Laptop Stolen",
    "category": "Theft",
    "location": "Office, MG Road",
    "description": "My laptop was stolen...",
    "evidence_file": "evidence-1234567890.jpg",
    "status": "Pending",
    "created_at": "2025-11-29T10:00:00.000Z",
    "user_name": "John Doe",
    "user_email": "john@email.com",
    "user_phone": "9876543210"
  }
}
```

## 6. Update Complaint Status

**PUT** `/complaints/:id/status`

Headers:
```
Authorization: Bearer <your_token>
```

Body (JSON):
```json
{
  "status": "Under Investigation"
}
```

Response:
```json
{
  "success": true,
  "message": "Complaint status updated successfully"
}
```

## 7. Get User Profile

**GET** `/users/:id`

Headers:
```
Authorization: Bearer <your_token>
```

Response:
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "9876543210",
    "address": "123 Street, City",
    "created_at": "2025-11-29T10:00:00.000Z"
  }
}
```

## 8. Update User Profile

**PUT** `/users/:id/profile`

Headers:
```
Authorization: Bearer <your_token>
```

Body (JSON):
```json
{
  "name": "John Doe Updated",
  "email": "john@email.com",
  "phone": "9876543210",
  "address": "New Address 456"
}
```

Response:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "email": "john@email.com",
    "phone": "9876543210",
    "address": "New Address 456",
    "created_at": "2025-11-29T10:00:00.000Z"
  }
}
```

## Error Responses

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
