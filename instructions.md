# FOODX — Master Instructions

> **This is the first file any AI IDE, developer, or contributor must read before touching any part of this codebase. Everything in this project flows from this document.**

---

## What Is FOODX?

FOODX is a social-first food delivery platform built for Gen Z users in Ibadan, Nigeria. It is not a clone of Bolt Food or Chowdeck. It is a new category: a food app that also functions as a social network, where ordering food is a shared moment, not a private transaction.

FOODX has two inseparable product layers:

- **Layer 1 — Delivery:** Browse restaurants, place orders, pay with Paystack, track your rider in real time.
- **Layer 2 — Social:** Post food photos, see what friends are eating, send food as a gift, request friends to buy you food, rack up streaks, and DM within the app.

The two layers are not features bolted on top of each other. They are the product. Every screen must serve both the delivery utility and the social connection.

**Stage:** Pre-development  
**Phase 1 Location:** Ibadan, Nigeria  
**Target User:** Gen Z students and young professionals, 18–30  
**Brand Colors (Dark Mode):** Primary Green `#1A7A3C`, Background Black `#1A1A1A`  
**Brand Colors (Light Mode):** Primary White `#FFFFFF`, Accent Green `#1A7A3C`

---

## Document Stack — What Each File Controls

| File | Name | Controls |
|------|------|----------|
| `instructions.md` | **This file** | Master orientation, rules, and build philosophy |
| `01-product-brief.md` | Product Brief | Vision, mission, audience, tone, success metrics |
| `02-app-structure.md` | App Structure | Every screen, every role, navigation architecture, build order |
| `03-wireframe-flows.md` | Wireframe Flows | Screen-by-screen layout descriptions for AI IDE implementation |
| `04-design-system.md` | Design System | Colors, typography, spacing, components, motion, do/don't |
| `05-feature-specs.md` | Feature Specs | User stories, acceptance criteria, edge cases for every feature |
| `06-technical-architecture.md` | Technical Architecture | System design, API routes, DB schema, real-time events, auth/payment flows |
| `07-content-doc.md` | Content Doc | Every word in the UI — copy, errors, notifications, marketing site |
| `08-go-to-market.md` | Go-To-Market | Launch strategy, channels, restaurant playbook, rider recruitment, KPIs |
| `09-prompt-pack.md` | Prompt Pack | Ready-to-use AI IDE prompts for every screen and feature |
| `10-open-questions-tracker.md` | Open Questions | Decisions needed, blockers, and decisions log |

---

## Non-Negotiable Rules for AI Builders

These rules apply to every line of code written for FOODX. There are no exceptions.

### Stack Rules
1. **Mobile is Flutter only.** No React Native. No Expo. Flutter for iOS and Android.
2. **Web (restaurant dashboard + admin panel) is React + Vite + TypeScript only.** No Next.js unless explicitly approved.
3. **Backend is Node.js with NestJS.** No Express unless inside NestJS modules. No other runtimes.
4. **Database is PostgreSQL with Prisma ORM.** No raw SQL queries in application code. No other ORMs.
5. **Auth is Firebase Phone Auth (OTP only).** No email/password auth. No social login. Phone number is the identity.
6. **Payments are Paystack only.** No Flutterwave. No Stripe. Paystack is Naira-native and the only option.
7. **Real-time is Socket.IO.** No Firebase Realtime DB for real-time. No polling. Socket.IO on the NestJS backend.
8. **Image storage is Cloudinary.** No S3. No local storage. No Firebase Storage.
9. **Push notifications are Firebase Cloud Messaging (FCM).** No OneSignal. No direct APNs/FCM calls from frontend.
10. **Hosting: Backend on Railway or Render. Web frontend on Vercel.**

