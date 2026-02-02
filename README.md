# AuraMind - AI-Powered Learning Platform

> **Built for Gemini Hackathon**

A modern, AI-powered tutoring and learning platform that transforms long-form educational videos into personalized learning experiences using Google's Gemini AI. Built with React, TypeScript, and Tailwind CSS.

## Technologies Used

This project is built with:

- **Google Gemini AI** - Advanced reasoning and video analysis
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Smooth animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd auramind-tutoring-hub-main
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── main.tsx       # Application entry point
```

## Features

- **AI-Powered Video Analysis** - Extract key concepts, timestamps, and insights from educational videos using Gemini AI
- **Interactive Tutoring** - Real-time Q&A with AI tutor powered by Gemini 3 Advanced Reasoning
- **Thought Window** - Transparent AI reasoning process visualization
- **Temporal Analysis** - Precise timestamp markers for important concepts
- **Blueprint Generation** - AI-generated visual diagrams and learning materials
- **Learning Library** - Organize and manage your educational content
- **Progress Tracking** - Monitor learning efficiency and time saved

## Gemini AI Integration

This project uses Google's Gemini AI for:

- Video content analysis and transcription
- Concept extraction and temporal mapping
- Advanced reasoning for tutoring interactions
- Visual diagram generation
- Semantic content retrieval

### API Setup

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Navigate to Settings in the app
3. Enter your API key in the "Gemini API Key" field
4. Save to enable advanced AI features

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── landing/   # Landing page components
│   ├── layout/    # Layout components (Dashboard, Sidebar)
│   └── ui/        # shadcn-ui components
├── pages/         # Page components
│   ├── Dashboard.tsx
│   ├── TutorView.tsx    # Main AI tutoring interface
│   ├── Library.tsx
│   └── Settings.tsx
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── main.tsx       # Application entry point
```

## Development

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Or configure it through the Settings page in the app.

## Deployment

### Deploy to Netlify

This project is ready for deployment on Netlify.

#### Option 1: Deploy via Netlify UI

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [Netlify](https://app.netlify.com/)**
   - Sign up or log in
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure Build Settings** (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

4. **Add Environment Variables**:
   - Go to Site settings → Environment variables
   - Add: `VITE_GEMINI_API_KEY` = `your_api_key_here`

5. **Deploy!**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live!

#### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```sh
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```sh
   netlify login
   ```

3. **Initialize and deploy**:
   ```sh
   netlify init
   netlify deploy --prod
   ```

4. **Set environment variables**:
   ```sh
   netlify env:set VITE_GEMINI_API_KEY your_api_key_here
   ```

#### Important Notes for Netlify:

- ✅ `netlify.toml` is already configured
- ✅ SPA routing is handled via `_redirects` file
- ✅ Build settings are auto-configured
- ⚠️ **Don't forget to add `VITE_GEMINI_API_KEY` in Netlify environment variables**
- ⚠️ The `.env` file is not deployed (as it should be in `.gitignore`)

#### Post-Deployment:

After deployment, users can:
- Use the app with the default API key (from environment variables)
- Or add their own API key via the Settings page (stored in browser localStorage)

## License

Built for Gemini Hackathon - All rights reserved
