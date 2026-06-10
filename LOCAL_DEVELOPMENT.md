# Local Development Guide

## Running the Development Server

### Option 1: With Netlify Functions (Recommended for testing chatbot)

This runs both the Vite dev server AND the Netlify Functions locally:

```bash
npm run dev:netlify
```

This will start:
- Vite dev server on `http://localhost:5173`
- Netlify Functions on `http://localhost:8888/.netlify/functions/`
- Main app accessible at `http://localhost:8888` (proxies to Vite)

**Use this when:**
- Testing the AI chatbot
- Testing any API endpoints
- Full feature testing

### Option 2: Vite Only (Faster, but no API)

This runs only the Vite dev server without functions:

```bash
npm run dev
```

This will start:
- Vite dev server on `http://localhost:5173`
- **Note:** Chatbot will NOT work (API endpoints unavailable)

**Use this when:**
- Working on UI/styling
- Testing components that don't need API
- Faster hot reload during development

## Environment Variables

Make sure you have a `.env` file in the root directory:

```env
GEMINI_API_KEY=your-api-key-here
```

The `.env` file is already configured and will be automatically loaded by Netlify CLI.

## Troubleshooting

### Chatbot returns 500 error
- Make sure you're using `npm run dev:netlify` (not `npm run dev`)
- Check that `GEMINI_API_KEY` is set in `.env` file
- Verify the API key is valid

### Port already in use
- Stop any running dev servers
- Kill processes using ports 5173 or 8888
- Try running again

### Functions not found
- Make sure `netlify/functions/chat.ts` exists
- Run `npm install` to ensure all dependencies are installed
- Check that `@netlify/functions` is in `package.json`

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server with functions:**
   ```bash
   npm run dev:netlify
   ```

3. **Open browser:**
   - Go to `http://localhost:8888`
   - Click the chatbot icon
   - Test sending a message

## Build for Production

```bash
npm run build
```

This will:
1. Optimize images
2. Compile TypeScript
3. Build with Vite
4. Output to `dist/` directory

## Deploy to Netlify

```bash
# Login to Netlify (first time only)
netlify login

# Deploy
netlify deploy --prod
```

Or push to your Git repository and let Netlify auto-deploy.
