# 🚀 Deployment Guide - TFT Pengu Chatbot

This guide will walk you through deploying your TFT Pengu Chatbot to Vercel.

## 📋 Prerequisites

Before deploying, make sure you have:

- ✅ MongoDB Atlas account with a cluster set up
- ✅ Anthropic API key
- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Code pushed to a GitHub repository

## 🗄️ Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free cluster (M0 Sandbox - Free forever)
3. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose password authentication
   - Save username and password
4. Set up network access:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Get your connection string:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with `tft-pengu-chatbot`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tft-pengu-chatbot?retryWrites=true&w=majority
```

## 🔑 Step 2: Get Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy and save it securely (you won't be able to see it again)

## 🐙 Step 3: Push Code to GitHub

If you haven't already:

```bash
cd tft-pengu-chatbot

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TFT Pengu Chatbot"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/tft-pengu-chatbot.git
git branch -M main
git push -u origin main
```

## ☁️ Step 4: Deploy to Vercel

### Option A: Quick Deploy (Recommended)

1. Go to [Vercel](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. Add Environment Variables:
   Click "Environment Variables" and add:

   | Name | Value |
   |------|-------|
   | `ANTHROPIC_API_KEY` | Your Anthropic API key |
   | `DATABASE_URL` | Your MongoDB connection string |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` (you'll update this after first deploy) |

6. Click "Deploy"
7. Wait for deployment to complete (2-3 minutes)
8. Once deployed, copy your Vercel URL
9. Go to Settings → Environment Variables
10. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
11. Redeploy (Settings → Deployments → Click "..." → Redeploy)

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

## ✅ Step 5: Verify Deployment

1. Visit your Vercel URL
2. You should see the Pengu welcome screen
3. Try sending a message
4. Check that:
   - Messages are sent and received
   - Session persists on page reload
   - No errors in browser console

## 🐛 Troubleshooting

### Build Fails

**Error**: "Module not found"
- **Solution**: Make sure all dependencies are in `package.json` and committed to git

**Error**: "TypeScript errors"
- **Solution**: Run `npm run build` locally first to fix TypeScript errors

### Database Connection Issues

**Error**: "MongoServerError: Authentication failed"
- **Solution**: Check your MongoDB username and password in the connection string

**Error**: "MongoNetworkError: connection timeout"
- **Solution**: Make sure you've whitelisted all IP addresses (0.0.0.0/0) in MongoDB Network Access

### API Errors

**Error**: "Anthropic API key invalid"
- **Solution**: Verify your API key is correct in Vercel environment variables

**Error**: "Rate limit exceeded"
- **Solution**: You've hit the Anthropic API rate limit. Wait a few minutes or upgrade your plan.

### Session Not Persisting

- **Solution**: Make sure `NEXT_PUBLIC_APP_URL` matches your actual deployment URL (no trailing slash)

## 🔄 Updating Your Deployment

Vercel automatically redeploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature X"
git push origin main
```

Vercel will automatically:
1. Build your changes
2. Run tests
3. Deploy to production

## 📊 Monitoring

- **Vercel Dashboard**: View deployment logs, analytics, and errors
- **MongoDB Atlas**: Monitor database usage and performance
- **Anthropic Console**: Track API usage and costs

## 💰 Cost Estimates (Free Tier)

- **Vercel**: Free for hobby projects
- **MongoDB Atlas**: M0 cluster free forever (512 MB storage)
- **Anthropic API**: Pay-per-use (~$3-15 per million tokens)
  - Estimate: ~$0.01-0.05 per conversation for casual use

## 🎉 Success!

Your TFT Pengu Chatbot is now live! Share your URL with friends and start chatting with Pengu! 🐧

---

**Need Help?**
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- Check [Anthropic Documentation](https://docs.anthropic.com/)
