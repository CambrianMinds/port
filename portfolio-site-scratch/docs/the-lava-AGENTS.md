# The Lava — Coldwell Banker Real Estate CRM

> A bespoke real estate client management system built for **Nathaniel Drewry**, a Coldwell Banker Realty agent operating in the **Huntington, Indiana** market. Created as a replacement for the Coldwell Banker CRM.

---

## Project Identity

| Field | Value |
| --- | --- |
| **Name** | Coldwell Banker Real Estate Directory ("The Lava") |
| **Audience** | Nate (Nathaniel Drewry) — solo realtor, Coldwell Banker Realty |
| **Market** | Huntington, IN and surrounding Indiana towns (Warren, Markle, Fort Wayne, Roanoke, Bluffton, Andrews, Marion, Wabash, Columbia City) |
| **Origin** | Google AI Studio applet, exported for local/standalone use |
| **Purpose** | Replace the Coldwell Banker CRM with a faster, friendlier contact management system with real estate–specific workflows |

---

## Tech Stack

| Layer | Technology | Version |
| --- | --- | --- |
| **Framework** | React 19 + TypeScript 7 | Latest |
| **Build** | Vite 8 | `vite.config.ts` |
| **Styling** | Tailwind CSS v4 (via `@tailwindcss/vite`) | Class-based dark mode via `.dark` on `<html>` |
| **Fonts** | Plus Jakarta Sans (body), Playfair Display (display/serif) | Google Fonts, preconnected |
| **Icons** | Lucide React | ~70+ icons used |
| **Animation** | Motion (formerly Framer Motion) v12 | Used in `AgentLandingPage`, calendar |
| **Maps** | `@vis.gl/react-google-maps` + Google Maps Places API (New) | Geocoding, Street View, nearby amenities |
| **Auth** | Firebase Auth (Google Sign-In with OAuth popup) | Gmail + Drive scopes |
| **Database** | Cloud Firestore (named database) | Per-user subcollections |
| **Email** | Gmail API (direct REST) | Send via OAuth token |
| **Drive** | Google Drive API v3 (REST) | Import/export spreadsheets |
| **Spreadsheets** | SheetJS (`xlsx`) | Excel import support |
| **Package Manager** | Bun (lockfile: `bun.lock`) — npm also works | |

---

## Architecture Overview

```
src/
├── App.tsx                    # Thin shell (~16 lines) — providers + API wrapper
├── main.tsx                   # React 19 entry point
├── index.css                  # Tailwind v4 config + Avery 5160 print styles
├── types.ts                   # Contact, CalendarEvent, SectionType, etc.
├── context/
│   └── AppContext.tsx          # React Context composing all hooks + cross-cutting sync
├── hooks/
│   ├── useViewState.ts        # Navigation, layout, dark mode, toast, section ordering
│   ├── useModals.ts           # All modal open/close state and orchestration
│   ├── useAuth.ts             # Firebase Auth state, sign-in/out handlers
│   ├── useContacts.ts         # Contact CRUD, search, filtering, cloud sync
│   └── useCalendarEvents.ts   # Calendar event CRUD, localStorage, cloud sync
├── components/
│   ├── AppShell.tsx           # Main layout — header, sections, footer, toast
│   ├── ModalOrchestrator.tsx  # Renders all modals, reads state from context
│   ├── AgentLandingPage.tsx   # Executive dashboard with KPI cards
│   ├── Header.tsx             # Navigation tabs, auth controls, settings
│   ├── InteractiveCalendar.tsx # Full calendar with event management
│   ├── TerritoryMapView.tsx   # Google Maps territory/farm area
│   ├── ImportModal.tsx        # CSV/Excel/Google Drive import wizard
│   ├── GmailComposeModal.tsx  # Gmail send with templates
│   ├── CalendarEventModal.tsx # Create/edit calendar events
│   ├── ContactDetailModal.tsx # Full contact detail view
│   ├── ContactFormModal.tsx   # Add/edit contact form
│   ├── CardMailerQueue.tsx    # 30-day birthday card pipeline
│   ├── BirthdayView.tsx       # Birthday analysis with duplicate detection
│   ├── HouseAnniversaries.tsx # Closing anniversary tracker
│   ├── MailingLabelsModal.tsx  # Avery 5160 label printing
│   ├── ContactCard.tsx        # Individual contact card component
│   ├── ContactTableView.tsx   # Table/spreadsheet view mode
│   ├── SectionContainer.tsx   # Generic section wrapper with filters
│   ├── AlphabetNav.tsx        # A-Z sidebar navigation
│   ├── StreetViewModal.tsx    # Google Street View embed
│   ├── LuxuryEmblems.tsx      # Coldwell Banker brand emblems
│   └── CBLogo.tsx             # SVG logo component
├── services/
│   ├── firebaseAuth.ts        # Google OAuth + scope management
│   ├── firestoreSync.ts       # Firestore CRUD (batch writes, per-user)
│   ├── gmailService.ts        # Gmail send + real estate email templates
│   ├── googleDriveService.ts  # Drive file listing, download, upload
│   └── mapsService.ts         # Geocoding, amenity search, routing
├── data/
│   ├── initialData.ts         # Nate's full Coldwell Banker CSV export (62KB, ~120+ contacts)
│   └── storage.ts             # localStorage persistence layer
└── utils/
    ├── calendarUtils.ts        # Date/calendar helper functions
    ├── contactUtils.ts         # Sorting, filtering, birthday/anniversary analysis
    └── csvParser.ts            # CSV/Excel parsing + export
```