### Code Rules
11. All API responses follow the shape: `{ success: boolean, data: any, message: string }`.
12. All errors are caught and return HTTP status codes + the standard response shape. No unhandled promise rejections.
13. All database writes are wrapped in Prisma transactions where more than one table is affected.
14. Socket.IO events are namespaced. Order events in `/orders`, chat in `/chat`, notifications in `/notifications`.
15. Every Paystack webhook must verify the `x-paystack-signature` header before processing.
16. No hardcoded strings in Flutter UI. All user-facing copy comes from `07-content-doc.md` and is stored in a constants file.
17. All images uploaded by users go through Cloudinary. Never store raw base64 in the database.
18. FCM tokens are stored per-user per-device. One user can have multiple devices.
19. All timestamps are stored as UTC in the database. Displayed in West Africa Time (WAT, UTC+1) in the UI.
20. Phone numbers are stored in E.164 format (`+2348012345678`).

### Design Rules
21. All UI follows `04-design-system.md`. No off-system colors, fonts, or spacing.
22. Dark mode is the primary design target. Light mode is supported but dark mode is the FOODX default.
23. Every screen must handle three states: loading, empty, and error. See `07-content-doc.md` for copy.
24. Bottom navigation has 4 tabs for the customer app: Home, Explore, Social, Profile.
25. The green `#1A7A3C` is reserved for primary actions and brand moments only. Not decorative use.

### Feature Rules
26. Social features (feed, gifting, streaks) are opt-in for display but always active for data collection.
27. Order alerts to friends require explicit opt-in from the user. Default is off.
28. Streaks are calculated server-side, never client-side.
29. Food gifting requires the recipient to have a saved delivery address, or prompts them to add one.
30. Food requests can be declined without explanation. No forced reason.

---

## What "Done" Looks Like

### Phase 1 Done (Ibadan Launch — Month 1–2)
- [ ] At least 5 restaurants live with full menus
- [ ] Customer can sign up via OTP, browse restaurants, order, pay via Paystack, track delivery
- [ ] Rider app functional: accept/reject, navigate, confirm delivery
- [ ] Restaurant dashboard functional: receive orders, manage queue, update menu
- [ ] Admin panel: view all orders, users, restaurants, riders
- [ ] Push notifications working for order status updates
- [ ] 200 successful deliveries completed

### Phase 2 Done (Growth — Month 3–6)
- [ ] Social feed live: users can post food photos, friends can react
- [ ] Order alerts working: friends notified when you order
- [ ] Streaks live and visible on profiles
- [ ] Food gifting fully functional end-to-end
- [ ] Food requests fully functional
- [ ] In-app DMs working
- [ ] 1,000+ monthly active users
- [ ] Ad rewards prototype shipped

### Phase 3 Done (Scale — Month 6–12)
- [ ] Lagos expansion ready (new restaurant onboarding, new rider recruitment)
- [ ] YC application metrics hit (see `08-go-to-market.md`)
- [ ] Analytics dashboard giving reliable data for investor conversations
- [ ] Premium features spec complete

---

## How to Use These Documents Together

When building any screen or feature:

1. **Start here** (`instructions.md`) — understand the rules and context
2. **Check the structure** (`02-app-structure.md`) — find the screen in the build order
3. **Read the wireframe** (`03-wireframe-flows.md`) — understand the layout and flow
4. **Apply the design system** (`04-design-system.md`) — colors, fonts, components
5. **Read the feature spec** (`05-feature-specs.md`) — acceptance criteria and edge cases
6. **Get the copy** (`07-content-doc.md`) — exact strings for every UI element
7. **Check the architecture** (`06-technical-architecture.md`) — API endpoints and data shapes
8. **Use the prompt** (`09-prompt-pack.md`) — paste the relevant prompt into your AI IDE

When making product decisions, check `10-open-questions-tracker.md` first. If the decision is already logged, follow it. If it's new, add it.

---

## Project Philosophy

FOODX is being built for a specific person: a 21-year-old student at the University of Ibadan who orders suya with friends on Friday night, documents it on Instagram, and would absolutely use an app that makes food feel like a social experience instead of a chore.

Every feature, every line of copy, every design decision should pass this test: **Would that person find this delightful?** If yes, ship it. If it feels corporate, generic, or like it could belong on any delivery app in any country, rethink it.

This is a Nigerian product, for Nigerian users, built with Nigerian culture at its core. That is not a constraint. It is the entire point.