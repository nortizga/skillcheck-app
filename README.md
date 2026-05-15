# SkillCheck

SkillCheck is a personal DBT (Dialectical Behavior Therapy) diary card app that I built for my own mental health tracking and reflection.

I open-sourced it in case it’s useful for others who follow DBT practices and want a simple, customizable way to track thoughts, emotions, behaviors, and skills.

## 🧠 Why I built this

I wanted a simple, structured way to track my own DBT practice without relying on complex apps or paper worksheets.

Over time, it also became a space where I could explore full-stack development, cloud infrastructure, and UI design in a real, meaningful context.


## 🚀 What it does

SkillCheck lets you:

- Track daily emotions, thoughts, and behaviors
- Log DBT skills used throughout the day
- Write short reflections and notes
- Review patterns over time through weekly navigation
- Export entries as PDF diary cards
- Switch between English and Spanish

## 🧩 Core Features

- Daily DBT diary card (structured tracking)
- Skills logging (based on DBT framework)
- Emotion intensity tracking (0–5 scale)
- Weekly progress view
- Bilingual support (EN / ES)
- PDF export for personal or therapy use
- Authentication via Supabase
- Row-level security (each user only sees their own data)
- Built-in crisis resources (988 / Línea PAS)

## 🏗️ Tech Stack

**Frontend**
- React + TypeScript (Vite)
- Tailwind CSS
- shadcn/ui + Radix UI

**Backend**
- Supabase (PostgreSQL + Auth + RLS)

**Utilities**
- jsPDF (PDF export)
- Custom i18n system
- Commitizen (conventional commits)

## 🧠 Architecture Notes

- Client-first architecture with Supabase backend
- Row-level security for data isolation
- Component-driven UI structure
- Lightweight, mobile-friendly design
- Focus on simplicity and maintainability

## 📌 Design Philosophy

- Keep mental health tracking simple, not overwhelming
- Reduce friction in daily reflection
- Make the system easy to customize or extend
- Prioritize privacy and user ownership of data

## 📊 Status

This is an active personal project I continue to improve over time.

It’s also used as a space to explore:
- Full-stack development
- Backend design with Supabase/Postgres
- UX design for sensitive mental health workflows
- Real-world product thinking

## 🧑‍💻 Author

Built by Nicole Ortiz  
Software Engineer focused on backend systems, cloud infrastructure, and AI-assisted development
