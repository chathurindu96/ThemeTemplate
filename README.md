# DataAI Enterprise Dashboard & Design System

A professional, reusable, product-independent frontend starter template built with React, TypeScript, Vite, and Tailwind CSS.

## Overview

This project provides:
- **Reference Dashboard** — A polished analytics dashboard inspired by enterprise data platforms
- **Component Showcase** — An extensive, interactive component catalogue with 15 categories
- **Design System** — Complete design tokens, theming (light/dark), typography, and spacing
- **Reusable Architecture** — Modular components suitable for any enterprise application

## Technology Stack

- **React 18** with TypeScript (strict mode)
- **Vite** for fast development and builds
- **Tailwind CSS v4** for utility-first styling
- **Recharts** for interactive data visualizations
- **Lucide React** for consistent SVG icons
- **Zod** for form validation schemas

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Project Structure

```
src/
├── App.tsx                    # Main app with routing and providers
├── main.tsx                   # Entry point
├── index.css                  # Design tokens and global styles
├── components/
│   └── AppShell.tsx           # Layout shell (sidebar, header, content)
├── pages/
│   ├── Dashboard.tsx          # Reference dashboard page
│   └── Components.tsx         # Component showcase page
└── lib/
    ├── hooks.tsx              # Theme context, notifications, utilities
    └── mock-data.ts           # Typed mock datasets
```

## Design System

### Color Tokens
The design system uses semantic CSS custom properties:
- `--primary` (#774AA4) — Main brand purple
- `--text-primary` (#35234C) — Primary text
- `--bg-surface` (#FFFFFF) — Card and panel backgrounds
- `--border-default` (#E8E2EC) — Standard borders

### Typography
- **Font Family**: Nunito Sans with system fallbacks
- **Scale**: Display → H1-H6 → Body → Small → Caption
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700), Extra Bold (800)

### Theming
- Light theme (default) — Matches the reference design
- Dark theme — Complementary design with same token structure
- Theme persists via localStorage
- Respects system preference on first visit

## Routes

- `/dashboard` (default) — Reference analytics dashboard
- `/components` — Interactive component showcase

## Component Categories

1. **Design Foundations** — Colors, typography, spacing, shadows
2. **Buttons & Actions** — All button variants and states
3. **Cards** — Basic, KPI, profile, loading, empty, error states
4. **KPI & Metrics** — Metric displays with trends and sparklines
5. **Tables & Data** — Sortable, searchable, paginated, exportable
6. **Charts** — Line, area, bar, pie, scatter, progress bars
7. **Forms & Inputs** — Text, email, password, select, toggle, slider
8. **Form Validation** — Complete registration form with inline validation
9. **Notifications** — Toast notifications and inline alerts
10. **Overlays** — Modal, confirmation, drawer, tooltip, dropdown
11. **Navigation** — Breadcrumbs, tabs, accordion, stepper, pagination
12. **Status & Feedback** — Badges, tags, avatars, progress, skeletons
13. **Layout & Content** — Headers, definition lists, timelines, grids
14. **Advanced Patterns** — Filter toolbar, master/detail, multi-step forms
15. **Accessibility** — Component states, keyboard navigation guide

## Extending the Template

### Adding a New Page
1. Create a new component in `src/pages/`
2. Add navigation entry in `src/components/AppShell.tsx`
3. Add route handling in `src/App.tsx`

### Customizing the Brand
1. Update CSS variables in `src/index.css`
2. Change the logo and name in `AppShell.tsx`
3. Update navigation items in the `navItems` array

### Connecting to an API
1. Replace mock data in `src/lib/mock-data.ts` with API calls
2. Add loading/error states to components
3. Implement data fetching hooks

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT
