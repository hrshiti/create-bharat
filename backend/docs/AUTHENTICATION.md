# Authentication Documentation

This document provides comprehensive information about the authentication and authorization system.

## Table of Contents
- [Overview](#overview)
- [Authentication Flow](#authentication-flow)
- [User Registration](#user-registration)
- [User Login](#user-login)
- [Protected Routes](#protected-routes)
- [User Roles](#user-roles)
- [API Endpoints](#api-endpoints)
- [JWT Token](#jwt-token)
- [Security Features](#security-features)
- [Examples](#examples)

## Overview

The backend uses **JWT (JSON Web Tokens)** for authentication and authorization. Users must register to get an account, then login to receive a JWT token. This token must be included in the Authorization header for protected routes.

## Authentication Flow

```
1. User registers → Gets JWT token
2. User logs in → Gets JWT token
3. User includes token in requests → Access protected routes
4. Token verified → Request proceeds
```

## User Registration

### Endpoint
```
POST /api/users/register
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "1234567890",
  "role": "user"
}
```

### Request Body Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| name | String | Yes | - | User's full name |
| email | String | Yes | - | User's email (must be unique) |
| password | String | Yes | - | User's password (min 6 characters recommended) |
| phone | String | No | "" | User's phone number |
| role | String | No | "user" | User role: user, admin, company, mentor |

### Response (Success - 201)
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjFhMmIzYzRkNWU2ZjdhOGI5YzBkMSIsImlhdCI6MTY5Mzg0NzIwMCwiZXhwIjoxNjk2NDM5MjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```

### Response (Error - 400)
```json
{
  "success": false,
  "error": "User already exists with this email"
}
```

### cURL Example
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "phone": "1234567890",
    "role": "user"
  }'
```

## User Login

### Endpoint
```
POST /api/users/login
```

### Request Body
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Request Body Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | String | Yes | User's email |
| password | String | Yes | User's password |

### Response (Success - 200)
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjFhMmIzYzRkNWU2ZjdhOGI5YzBkMSIsImlhdCI6MTY5Mzg0NzIwMCwiZXhwIjoxNjk2NDM5MjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```

### Response (Error - 401)
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### cURL Example
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

## Protected Routes

### Get Current User
```
GET /api/users/me
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "profile": {
      "bio": "",
      "avatar": "",
      "location": "",
      "website": "",
      "socialLinks": {
        "linkedin": "",
        "github": "",
        "twitter": "",
        "instagram": ""
      }
    },
    "isActive": true,
    "isVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Change Password
```
PUT /api/users/change-password
Authorization: Bearer YOUR_TOKEN_HERE
```

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## User Roles

The system supports four user roles:

### 1. User (Default)
- Default role for regular users
- Can access basic features

### 2. Admin
- Full administrative access
- Can manage all users
- Can access admin-only routes

### 3. Company
- For companies and organizations
- Includes additional fields:
  - `companyName`
  - `companyType` (startup, enterprise, ngo, other)
  - `description`
  - `logo`
  - `address`
  - `establishedYear`

### 4. Mentor
- For mentors and advisors
- Includes additional fields:
  - `expertise` (array of skills)
  - `experience` (years)
  - `bio`
  - `availability` (available, busy, not_available)
  - `hourlyRate`

## API Endpoints

| Method | Endpoint | Auth Required | Role Required | Description |
|--------|----------|---------------|---------------|-------------|
| POST | /api/users/register | No | - | Register new user |
| POST | /api/users/login | No | - | Login user |
| GET | /api/users/me | Yes | - | Get current user |
| PUT | /api/users/change-password | Yes | - | Change password |
| GET | /api/users | No | - | Get all users |
| GET | /api/users/:id | No | - | Get user by ID |
| PUT | /api/users/:id | No | - | Update user |
| DELETE | /api/users/:id | Yes | admin | Delete user |

## JWT Token

### Token Details
- **Expiration**: 30 days
- **Algorithm**: HS256
- **Storage**: Client-side (localStorage, sessionStorage, or secure cookie)

### Token Structure
```json
{
  "id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "iat": 1693847200,
  "exp": 1696439200
}
```

### Using the Token

Add the token to the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Token Expiration Handling

When a token expires, you'll receive:
```json
{
  "success": false,
  "error": "Not authorized to access this route. Invalid token."
}
```

**Solution**: User needs to login again to get a new token.

## Security Features

### 1. Password Hashing
- All passwords are hashed using **bcryptjs**
- Salt rounds: 10
- Passwords are never stored in plain text
- Passwords are excluded from queries by default

### 2. JWT Authentication
- Secure token-based authentication
- Tokens expire after 30 days
- Token validation on every protected request

### 3. Account Status
- `isActive`: Account must be active to login
- `isVerified`: Email verification status
- Inactive accounts cannot access the system

### 4. Role-Based Access Control
- Routes protected by user roles
- Admin routes accessible only by admins
- Flexible authorization middleware

## Examples

### Complete Authentication Flow

#### 1. Register a User
```javascript
const response = await fetch('http://localhost:5000/api/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securePassword123',
    role: 'user'
  })
});

const data = await response.json();
// Save token: data.data.token
localStorage.setItem('token', data.data.token);
```

#### 2. Login User
```javascript
const response = await fetch('http://localhost:5000/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securePassword123'
  })
});

const data = await response.json();
localStorage.setItem('token', data.data.token);
```

#### 3. Access Protected Route
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:5000/api/users/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data.data); // User object
```

#### 4. Change Password
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:5000/api/users/change-password', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    currentPassword: 'oldPassword123',
    newPassword: 'newPassword456'
  })
});

const data = await response.json();
console.log(data.message); // "Password changed successfully"
```

### Register Different User Types

#### Register a Company
```json
POST /api/users/register
{
  "name": "Tech Corp",
  "email": "contact@techcorp.com",
  "password": "securePassword123",
  "role": "company",
  "companyDetails": {
    "companyName": "Tech Corp",
    "companyType": "startup",
    "description": "Building innovative solutions",
    "address": "123 Tech Street",
    "establishedYear": 2020
  }
}
```

#### Register a Mentor
```json
POST /api/users/register
{
  "name": "Jane Mentor",
  "email": "jane@mentor.com",
  "password": "securePassword123",
  "role": "mentor",
  "mentorDetails": {
    "expertise": ["JavaScript", "Node.js", "React"],
    "experience": 10,
    "bio": "Expert in full-stack development",
    "availability": "available",
    "hourlyRate": 100
  }
}
```

#### Register an Admin
```json
POST /api/users/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securePassword123",
  "role": "admin",
  "adminDetails": {
    "permissions": ["manage_users", "manage_content", "manage_settings"]
  }
}
```

## Error Handling

### Common Errors

#### 1. Invalid Credentials
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

#### 2. User Already Exists
```json
{
  "success": false,
  "error": "User already exists with this email"
}
```

#### 3. Missing Token
```json
{
  "success": false,
  "error": "Not authorized to access this route. Please provide a valid token."
}
```

#### 4. Invalid Token
```json
{
  "success": false,
  "error": "Not authorized to access this route. Invalid token."
}
```

#### 5. Inactive Account
```json
{
  "success": false,
  "error": "Account is inactive. Please contact support."
}
```

#### 6. Insufficient Permissions
```json
{
  "success": false,
  "error": "User role 'user' is not authorized to access this route. Required roles: admin"
}
```

## Security Best Practices

### For Developers
1. Always use HTTPS in production
2. Store JWT tokens securely (httpOnly cookies recommended)
3. Implement token refresh mechanism
4. Add rate limiting to login endpoints
5. Implement password strength requirements
6. Add email verification
7. Implement password reset functionality
8. Add logging and monitoring
9. Use strong JWT_SECRET in production
10. Implement CORS properly

### For Users
1. Use strong, unique passwords
2. Don't share your credentials
3. Logout when finished
4. Change passwords periodically
5. Use secure connections only

## Environment Variables

Required environment variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/createbharat

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Testing

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### Test User Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### Test Protected Route
```bash
# Replace YOUR_TOKEN with the token from login response
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

**Last Updated:** October 2024  
**Version:** 1.0.0

