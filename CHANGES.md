# Smart Cafeteria — Fix & Completion Log

This document lists everything that was broken, incomplete, or missing in the
original project and what was done to fix it.

## Critical bugs (app would not build / core features silently broken)

- **`client/src/routes/AppRoute.jsx`** had a stray line of Hindi/English text
  sitting unescaped inside the JSX `<Routes>` block. This is a hard syntax
  error — `vite build` would fail outright. Rewrote the file.
- Same file imported `../pages/checkout` (lowercase) while the actual file is
  `Checkout.jsx`. Works on case-insensitive filesystems (Windows/macOS) but
  fails on Linux/CI/most hosting. Fixed the import casing.
- **Cart quantity buttons did nothing.** `CartItem.jsx` called
  `increaseQuantity(item.id)` / `decreaseQuantity(item.id)` /
  `removeItem(item.id)`, but `CartContext` keys everything by `_id` (Mongo's
  field). Fixed all three call sites.
- **Admin login was completely dead.** `server.js` had the admin auth route
  commented out, and `AdminLogin.jsx` called the *regular* user login
  endpoint, then tried to call `setAdmin()` — a function that doesn't exist
  on `AuthContext`. Re-enabled the route, added a dedicated
  `adminAuthService.js` on the client, and fixed the page to use the real
  `login()` from context.
- **No route protection existed.** `ProtectedRoute.jsx` referenced
  undefined components and unimported hooks (`Routes`, `Route`, `AdminRoute`)
  and was never even used — `/dashboard` and `/admin/*` were wide open to
  anyone. Rewrote it as a working auth/role guard and applied it to every
  route that needs a login or admin role.

## Missing backend features

- Added admin **food/inventory CRUD**: `createFood`, `updateFood`,
  `deleteFood`, `getAllFoodsAdmin` (+ routes, admin-only).
- Added **order cancellation** (`PATCH /api/orders/:id/cancel`) with
  automatic stock restoration — there was previously no way to cancel an
  order at all.
- Added **admin user list** (`GET /api/admin/users`) and **popular foods**
  (`GET /api/admin/popular-foods`, aggregated from real order data).
- Removed a dead, unused duplicate `middleware/adminMiddleware.js` router.

## Missing/incomplete frontend features

- Admin dashboard widgets (`DashboardStats`, `RecentOrders`, `PopularFoods`,
  `UserTable`, `InventoryTable`) were **100% hardcoded fake data**. All five
  now fetch and display real data from the backend, and `InventoryTable`
  supports live stock +/- and delete.
- `AdminSidebar` buttons did nothing — now real navigation links with active
  state and a working logout.
- Added a **"Cancel Order"** button on `MyOrders` and `OrderDetails` pages,
  wired to the new cancel endpoint.
- Implemented `NotFound.jsx` (was an empty file) and added a catch-all `*`
  route so unknown URLs get a real 404 page instead of a blank screen.
- Fixed React key warnings/bugs from using populated Mongo objects or
  undefined `.id` fields as keys (`FoodGrid`, `OrderDetails`,
  `OrderDetailsModal`).

## Dead code removed

- `client/src/main.js`, `client/src/Apph.js` (empty duplicate entry points)
- `client/src/layouts/MainLayout.jsx`, `layouts/DashboardLayout.jsx` (empty,
  never imported)
- `client/src/context/ThemeContext.jsx` (empty, never imported)
- `client/src/services/api.js` (empty, never imported)
- `server/middleware/adminMiddleware.js` (dead duplicate of admin routes)

## Verified working

- `npm run build` in `client/` completes successfully (2272 modules,
  no errors).
- `node server.js` boots cleanly and serves requests (all route modules
  load without syntax/import errors).

## ⚠️ Security note — please action this yourself

`server/.env` contains a **real MongoDB Atlas username and password** in a
commented-out connection string. If this repo has ever been pushed to
GitHub/GitLab, that credential is exposed in your git history even after
deleting the line. Please **rotate that database password** now, and add
`.env` and `node_modules/` to `.gitignore` (both are currently committed).

