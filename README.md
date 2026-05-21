# OHANNA - Egyptian Streetwear E-Commerce Platform

A modern, full-stack e-commerce platform celebrating Egyptian streetwear culture. Built with React, Express.js, TypeScript, and Tailwind CSS.

## 🎯 Overview

OHANNA is a premium Egyptian streetwear brand platform featuring:
- **Modern Frontend**: React + Vite + Tailwind CSS
- **Robust Backend**: Express.js + TypeScript + Zod validation
- **Payment Integration**: Stripe with mock fallback
- **API Documentation**: OpenAPI 3.1.0 with Swagger UI
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS)
- npm 9+

### Installation

```bash
# Clone repository
git clone <repository-url>
cd ohanna-landing-page

# Backend setup
cd api-server
npm install --legacy-peer-deps
cp .env.example .env
npm run dev

# Frontend setup (in new terminal)
cd ohanna
npm install
npm run dev
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **API Docs**: http://localhost:3001/api-docs

## 📁 Project Structure

```
ohanna-landing-page/
├── ohanna/                 # React frontend
│   ├── src/
│   │   ├── api/           # API client & types
│   │   ├── components/    # React components
│   │   └── App.tsx
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── api-server/            # Express backend
│   ├── src/
│   │   ├── api/           # Generated types
│   │   ├── api-spec/      # OpenAPI spec
│   │   ├── lib/           # Services & utilities
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # API routes
│   │   ├── app.ts
│   │   └── index.ts
│   ├── api-spec/          # API specification
│   └── package.json
│
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md    # Project architecture
│   ├── SETUP.md          # Development setup
│   ├── API.md            # API documentation
│   └── DEPLOYMENT.md     # Deployment guide
│
└── README.md             # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **Zod** - Validation

### Backend
- **Express.js 5** - Web framework
- **TypeScript** - Type safety
- **Zod** - Request validation
- **Pino** - Structured logging
- **Stripe** - Payment processing
- **Swagger UI** - API documentation

## 📚 Documentation

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Project structure and design
- **[SETUP.md](./docs/SETUP.md)** - Development environment setup
- **[API.md](./docs/API.md)** - API endpoints and usage
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production deployment

## 🔌 API Endpoints

### Core Endpoints
- `GET /` - Root health check
- `GET /api/healthz` - Health status
- `POST /api/checkout` - Create checkout session
- `POST /api/contact` - Submit contact form
- `GET /api/track-order` - Track order
- `GET /api/products` - Get products
- `GET /api/setup` - Setup status

### Documentation
- `GET /api-docs` - Swagger UI
- `GET /api-docs.json` - OpenAPI specification

## 🔐 Security Features

- ✅ CORS configured for frontend
- ✅ Request validation with Zod
- ✅ Error handling middleware
- ✅ Structured logging
- ✅ Environment-based configuration
- ✅ Stripe integration with fallback

## 🚀 Development

### Available Scripts

**Backend:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production build
npm run typecheck  # Type checking
```

**Frontend:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run typecheck  # Type checking
```

### Environment Variables

**Backend (.env):**
```
PORT=3001
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_...  # Optional
CORS_ORIGINS=http://localhost:5173  # Optional
```

## 🧪 Testing

### API Testing
- Use Swagger UI at `http://localhost:3001/api-docs`
- Or use curl/Postman

### Frontend Testing
- React DevTools browser extension
- Network tab for API calls
- Console for errors

## 📦 Building for Production

### Backend
```bash
cd api-server
npm install --legacy-peer-deps
npm run build
npm start
```

### Frontend
```bash
cd ohanna
npm install
npm run build
# Output in dist/
```

## 🐳 Docker Deployment

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down
```

## 📊 Project Status

### Completed ✅
- [x] Frontend React application
- [x] Backend Express API
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] API documentation (Swagger)
- [x] CORS configuration
- [x] Request validation
- [x] Error handling
- [x] Stripe integration
- [x] Favicon branding
- [x] Middleware system
- [x] Comprehensive documentation

### In Progress 🔄
- [ ] Database integration
- [ ] Authentication system
- [ ] Product catalog
- [ ] Order management
- [ ] User profiles

### Planned 📋
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Analytics
- [ ] Mobile app
- [ ] GraphQL API

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/description`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push to branch: `git push origin feature/description`
4. Open a pull request

## 📝 Commit Convention

```
feat(scope): description      # New feature
fix(scope): description       # Bug fix
docs(scope): description      # Documentation
refactor(scope): description  # Code refactoring
style(scope): description     # Code style
test(scope): description      # Tests
```

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Backend
PORT=3002 npm run dev

# Frontend
npm run dev -- --port 5174
```

### CORS Errors
Update `CORS_ORIGINS` in backend `.env`:
```
CORS_ORIGINS=http://localhost:5173
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 📞 Support

For issues or questions:
1. Check [documentation](./docs/)
2. Review error messages
3. Check backend logs
4. Check browser console

## 📄 License

Proprietary - OHANNA

## 👥 Team

- **Design**: Egyptian Streetwear Culture
- **Development**: Full-stack team
- **Brand**: OHANNA

## 🎨 Brand Colors

- **Primary**: #FF3C00 (Orange)
- **Dark**: #1a1a1a (Dark Gray)
- **Light**: #ffffff (White)

## 🌍 Localization

Currently supports:
- English (en)

Future support:
- Arabic (ar)
- French (fr)

## 📈 Performance

- Frontend: Optimized with Vite
- Backend: Structured logging with Pino
- Database: Connection pooling (when configured)
- API: Response time monitoring

## 🔄 Version History

### v0.1.0 (Current)
- Initial release
- Core API endpoints
- Frontend application
- API documentation
- Stripe integration

## 🚀 Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy
- **Vercel**: Frontend
- **Heroku**: Backend
- **AWS**: Full stack
- **DigitalOcean**: Full stack
- **Docker**: Local/Cloud

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.0)

## ✨ Features Showcase

### Frontend
- Responsive design
- Dark mode support
- Component-based architecture
- Type-safe API client
- Optimized performance

### Backend
- RESTful API
- Request validation
- Error handling
- Structured logging
- Payment integration
- API documentation

## 🎯 Next Steps

1. Read [SETUP.md](./docs/SETUP.md) for development setup
2. Review [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for project structure
3. Check [API.md](./docs/API.md) for API documentation
4. See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for production deployment

---

**Made with ❤️ for Egyptian Streetwear Culture**
