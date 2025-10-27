# Create Bharat Backend

A Node.js backend API built with Express and MongoDB.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file and configure it:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
MONGO_URI=mongodb://localhost:27017/createbharat
```

5. Start the development server:
```bash
npm run dev
```

6. The server will run on `http://localhost:5000`

### Production

To start the server in production mode:
```bash
npm start
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── userController.js    # User business logic
├── models/
│   └── User.js              # User data model (Mongoose schema)
├── routes/
│   └── userRoutes.js        # User API routes
├── middleware/
│   ├── errorHandler.js      # Centralized error handling
│   └── notFound.js          # 404 handler
├── utils/
│   └── upload.js            # Multer configuration for file uploads
├── public/
│   └── uploads/             # Directory for uploaded files
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables (not in git)
├── .env.example             # Example environment variables
└── README.md                # This file
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Authentication (Public)
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### User Management
- `GET /api/users/me` - Get current logged-in user (Protected)
- `PUT /api/users/change-password` - Change password (Protected)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### File Upload (Cloudinary)
- `GET /api/upload/info` - Get upload limits and allowed file types
- `POST /api/upload` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `DELETE /api/upload/:publicId` - Delete file from Cloudinary

## User Roles

The system supports four user roles:

- **user** - Default role for regular users
- **admin** - Administrative access
- **company** - For companies/organizations with additional details
- **mentor** - For mentors with expertise and availability

### User Model Fields

Each user has:
- Basic info: `name`, `email`, `phone`, `password`, `role`
- Profile: `bio`, `avatar`, `location`, `website`, `socialLinks`
- Role-specific fields:
  - **Company**: `companyName`, `companyType`, `description`, `logo`, `address`
  - **Mentor**: `expertise`, `experience`, `bio`, `availability`, `hourlyRate`
  - **Admin**: `permissions`

## Example API Usage

### Register a User
```bash
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "1234567890",
  "role": "user"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Access Protected Routes
Add the JWT token to the Authorization header:
```bash
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Create a Regular User
```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "1234567890",
  "role": "user"
}
```

### Create a Company
```bash
POST /api/users
Content-Type: application/json

{
  "name": "Tech Corp",
  "email": "contact@techcorp.com",
  "password": "securePassword123",
  "role": "company",
  "companyDetails": {
    "companyName": "Tech Corp",
    "companyType": "startup",
    "description": "Building innovative solutions",
    "address": "123 Tech Street"
  }
}
```

### Create a Mentor
```bash
POST /api/users
Content-Type: application/json

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

### Upload File to Cloudinary
```bash
POST /api/upload
Content-Type: multipart/form-data

file: [binary file data]
```

Response:
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/...",
    "public_id": "createbharat/file-1234567890",
    "format": "jpg",
    "resource_type": "image",
    "bytes": 123456,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **multer** - File upload handling

## Development Dependencies

- **nodemon** - Auto-restart server on file changes

## Environment Variables

Create a `.env` file in the root directory:
```
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

To get your Cloudinary credentials:
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
