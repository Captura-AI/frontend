<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

> Notable Next.js 16 changes already hit in this repo: Middleware is now `proxy.ts` (`export function proxy()`), and `cookies()` is async (`await cookies()`).

# Clean Code Standard (MANDATORY)

All code must be clean, optimized, and consistent with current best practices. Primary references:

1. Clean Code JavaScript — https://github.com/ryanmcdermott/clean-code-javascript
2. React Best Practices (Vercel) — https://vercel.com/blog/introducing-react-best-practices
3. Node.js Best Practices — https://github.com/goldbergyoni/nodebestpractices

Non-negotiable rules:

- **Vertical spacing for readability:** separate logical blocks with blank lines. Add a blank line **before** `if`/`for`/`return`/`switch` and other control blocks when it separates them from the statement above. Never stack statements with no breathing room.
- **Guard clauses / early return:** avoid nesting beyond 2–3 levels.
- **Descriptive names:** no ambiguous abbreviations; booleans start with `is/has/should/can`; components PascalCase; hooks `useX`.
- **Small, single-responsibility** components/functions (< 50 lines); split when larger.
- **Strict TypeScript:** no `any` in application code — use `unknown` then narrow; use advanced types (discriminated unions, generics, utility types) where they clarify contracts. Type props with a named `interface`/`type`.
- **Immutability:** never mutate state/props/objects; return new copies.
- **Explicit error handling:** never swallow errors; surface user-friendly states (use `DataStates`); typed errors (`ApiError`).
- **Server Components by default**; `'use client'` only when interactivity requires it; fetch on the server (`serverApiRequest`) where possible, TanStack Query for interactive/auth client fetches.
- **Never fight the formatter:** follow Prettier/ESLint. `npm run lint`, `tsc --noEmit`, and `npm run build` must be green before any PR.
- **Match existing architecture** (`domains` / `application` / `infrastructure` / `presentation`) rather than introducing new styles.

## No Duplicated Types/Constants/Helpers Across Services (MANDATORY)

`domains/*/services/*.ts` and `presentation/features/*` hold page/feature logic only — never a locally re-declared type, formatting function, or magic constant that already exists (or should exist) in a shared location. This was a real problem (see `refactor/consolidate-shared-types-helpers`, PR #34) — five services independently declared an identical `BackendUser` interface, four separate `formatIdr` implementations existed with silently different output, and `"Asia/Jakarta"` was hardcoded in five different files.

Where things go:

1. **A backend response shape (DTO) used by 2+ domain services** → `src/shared/types/common.ts`. Example: `BackendUser`, `BackendPaginate<T>`.
2. **A formatting/utility function used by 2+ files** → `src/shared/utils/<topic>.utils.ts`. Example: `formatIdr`/`formatPrice`/`formatCount` in `format.utils.ts`, `toPhotographerName`/`toPhotographerHandle` in `photographer.utils.ts`, `formatTimeAgo`/`nowInSeconds` in `time.utils.ts`.
3. **A magic string/number config value** (timezone, default page size, route path) → `src/shared/config/`. Example: `JAKARTA_TIME_ZONE` in `datetime.config.ts`.
4. **A presentation-layer helper used across components** (badge tone/color mapping, shared className logic) → `src/presentation/lib/utils.ts`, alongside `cn()`.

Before writing a new `interface`, `function format...`/`to...`, or a literal like `"Asia/Jakarta"` inside a domain service or component: grep for the symbol/literal across `src/` first. If it already exists elsewhere, import it — don't re-declare. If it doesn't exist yet but is plausibly needed by more than one file, put it in `shared/`/`presentation/lib/` immediately rather than inlining "for now."

One nuance worth remembering: when consolidating something that touches per-component CSS Modules (like `badgeClass`), don't force identical output if the underlying `styles` objects genuinely differ — parameterize the shared function (pass `styles` in) rather than silently changing which class gets applied in some component.
