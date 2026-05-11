# SkillCheck

A personal DBT (Dialectical Behavior Therapy) diary card web app. Track behaviors, thoughts, emotions, and skills daily — with bilingual support (EN/ES) and PDF export.

## Stack

- **Vite + React 18 + TypeScript** — fast, type-safe frontend
- **Tailwind CSS + shadcn/ui** — utility-first styling with Radix UI primitives
- **Supabase** — auth + Postgres database with row-level security
- **jsPDF** — client-side PDF generation (portrait, mobile-friendly)
- **Commitizen** — conventional commit messages

## Quick Start

### 1. Clone & install

```bash
git clone <your-repo>
cd skillcheck-app
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/migration.sql`
3. Go to **Project Settings → API Keys** and copy your:
   - Project URL
   - Publishable key

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Build for production

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

## Commits

This project uses [Commitizen](https://commitizen.github.io/cz-cli/) for conventional commits. Instead of `git commit`, run:

```bash
npm run commit
```

## Project Structure

```
skillcheck-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── supabase/
│   └── migration.sql          # Database schema + RLS policies
└── src/
    ├── main.tsx               # Entry point
    ├── App.tsx                # Auth + hash routing
    ├── index.css              # Tailwind + CSS variables
    ├── types/
    │   └── index.ts           # Shared TypeScript types
    ├── hooks/
    │   ├── useAuth.ts         # Supabase auth hook
    │   └── useEntries.ts      # CRUD hook for diary entries
    ├── lib/
    │   ├── supabase.ts        # Supabase client
    │   ├── i18n.ts            # EN/ES translations + skills + emotion styles
    │   ├── dates.ts           # Date utilities
    │   ├── exportPDF.ts       # PDF generation with jsPDF
    │   └── utils.ts           # cn() class merging utility
    ├── components/
    │   ├── ui/                # shadcn/ui primitives (button, input, card, …)
    │   ├── Header.tsx
    │   ├── WeekDots.tsx
    │   ├── Section.tsx
    │   ├── IntensityStepper.tsx
    │   ├── YesNoToggle.tsx
    │   ├── SkillChip.tsx
    │   └── ExportModal.tsx
    └── pages/
        ├── LoginPage.tsx
        ├── DiaryPage.tsx
        ├── PrivacyPage.tsx
        └── TermsPage.tsx
```

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-navy` | `#2E4052` | Header, headings, primary text |
| `brand-sage` | `#BDD9BF` | Selected states, skill chips |
| `brand-amber` | `#FFC857` | Save button, week dot highlight |
| `brand-plum` | `#412234` | Destructive / "Yes" on behavior toggles |

## Features

- **Daily diary card** — behaviors (yes/no), thoughts (yes/no), emotions (0–5 intensity)
- **Skills tracker** — tap to log DBT skills used each day
- **Notes** — free-form journaling per entry
- **Week view** — dots show which days have entries
- **Date navigation** — go back to fill in past days (no future dates)
- **Bilingual** — full English/Spanish toggle, language persisted across sessions
- **PDF export** — portrait layout optimized for mobile, one card per day
- **Auth** — email/password via Supabase
- **Row-Level Security** — each user can only see their own data
- **Crisis resources** — 988 Suicide & Crisis Lifeline always visible; Línea PAS shown in Spanish

## License

Private — for personal use.