## Update 2 — previously-missing pages added

- **`/forgot-password` + `/reset-password/:token`** — full flow added.
  Backend generates a hashed, time-limited (30 min) reset token
  (`crypto`, no new dependency needed). ⚠️ No email/SMTP service is
  configured in this project, so the reset link is returned directly in
  the API response and shown on-screen for local testing — wire up a real
  email provider (e.g. Nodemailer + SMTP, or SendGrid) before deploying.
- **`/settings`** — real page now, backed by a working profile-edit form
  (name / email / password) that calls a new `PUT /api/users/profile`
  endpoint. Previously this route 404'd and the `AccountSettings`
  component only had a logout button.
- **`/favorites`** — full favorites feature: `favorites` array added to
  the `User` model, `GET /api/users/favorites` and
  `POST /api/users/favorites/:foodId` (toggle) endpoints, a heart-icon
  toggle on every `FoodCard`, a dedicated Favorites page, and the
  dashboard's "Favorite Foods" widget now shows real data instead of a
  hardcoded list.

Verified: `npm run build` still passes (2277 modules) and the server
boots and serves all new routes without errors.

## Update 3 — all 15 audited items addressed

1. **Navbar** — rewrote to be auth-aware: shows Dashboard/My Orders/Settings
   + a real Logout when logged in, "Login" when not, admin users get
   routed to `/admin` instead of the customer dashboard.
2. **Navbar "Order Now" button** — now navigates to `/menu`.
3. **Home page CTA "Start Ordering" button** — now navigates to `/menu`.
4. **Revenue chart** — built a real (dependency-free) bar chart component
   backed by a new `GET /api/admin/revenue-chart` endpoint that aggregates
   the last 7 days of order revenue via MongoDB aggregation, cancelled
   orders excluded. Wired into the admin dashboard.
5. **Customer `StatsCards`** — now computed from the user's real orders
   (total / completed / pending / total spent) instead of hardcoded numbers.
6. **Customer `RecentOrders`** — now shows the user's actual 3 most recent
   orders, linked to their detail pages.
7. **`ProfileCard`** — reads from `AuthContext` now instead of raw
   `localStorage`, so it stays in sync after a profile edit in Settings.
8. **Testimonials** — left as static marketing copy. There's no review/
   rating system in the data model, so making this "real" would mean
   building a whole new feature (reviews collection, submission form,
   moderation) rather than fixing a bug — flagging as a deliberate scope
   call, happy to build it if you want it as a new feature.
9. **`CategoryFilter`** — now derives its category list from the actual
   foods returned by the API instead of a hardcoded array, so it can't
   drift out of sync with the database.
10. **Checkout error handling** — the real backend error message (e.g.
    "insufficient stock") is now shown via toast instead of being
    silently discarded in favor of a generic message.
11. **Checkout empty-cart check** — switched from `alert()` to `toast`,
    consistent with the rest of the app.
12. **Payment gateway** — **not implemented.** A real Razorpay/Stripe
    integration needs a merchant account and live API keys that only you
    can provision — I can't create those. The `paymentMethod` field
    (Cash/UPI/Card) is preserved as a label on the order; wiring an actual
    payment provider is a good next step once you have API keys, and I'm
    glad to build that integration when you do.
13. **Image upload** — added a real upload pipeline: `multer` on the
    backend (`POST /api/upload`, admin-only, 5MB limit, image types only),
    serving files statically from `/uploads`, and a file-picker with live
    preview in the new "Add Food Item" form. Food images are stored as
    relative URLs; the client resolves them against the server origin via
    a small `resolveImageUrl` helper.
14. **Standalone "Manage Menu" admin page** — new `/admin/menu` route
    with an "Add Food Item" form (name, description, category, price,
    stock, image) plus the existing inventory table for editing stock and
    deleting items. The sidebar's "Inventory" link now points here instead
    of a dead anchor.