---

## Data Flow & Persistence

### Dual-layer storage model

1. **Local-first (always available):**
   - Contacts → `localStorage` key `coldwell_banker_contacts_v1`
   - Calendar events → `localStorage` key `cb_calendar_events`
   - Section order → `localStorage` key `cb_section_order`
   - Dark mode → `localStorage` key `cb_directory_dark_mode`
   - Geocode cache → `localStorage` key `cb_geocoded_contacts_cache_v1`

2. **Cloud sync (when signed in):**
   - Firestore path: `users/{uid}/contacts/{contactId}`
   - Firestore path: `users/{uid}/calendar_events/{eventId}`
   - User heartbeat: `users/{uid}` (lastSync, contactsCount)
   - Named database: `ai-studio-coldwellbankerre-59a5e6f1-d480-4529-889c-0ca284d89712`

### Sync behavior

- On sign-in → fetch cloud contacts; if cloud is empty, push local to cloud
- On sign-in → fetch cloud events; if empty, push local events
- All mutations (add/edit/delete contact, save/delete event) → update local first, then fire-and-forget cloud sync
- Manual sync button available in header

---

## Key Business Domain Concepts

These are Nate's real estate workflows. Understand them before making changes:

| Concept | Description |
| --- | --- |
| **Card Mailer Pipeline** | 30-day lookahead for upcoming birthdays → handwrite cards → track status (needs_card → card_written → mailed) |
| **House-iversaries** | Annual closing date anniversaries — a major relationship-building touchpoint in real estate |
| **Pop-by** | In-person drop-in visit to a past client with a small gift (seasonal item, CMA binder) |
| **Territory/Farm Area** | Geographic zone a realtor specializes in — Nate's is centered on Huntington, IN |
| **CMA** | Comparative Market Analysis — home valuation report |
| **dotloop** | Transaction management platform — some contact notes reference dotloop imports |
| **Avery 5160** | Standard 30-per-sheet address label format for physical mailings |

---

## Conventions & Patterns

### Code Style

- **State is organized into custom hooks** in `src/hooks/` — `useContacts`, `useCalendarEvents`, `useAuth`, `useModals`, `useViewState`
- A single `AppContext` (in `src/context/AppContext.tsx`) composes all hooks and provides state to components
- Components access state via `useAppContext()` — minimal prop drilling
- Components are large, self-contained files (most 10–45KB). No micro-component splitting.
- Tailwind utility classes inline — no extracted component classes or CSS modules.
- Dark mode via conditional `dark:` Tailwind variants, toggled by `.dark` class on `<html>`.
- All date strings stored as `YYYY-MM-DD`, `YYYYMMDD`, or `MM/DD/YYYY` — parser handles all three.
- Contact IDs are generated with `contact-{timestamp}-{index}-{random}` pattern.
- Firestore document IDs are sanitized to `^[a-zA-Z0-9_\-]+$`.

