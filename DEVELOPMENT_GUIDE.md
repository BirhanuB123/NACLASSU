# NASSU Development Guide

This guide covers development practices, coding standards, and workflows for the NASSU project.

## 🏗️ Project Architecture

### Technology Stack

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.x
- **Language**: TypeScript 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **Validation**: Express-validator
- **Testing**: Jest + Supertest (planned)
- **Process Manager**: PM2 (production)

#### Frontend
- **Framework**: React 18.x
- **Language**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **Styling**: Tailwind CSS 3.x
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context + React Query
- **Routing**: React Router DOM 6.x
- **Forms**: React Hook Form + Zod
- **Internationalization**: i18next

#### Infrastructure
- **Version Control**: Git
- **Package Manager**: npm
- **Database**: MongoDB Atlas (production)
- **File Storage**: Firebase Storage
- **Payments**: PayPal
- **Real-time**: Socket.io
- **Caching**: Redis (optional)

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.ts        # Database configuration
│   │   ├── env.ts       # Environment validation
│   │   ├── firebase.ts  # Firebase configuration
│   │   └── paypal.ts    # PayPal configuration
│   ├── controllers/      # Business logic
│   │   ├── admin/       # Admin-specific controllers
│   │   ├── authController.ts
│   │   ├── lessonController.ts
│   │   ├── paymentController.ts
│   │   ├── teamController.ts
│   │   └── userController.ts
│   ├── middleware/       # Custom middleware
│   │   ├── auth.ts      # Authentication middleware
│   │   ├── errorHandler.ts
│   │   └── security.ts  # Security middleware
│   ├── models/          # Database models
│   │   ├── ActivityLog.model.ts
│   │   ├── Lesson.model.ts
│   │   ├── Payment.model.ts
│   │   ├── Photo.ts
│   │   ├── TeamMember.model.ts
│   │   └── User.model.ts
│   ├── routes/          # API routes
│   │   ├── admin.routes.ts
│   │   ├── auth.route.ts
│   │   ├── lesson.route.ts
│   │   ├── payment.routes.ts
│   │   ├── team.ts
│   │   └── user.route.ts
│   ├── services/        # External services
│   │   └── socket.service.ts
│   ├── types/          # TypeScript definitions
│   │   ├── api.ts
│   │   └── express/
│   ├── utils/          # Utility functions
│   │   └── generateToken.ts
│   ├── app.ts          # Express app configuration
│   └── server.ts       # Server entry point
├── dist/               # Compiled JavaScript
├── tests/              # Test files (planned)
├── package.json
├── tsconfig.json
└── nodemon.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # Base UI components
│   │   ├── forms/      # Form components
│   │   ├── layout/     # Layout components
│   │   └── common/     # Common components
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin pages
│   │   ├── auth/       # Authentication pages
│   │   └── public/     # Public pages
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── types/          # TypeScript definitions
│   ├── translations/   # i18n files
│   ├── lib/            # Utility libraries
│   ├── App.tsx         # Main app component
│   └── main.tsx        # App entry point
├── public/              # Static assets
├── dist/                # Build output
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🛠️ Development Setup

### Prerequisites
```bash
# Install Node.js 18+
node --version  # Should be >= 18.0.0

# Install Git
git --version

# Install MongoDB (local development)
# Follow MongoDB installation guide for your OS
```

### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd NASSU

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### Environment Configuration
```bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend environment (if needed)
cd ../frontend
cp .env.example .env
# Edit .env with your configuration
```

## 📝 Coding Standards

### TypeScript

#### Naming Conventions
```typescript
// Interfaces and types: PascalCase
interface UserProfile { }
type PaymentStatus = 'pending' | 'completed' | 'failed';

// Variables and functions: camelCase
const userName = 'John';
const getUserProfile = () => { };

// Constants: UPPER_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS = 5;
const API_BASE_URL = 'http://localhost:5000';

// Classes: PascalCase
class UserService { }
class PaymentController { }
```

