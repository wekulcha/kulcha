# KULCHA Admin v1

Admin Telegram mini-app for KULCHA restaurant management system.

## Tech Stack

- React + TypeScript + Vite
- TailwindCSS
- React Router v6

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── api/              # API client functions
├── layout/           # Layout components (AdminAppShell, AdminHeader)
├── pages/            # Page components
│   ├── AdminCafeList/
│   ├── AdminRestaurant/
│   └── AdminProfile/
├── types/            # TypeScript type definitions
├── App.tsx           # Main app component with routing
├── main.tsx          # Entry point
└── index.css         # Global styles with Tailwind
```

## Routes

- `/` - Admin cafe list page (list of restaurants)
- `/restaurants/:id` - Restaurant detail page with tabs (Orders, Menu, Analytics)
- `/profile` - Admin profile page

## API Endpoints

The app expects a backend running at `http://localhost:8000`:

- `GET /api/admin/restaurants` - Fetch list of restaurants for the admin

## Design

- Mobile-first design optimized for ~375-420px viewport (Telegram mini-app)
- Bento-style cards with soft pastel colors
- Rounded corners (`rounded-2xl`, `rounded-3xl`)
- Subtle shadows and gradients

