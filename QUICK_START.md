# 🚀 Quick Start Guide

## Current Issue: Local Development

You're seeing errors because you're running `npm run dev` which only starts Vite, but the chatbot needs Netlify Functions to work.

## ✅ Solution: Use Netlify Dev

**Stop the current dev server (Ctrl+C) and run:**

```bash
npm run dev:netlify
```

This will start:
- ✅ Vite dev server (for React app)
- ✅ Netlify Functions (for chatbot API)
- ✅ Proxy server at `http://localhost:8888`

**Then open:** `http://localhost:8888` (not 5173!)

---

## 📋 What Was Fixed

### 1. ✅ Preload Warning
**Before:** Preloading images that weren't being used
**After:** Preloading only `/profile.webp` which is actually used

### 2. ✅ 404 API Error (Production)
**Before:** No API endpoint on Netlify
**After:** Created `netlify/functions/chat.ts` serverless function

### 3. ✅ 500 API Error (Local Development)
**Before:** Running `npm run dev` without functions
**After:** Use `npm run dev:netlify` to run with functions

---

## 🛠️ Development Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run dev:netlify` | Full dev server with API | **Use this for testing chatbot** |
| `npm run dev` | Vite only (no API) | UI work only, faster reload |
| `npm run build` | Production build | Before deploying |
| `npm run lint` | Check code quality | Before committing |

---

## 🌐 Deployment to Netlify

### First Time Setup

1. **Push to Git:**
   ```bash
   git add .
   git commit -m "Add Netlify Functions for chatbot"
   git push
   ```

2. **Deploy on Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Add Environment Variable:**
   - Go to Site Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = `AIzaSyDMWpa4cDnnaCDiUze2MczQibmXUxpj38k`
   - Click "Save"
   - Trigger a new deploy

### Subsequent Deploys

Just push to Git:
```bash
git add .
git commit -m "Your changes"
git push
```

Netlify will auto-deploy!

---

## 🧪 Testing Checklist

### Local Testing
- [ ] Run `npm run dev:netlify`
- [ ] Open `http://localhost:8888`
- [ ] Click chatbot icon
- [ ] Send a test message
- [ ] Verify AI response appears
- [ ] Check console for errors

### Production Testing
- [ ] Deploy to Netlify
- [ ] Add `GEMINI_API_KEY` environment variable
- [ ] Visit deployed site
- [ ] Test chatbot
- [ ] Check console for errors
- [ ] Test on mobile device

---

## 🐛 Troubleshooting

### "ECONNREFUSED" error
**Problem:** Running `npm run dev` instead of `npm run dev:netlify`
**Solution:** Use `npm run dev:netlify`

### Chatbot returns 500 error
**Problem:** Missing or invalid `GEMINI_API_KEY`
**Solution:** Check `.env` file has the correct API key

### Port already in use
**Problem:** Another process is using port 8888 or 5173
**Solution:** 
```bash
# Kill the process
netstat -ano | findstr :8888
taskkill /PID <PID> /F
```

### Functions not found
**Problem:** Missing dependencies
**Solution:**
```bash
npm install
```

---

## 📚 Additional Resources

- [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) - Detailed dev guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment instructions
- [FIXES_APPLIED.md](./FIXES_APPLIED.md) - Technical details of fixes

---

## 🎯 Next Steps

1. **Stop current dev server** (Ctrl+C in terminal)
2. **Run:** `npm run dev:netlify`
3. **Open:** `http://localhost:8888`
4. **Test chatbot** - it should work now!
5. **When ready, deploy to Netlify**

---

**Need help?** Check the troubleshooting section above or review the detailed guides.
