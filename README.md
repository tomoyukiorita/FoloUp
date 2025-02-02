# FoloUp

FoloUp is an open source platform for companies to conduct AI powered hiring interviews with their candidates.

<img src="https://github.com/user-attachments/assets/fa92ade1-02ea-4332-b5ed-97056dea01c3" alt="FoloUp Logo" width="800">

## Initial Setup

1. Clone the project to your local computer using `git clone https://github.com/FoloUp/FoloUp.git`

Copy the existing environment template file

```bash
# Create .env file (by copying from .env.example)
cp .env.example .env
```

## Database Setup ([Supabase](https://supabase.com/))

1. Create a project (Note down your project's password)
2. Got to SQL Editor and copy the SQL code from `supabase_schema.sql`
3. Run the SQL code to create the tables
4. Copy the supabase url and anon key from the project settings and paste it in the `.env` file in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Ok. Database is setup.

## Retell AI Setup ([Retell AI](https://retell.ai/))

We use Retell AI to manage all the voice calls.

Ok. Retell AI is setup.

## Clerk Setup ([Clerk](https://clerk.com/))

Set up Clerk environment variables in the `.env` file

1. Navigate to [Clerk](https://clerk.com/docs/quickstarts/nextjs#set-your-environment-variables) and complete step 2 in the instruction manual

2. Your `.env` (NOT `.env.local`) file should have the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` variables populated with **no inverted commas**

## Add OpenAI API Key

We use OpenAI to generate questions for interviews and analyze responses.

1. Go to [OpenAI](https://platform.openai.com/api-keys) and create an API key
2. Add the API key to the `.env` file in `OPENAI_API_KEY`

## Getting Started locally

Clone the project to your local computer using `git clone https://github.com/FoloUp/FoloUp.git`

First install the packages:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Self Hosting

We recommend using [Vercel](https://vercel.com/) to host the app.
