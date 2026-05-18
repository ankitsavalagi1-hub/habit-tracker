# Render Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. App Crashes on Startup (Status 1)
**Problem**: App exits immediately after startup
**Solution**: 
- Move `create_all()` to startup event (already fixed)
- Add proper error handling for database connections
- Ensure environment variables are set correctly

### 2. Database Connection Issues
**Problem**: Cannot connect to Supabase PostgreSQL
**Solution**:
- Add SSL mode requirement: `connect_args={"sslmode": "require"}`
- Use proper Supabase connection string format
- Add fallback to SQLite for development

### 3. Environment Variables Not Loading
**Problem**: .env file not working on Render
**Solution**:
- Set environment variables in Render dashboard
- Use `os.getenv()` with defaults
- Remove hardcoded values

### 4. CORS Issues
**Problem**: Frontend can't connect to backend
**Solution**:
- Set `CORS_ORIGINS` environment variable
- Include both local and production URLs
- Use comma-separated list of origins

### 5. Port Binding Issues
**Problem**: Render uses dynamic port $PORT
**Solution**:
- Use `--port $PORT` in start command
- Don't hardcode port 8000

## Render Dashboard Configuration

### Environment Variables:
```
DATABASE_URL=postgresql://username:password@host.supabase.co:5432/dbname
CORS_ORIGINS=https://your-vercel-app.vercel.app
```

### Build Command:
```
pip install -r requirements.txt
```

### Start Command:
```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## Testing Deployment Locally
1. Set production environment variables:
   ```bash
   export DATABASE_URL=your-supabase-url
   export CORS_ORIGINS=http://localhost:3000,https://your-app.vercel.app
   ```

2. Test with production settings:
   ```bash
   python -m uvicorn main:app --host 0.0.0.0 --port 8000
   ```

3. Verify logs show:
   - "Database connection successful"
   - "Database tables created successfully"
   - No errors or warnings

The app is now deployment-ready with proper error handling and fallbacks!