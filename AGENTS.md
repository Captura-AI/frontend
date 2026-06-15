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
