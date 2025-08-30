# NASSU API Documentation

## Overview

The NASSU API provides a RESTful interface for managing users, lessons, team members, payments, and administrative functions. All endpoints return JSON responses and use standard HTTP status codes.

**Base URL**: `http://localhost:5000/api` (development)  
**Content-Type**: `application/json`

## Authentication

Most endpoints require authentication via JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /auth/logout
Logout user (invalidate token).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET /auth/profile
Get current user's profile information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### PUT /auth/profile
Update user profile information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullName": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Smith",
      "email": "johnsmith@example.com",
      "role": "user",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  }
}
```

### Lessons

#### GET /lessons
Get all available lessons with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `search` (optional): Search in title and content

**Response:**
```json
{
  "success": true,
  "data": {
    "lessons": [
      {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "title": "Introduction to NASSU",
        "content": "Welcome to the NASSU organization...",
        "category": "Introduction",
        "duration": 30,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### GET /lessons/:id
Get a specific lesson by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "lesson": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Introduction to NASSU",
      "content": "Welcome to the NASSU organization...",
      "category": "Introduction",
      "duration": 30,
      "attachments": ["document1.pdf", "image1.jpg"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  }
}
```

#### POST /lessons
Create a new lesson (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "title": "Advanced NASSU Concepts",
  "content": "This lesson covers advanced topics...",
  "category": "Advanced",
  "duration": 45,
  "attachments": ["advanced.pdf"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lesson": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "title": "Advanced NASSU Concepts",
      "content": "This lesson covers advanced topics...",
      "category": "Advanced",
      "duration": 45,
      "attachments": ["advanced.pdf"],
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

#### PUT /lessons/:id
Update an existing lesson (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "title": "Updated Lesson Title",
  "content": "Updated content...",
  "duration": 60
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lesson": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Updated Lesson Title",
      "content": "Updated content...",
      "category": "Introduction",
      "duration": 60,
      "updatedAt": "2024-01-15T13:00:00.000Z"
    }
  }
}
```

#### DELETE /lessons/:id
Delete a lesson (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "Lesson deleted successfully"
}
```

### Team Management

#### GET /team
Get all team members.

**Response:**
```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "name": "John Doe",
        "position": "President",
        "bio": "Experienced leader...",
        "image": "john-doe.jpg",
        "email": "john@nassu.org",
        "phone": "+1234567890"
      }
    ]
  }
}
```

#### POST /team
Add a new team member (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "position": "Vice President",
  "bio": "Dedicated member...",
  "email": "jane@nassu.org",
  "phone": "+1234567891"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "member": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "Jane Smith",
      "position": "Vice President",
      "bio": "Dedicated member...",
      "email": "jane@nassu.org",
      "phone": "+1234567891",
      "createdAt": "2024-01-15T14:00:00.000Z"
    }
  }
}
```

#### PUT /team/:id
Update team member information (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "position": "Senior Vice President",
  "bio": "Updated bio information..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "member": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "position": "Senior Vice President",
      "bio": "Updated bio information...",
      "updatedAt": "2024-01-15T15:00:00.000Z"
    }
  }
}
```

#### DELETE /team/:id
Remove team member (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "Team member removed successfully"
}
```

### Payments

#### POST /payments/create
Create a new payment intent for donations.

**Request Body:**
```json
{
  "amount": 50.00,
  "currency": "USD",
  "description": "Monthly donation to NASSU",
  "donorName": "John Doe",
  "donorEmail": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentIntent": {
      "id": "pi_1234567890",
      "clientSecret": "pi_1234567890_secret_abcdef",
      "amount": 5000,
      "currency": "usd",
      "status": "requires_payment_method"
    }
  }
}
```

#### POST /payments/confirm
Confirm a completed payment.

**Request Body:**
```json
{
  "paymentIntentId": "pi_1234567890",
  "transactionId": "txn_1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "payment": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "amount": 50.00,
      "currency": "USD",
      "status": "completed",
      "donorName": "John Doe",
      "donorEmail": "john@example.com",
      "transactionId": "txn_1234567890",
      "createdAt": "2024-01-15T16:00:00.000Z"
    }
  }
}
```

