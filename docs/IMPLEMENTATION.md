# Phase 1 implementation map

## Existing repository decision

The repository already used Next.js 15, TypeScript, Tailwind, Neon and JWT sessions.
Those foundations are retained. The former quiz-specific UI conflicts with the new
customer-conversation product and has been replaced; legacy API files remain until
their data is migrated.

## Folder structure

- `app/`: role-aware product UI and server routes
- `services/customer-response/`: provider-neutral response boundary and mock engine
- `future/ai/`: inactive AI integration notes (no AI SDK)
- `prisma/schema.prisma`: target PostgreSQL schema
- `lib/`: database and authentication helpers

## Route map

- Student: `/student/dashboard`, `/student/training`, `/student/training/[sessionId]`,
  `/student/results/[sessionId]`, `/student/history`, `/student/performance`
- Admin: `/admin/dashboard`, `/admin/students`, `/admin/customers`,
  `/admin/conversations`, `/admin/scenarios`, `/admin/assignments`,
  `/admin/reviews`, `/admin/analytics`
- Phase 1 UI currently demonstrates these destinations through a role-aware client
  shell. Persisted route handlers are the next incremental stage.

## Incremental plan

1. Foundation: schema, role boundaries, navigation and layouts.
2. Core flow: profile → scenario → assignment → chat → completion.
3. Review: transcript, manual rubric, feedback and result release.
4. Secondary management: imports, CRUD, analytics and production hardening.

Historical conversations and hidden profile attributes must be selected only in
admin server handlers. Student handlers should use explicit response DTO allowlists.
