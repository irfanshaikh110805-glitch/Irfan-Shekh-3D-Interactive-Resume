# Deployment Guide

This portfolio can be deployed to Netlify with serverless functions for the AI chatbot.

## Prerequisites

1. A Netlify account
2. A Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Deployment Steps

### 1. Deploy to Netlify

#### Option A: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

#### Option B: Deploy via Git
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### 2. Configure Environment Variables

After deployment, add your environment variables:

1. Go to your site in Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key

4. Click "Save"
5. Trigger a new deploy for changes to take effect

### 3. Verify Deployment

1. Visit your deployed site
2. Click the chatbot icon in the bottom-right corner
3. Send a test message to verify the AI chatbot is working

## Local Development with Functions

See [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) for detailed instructions.

**Quick start:**
```bash
npm run dev:netlify
```

This will start both Vite and Netlify Functions locally at `http://localhost:8888`.

## Troubleshooting

### Chatbot returns 404 error
- Ensure the `netlify/functions` directory exists
- Verify `GEMINI_API_KEY` is set in Netlify environment variables
- Check the Functions tab in Netlify dashboard to see if functions are deployed

### Chatbot returns "API key missing" error
- Add `GEMINI_API_KEY` to Netlify environment variables
- Redeploy the site after adding the variable

### Build fails
- Ensure Node.js version is 18 or higher
- Run `npm install` to install all dependencies
- Check build logs in Netlify dashboard for specific errors

## Performance Optimization

The site includes:
- Image preloading for LCP optimization
- Responsive image loading
- Asset caching headers
- Security headers
- Serverless functions for API endpoints

## Security Notes

- Never commit `.env` files with real API keys
- Use environment variables for all sensitive data
- The `GEMINI_API_KEY` should only be set in Netlify dashboard
- Review the Content Security Policy in `netlify.toml` if adding new external resources
