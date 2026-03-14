# Sayo Shopping - Luxury Ecommerce Platform

An elegant, high-performance ecommerce platform for luxury jewellery, built with Next.js App Router, Supabase, and a custom vanilla CSS design system.

## Features

- **Storefront**: Minimalist luxury design with responsive layout, product filtering, and image galleries.
- **WhatsApp Integration**: Frictionless ordering system redirecting customers to a pre-filled WhatsApp message. No user accounts required for buyers.
- **Admin Dashboard**: Secure Supabase-authenticated dashboard.
- **Product Management**: Full CRUD capabilities including drag-and-drop style image uploads to Supabase Storage (Max 5 images per product).
- **Order Management**: Manual tracking of WhatsApp orders, status updates, and payment states.
- **SEO Optimized**: Built-in metadata for performant sharing and discoverability.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Vanilla CSS, Lucide React (Icons)
- **Backend/Database**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Configured for Netlify Free Tier (`@netlify/plugin-nextjs`)

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- A [Supabase](https://supabase.com/) account
- A [Netlify](https://netlify.com/) account (for deployment)

### 2. Supabase Configuration
Create a new project in Supabase and run the provided SQL script to set up your tables:
1. Open the Supabase SQL Editor.
2. Copy the contents of `schema.sql` (found in the root of this repository) into the editor.
3. Click **Run**.
4. **Important**: Go to Supabase Storage and create a new public bucket named exactly `product-images`.

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

*(You can find these in your Supabase Dashboard under Project Settings > API)*

### 4. Local Development
Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to view the storefront, and `http://localhost:3000/admin/login` to access the admin dashboard.

### 5. Deployment to Netlify
1. Push this repository to GitHub/GitLab.
2. Connect the repository to Netlify.
3. During setup, Netlify will automatically detect the Next.js `netlify.toml` configuration.
4. **Crucial**: Add your Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Netlify dashboard under Site Settings > Environment Variables.
5. Deploy the site.

## Notes on the Admin Panel
- **First Admin**: To create your first admin user, you can either sign up through a temporary public route (not recommended for production) or manually invite a user from the Supabase Authentication dashboard using "Invite via Email". Once logged in, you can use the `/admin/register` route to create additional admin accounts safely.
