# Backend Vercel Deployment Guide

## Deploying to ohanna-api.vercel.app

### Prerequisites:
- Vercel account
- GitHub repository connected to Vercel
- Database provider (Vercel Postgres, Supabase, or PlanetScale)

### Step 1: Create New Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: Set the Root Directory to `api-server`

### Step 2: Configure Build Settings

```
Framework Preset: Other
Root Directory: api-server
Build Command: npm ci --legacy-peer-deps && npm run build
Output Directory: (leave empty)
Install Command: npm ci --legacy-peer-deps
```

### Step 3: Environment Variables

Add these in Vercel Project Settings > Environment Variables:

#### Required:
```
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
CORS_ORIGIN=https://ohanna-landing-page.vercel.app
```

#### Optional:
```
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
LOG_LEVEL=info
```

### Step 4: Database Setup Options

#### Option A: Vercel Postgres (Recommended)
1. Go to Storage tab in your Vercel project
2. Create new Postgres database
3. Copy connection string to `DATABASE_URL`

#### Option B: Supabase (Free tier available)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string to `DATABASE_URL`

#### Option C: PlanetScale (MySQL alternative)
1. Create account at [planetscale.com](https://planetscale.com)
2. Create new database
3. Get connection string
4. Update schema files to use MySQL syntax

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your API will be available at `https://ohanna-api.vercel.app`

### Step 6: Test Deployment

Test these endpoints:
- `GET https://ohanna-api.vercel.app/health` - Should return `{"status":"ok"}`
- `GET https://ohanna-api.vercel.app/api/healthz` - Should return health status
- `GET https://ohanna-api.vercel.app/api/products` - Should return products (if DB connected)

### Step 7: Update Frontend

The frontend is already configured to use `https://ohanna-api.vercel.app` in production.

If you need to override, set in Vercel (frontend project):
```
VITE_API_URL=https://ohanna-api.vercel.app
```

### Database Migration

After deployment, you'll need to run migrations:

#### Option 1: Local Migration (Recommended)
```bash
cd api-server
DATABASE_URL="your_production_url" npm run db:migrate
DATABASE_URL="your_production_url" npm run db:seed
```

#### Option 2: Vercel CLI
```bash
vercel env pull .env.local
npm run db:migrate
npm run db:seed
```

### Troubleshooting

#### Build Fails:
- Check that `--legacy-peer-deps` is in install command
- Verify Node.js version (18.x or 20.x)
- Check build logs for specific errors

#### Database Connection Fails:
- Verify `DATABASE_URL` format: `postgresql://user:pass@host:port/db`
- Check database provider allows external connections
- Ensure database exists and user has permissions

#### CORS Errors:
- Verify `CORS_ORIGIN` matches your frontend URL exactly
- Check that both HTTP and HTTPS are handled correctly

#### Function Timeout:
- Vercel functions have 10s timeout on Hobby plan
- Optimize database queries
- Consider upgrading to Pro plan (60s timeout)

### Monitoring

- View logs in Vercel Dashboard > Functions tab
- Monitor performance in Analytics tab
- Set up alerts for errors

### Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add `ohanna-api.vercel.app` or your custom domain
3. Update `CORS_ORIGIN` and frontend `VITE_API_URL` accordingly

## Production Checklist

- [ ] Database connected and migrated
- [ ] Environment variables set
- [ ] CORS configured for frontend domain
- [ ] Health endpoints responding
- [ ] Products API returning data
- [ ] Frontend connecting successfully
- [ ] Error monitoring set up
- [ ] Backup strategy in place