#### Type Definitions
```typescript
// Use interfaces for objects
interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Use enums for constants
enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

// Use union types for multiple values
type PaymentMethod = 'paypal' | 'stripe' | 'bank_transfer';

// Use generics for reusable types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

#### Error Handling
```typescript
// Use custom error classes
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Use try-catch with proper typing
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  if (error instanceof AppError) {
    throw error;
  }
  throw new AppError(500, 'Internal server error');
}
```

### React Components

#### Component Structure
```typescript
// Functional components with TypeScript
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  onDelete 
}) => {
  const handleEdit = () => {
    onEdit?.(user);
  };

  const handleDelete = () => {
    onDelete?.(user.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold">{user.fullName}</h3>
      <p className="text-gray-600">{user.email}</p>
      <div className="flex gap-2 mt-4">
        {onEdit && (
          <button 
            onClick={handleEdit}
            className="btn btn-primary"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button 
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
```

#### Hooks Usage
```typescript
// Custom hooks
const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await userService.getUser(userId);
        setUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

// React Query for server state
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### API Design

#### RESTful Endpoints
```typescript
// Use consistent URL patterns
// GET    /api/users          - List users
// GET    /api/users/:id      - Get user
// POST   /api/users          - Create user
// PUT    /api/users/:id      - Update user
// DELETE /api/users/:id      - Delete user

// Use proper HTTP status codes
// 200 - Success
// 201 - Created
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Internal Server Error
```

#### Response Format
```typescript
// Consistent response structure
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Success response
const successResponse: ApiResponse<User> = {
  success: true,
  data: user,
  message: 'User created successfully'
};

// Error response
const errorResponse: ApiResponse<null> = {
  success: false,
  error: 'User not found',
  message: 'The requested user does not exist'
};
```

## 🔄 Development Workflow

### Git Workflow

#### Branch Naming
```bash
# Feature branches
git checkout -b feature/user-authentication
git checkout -b feature/payment-integration

# Bug fix branches
git checkout -b fix/login-validation-error
git checkout -b fix/payment-processing-bug

# Hotfix branches
git checkout -b hotfix/security-vulnerability
git checkout -b hotfix/critical-bug
```

#### Commit Messages
```bash
# Use conventional commit format
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve login validation error"
git commit -m "docs: update API documentation"
git commit -m "style: format code according to style guide"
git commit -m "refactor: simplify user service logic"
git commit -m "test: add unit tests for user controller"
git commit -m "chore: update dependencies"
```

#### Pull Request Process
1. Create feature branch from `main`
2. Make changes and commit with descriptive messages
3. Push branch and create pull request
4. Request code review from team members
5. Address feedback and make necessary changes
6. Merge after approval

### Code Review Checklist

#### Backend Code Review
- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Input validation is present
- [ ] Database queries are optimized
- [ ] Security measures are in place
- [ ] API documentation is updated
- [ ] Tests are written (when applicable)

#### Frontend Code Review
- [ ] TypeScript types are properly defined
- [ ] Component is reusable and well-structured
- [ ] Props interface is complete
- [ ] Error boundaries are implemented
- [ ] Accessibility features are included
- [ ] Responsive design is considered
- [ ] Performance optimizations are applied

## 🧪 Testing Strategy

### Backend Testing

#### Unit Tests
```typescript
// Example test structure
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const result = await userService.createUser(userData);

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('id');
      expect(result.data.email).toBe(userData.email);
    });

    it('should fail with invalid email', async () => {
      const userData = {
        fullName: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      };

      await expect(userService.createUser(userData))
        .rejects
        .toThrow('Invalid email format');
    });
  });
});
```

#### Integration Tests
```typescript
// Test API endpoints
describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });
});
```

### Frontend Testing

#### Component Tests
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com'
  };

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

## 📊 Performance Considerations

### Backend Performance
```typescript
// Database optimization
// Use indexes for frequently queried fields
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Implement pagination
const getUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .select('-password'); // Exclude sensitive fields
  
  const total = await User.countDocuments();
  
  return {
    users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    }
  };
};

// Implement caching
const getUserById = async (userId: string) => {
  const cacheKey = `user:${userId}`;
  let user = await redis.get(cacheKey);
  
  if (!user) {
    user = await User.findById(userId);
    if (user) {
      await redis.setex(cacheKey, 300, JSON.stringify(user)); // Cache for 5 minutes
    }
  } else {
    user = JSON.parse(user);
  }
  
  return user;
};
```

### Frontend Performance
```typescript
// Lazy loading components
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const UserManagement = lazy(() => import('./pages/UserManagement'));

// Memoization for expensive calculations
const ExpensiveComponent = memo(({ data }: { data: ComplexData[] }) => {
  const processedData = useMemo(() => {
    return data.map(item => complexProcessing(item));
  }, [data]);

  return <div>{/* render processed data */}</div>;
});

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedUserList = ({ users }: { users: User[] }) => {
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>
      <UserCard user={users[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={users.length}
      itemSize={100}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

## 🔒 Security Best Practices

### Authentication & Authorization
```typescript
// JWT token validation
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as UserPayload;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      error: 'Invalid or expired token' 
    });
  }
};

