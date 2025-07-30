# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 personal portfolio/dashboard site using the App Router, TypeScript, Tailwind CSS, and Shadcn UI components. The project integrates with Supabase for backend services and includes analytics via Vercel Analytics and PostHog.

## Essential Commands

```bash
# Development
npm run dev              # Start development server with Turbopack

# Building and Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues automatically
npm run format          # Format code with Prettier

# Bundle Analysis
BUNDLE_ANALYZER_ENABLED=true npm run build  # Analyze bundle size
```

## Architecture Overview

The project follows Next.js 15 App Router conventions:

- **`src/app/`**: Page routes using App Router
  - `layout.tsx`: Root layout with theme provider, fonts, and analytics
  - `page.tsx`: Main dashboard page with multiple views (About, Contact, Projects, Skills)
  - `components/`: Component showcase page
  
- **`src/components/`**: Reusable components
  - `ui/`: Shadcn UI components (Button, Card, Dialog, etc.)
  - Custom components for navigation, views, and features
  
- **`src/lib/`**: Utilities and shared code
  - `utils.ts`: Class name utilities (cn function)
  - `supabase/types.ts`: Generated Supabase types
  
- **`src/utils/supabase/`**: Supabase client configurations
  - `client.ts`: Browser client
  - `server.ts`: Server-side client

## Key Technical Details

### Styling System
- Tailwind CSS 4.0 with custom configuration
- CSS variables for theming (defined in globals.css)
- Dark/light mode support via next-themes
- Custom Geist fonts (Sans and Mono)

### Component Pattern
- Components use TypeScript with proper typing
- Shadcn UI components follow a consistent pattern with class-variance-authority
- Form components integrate with react-hook-form and zod validation

### Supabase Integration
- Custom image loader configured in next.config.ts
- Server and client-side Supabase clients available
- Types generated in src/lib/supabase/types.ts

### Analytics Setup
- Vercel Analytics: Wrapped in app/layout.tsx
- PostHog: Integrated with rewrites in next.config.ts

## Configuration Notes

- **TypeScript**: Strict mode enabled with path alias `@/*` → `./src/*`
- **ESLint**: Version 9 flat config with extensive rules for React, TypeScript, and imports
- **Prettier**: Configured for consistent formatting
- **Next.js**: Standalone output mode for optimized deployments