# Interview Genie

A comprehensive platform for interview preparation, featuring AI-powered mock interviews, personalized feedback, and comprehensive preparation tools.

## Features

- User Authentication (Sign Up/Sign In)
- Modern Landing Page with Animations
- Protected Dashboard
- Profile Management
- AI-Powered Interview Practice
- Progress Tracking

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd interview-genie
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a Supabase project and get your credentials:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

4. Create a `.env` file in the root directory:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the SQL script in your Supabase SQL editor to create the necessary tables:
```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table users (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text unique not null,
  phone text,
  password_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- User Profiles table
create table user_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  experience jsonb,
  skills text[],
  education jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Generated Documents table
create table generated_documents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  document_type text not null,
  content text not null,
  company text,
  role text,
  job_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

6. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   └── HowItWorks.tsx
│   └── ui/
│       ├── button.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── sonner.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
├── lib/
│   ├── auth.ts
│   └── supabase.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Landing.tsx
│   └── NotFound.tsx
└── App.tsx
```

## Technologies Used

- React
- TypeScript
- Supabase
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod
- React Router
- TanStack Query

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
