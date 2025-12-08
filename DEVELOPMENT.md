# 👨‍💻 دليل التطوير

## 🎯 معايير الكود

### JavaScript/TypeScript
- استخدم `const` و `let` بدلاً من `var`
- استخدم Arrow Functions
- استخدم Template Literals
- استخدم Destructuring

```typescript
// ✅ Good
const { name, email } = user;
const greeting = `Hello, ${name}!`;

// ❌ Bad
var name = user.name;
var greeting = "Hello, " + name + "!";
```

### React Components
- استخدم Functional Components
- استخدم Hooks
- استخدم TypeScript
- أضف PropTypes أو TypeScript Types

```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
}

const User: React.FC<UserProps> = ({ name, email }) => {
  return <div>{name}</div>;
};

// ❌ Bad
function User(props) {
  return <div>{props.name}</div>;
}
```

### Naming Conventions
- **Components:** PascalCase (e.g., `UserProfile.tsx`)
- **Functions:** camelCase (e.g., `getUserData()`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Files:** kebab-case (e.g., `user-profile.tsx`)

### File Organization

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── dashboard/       # Dashboard-specific
│   ├── layout/          # Layout components
│   └── [feature]/       # Feature-specific
├── pages/               # Next.js pages
├── services/            # API services
├── hooks/               # Custom hooks
├── context/             # Context API
├── types/               # TypeScript types
├── utils/               # Utility functions
└── styles/              # Global styles
```

## 🔄 Git Workflow

### Branch Naming
```
feature/add-user-authentication
bugfix/fix-api-error
docs/update-readme
```

### Commit Messages
```
feat: add user authentication
fix: resolve API timeout issue
docs: update setup guide
refactor: improve component structure
test: add unit tests for auth
```

### Pull Request Process
1. Create feature branch
2. Make changes
3. Write tests
4. Create Pull Request
5. Code review
6. Merge to main

## 🧪 Testing

### Backend Testing
```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- productController.test.js
```

### Frontend Testing
```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e
```

## 📝 API Development

### Adding New Endpoint

1. **Create Model** (if needed)
```javascript
// models/User.js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
export default mongoose.model('User', userSchema);
```

2. **Create Controller**
```javascript
// api/controllers/userController.js
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

3. **Create Route**
```javascript
// api/routes/users.js
import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();
router.get('/', getUsers);
export default router;
```

4. **Add to Main Server**
```javascript
// index.js
import userRoutes from './api/routes/users.js';
app.use('/api/users', userRoutes);
```

## 🎨 Frontend Development

### Adding New Page

1. **Create Page Component**
```typescript
// src/app/users/page.tsx
export default function UsersPage() {
  return <div>Users Page</div>;
}
```

2. **Create Components** (if needed)
```typescript
// src/components/UserList.tsx
interface User {
  id: string;
  name: string;
}

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

3. **Use in Page**
```typescript
// src/app/users/page.tsx
import { UserList } from '@/components/UserList';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return <UserList users={users} />;
}
```

## 🔐 Security Best Practices

### Backend
- ✅ Validate all inputs
- ✅ Use environment variables for secrets
- ✅ Implement rate limiting
- ✅ Use HTTPS in production
- ✅ Sanitize database queries
- ✅ Add authentication & authorization

### Frontend
- ✅ Validate form inputs
- ✅ Store tokens securely (httpOnly cookies)
- ✅ Implement CSRF protection
- ✅ Sanitize user input
- ✅ Use Content Security Policy
- ✅ Keep dependencies updated

## 📊 Performance Tips

### Backend
- Use database indexing
- Implement pagination
- Add caching (Redis)
- Optimize queries
- Use compression middleware

### Frontend
- Use code splitting
- Lazy load components
- Optimize images
- Use memoization
- Implement virtual scrolling

## 🚀 Deployment Checklist

### Before Deploying
- [ ] Run tests
- [ ] Check for console errors
- [ ] Update dependencies
- [ ] Review security
- [ ] Test in production mode
- [ ] Update documentation

### Environment Variables
- [ ] Set all required env vars
- [ ] Use secrets manager
- [ ] Never commit secrets
- [ ] Document env vars

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Setup performance monitoring
- [ ] Setup logging
- [ ] Setup alerts

## 📚 Useful Commands

### Backend
```bash
# Development
npm run dev

# Production
npm start

# Tests
npm test

# Linting
npm run lint

# Format code
npm run format
```

### Frontend
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Tests
npm test

# Linting
npm run lint

# Format code
npm run format
```

## 🔗 Useful Resources

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Tools
- [Postman](https://www.postman.com/) - API Testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VS Code](https://code.visualstudio.com/) - Editor
- [Git](https://git-scm.com/) - Version Control

### Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint - Code linter
- Thunder Client - API testing

## 🤝 Code Review Checklist

### Before Submitting PR
- [ ] Code follows style guide
- [ ] No console.log statements
- [ ] Tests are passing
- [ ] No breaking changes
- [ ] Documentation is updated
- [ ] Commit messages are clear

### During Review
- [ ] Code is readable
- [ ] No security issues
- [ ] No performance issues
- [ ] Tests cover changes
- [ ] Documentation is clear

## 📞 Getting Help

- 💬 Discord: [Join our server]
- 📧 Email: dev@ray-egypt.com
- 📖 Documentation: [Read the docs]
- 🐛 Issues: [Report a bug]

---

**Happy Coding! 🎉**
