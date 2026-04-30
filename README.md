# SkillCheck

A personal DBT (Dialectical Behavior Therapy) diary card web app. Track behaviors, thoughts, emotions, and skills daily — with bilingual support (EN/ES) and PDF export.

## Stack

- **Vite + React** — fast frontend
- **Tailwind CSS** — utility-first styling with custom palette
- **Supabase** — auth + Postgres database with row-level security
- **jsPDF** — client-side PDF generation

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

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Build for production

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

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
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Auth routing
    ├── index.css               # Tailwind + base styles
    ├── hooks/
    │   ├── useAuth.js          # Supabase auth hook
    │   └── useEntries.js       # CRUD hook for diary entries
    ├── lib/
    │   ├── supabase.js         # Supabase client
    │   ├── i18n.js             # EN/ES translations + skills + emotion styles
    │   ├── dates.js            # Date utilities
    │   └── exportPDF.js        # PDF generation with jsPDF
    ├── components/
    │   ├── Header.jsx
    │   ├── WeekDots.jsx
    │   ├── Section.jsx
    │   ├── IntensityStepper.jsx
    │   ├── YesNoToggle.jsx
    │   ├── SkillChip.jsx
    │   └── ExportModal.jsx
    └── pages/
        ├── LoginPage.jsx
        └── DiaryPage.jsx
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Header, text, primary buttons |
| Sage | `#839788` | Accents, active states, links |
| Cream | `#EEE0CB` | Backgrounds, highlights |
| Taupe | `#BAA898` | Muted text, borders |
| Soft Blue | `#BFD7EA` | Emotion accents (fear, sadness) |

## Features

- **Daily diary card** — behaviors (yes/no), thoughts (0–5), emotions (0–5)
- **Skills tracker** — tap to log DBT skills used each day
- **Notes** — free-form journaling per entry
- **Week view** — dots show which days have entries
- **Date navigation** — go back to fill in past days (no future dates)
- **Bilingual** — full English/Spanish toggle
- **PDF export** — select a date range, download as formatted PDF
- **Auth** — email/password via Supabase
- **Row-Level Security** — each user can only see their own data
- **Crisis resources** — 9-8-8, 9-1-1, Línea PAS always visible

## License

Private — for personal use.