### Naming

- Component files: PascalCase (e.g., `ContactDetailModal.tsx`)
- Service files: camelCase (e.g., `firestoreSync.ts`)
- Utility files: camelCase (e.g., `contactUtils.ts`)
- CSS: Tailwind only — no custom class names except print styles and font overrides

### Firebase

- Firebase config lives in `firebase-applet-config.json` (NOT `.env`)
- The Google Maps API key has a hardcoded fallback in `App.tsx` line 25
- OAuth scopes: `gmail.send`, `drive.readonly`, `drive.file`
- Firestore rules enforce per-user isolation (`isOwner(userId)`)

### Default Values & Personalization

- Default sender name in email templates: `"Nathaniel Drewry"`
- Default market center: Huntington, IN (`40.8784, -85.4944`)
- Default brokerage: Coldwell Banker Realty
- The seed data (`initialData.ts`) is Nate's actual Coldwell Banker contact export

---

## Environment Variables

```env
GEMINI_API_KEY=<key>           # For Gemini AI features (currently unused in code)
APP_URL=<url>                  # Hosting URL
VITE_GOOGLE_MAPS_API_KEY=<key> # Google Maps (has hardcoded fallback)
```

---

## Build & Run

```bash
# Install dependencies (bun preferred, npm works)
bun install
# or
npm install

# Development server on port 3000
npm run dev

# Production build
npm run build

# Type check
npm run lint

# E2E Tests
npm run test:e2e
```

The project uses **Playwright** for End-to-End testing and **Vitest** for unit testing.

---

## Section/View Architecture

The app has 10 sections, navigable via tabs or stackable in a scrollable layout:

1. **Dashboard** (`AgentLandingPage`) — KPI cards, quick actions, upcoming events
2. **Calendar** (`InteractiveCalendar`) — Month view, drag events, inline editing
3. **Territory Map** (`TerritoryMapView`) — Google Maps with contact pins, routing
4. **Card Mailer** (`CardMailerQueue`) — Birthday card workflow pipeline
5. **Anniversaries** (`HouseAnniversaries`) — Closing milestone tracker
6. **Full Info** — Contacts with email + phone + address
7. **Phones** — Contacts with phone numbers
8. **Emails** — Contacts with email addresses
9. **Birthdays** (`BirthdayView`) — Birthday analysis with duplicate detection
10. **All** — Master directory of all contacts

Users can reorder sections via drag-and-drop (stacked mode) or tab reordering.

---

## Rules for Agents Working on This Project

### DO

- Keep the app **local-first** — it must work fully offline without Google sign-in
- Preserve all existing Coldwell Banker branding (logos, colors, naming)
- Maintain the dual-storage model (localStorage + Firestore sync)
- Keep the single-file-per-component pattern — don't split existing components without explicit request
- Run `npm run lint` (TypeScript check) before declaring work complete
- Test dark mode — all new UI must have proper `dark:` variants
- Respect Nate's real estate workflows — card mailers, pop-bys, house-iversaries are core features
- Use `Plus Jakarta Sans` for body text and `Playfair Display` for headings/display text
- Use Lucide React for all iconography

### DON'T

- Don't introduce a state management library unless the user explicitly requests it
- Don't remove the seed data (`initialData.ts`) — it's Nate's actual contact export
- Don't change the Firebase project configuration without explicit user approval
- Don't move API keys to environment variables if they currently have hardcoded fallbacks (the fallback pattern is intentional for ease of deployment)
- Don't add server-side rendering — this is a client-only SPA
- Don't modify the Avery 5160 print CSS calibration without testing on actual label sheets

### WHEN ADDING NEW FEATURES

- New components go in `src/components/` as standalone `.tsx` files
- New services go in `src/services/`
- New utility functions go in `src/utils/`
- If a feature needs a new section, add its `SectionType` to `types.ts` and wire it through `App.tsx`'s `renderSectionContent` and `getSectionTitle`
- If a feature needs cloud persistence, follow the existing Firestore subcollection pattern under `users/{uid}/`
- If a feature needs a new modal, follow the existing pattern: state variables in `App.tsx`, component rendered at the bottom of the JSX tree

---