// Role-based access control
const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: 'Insufficient permissions' 
      });
    }
    next();
  };
};

// Usage
app.get('/api/admin/users', 
  authenticateToken, 
  requireRole(['admin']), 
  adminController.getUsers
);
```

### Input Validation
```typescript
// Use validation libraries
import { body, validationResult } from 'express-validator';

const validateUserRegistration = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
```

## 📚 Documentation Standards

### Code Documentation
```typescript
/**
 * Creates a new user account
 * @param userData - User registration data
 * @returns Promise<ApiResponse<User>> - Created user data
 * @throws {AppError} When validation fails or user already exists
 */
const createUser = async (userData: CreateUserDto): Promise<ApiResponse<User>> => {
  // Implementation
};

/**
 * User service for managing user operations
 */
class UserService {
  /**
   * Authenticates a user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise<User> - Authenticated user
   */
  async authenticate(email: string, password: string): Promise<User> {
    // Implementation
  }
}
```

### API Documentation
```typescript
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @param {string} fullName - User's full name
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {object} 201 - User created successfully
 * @returns {object} 400 - Validation error
 * @returns {object} 409 - User already exists
 */
app.post('/api/auth/register', validateUserRegistration, authController.register);
```

## 🚀 Development Commands

### Backend Commands
```bash
cd backend

# Development
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run build:watch  # Watch mode for building
npm start            # Start production server

# Testing (planned)
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Frontend Commands
```bash
cd frontend

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Root Commands
```bash
# From project root
npm run dev          # Start both backend and frontend
npm run client       # Start only frontend
npm start            # Start only backend
```

## 🔧 Development Tools

### VS Code Extensions
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript Importer** - Auto-import TypeScript modules
- **Auto Rename Tag** - HTML/JSX tag renaming
- **Bracket Pair Colorizer** - Visual bracket matching
- **GitLens** - Git integration
- **Thunder Client** - API testing

### Browser Extensions
- **React Developer Tools** - React debugging
- **Redux DevTools** - State management debugging
- **JSON Viewer** - JSON formatting

### Postman Collections
Create Postman collections for testing API endpoints:
- Authentication endpoints
- User management
- Lesson management
- Payment processing
- Admin functions

## 📋 Development Checklist

### Before Starting Development
- [ ] Pull latest changes from main branch
- [ ] Check for any new dependencies
- [ ] Verify environment configuration
- [ ] Run existing tests (if any)

### During Development
- [ ] Follow coding standards
- [ ] Write meaningful commit messages
- [ ] Test functionality locally
- [ ] Update documentation as needed

### Before Committing
- [ ] Run linting (`npm run lint`)
- [ ] Check for TypeScript errors
- [ ] Test functionality
- [ ] Update tests if needed

### Before Creating Pull Request
- [ ] Ensure all tests pass
- [ ] Update documentation
- [ ] Self-review code
- [ ] Request code review

---

**Note**: This development guide should be updated as the project evolves and new patterns emerge.