#### GET /payments/history
Get payment history (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response:**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "amount": 50.00,
        "currency": "USD",
        "status": "completed",
        "donorName": "John Doe",
        "donorEmail": "john@example.com",
        "createdAt": "2024-01-15T16:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25
    }
  }
}
```

### Admin Functions

#### GET /admin/users
Get all users in the system (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `role` (optional): Filter by user role
- `search` (optional): Search by name or email

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "fullName": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "lastLogin": "2024-01-15T10:30:00.000Z",
        "isLocked": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15
    }
  }
}
```

#### PUT /admin/users/:id
Update user role or status (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "role": "admin",
  "isLocked": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "isLocked": false,
      "updatedAt": "2024-01-15T17:00:00.000Z"
    }
  }
}
```

#### GET /admin/analytics
Get system analytics and statistics (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "analytics": {
      "totalUsers": 150,
      "activeUsers": 120,
      "totalLessons": 25,
      "totalPayments": 75,
      "totalRevenue": 3750.00,
      "userGrowth": {
        "thisMonth": 15,
        "lastMonth": 12,
        "growth": 25
      },
      "revenueGrowth": {
        "thisMonth": 450.00,
        "lastMonth": 380.00,
        "growth": 18.4
      }
    }
  }
}
```

#### POST /admin/activity-log
Log administrative activities (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "action": "user_role_updated",
  "targetUserId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "details": "Changed user role from 'user' to 'admin'",
  "ipAddress": "192.168.1.100"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "activityLog": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d2",
      "adminId": "64f8a1b2c3d4e5f6a7b8c9d1",
      "action": "user_role_updated",
      "targetUserId": "64f8a1b2c3d4e5f6a7b8c9d0",
      "details": "Changed user role from 'user' to 'admin'",
      "ipAddress": "192.168.1.100",
      "timestamp": "2024-01-15T18:00:00.000Z"
    }
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Authentication endpoints**: 5 requests per 15 minutes
- **General endpoints**: 100 requests per 15 minutes
- **Admin endpoints**: 50 requests per 15 minutes

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Pagination

Endpoints that return lists support pagination with the following query parameters:

- `page`: Page number (starts from 1)
- `limit`: Number of items per page (default: 10, max: 100)

Pagination metadata is included in the response:

```json
{
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## File Uploads

For file uploads (images, documents), use multipart/form-data:

```
POST /api/lessons
Content-Type: multipart/form-data

title: Lesson Title
content: Lesson content
attachments: [file1.pdf, file2.jpg]
```

## WebSocket Events

The API also supports real-time communication via WebSocket:

### Connection
```javascript
const socket = io('http://localhost:5000');
```

### Events
- `user_connected` - User connected to system
- `lesson_updated` - Lesson content updated
- `payment_received` - New payment received
- `admin_notification` - Admin system notification

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example: Get lessons
const getLessons = async () => {
  try {
    const response = await api.get('/lessons');
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
  }
};
```

### Python
```python
import requests

class NASSUAPI:
    def __init__(self, base_url="http://localhost:5000/api"):
        self.base_url = base_url
        self.token = None
    
    def login(self, email, password):
        response = requests.post(f"{self.base_url}/auth/login", json={
            "email": email,
            "password": password
        })
        data = response.json()
        if data["success"]:
            self.token = data["data"]["token"]
        return data
    
    def get_lessons(self):
        headers = {"Authorization": f"Bearer {self.token}"} if self.token else {}
        response = requests.get(f"{self.base_url}/lessons", headers=headers)
        return response.json()
```

## Testing

Test the API endpoints using tools like:

- **Postman** - API testing and documentation
- **Insomnia** - REST API client
- **cURL** - Command line testing
- **Thunder Client** - VS Code extension

Example cURL commands:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get lessons (with auth)
curl -X GET http://localhost:5000/api/lessons \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