## Known Issues & Technical Debt

### Architecture (Resolved)

- `App.tsx` was decomposed from a 1,050-line god component into 5 custom hooks, a React Context provider, and layout components (`AppShell`, `ModalOrchestrator`). App.tsx is now ~16 lines.
- `package.json` name was fixed.

### Data Quality (Resolved)

- **Seed data contains duplicate birthday dates** (many contacts share `20221019` or `20220629` — these are CRM import timestamps, not actual birthdays). The `analyzeBirthdays()` function in `contactUtils.ts` already detects and flags these.
- **`initialData.ts` inline CSV issue**: 62KB of inline CSV has been externalized to `public/data/seed-contacts.csv` to improve bundle size.

### Security Considerations

- Google Maps API key is hardcoded in `App.tsx` (line 25) as a fallback. This is acceptable for a personal tool but should be restricted by HTTP referrer in Google Cloud Console.
- Firebase config is in a committed JSON file (normal for client-side Firebase apps).
- OAuth access token is cached only in memory (`cachedAccessToken`) — good practice, never persisted.

### Missing Infrastructure (Resolved)

- PWA manifest and service worker have been added.

### Infrastructure (Resolved)

- End-to-end testing suite (Playwright has been integrated alongside Vitest).

### Styling

- Print styles are well-calibrated for Avery 5160 but there's no print preview for other document types
- No explicit responsive breakpoint testing documented — components use Tailwind responsive utilities but mobile polish varies

---

## Recommended Improvements (Priority Order)

### 🔴 High Priority

1. **Theming & White-Labeling** — Develop a theme configuration system to support color themes beyond the default dark mode. This is critical for SaaS conversion to allow different brokerages/agents to use their own branding.
2. **Recurring events** — Calendar events that repeat (quarterly check-ins, annual pop-bys).

### 🟡 Medium Priority

1. **SMS integration** — Twilio or similar for text message outreach alongside Gmail.
2. **Search-as-you-type in calendar** — Filter events by contact name or event type.

### 🟢 Nice to Have

1. **Bulk operations** — Select multiple contacts for batch email, label printing, or tag assignment.

---

## File Quick Reference

| File | Size | Purpose |
| --- | --- | --- |
| [`App.tsx`](file:///d:/tools/the-lava/src/App.tsx) | 2KB | Root component — thin shell with layout and context |
| [`AgentLandingPage.tsx`](file:///d:/tools/the-lava/src/components/AgentLandingPage.tsx) | 46KB | Executive dashboard |
| [`InteractiveCalendar.tsx`](file:///d:/tools/the-lava/src/components/InteractiveCalendar.tsx) | 47KB | Calendar with events |
| [`TerritoryMapView.tsx`](file:///d:/tools/the-lava/src/components/TerritoryMapView.tsx) | 36KB | Google Maps territory |
| [`ImportModal.tsx`](file:///d:/tools/the-lava/src/components/ImportModal.tsx) | 31KB | Import wizard |
| [`LuxuryEmblems.tsx`](file:///d:/tools/the-lava/src/components/LuxuryEmblems.tsx) | 30KB | Brand emblems |
| [`ContactDetailModal.tsx`](file:///d:/tools/the-lava/src/components/ContactDetailModal.tsx) | 28KB | Contact detail view |
| [`CalendarEventModal.tsx`](file:///d:/tools/the-lava/src/components/CalendarEventModal.tsx) | 28KB | Event create/edit |
| [`GmailComposeModal.tsx`](file:///d:/tools/the-lava/src/components/GmailComposeModal.tsx) | 26KB | Email composer |
| [`Header.tsx`](file:///d:/tools/the-lava/src/components/Header.tsx) | 27KB | Navigation & auth |
| [`types.ts`](file:///d:/tools/the-lava/src/types.ts) | 3KB | All TypeScript types |
| [`firestoreSync.ts`](file:///d:/tools/the-lava/src/services/firestoreSync.ts) | 7KB | Firestore operations |
| [`seed-contacts.csv`](file:///d:/tools/the-lava/public/data/seed-contacts.csv) | 60KB | Seed contact data |
| [`firestore.rules`](file:///d:/tools/the-lava/firestore.rules) | 1KB | Security rules |
