# OB Studio - Design Agency Website

## Project Overview

This is a Next.js 14 website for OB Studio (obstudio.co), a premium design agency for startups.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans & Geist Mono
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Homepage
│   ├── admin/page.tsx     # Admin dashboard
│   ├── terms/page.tsx     # Terms of service
│   └── api/
│       ├── portfolio/     # Portfolio CRUD API
│       └── upload/        # Image upload API
├── components/
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section with pricing
│   ├── ClientsAndTestimonials.tsx
│   ├── PortfolioGrid.tsx  # Filterable portfolio grid
│   └── Footer.tsx
├── data/
│   └── portfolio.json     # Portfolio data storage
└── types/
    └── index.ts           # TypeScript interfaces
```

## Key Features

- **Homepage**: Hero section, clients grid, testimonials, 3-column portfolio grid with filters (ALL/WEBSITE/PRODUCT/BRANDING)
- **Admin Dashboard**: Upload images, manage portfolio items at `/admin`
- **API Routes**: RESTful API for portfolio management and image uploads

## Design Guidelines

- Black and white color scheme
- Clean, minimal aesthetic inspired by interfacer.co
- Geist font family
- 3-column portfolio grid layout

## Pricing

- Up to 5 pages: $3,000
- Up to 10 pages: $5,000

## Running the Project

```bash
npm run dev    # Development server at http://localhost:3000
npm run build  # Production build
npm run start  # Start production server
```

## Admin Access

Navigate to `/admin` to manage portfolio items.
