# Vercel Deployment Instructions

## 1. Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub, GitLab, or email

## 2. Connect Repository
- Click "New Project"
- Import your GitHub repository
- Or drag and drop the frontend folder

## 3. Configure Environment Variables
In Vercel dashboard, go to your project → Settings → Environment Variables:

```
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
```

Replace `your-render-backend-url` with your actual Render backend URL.

## 4. Deploy
- Vercel will automatically detect Vite configuration
- Click "Deploy"
- Your app will be live at: https://your-project.vercel.app

## 5. Update Backend CORS
After deployment, update your backend's `CORS_ORIGINS` environment variable to include your Vercel URL:

```
CORS_ORIGINS=http://localhost:3000,https://your-project.vercel.app
```

## Automatic Deployments
Vercel will automatically deploy on every git push to your main branch!