# 🔖 Smart Bookmark App

A full-stack bookmark manager built with **Next.js (App Router)** and
**Supabase**, featuring secure Google authentication, private user data,
and real-time multi-tab synchronization.

------------------------------------------------------------------------

## 🌍 Live Demo

👉 https://smart-bookmark-app-ruby-rho.vercel.app/

------------------------------------------------------------------------

## 🚀 Features

-   🔐 Google OAuth Authentication (Supabase Auth)
-   👤 Private bookmarks per user (Row Level Security)
-   ➕ Add bookmarks (Title + URL)
-   🗑 Delete bookmarks
-   ⚡ Real-time updates (multi-tab sync)
-   📱 Fully responsive design
-   ☁️ Deployed on Vercel

------------------------------------------------------------------------

## 🛠 Tech Stack

-   **Frontend:** Next.js (App Router)
-   **Backend:** Supabase (Auth, Postgres, Realtime)
-   **Styling:** Tailwind CSS
-   **Deployment:** Vercel

------------------------------------------------------------------------

## 🔐 Security Implementation

-   Row Level Security (RLS) enabled on `bookmarks` table
-   Policies ensure:
    -   Users can only read their own bookmarks
    -   Users can only insert their own bookmarks
    -   Users can only delete their own bookmarks
-   Realtime respects RLS policies

------------------------------------------------------------------------

## 🧠 Architecture Overview

       smart-bookmark-app/
        │
        ├── public/ # Static assets
        │
        ├── src/
        │ ├── app/
        │ │ ├── auth/
        │ │ │ └── callback/
        │ │ │ └── route.ts # Supabase OAuth callback handler
        │ │ │
        │ │ ├── bookmarks/
        │ │ │ └── page.tsx # Bookmarks dashboard page
        │ │ │
        │ │ ├── layout.tsx # Root layout
        │ │ ├── page.tsx # Home page
        │ │ └── globals.css # Global styles
        │ │
        │ ├── components/
        │ │ ├── AddBookmarkForm.tsx
        │ │ ├── BookmarkList.tsx
        │ │ ├── DeleteBookmarkButton.tsx
        │ │ ├── GoogleLoginButton.tsx
        │ │ └── LogoutButton.tsx
        │ │
        │ ├── lib/
        │ │ ├── auth.ts # Helper to get current user
        │ │ ├── bookmarks.ts # Fetch user bookmarks
        │ │ └── supabase/
        │ │ ├── client.ts # Supabase client instance
        │ │ └── server.ts # Supabase server client (SSR)
        │ │
        │ └── middleware.ts # Route protection
        │
        ├── .env.local # Environment variables
        ├── next.config.ts # Next.js configuration
        ├── tsconfig.json # TypeScript configuration
        ├── package.json # Project dependencies
        ├── README.md


---

## 🧠 Folder Responsibilities

- **app/** → Routes & Server Components (App Router)
- **components/** → Reusable UI components (Client Components)
- **lib/** → Utility functions & Supabase configuration
- **middleware.ts** → Protects authenticated routes
- **supabase/client.ts** → Browser-side Supabase instance
- **supabase/server.ts** → Server-side Supabase instance

---

------------------------------------------------------------------------

## ⚡ Real-Time Sync

The app uses Supabase Realtime subscriptions:

``` ts
supabase.channel("bookmarks-changes")
  .on("postgres_changes", {...})
```

This ensures:

-   Adding a bookmark in Tab A instantly updates Tab B
-   No page refresh required
-   WebSocket connection secured via auth token

------------------------------------------------------------------------

## 📦 Installation (Local Setup)

``` bash
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app
npm install
```

Create `.env.local`:

``` env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Run locally:

``` bash
npm run dev
```

------------------------------------------------------------------------

## 🚀 Deployment (Vercel)

1.  Push project to GitHub\
2.  Import repository into Vercel\
3.  Add environment variables:
    -   `NEXT_PUBLIC_SUPABASE_URL`
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  Update Supabase → Authentication → URL Configuration
    -   Add production URL
5.  Redeploy

------------------------------------------------------------------------

# 🧩 Challenges & Solutions

------------------------------------------------------------------------

## 🔥 Challenge 1: Learning Supabase

### Problem

Understanding how Supabase integrates: 
- Authentication
- Database
- Row
- Level Security (RLS)
-  Realtime WebSockets
-  Production vs Localhost behavior

### Solution

-   Studied official Supabase documentation
-   Implemented RLS policies at the database level
-   Used `@supabase/ssr` for Next.js App Router compatibility
-   Verified WebSocket connections in browser DevTools
-   Properly configured environment variables in Vercel

**Key Takeaway:**\
Security must be enforced at the database level, not just the frontend.

------------------------------------------------------------------------

## ⚡ Challenge 2: Handling INSERT Realtime Updates

### Problem

-   Delete events updated instantly
-   Insert events required page refresh
-   Localhost and production behaved differently

Root causes: 
- Realtime channel not authenticated correctly
- State not synchronized properly
- RLS filtering affecting event propagation

### Solution

-   Explicitly authenticated Realtime channel:

``` ts
const { data: { session } } = await supabase.auth.getSession();
await supabase.realtime.setAuth(session.access_token);
```

-   Subscribed using user filter:

``` ts
filter: `user_id=eq.${userId}`
```

-   Updated React state directly from `payload.new`
-   Synced initial props with client state

**Result:** ✔ True multi-tab sync\
✔ No reload required\
✔ Works in both localhost and production

------------------------------------------------------------------------

## 📈 What I Learned

-   How WebSockets behave differently in production
-   Importance of Row Level Security in SaaS applications
-   Differences between development and optimized production builds
-   State synchronization in Next.js App Router
-   Deploying full-stack applications with environment variables

------------------------------------------------------------------------

## 🏁 Final Outcome

This project demonstrates:

-   Secure full-stack SaaS architecture
-   Real-time data synchronization
-   Production-ready deployment
-   Clean and responsive UI
-   Proper database-level security

------------------------------------------------------------------------

## 👨‍💻 Author

Built with ❤️ using Next.js & Supabase.
