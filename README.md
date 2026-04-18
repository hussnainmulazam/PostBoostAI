# PostBoostAI Frontend

Modern frontend for PostBoostAI, built with React + Vite + TypeScript, focused on AI-assisted content workflows, dashboard experiences, and subscription/payment flow.

This README documents the current frontend app in this folder (`frontend`), including architecture, routes, setup, and development workflow.

## Table of Contents

- Overview
- Tech Stack
- Core Features
- Application Routes
- Project Structure
- Installation and Local Development
- Build and Preview
- Styling and UI System
- State and Data Flow
- Performance Notes
- Deployment Notes
- Troubleshooting
- Future Improvements

## Overview

PostBoostAI frontend is a single-page application that combines:

- marketing pages (landing, pricing, blog, FAQ, contact)
- auth entry points (login, signup, forgot password)
- a dashboard shell for app tools (content, social, posts, connections, notifications, admin, etc.)
- a standalone payment checkout page

The app uses lazy loading for page-level chunks and route-driven navigation through React Router.

## Tech Stack

### Framework and Tooling

- React 18
- TypeScript
- Vite 7
- SWC via `@vitejs/plugin-react-swc`

### Routing and State

- `react-router-dom` for route navigation
- `@tanstack/react-query` provider included for async server-state workflows

### UI and Styling

- Tailwind CSS
- shadcn-style UI primitives (under `src/components/ui`)
- Radix UI components
- Framer Motion animations
- Lucide icons
- Sonner + toaster notifications

## Core Features

- Responsive marketing pages with animated sections
- Dashboard-style application area with sidebar navigation
- Multiple AI-related workflow pages (content/social/task/resume agents)
- Notifications, settings, admin/data management sections
- Pricing + plan selection
- Enhanced standalone payment experience:
  - no dashboard sidebar/header while checking out
  - payment method options (Card / PayPal / Bank)
  - trust and conversion UI cues
  - success state with return-to-dashboard action

## Application Routes

Main routes are registered in `src/App.tsx`.

### Public / Marketing

- `/` -> Landing page
- `/blog` -> Blog listing
- `/blog/:slug` -> Blog detail
- `/pricing` -> Pricing page
- `/faq` -> FAQ page
- `/contact` -> Contact page

### Auth

- `/login`
- `/signup`
- `/forgot-password`

### Dashboard Area

These routes render inside the dashboard shell:

- `/dashboard`
- `/content-agent`
- `/social-agent`
- `/connections`
- `/analytics`
- `/settings`
- `/notifications`
- `/data-management`
- `/admin`
- `/all-posts`

### Checkout

- `/payment` -> standalone payment page (outside dashboard shell)

### Fallback

- `/404` and `*` -> Not Found page

## Project Structure

High-level structure:

```text
frontend/
├── src/
│   ├── App.tsx                  # Route map and app providers
│   ├── main.tsx                 # App bootstrap with BrowserRouter
│   ├── index.css                # Global styles and Tailwind imports
│   ├── components/
│   │   ├── LandingPage.tsx
│   │   ├── Pricing.tsx
│   │   ├── Payment.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AuthPages.tsx
│   │   ├── Blog.tsx / BlogDetail.tsx
│   │   ├── ...other feature components
│   │   └── ui/                  # Reusable UI primitives
│   ├── pages/
│   │   └── NotFound.tsx
│   └── data/
│       └── blogPosts.ts
├── public/                      # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## Installation and Local Development

## 1) Install dependencies

```bash
npm install
```

## 2) Run development server

```bash
npm run dev
```

By default, Vite is configured to run on:

- host: `::`
- port: `8080`

Open the local URL shown in terminal after startup.

## Build and Preview

### Production build

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Styling and UI System

- Tailwind config is in `tailwind.config.ts`.
- Path alias `@` points to `src` (configured in `vite.config.ts` and `tsconfig.json`).
- UI primitives live under `src/components/ui`.
- Motion-heavy transitions are implemented with Framer Motion for smoother UX.

## State and Data Flow

- Route state is used in a few places (for example passing selected plan data from pricing to payment).
- Dashboard navigation is route-based (`navigate('/page')`) and also passes optional params.
- React Query provider is initialized globally in `App.tsx` and can be extended for API integration.

## Performance Notes

- Page and heavy feature components are lazy loaded in `App.tsx` and `Dashboard.tsx`.
- Vite/Rollup manual chunking is configured in `vite.config.ts` for:
  - react vendor
  - UI/animation vendor
  - query vendor
- This improves first-load performance and cache behavior.

## Deployment Notes

For static hosting (Vercel, Netlify, Cloudflare Pages, etc.):

- run `npm run build`
- deploy `dist/`
- ensure SPA fallback rewrites all unknown routes to `index.html`

Without SPA fallback, deep links like `/pricing` or `/dashboard` may return 404 from host instead of loading the app.

## Troubleshooting

### App loads blank or route fails on refresh

- verify SPA fallback is configured on your host

### Tailwind classes not applying

- ensure `index.css` is imported in `src/main.tsx`
- verify file paths match `content` config in `tailwind.config.ts`

### Module alias `@/...` not resolving

- verify both `vite.config.ts` and `tsconfig.json` alias/path mapping are unchanged

## Future Improvements

- integrate real payment gateway APIs (Stripe/Razorpay/PayPal SDK) instead of mock timeout
- add auth guards and role-based route protection
- connect dashboard modules to backend APIs with typed service layer
- add test coverage (unit + integration + e2e)
- add analytics/events for conversion funnel (pricing -> payment -> success)