15. **Menu search/pagination** — added client-side pagination (9 items/
    page) to `/menu`, with page reset whenever search/category/sort
    changes. Search itself already existed and was working.

Verified: `npm run build` passes (2281 modules) and the server boots
cleanly with all new routes (upload, revenue-chart) reachable and
correctly protected behind admin auth.

## Update 4 — root cause of "no login indicator" + "redirect doesn't work"

Found the actual bug behind both symptoms: **`Navbar` and `Footer` were
only ever rendered inside `Home.jsx`**, not in any shared layout. Every
other page in the app — Dashboard, Menu, Cart, Checkout, My Orders,
Settings, Favorites, even the Login/Register pages themselves — rendered
with no navbar at all. So after logging in, `navigate("/dashboard")` was
actually firing correctly, but the destination page had no navbar to show
a logged-in state, which is why it looked like nothing happened and the
only way to "get somewhere" felt like typing a URL manually.

Fix: moved `Navbar` and `Footer` up into `App.jsx` so they render once,
globally, around every route. Removed the now-duplicate local render from
`Home.jsx`. The Navbar's logged-in avatar/dropdown (with Dashboard, My
Orders, Settings, Logout) is now visible on every single page immediately
after login.

Verified: `npm run build` passes (2281 modules, no errors).

## Update 5 — cart wasn't cleared on logout

`CartContext` persists cart contents to `localStorage` independently of
`AuthContext` — so the cart had no idea a logout had happened. `logout()`
only cleared the auth token/user, meaning the previous user's cart items
stayed visible (and would even leak into whatever account logs in next on
the same browser).

Fix: every logout path (`Navbar`, `AccountSettings`, `AdminSidebar`) now
calls `clearCart()` alongside `logout()`, so the cart is emptied the
moment you log out.

Verified: `npm run build` passes (2281 modules, no errors).

## Update 6 — Manage Users system + revenue graph fix

### Revenue graph — actual root cause found
All five admin dashboard widgets (`RevenueChart`, `DashboardStats`,
`RecentOrders`, `PopularFoods`, `UserTable`) had `try { ... } finally { ... }`
blocks with **no `catch`**. Any fetch failure (expired token, network
hiccup, server error) silently swallowed the error — `data` stayed at its
initial empty value and `loading` still flipped to false, so the widget
just rendered blank with zero feedback about what went wrong. This is
almost certainly what made the revenue graph look "broken": with no error
shown, an empty chart and a failed fetch look identical.

Also fixed a real empty-*data* case that looks like a bug even when
nothing's wrong: a fresh install with no orders in the last 7 days would
render 7 flat, ₹0 bars — technically "working" but visually indistinguishable
from broken. Added a proper empty state ("No orders placed in the last 7
days yet...") instead.

Fixed:
- Added a real `catch` block + toast error to all 5 widgets, so failures
  are now visible and debuggable instead of silent.
- `RevenueChart` now shows a clear empty state when there's genuinely no
  data yet, instead of a flatlined chart.
- Fixed a date-parsing edge case where `new Date("YYYY-MM-DD")` (parsed as
  UTC) could shift the weekday label by a day depending on the browser's
  timezone — now parsed as local time for the label.

### New: Manage Users system
Previously `UserTable` only listed users read-only. Added real management:
- **Backend:** `PUT /api/admin/users/:id/role` (change a user's role
  between customer/staff/admin) and `DELETE /api/admin/users/:id` (remove
  a user), both admin-only. Both explicitly block an admin from changing
  their own role or deleting their own account (self-lockout protection).
- **Frontend:** `UserTable` now has an inline role dropdown per user and a
  "Remove" button with a confirmation prompt. The current admin's own row
  is clearly marked "(you)" and its controls are disabled.

Verified: `npm run build` passes (2281 modules, no errors) and the server
boots cleanly with all new routes reachable and correctly requiring admin
auth (401 without a token).
