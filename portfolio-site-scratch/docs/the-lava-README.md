# The Lava 🌋

> A bespoke real estate client management system (CRM). Fast, friendly, and tailored for a solo realtor's daily workflows.

## Features

- **Contact Management** — 120+ imported contacts with full CRUD, search, and A-Z navigation
- **Interactive Calendar** — Month view with event types (calls, pop-bys, closings, showings, card mailers)
- **Territory Map** — Google Maps integration with contact pins, Street View, and nearby amenities
- **Card Mailer Pipeline** — 30-day birthday lookahead for handwritten card tracking
- **House-iversaries** — Closing anniversary milestone tracker
- **Gmail Integration** — Send emails with real estate templates directly from the CRM
- **Google Drive Import** — Import contacts from CSV, Excel, or Google Sheets
- **Avery 5160 Labels** — Print mailing labels calibrated for standard label sheets
- **Cloud Sync** — Firebase Auth + Firestore for cross-device sync
- **Dark Mode** — Full dark theme support
- **Offline-First** — Works entirely offline via localStorage; cloud sync is optional

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 + TypeScript 7 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Animation | Motion (Framer Motion) v12 |
| Maps | Google Maps Platform |
| Auth & DB | Firebase Auth + Cloud Firestore |
| Email | Gmail API (REST) |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Type check
npm run lint

# Production build
npm run build
```

## Project Structure

```
src/
├── App.tsx                  # Thin shell — providers + API wrapper
├── context/AppContext.tsx    # React Context composing all hooks
├── hooks/                   # State management (useContacts, useAuth, etc.)
├── components/              # UI components (20+ files)
├── services/                # Firebase, Gmail, Drive, Maps integrations
├── data/                    # Seed data + localStorage persistence
└── utils/                   # CSV parsing, contact analysis, calendar math
```

For comprehensive architecture documentation, see [`AGENTS.md`](./AGENTS.md).

## Environment Variables

```env
VITE_GOOGLE_MAPS_API_KEY=    # Google Maps (has hardcoded fallback)
GEMINI_API_KEY=              # Reserved for future AI features
```

## License

Private — built for Nathaniel Drewry, Huntington, IN by Justin Bogner, CambrianMinds (2026)
