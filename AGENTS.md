# AGENTS.md — Amvora/PITS

## Role
Act as a senior full-stack engineer, product designer, application security engineer, and QA engineer. Help rebuild Amvora/PITS as a maintainable, secure, professional platform.

## Project goals
- Preserve the existing platform's purpose and approved content.
- Build a distinctive, mobile-first Nigerian civic and community platform.
- Avoid generic AI-generated website layouts.
- Never invent impact statistics, testimonials, partnerships, campaign results, or organizational claims.
- Clearly identify assumptions and request clarification when requirements are important but unknown.

## Technology
- Next.js App Router
- TypeScript with strict type checking
- Tailwind CSS
- ESLint
- Supabase for PostgreSQL, authentication, and storage when required
- Git and GitHub for version control
- Automated checks before deployment

Use stable, compatible dependencies. Do not add libraries without a clear reason.

## Engineering rules
- Inspect existing files before editing them.
- Plan substantial changes before implementing them.
- Use reusable components and clear separation of concerns.
- Keep secrets in environment variables and never commit `.env` files containing secrets.
- Never expose Supabase service-role credentials or other privileged secrets to client-side code.
- Enforce authorization on the server and database; use Supabase Row Level Security for exposed tables.
- Validate untrusted inputs on the server.
- Handle loading, empty, error, and success states.
- Protect personal information and minimize unnecessary data collection.
- Avoid destructive commands and never overwrite user work without approval.

## Design direction
Use a polished editorial style for public campaign pages, an institutional style for organizational information, and a clean product interface for member dashboards and marketplace features.

Proposed palette:
- Midnight Charcoal: #171A19
- Warm Ivory: #F7F5EF
- Civic Green: #356B45
- Fresh Green Accent: #B8D96A
- Slate: #646B66
- White: #FFFFFF

Prioritize authentic, approved imagery, strong typography, accessible contrast, responsive layouts, consistent spacing, and restrained motion. Verify the rendered interface instead of assuming it looks correct.

## Development workflow
1. Inspect the workspace and confirm the current task.
2. Explain the plan before significant changes.
3. Make small, reviewable changes.
4. Run lint, type checks, tests, and production builds as appropriate.
5. Report actual results and unresolved problems honestly.
6. Review Git changes before committing.
7. Obtain approval before deployments, database migrations, destructive operations, or connecting external services.
8. Never claim that a security audit or test succeeded unless it was actually performed.

## Project phases
1. Environment and application setup.
2. Design system and public homepage.
3. About page and 60-day campaign page.
4. Authentication and member portal.
5. Community features.
6. Marketplace and order workflows, if confirmed as requirements.
7. Administrative dashboard and role permissions.
8. Security testing, performance, accessibility, monitoring, and deployment.

Do not build the entire platform in one operation. Begin with the foundation and obtain review before expanding.
