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

## Revised survey (October 2026)

All 27 questions require an answer. Where offered, a not-sure answer is valid; band and cup must both be selected or the not-sure answer used. If no brands are selected, question 2 requires an explicit not-applicable answer. Phone remains optional.

Response IDs are created only in the browser when Submit is pressed, then reused for retries. An existing response ID with different content produces a recoverable conflict instead of silently discarding the new response. Existing response records remain readable.

Run validation regression checks with `node --experimental-strip-types --test tests/survey-validation.test.mjs` (Node 22+).

Illustrations in `public/measurement-guide.png` and `public/coverage-areas.png` were created with the built-in image generator: four height/bust/waist/hips measurement panels; six body-area coverage panels (arms, bust/neckline, midsection, hips/seat, thighs, back), on white in the survey's burgundy palette. Written instructions and alternative text accompany the images.
