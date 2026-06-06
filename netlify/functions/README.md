# Netlify Functions

This directory contains serverless functions that run on Netlify.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. No environment variables needed - the chatbot uses rule-based responses!

## Local Development

To test functions locally:
```bash
netlify dev
```

This will start both the Vite dev server and the Netlify Functions runtime.

## Functions

### `/api/chat` (chat.ts)
Handles chatbot requests using rule-based responses (no external API needed).

**Request:**
```json
{
  "message": "What are your skills?"
}
```

**Response:**
```json
{
  "response": "Irfan is proficient in:\n\n🔹 Frontend: React, JavaScript..."
}
```
