# 🛠️ Assignment: Revamp · Fix · Secure

**Project:** TanStack Ekraf Dashboard — admin dashboard (login → product CRUD → user/role management), built with TanStack Start + Better Auth.
**Important:** no database by design — data lives in memory and resets on every restart.

---

## 1 · Getting Started

```bash
bun install
cp .env.example .env.local    # fill BETTER_AUTH_URL + BETTER_AUTH_SECRET
bun dev                       # http://localhost:3000
```

1. Visit `/setup` → click **Seed Admin Account** (creates `admin@example.com` / `admin12345` + sample products).
2. Sign in at `/demo/better-auth`.
3. Explore `/dashboard`, `/products`, `/users`.

> 💡 If something breaks, read the error carefully first — understanding *why* it broke is part of the grade.

---

## 2 · Codebase Map (skim before changing anything)

| Path | What it is |
|---|---|
| `src/routes/` | All pages (file-based routing, `routeTree.gen.ts` is generated) |
| `src/lib/auth.ts` | Better Auth config, `requireAuth()` / `requireAdmin()`, seed |
| `src/components/` | `Header`, `Footer`, `ThemeToggle`, shadcn `ui/` components |
| Server functions | `createProduct`, `updateProduct`, `deleteProduct`, `updateUserRole`, `deleteUser`, `getUsers` |

**Stack:** TanStack Start (React 19) · TanStack Router/Query/Form/Table · Better Auth (in-memory) · Tailwind + shadcn · Biome · bun.

### Routes to test

| Route | Access | Test it |
|---|---|---|
| `/`, `/login`, `/setup` | public | Renders, seed is idempotent |
| `/dashboard` | auth | Redirects to login when signed out |
| `/products` | auth | List renders, sorting works |
| `/products/new`, `/products/$id` | admin | Create/edit/delete; non-admin blocked |
| `/users`, `/users/$userId` | admin | Role change; last-admin lockout blocked |

---

## 3 · Task A — UI Revamp (Required)

Improve at least **3 pages** (suggested: Home, Dashboard, Products).

- [ ] **Sidebar layout** for the dashboard area (Dashboard, Products, Users) with icons per nav item (e.g. `lucide-react`); collapsible + hamburger drawer on mobile
- [ ] Replace the separate `/products/new` and edit pages with **modal dialogs** — every **Create** and **Update** action (products, user roles) opens in a popup modal, not a full page
- [ ] Responsive at mobile width (no desktop-only tables)
- [ ] Consistent spacing / typography / colors; dark mode works via `ThemeToggle`
- [ ] Loading, empty, and error states on data pages
- [ ] Stick to Tailwind + existing shadcn `ui/` components — no framework swap

> 💡 shadcn's `dialog.tsx` is already in `src/components/ui/` — build your modals on it. If you convert create/edit to modals, the old routes may be removed or kept as redirects; make sure all links still work.

## 4 · Task B — Fix Errors (Required)

- [ ] `bun run lint` passes (fix known scaffold issues in `styles.css`, `__root.tsx`, `demo/`)
- [ ] `bun run build` succeeds with zero errors
- [ ] Every route above manually tested + broken behavior fixed

**Known gotchas in this repo:**

- `useParams()` needs `{ from: '/path/$param' }` — bare call throws.
- `createServerFn` supports `GET`/`POST` only — no PATCH/DELETE.
- `/setup` must not crash if admin already exists (idempotent seeding).

## 5 · Task C — Security Enhancements (Required · min 2, one from each column)

### Auth / access control
- [ ] Every mutation calls `requireAdmin()` / `requireAuth()` — close missing ones
- [ ] Block self-role-demotion & self-deletion for admins
- [ ] Rate-limit login attempts

### App hardening
- [ ] Server-side Zod validation on every server function (client validation ≠ security)
- [ ] No `dangerouslySetInnerHTML` with user content (XSS)
- [ ] No secrets in code or git — `.env.local` only
- [ ] Session cookie flags: `httpOnly`, `sameSite`, timeout

**Bonus:** password strength/reset, admin action audit log, CSRF-safe fetch wrapper, sanitizing product fields.

> 🔒 Rule of thumb: **the client is untrusted.** Validate + authorize again on the server, every time.
> 🚫 Don't add a database, don't switch frameworks, don't remove auth checks because they "block" you, don't commit `.env.local`.

---

## 6 · Deliverables

- [ ] One branch → **Pull Request** with changes described per task
- [ ] `NOTES.md`: *"What I broke and how I fixed it"* (1 paragraph)
- [ ] Fresh clone + `bun install` + `/setup` works end-to-end
- [ ] Each security enhancement: 1–2 sentences on the attack it prevents
- [ ] `bun run build` passes, Biome clean

### Grading

| Criteria | Weight |
|---|---|
| UI revamp (quality, responsive, states) | 30% |
| Bug fixes (lint/build clean, routes correct) | 25% |
| Security (server-side placement + explanation) | 35% |
| Report quality + code hygiene | 10% |

---

## 7 · Command Cheatsheet

```bash
bun dev              # dev server on :3000
bun run lint         # biome check — find errors
bun run format       # biome format --write — fix style
bun run build        # must pass before submit
bunx tsr generate    # regenerate routeTree.gen.ts after route changes
```

Docs: [TanStack Start](https://tanstack.com/start) · [Router](https://tanstack.com/router) · [Form](https://tanstack.com/form) · [Biome](https://biomejs.dev) · [Better Auth](https://www.better-auth.com)

*Feel free to annotate & improve this sheet 🚀*
