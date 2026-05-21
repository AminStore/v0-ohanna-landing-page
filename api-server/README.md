# OHANNA API Server

Express.js backend API for the OHANNA Egyptian Streetwear platform.

## Features

- ✅ RESTful API with TypeScript
- ✅ Swagger/OpenAPI documentation at `/api-docs`
- ✅ CORS configured for frontend communication
- ✅ Stripe payment integration (optional)
- ✅ Mock checkout fallback when Stripe is not configured
- ✅ Contact form handling
- ✅ Order tracking
- ✅ Structured logging with Pino
- ✅ Environment-based configuration

## Quick Start

### Installation

```bash
npm install --legacy-peer-deps
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Environment Variables:**

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production, default: development)
- `STRIPE_SECRET_KEY` - Stripe secret key (optional, for real payments)
- `CORS_ORIGINS` - Comma-separated allowed origins (optional)

### Development

```bash
npm run dev
```

Server will start on `http://localhost:3001`

### Production Build

```bash
npm run build
npm start
```

## API Documentation

### Swagger UI

Access interactive API documentation at:
- **UI**: `http://localhost:3001/api-docs`
- **JSON**: `http://localhost:3001/api-docs.json`

### Available Endpoints

#### Health Check
- `GET /api/healthz` - Server health status

#### Checkout
- `POST /api/checkout` - Create checkout session
  - Requires: `items`, `successUrl`, `cancelUrl`
  - Uses Stripe if configured, otherwise mock checkout

#### Contact
- `POST /api/contact` - Submit contact form
  - Requires: `name`, `email`, `message`
  - Optional: `subject`

#### Orders
- `GET /api/track-order` - Track order by ID and email
  - Query params: `id`, `email`

#### Products
- `GET /api/products` - Get available products

#### Setup
- `GET /api/setup` - Get API setup status

## Project Structure

```
api-server/
├── src/
│   ├── api/              # Generated API types and schemas
│   ├── db/               # Database configuration
│   ├── lib/              # Utilities and services
│   │   ├── env.ts        # Environment configuration
│   │   ├── logger.ts     # Pino logger setup
│   │   └── stripe.ts     # Stripe integration
│   ├── middlewares/      # Express middlewares
│   ├── routes/           # API route handlers
│   ├── app.ts            # Express app setup
│   └── index.ts          # Server entry point
├── api-spec/             # OpenAPI specification
│   ├── openapi.json      # API schema (used by Swagger)
│   ├── openapi.yaml      # API schema (YAML format)
│   └── orval.config.ts   # Code generation config
├── dist/                 # Compiled output
├── .env.example          # Environment variables template
├── build.mjs             # Build script
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## Configuration

### CORS

By default, CORS is configured to allow:
- `http://localhost:5173` (Vite frontend)
- `http://localhost:3000`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`
- `http://192.168.100.8:5173`

To customize, set `CORS_ORIGINS` environment variable:

```bash
CORS_ORIGINS=http://example.com,http://app.example.com
```

### Stripe Integration

#### Without Stripe (Development)

Leave `STRIPE_SECRET_KEY` unset. The API will use mock checkout sessions.

#### With Stripe (Production)

1. Get your Stripe secret key from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Set the environment variable:

```bash
STRIPE_SECRET_KEY=sk_test_your_key_here
```

The API will automatically initialize Stripe and use real payment processing.

## Logging

Logs are structured using Pino and include:
- Request ID, method, and URL
- Response status code and response time
- Configuration details on startup
- Errors with full context

## Development

### Type Checking

```bash
npm run typecheck
```

### Code Generation

API types are generated from OpenAPI spec using Orval:

```bash
# From api-spec/ directory
npm run generate
```

## Deployment

### Environment Variables for Production

```bash
NODE_ENV=production
PORT=3001
STRIPE_SECRET_KEY=sk_live_your_production_key
CORS_ORIGINS=https://ohanna.com,https://www.ohanna.com
```

### Docker (Optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## Troubleshooting

### Port Already in Use

```bash
# Change port
PORT=3002 npm run dev
```

### CORS Errors

Verify `CORS_ORIGINS` includes your frontend URL:

```bash
CORS_ORIGINS=http://localhost:5173 npm run dev
```

### Stripe Errors

Check that `STRIPE_SECRET_KEY` starts with `sk_`:
- Test keys: `sk_test_...`
- Live keys: `sk_live_...`

## License

Proprietary - OHANNA
