# ALX Polly

A modern, full-featured polling application built with Next.js, React, Tailwind CSS, and Supabase.

## Features
- Create, manage, and vote on polls
- User authentication (Supabase)
- Responsive, mobile-first design
- Dashboard with poll cards
- Create poll with advanced settings (multiple choice, login required, end date)
- Individual poll voting page
- Poll results page
- Social sharing (copy link, Twitter)
- LocalStorage for poll persistence
- Protected routes for voting
- Accessible, clean UI with Shadcn components

## Tech Stack
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Supabase (auth)
- Zustand/React Context (state management)
- Shadcn UI

## Getting Started

### 1. Clone the repository
```bash
# Clone and enter project
cd path/to/your/projects
# (If not already in the right folder)
```

### 2. Install dependencies
```bash
cd alx-polly/alx-polly
npm install
```

### 3. Configure Supabase
Create a `.env.local` file in `alx-polly/alx-polly` and add:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
Get these from your Supabase project dashboard.

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

## Usage
- Register/login via `/auth/register` and `/auth/login`
- Create polls via `/create`
- View and vote on polls from the dashboard (`/`)
- Poll voting page: `/poll/[id]`
- Poll results page: `/poll/[id]/results`
- Only logged-in users can vote if required by poll settings
- Multiple choice polls supported

## Folder Structure
```
alx-polly/
  alx-polly/
    app/
      auth/
        login/
        register/
      create/
      poll/
        [id]/
          results/
      layout.tsx
      page.tsx
    components/
      layout/
      poll/
      ui/
      shared/
    context/
      AuthContext.tsx
    lib/
      supabaseClient.ts
      utils.ts
    public/
    README.md
    package.json
    tsconfig.json
    .env.local
```

## Customization
- Update branding in `components/layout/Header.tsx`
- Change color scheme in `tailwind.config.js` and CSS
- Add more poll settings or user features as needed

## Accessibility & UX
- Keyboard navigation
- ARIA labels
- Form validation and error messages
- Loading and toast notifications

## License
MIT

---
© 2025 ALX Polly. All rights reserved.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
