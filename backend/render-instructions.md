# Render Deployment Instructions

## 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub, GitLab, or email

## 2. Deploy Backend Service
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select the backend folder
- Configure settings:
  - **Name**: habit-tracker-backend
  - **Environment**: Python 3
  - **Region**: Choose closest (Oregon, Ohio, Frankfurt)
  - **Branch**: main
  - **Build Command**: pip install -r requirements.txt
  - **Start Command**: uvicorn main:app --host 0.0.0.0 --port $PORT
  - **Plan**: Free

## 3. Environment Variables
In Render dashboard, go to your service → Environment:

```
DATABASE_URL=your-supabase-connection-string
CORS_ORIGINS=https://your-vercel-app.vercel.app
```

## 4. Create PostgreSQL Database (Supabase)
1. Go to https://supabase.com
2. Create account and new project
3. Get connection string from Settings → Database
4. Use this as your DATABASE_URL

## 5. Deploy
- Click "Create Web Service"
- Render will build and deploy automatically
- Your API will be live at: https://your-service.onrender.com

## Automatic Deployments
Render will automatically deploy on every git push to your main branch!