# Supabase Database Setup

## 1. Create Supabase Account
- Go to https://supabase.com
- Sign up with GitHub, GitLab, or email
- Create a new organization

## 2. Create New Project
- Click "New Project"
- **Name**: habit-tracker-db
- **Database Password**: Choose a strong password
- **Region**: Choose closest to your users
- Click "Create new project"

## 3. Get Connection String
1. Go to Settings → Database
2. Find "Connection string" section
3. Copy the URI connection string
4. It will look like: `postgresql://postgres:[password]@[host].supabase.co:5432/postgres`

## 4. Environment Variables
Use this connection string for:
- **Render**: DATABASE_URL environment variable
- **Local development**: .env file

## 5. Database Schema
Your database will be automatically created by SQLAlchemy when the app starts. The following tables will be created:
- `habits` - Stores habit definitions
- `habit_logs` - Stores daily completion records

## 6. Free Tier Limits
- **Database Size**: 500MB
- **Auth Users**: Unlimited
- **API Requests**: Unlimited (reasonable use)
- **File Storage**: 1GB

Perfect for a habit tracker application!