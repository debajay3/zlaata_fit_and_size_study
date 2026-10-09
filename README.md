# ZLAATA Fit & Size Study

Next.js employee survey with a separate identification screen (required name, optional phone), 27 questions, illustrated body shapes, and an administrator portal with charts and CSV exports.

## Portals

- `/` and `/employee`: employee survey
- `/admin`: administrator code login

## Local setup

Run `npm ci`. Configure `DATABASE_URL` and `ADMIN_KEY` in a local `.env.local` file; never commit real values. Use a PostgreSQL connection URL, for example a Vercel Marketplace Neon database. Apply the schema with `node --env-file=.env.local scripts/migrate.mjs`, then run `npm run dev`.

## Vercel deployment

Import this GitHub repository as a Next.js project. Configure `DATABASE_URL` and `ADMIN_KEY` for the intended environments in Vercel. Apply `db/schema.sql` to that PostgreSQL database before collecting responses, then deploy. Missing database configuration causes submissions to fail safely while retaining the form answers. The administrator API rejects unauthenticated access. Responses are stored in PostgreSQL, with UUID-based retry deduplication.

Employee access should be restricted using your Vercel deployment access settings or company access controls. Names and optional phone numbers are identification, not proof of employee membership.

No administrator code, database credentials, or employee response data is included in this repository.
