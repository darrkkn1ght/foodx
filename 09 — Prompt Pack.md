# 09 — Prompt Pack

> Ready-to-use AI IDE prompts for building FOODX in Cursor, Bolt, or Windsurf. Each prompt references the relevant docs. Copy and paste directly — no editing needed before use.

---

## HOW TO USE THIS FILE

1. Start with the **Project Scaffold** prompt — this sets up the entire project structure.
2. Move through prompts in order — they build on each other.
3. Every prompt references the design system (`04-design-system.md`) and content doc (`07-content-doc.md`). Make sure those files are in your project context window before running prompts.
4. For Flutter screens, each prompt produces a complete Dart widget file.
5. For backend, each prompt produces a NestJS module or Express router.

---

## P01 — PROJECT SCAFFOLD (Flutter Mobile App)

```
Create a new Flutter project called "foodx" with the following structure:

lib/
  main.dart
  app.dart                    # MaterialApp root, theme config, routing
  core/
    theme/
      app_theme.dart          # Dark + light theme using design tokens
      app_colors.dart         # All color constants from design system
      app_typography.dart     # Space Grotesk + DM Sans text styles
      app_spacing.dart        # 8pt grid spacing constants
    constants/
      app_constants.dart      # API base URL, timeouts, limits
    network/
      api_client.dart         # Dio HTTP client with auth interceptor
      socket_client.dart      # Socket.IO client setup
    storage/
      secure_storage.dart     # flutter_secure_storage wrapper
    utils/
      validators.dart         # Phone number, form validators
      formatters.dart         # Currency (₦), date, time formatters
  features/
    auth/
    home/
    restaurants/
    cart/
    orders/
    social/
    gifting/
    chat/
    profile/
    rider/                    # Rider-specific screens
    restaurant_partner/       # Restaurant partner screens

Design system tokens (from 04-design-system.md):
- Primary font: Space Grotesk (headings), DM Sans (body)
- Dark mode background: #1A1A1A
- Card background: #242424
- Primary accent: #1A7A3C
- Text primary: #FFFFFF
- Text secondary: #888888
- Border color: #333333
- Error: #E53E3E
- 8pt spacing grid

Add these dependencies to pubspec.yaml:
- google_fonts: ^6.1.0
- dio: ^5.4.0
- socket_io_client: ^2.0.3+1
- flutter_secure_storage: ^9.0.0
- go_router: ^13.0.0
- riverpod/flutter_riverpod: ^2.5.0
- cached_network_image: ^3.3.1
- google_maps_flutter: ^2.5.3
- image_picker: ^1.0.7
- firebase_core + firebase_auth + firebase_messaging
- paystack_flutter or url_launcher for Paystack inline

App entry point: Dark mode as default theme. ThemeMode selectable from settings (stored in secure storage). All fonts loaded from Google Fonts package.
```

---

## P02 — BACKEND SCAFFOLD (NestJS)

```
Scaffold a NestJS backend project for FOODX with the following structure:

src/
  main.ts                     # App bootstrap, CORS, validation pipe
  app.module.ts               # Root module
  config/
    database.config.ts        # PostgreSQL + Prisma config
    jwt.config.ts             # JWT secret + expiry (30d)
    firebase.config.ts        # Firebase Admin SDK init
    paystack.config.ts        # Paystack secret key
    cloudinary.config.ts      # Cloudinary SDK init
    redis.config.ts           # Redis client (ioredis)
  prisma/
    prisma.module.ts
    prisma.service.ts
    schema.prisma             # Full schema from 06-technical-architecture.md
  common/
    decorators/
      roles.decorator.ts      # @Roles('admin', 'customer', etc.)
      current-user.decorator.ts
    guards/
      jwt-auth.guard.ts
      roles.guard.ts
    interceptors/
      transform.interceptor.ts
    filters/
      http-exception.filter.ts
  modules/
    auth/                     # Phone OTP auth, JWT issue
    users/
    restaurants/
    menu/
    orders/
    payments/                 # Paystack webhook handler
    riders/
    social/                   # Posts, likes, comments, feed
    chat/                     # Socket.IO gateway + message persistence
    notifications/            # FCM push
    gifting/
    admin/

Environment variables (from 06-technical-architecture.md):
DATABASE_URL, JWT_SECRET, FIREBASE_*, PAYSTACK_SECRET_KEY, CLOUDINARY_*, FCM_SERVER_KEY, REDIS_URL

Global validation pipe with whitelist: true, transform: true.
All monetary values stored in kobo (Integer). All responses wrapped in { success: true, data: {} } envelope.
CORS configured for Flutter app origin and admin web origin.
```

---

## P03 — PRISMA SCHEMA

```
Create the full Prisma schema for FOODX based on the database schema in 06-technical-architecture.md.

Include all tables:
- users (id, phone, name, avatar_url, role enum, is_active, timestamps)
- user_profiles (streak data, fcm_token, privacy flags)
- addresses (user delivery addresses, lat/lng, is_default)
- restaurants (id, owner_id, name, photo_url, lat/lng, rating, commission_pct, is_active)
- restaurant_hours (day_of_week, open_time, close_time, is_closed)
- menu_categories (restaurant_id, name, sort_order)
- menu_items (category_id, restaurant_id, name, description, price in kobo, photo_url, is_available)
- orders (full schema with status enum, gift fields, paystack_ref)
- order_items (snapshot of name + price at time of order)
- riders (user_id, is_online, current_lat/lng, rating)
- social_posts (photo_url, caption, visibility enum, likes_count, comments_count)
- post_likes (user_id + post_id composite PK)
- post_comments
- friendships (requester_id, addressee_id, status enum)
- messages (sender, recipient, content, type enum, is_read)
- food_requests (requester, recipient, items_json, status enum, expires_at)
- promo_codes (code, discount_type enum, discount_value, min_order, max_uses)
- admin_actions (audit log)

Use UUID for all primary keys. Use @updatedAt on all updated_at fields. Add appropriate indexes on: foreign keys, phone (unique), order_number (unique), promo code (unique), status fields queried frequently.

After writing the schema, generate the migration: npx prisma migrate dev --name init
```

---

## P04 — AUTH SCREENS (Flutter)

```
Build the authentication flow for FOODX as a Flutter feature module at lib/features/auth/.

Screens to build (see 03-wireframe-flows.md for exact layouts):
1. SplashScreen — FOODX logo centred on #1A1A1A background, auto-navigate after 2s
2. PhoneEntryScreen — "+234" prefix, phone number input, "Continue" CTA
3. OtpVerificationScreen — 6-box OTP input, 60s resend timer, "Verify" CTA
4. ProfileSetupScreen — avatar upload (camera/gallery), name field, "Let's go 🔥" CTA
5. LocationPermissionScreen — "Allow location" CTA, manual entry fallback

Design tokens (from 04-design-system.md):
- Background: #1A1A1A
- Card/input bg: #242424
- Primary CTA: #1A7A3C, 56px height, 16px border radius
- Heading font: Space Grotesk 28px bold, white
- Body font: DM Sans 14px, #888888
- Input border: #333333, focus: #1A7A3C, error: #E53E3E
- OTP box: 48×56px, 12px border radius

All copy from 07-content-doc.md (Onboarding section).

Auth logic:
- Use Firebase Phone Auth (firebase_auth package)
- On OTP verify success: call POST /api/v1/auth/verify-otp, store JWT in flutter_secure_storage
- Navigation: go_router — splash → phone → otp → profile_setup → location → home
- If session exists on splash: skip to home
- Profile photo: image_picker → compress to <1MB → upload to Cloudinary via signed URL from backend

State management: Riverpod (AuthNotifier provider).

Handle all edge cases from 05-feature-specs.md F01 (wrong OTP, lockout, resend, photo skip).
```

---

## P05 — HOME FEED SCREEN (Flutter)

```
Build the Home Feed screen for FOODX at lib/features/home/presentation/home_screen.dart.

Layout (from 03-wireframe-flows.md — Home Feed section):
- Top bar: FOODX wordmark (green #1A7A3C) left, notification bell right
- Scroll content:
  1. Greeting section: time-based greeting (Good morning/afternoon/evening/night) + name
  2. Friend Activity Strip: horizontal scroll of friend avatar cards showing what they ordered + "Order same" CTA per card
  3. Promo Banner: swipeable PageView cards (140px height), dot indicators
  4. Featured Restaurants: section label "Order from these 🔥" + vertical list of RestaurantCards
  5. Recent Order Shortcut: "Reorder from [Restaurant]?" card (show only if previous orders exist)
- Bottom: persistent BottomNavigationBar (Home, Explore, Orders, Social, Profile)

Components to create:
- FriendActivityStrip widget (horizontal ListView.builder)
- FriendActivityCard widget (avatar + name + restaurant, 80px wide)
- PromoBanner widget (PageView with AnimatedSmoothIndicator)
- RestaurantCard widget (photo left, info right, 80px height, #242424 bg, 16px border radius)
- GreetingHeader widget

All copy from 07-content-doc.md (Home Feed section — greetings, section labels, empty states).

Data fetching:
- GET /api/v1/restaurants → populate featured restaurants
- GET /api/v1/feed/friend-activity → populate friend strip
- GET /api/v1/orders/my?limit=1 → check for recent order
- Use Riverpod FutureProvider for each data source
- Show shimmer skeleton (shimmer package) while loading — never blank screen

Skeleton layout: shimmer cards matching the exact height of each section.
```

---

## P06 — RESTAURANT BROWSING + DETAIL (Flutter)

```
Build the Explore (restaurant browsing) and Restaurant Detail screens for FOODX.

Files:
- lib/features/restaurants/presentation/explore_screen.dart
- lib/features/restaurants/presentation/restaurant_detail_screen.dart
- lib/features/restaurants/presentation/food_item_detail_screen.dart

Explore Screen layout (from 03-wireframe-flows.md):
- SearchBar (full width, #242424 bg, placeholder "Search restaurants or dishes")
- Category filter chips: horizontal scroll (All, Burgers, Rice, Chicken, Pizza, Drinks, Sides, Snacks)
  - Active chip: #1A7A3C background, white text
  - Inactive chip: #2E2E2E background, #888888 text
- Restaurant list: ListView of RestaurantCards
- Closed restaurants shown last with "Closed" badge overlay

Restaurant Detail Screen layout (from 03-wireframe-flows.md):
- Hero image 200px, back arrow, favourite icon
- Info card overlapping image: name, rating, status, delivery fee + min order
- Sticky category tab row (TabBar)
- Menu items list per category (dish name, description, price, photo, [+] button)
- Sticky bottom cart bar when items in cart: "X items — View cart ₦[total]"

Food Item Detail (bottom sheet):
- Large photo, name, price, description, customisation text field, quantity stepper, "Add to cart" CTA

State:
- Cart state via Riverpod CartNotifier (persists via shared_preferences)
- Cart is restaurant-scoped — cross-restaurant conflict dialog from 05-feature-specs.md F03

API calls:
- GET /api/v1/restaurants?lat=&lng= (explore)
- GET /api/v1/restaurants/:id (detail + menu)

All copy from 07-content-doc.md (Restaurant Browsing section).
All styles from 04-design-system.md.
```

---

## P07 — CART + CHECKOUT + PAYMENT (Flutter)

```
Build the Cart, Checkout, and Payment flow for FOODX.

Files:
- lib/features/cart/presentation/cart_screen.dart
- lib/features/cart/presentation/checkout_screen.dart
- lib/features/cart/presentation/order_confirmation_screen.dart

Cart Screen (from 03-wireframe-flows.md):
- Restaurant name header
- Item list: name, customisation note, quantity stepper (−/+), price, trash icon
- Order note text field (100 char limit)
- Price breakdown: Subtotal, Delivery fee, Discount, Total (bold)
- CTA: "Proceed to checkout → ₦[total]" (green, full width, 56px)

Checkout Screen:
- Delivery address section (tap to change → address picker bottom sheet)
- Compact order summary
- Payment method: Paystack (non-changeable in MVP)
- Promo code field with "Apply" button
- Price breakdown
- CTA: "Pay ₦[total]"
- Footer: "Powered by Paystack" (10px, grey)

Payment:
1. Tap "Pay" → POST /api/v1/payments/initiate { orderId, amount }
2. Backend returns Paystack { reference, authorization_url }
3. Open Paystack authorization_url via url_launcher (InAppWebView or external browser)
4. On payment success: Paystack redirects to callback URL → app catches deep link
5. App polls GET /api/v1/orders/:id until status = "placed" (max 10s, 2s intervals)
6. On confirmed: navigate to OrderConfirmationScreen

Order Confirmation Screen:
- "Order placed! 🎉" heading
- Order ID, estimated time
- "Track your order" green CTA
- "Share to feed" secondary CTA

All edge cases from 05-feature-specs.md F03 (payment failure, min order, outside area).
All copy from 07-content-doc.md (Cart & Checkout section).
All styles from 04-design-system.md.
```

---

## P08 — ORDER TRACKING (Flutter + Socket.IO)

```
Build the real-time Order Tracking screen for FOODX.

File: lib/features/orders/presentation/order_tracking_screen.dart

Layout (from 03-wireframe-flows.md — Order Tracking):
- Top bar: back arrow, "Order #[ID]", share icon
- Map section (240px): Google Maps with restaurant pin, rider pin (animated), customer pin, ETA chip overlay
- Status strip: 4-step horizontal tracker (Placed → Confirmed → On the way → Delivered)
  - Completed steps: filled green circle
  - Active step: pulsing green circle
  - Future steps: empty grey circle
- In-progress message (e.g. "Akin is heading to you")
- Rider card: avatar, name, rating, phone icon button, chat icon button
- Order items summary (collapsed, expandable)

Real-time (Socket.IO):
- On screen mount: connect socket, join room "order:{orderId}"
- Listen: order:status_change → update status strip + message
- Listen: rider:location → update rider map pin (animate smoothly using Tween)
- ETA: recalculate on each rider location update (straight-line distance for Phase 1)
- On status = "delivered": navigate to OrderCompleteScreen after 2s delay

OrderCompleteScreen:
- Celebration animation (Lottie package — confetti)
- "Your food is here! 🍔"
- "Rate your experience" CTA → opens RatingScreen
- "Share this meal" CTA → opens CreatePostScreen pre-filled

RatingScreen:
- Star rating for rider (1–5)
- Star rating for food (1–5)
- Optional comment field
- POST /api/v1/orders/:id/rating on submit

All copy from 07-content-doc.md (Order Tracking section).
All edge cases from 05-feature-specs.md F04 (rider offline, running late, restaurant rejects).
```

---

## P09 — RIDER APP (Flutter)

```
Build the Rider app screens for FOODX. These are separate screens under lib/features/rider/.

Screens:
1. RiderHomeScreen — online/offline toggle, current earnings, incoming order listener
2. OrderRequestScreen — incoming order card with 30s countdown timer, Accept/Reject
3. ActiveDeliveryScreen — step tracker, map navigation, pickup/delivery CTAs
4. RiderEarningsScreen — today's earnings, trip count

RiderHomeScreen:
- Large toggle: "Go Online" / "Go Offline" (green when online)
- Today's stats: trips completed, earnings
- Socket.IO listener: order:assigned → show OrderRequestScreen as modal

OrderRequestScreen (modal bottom sheet, 30s timer):
- Restaurant name + area
- Customer delivery area
- Estimated earnings: "₦[amount]"
- Countdown progress bar (30s)
- "Accept ✅" (green) and "Reject ✗" (outlined red) buttons
- On expire: auto-dismiss, backend reassigns

ActiveDeliveryScreen:
- Step tracker: "Go to [Restaurant]" → "Pick up order" → "Deliver to customer"
- Google Maps showing route to current step destination
- On step 1 complete: "I've picked up the order" CTA → POST /api/v1/riders/orders/:id/pickup
- On step 2 complete: "Order delivered" CTA → POST /api/v1/riders/orders/:id/deliver
- Customer contact: phone icon (tel: link)

State:
- Rider online status: PUT /api/v1/riders/me/status { isOnline: true/false }
- GPS emit every 10s when online + on active delivery: PUT /api/v1/riders/me/location

All styles from 04-design-system.md (dark mode).
All copy from 07-content-doc.md.
Edge cases from 05-feature-specs.md F05.
```

---

## P10 — RESTAURANT DASHBOARD (Flutter)

```
Build the Restaurant Partner app screens under lib/features/restaurant_partner/.

Screens:
1. RestaurantDashboardScreen — order stats, quick actions
2. OrderQueueScreen — real-time incoming orders (New / Preparing / Ready / Done tabs)
3. OrderDetailScreen — full order view, accept/reject controls, mark ready
4. MenuManagementScreen — list of menu items, toggle availability, add/edit/delete
5. MenuItemFormScreen — form to add or edit a menu item (name, price, description, photo, category)
6. RestaurantHoursScreen — day-by-day open/close time pickers

OrderQueueScreen (core feature):
- Socket.IO: join room "restaurant:{restaurantId}", listen for order:new
- On new order: play audio alert (audioplayers package) + vibration
- Show incoming order as top card with 2-minute accept/reject countdown
- Tabs: New (badge count) / Preparing / Ready / Completed

OrderDetailScreen:
- Item list with quantities
- Customer note
- "Accept order" (green) / "Reject" (red outlined) — shown for new orders
- "Mark as Ready for Pickup" — shown for accepted/preparing orders

MenuManagementScreen:
- List of menu items grouped by category
- Availability toggle per item (instant PUT /api/v1/menu/items/:id/toggle)
- Add new item FAB button

MenuItemFormScreen:
- Photo picker → Cloudinary upload (via signed URL from backend)
- Name, description, price (₦ prefixed), category dropdown, availability toggle
- POST or PUT /api/v1/restaurants/:id/menu/items

All styles from 04-design-system.md.
All copy from 07-content-doc.md.
Edge cases from 05-feature-specs.md F06.
```

---

## P11 — SOCIAL FEED (Flutter)

```
Build the Social Feed screens for FOODX under lib/features/social/.

Screens:
1. SocialFeedScreen — infinite scroll feed of food posts
2. CreatePostScreen — photo + caption + restaurant tag + visibility
3. PostDetailScreen — full post with comments

SocialFeedScreen layout (from 03-wireframe-flows.md):
- Top bar: FOODX wordmark, camera shortcut icon
- Create post prompt row at top (avatar + "What are you eating? 🍔" tappable)
- Infinite scroll of PostCards
- Each PostCard (#242424, 20px border radius, 8px margin):
  - Header: avatar (40px), name, time ago, restaurant tag (green)
  - Food photo (full card width, max 300px height, 12px radius)
  - Caption (body-md, white)
  - Action row: ❤️ likes count, 💬 comments count, ↗ share, "Order same" green pill
- Pull to refresh
- Pagination: 20 posts per page (GET /api/v1/feed?page=N)

CreatePostScreen:
- Full screen camera/gallery picker first (image_picker)
- After photo selected: caption field (280 char counter), restaurant tag search, visibility toggle
- POST /api/v1/posts { photoUrl, caption, restaurantId, visibility }
- Photo: compress → Cloudinary upload via signed URL before POST

PostDetailScreen:
- Full post (photo + caption + actions)
- Comments list below
- Comment input sticky at bottom
- POST /api/v1/posts/:id/comments

"Order same" button: navigate to RestaurantDetailScreen with restaurant ID from post.

All copy from 07-content-doc.md (Social Feed section).
All styles from 04-design-system.md.
Edge cases from 05-feature-specs.md F08.
```

---

## P12 — STREAKS SYSTEM (Backend + Flutter)

```
Build the Food Streaks feature for FOODX.

Backend (NestJS):
File: src/modules/streaks/streaks.service.ts

Logic:
- On order status → "delivered": call StreaksService.onOrderCompleted(userId, completedAt)
- Check user_profiles.last_order_date vs today's date (WAT = UTC+1)
- If last_order_date = yesterday: increment current_streak by 1
- If last_order_date = today: no change (already counted)
- If last_order_date < yesterday: reset current_streak to 1
- Update longest_streak if current_streak > longest_streak
- Update last_order_date to today
- On streak milestone (3, 7, 14, 30): send FCM push notification (from 07-content-doc.md)
- Daily cron job (WAT midnight): find users where last_order_date < yesterday AND current_streak > 0 → reset streak, send "streak ended" push

Streak milestone push messages from 07-content-doc.md (Streak section).

Flutter UI:
File: lib/features/profile/presentation/streak_view.dart

- Flame emoji (🔥) + current streak count (large, Space Grotesk, 48px)
- "X-day streak" label
- Calendar grid: last 30 days, each day coloured green (ordered) or grey (missed)
- Longest streak display
- Milestone banner if on milestone day

Profile screen streak badge:
- "🔥 [X]" shown in stats row on profile
- Tapping navigates to StreakView screen

All copy from 07-content-doc.md (Streak section).
```

---

## P13 — GIFTING + FOOD REQUESTS (Flutter)

```
Build the Food Gifting and Food Request features for FOODX.

Files:
- lib/features/gifting/presentation/gift_food_screen.dart
- lib/features/gifting/presentation/gift_received_screen.dart
- lib/features/gifting/presentation/food_request_screen.dart
- lib/features/gifting/presentation/request_received_screen.dart

GiftFoodScreen flow:
1. Friend selector (search friends list from GET /api/v1/users/friends)
2. Navigate to RestaurantDetailScreen in "gift mode" (flag passed via router)
3. Cart built normally, but checkout shows recipient's address + message field
4. POST /api/v1/orders/gift { recipientId, cartItems, addressId, message }
5. Confirmation: "Gift sent! 🎁 [Name] is about to be very happy."

GiftReceivedScreen:
- Triggered by push notification (gift:received) or from notification list
- Lottie animation: gift box opening
- "[Name] sent you food! 🎁" heading
- Gift message shown (styled as speech bubble)
- Order details
- CTA: "See what's coming" → navigates to OrderTrackingScreen

FoodRequestScreen:
- Friend selector
- Optional: restaurant name or dish free-text input
- Message field
- POST /api/v1/food-requests
- Confirmation: "Request sent 🙏"

RequestReceivedScreen:
- "[Name] is asking for food" heading
- Their message
- "Accept and order for them ❤️" → CartScreen pre-filled if items specified
- "Decline" → POST /api/v1/food-requests/:id/decline

All copy from 07-content-doc.md (Gifting and Food Request sections).
All edge cases from 05-feature-specs.md F11 and F12.
All styles from 04-design-system.md.
```

---

## P14 — IN-APP CHAT (Flutter + Socket.IO)

```
Build the in-app direct messaging feature for FOODX.

Files:
- lib/features/chat/presentation/chat_list_screen.dart
- lib/features/chat/presentation/chat_thread_screen.dart

ChatListScreen:
- List of DM threads (GET /api/v1/chat/threads)
- Each row: friend avatar (with online green dot), friend name, last message preview, timestamp, unread badge
- Empty state: "No conversations yet. Say hello to a friend."
- Tap row → ChatThreadScreen

ChatThreadScreen:
- App bar: friend avatar + name + online status dot
- Message list (ListView.builder, reversed — newest at bottom)
- Message bubbles:
  - Sent: right-aligned, #1A7A3C background, white text
  - Received: left-aligned, #2E2E2E background, white text
  - Timestamp: 10px grey, below bubble
  - Failed: red ! icon, tap to retry
- "Send food 🍔" icon in app bar → navigates to GiftFoodScreen pre-filled with this friend
- Photo picker icon in input bar
- Text input + send button

Socket.IO:
- On screen mount: join room "user:{currentUserId}", listen for chat:message_received
- On new message received: append to list, scroll to bottom
- Emit chat:send_message on send tap → also POST /api/v1/chat/send as backup
- Emit chat:typing on input change (debounced 500ms)
- Show "[Name] is typing..." on receiving chat:typing event

Pagination: Load 30 messages on open, scroll-to-top loads previous 30.

All copy from 07-content-doc.md (Chat section).
All edge cases from 05-feature-specs.md F13.
```

---

## P15 — ADMIN PANEL (React + Vite + TypeScript)

```
Build the FOODX Admin Panel as a React + Vite + TypeScript web app.

Project setup:
- Vite + React + TypeScript
- TanStack Query (React Query) for data fetching
- React Router v6 for navigation
- Tailwind CSS for styling (dark theme matching design system)
- Recharts for analytics charts
- Axios for API calls with auth interceptor

Pages:
1. /login — email + password login (admin only)
2. /dashboard — stats cards + charts
3. /users — paginated table, search, suspend/ban actions
4. /restaurants — list, approve/reject, view details
5. /riders — list, approve/suspend, trip history
6. /orders — filterable table, status override, manual intervention
7. /promotions — promo code CRUD
8. /reports — charts: orders over time, user growth, top restaurants

Dashboard page components:
- StatsCard: total users, orders today, GMV today, active riders (4-card grid)
- OrdersChart: line chart (last 30 days) using Recharts
- TopRestaurants: ranked list with order counts

Color tokens (dark theme, matching 04-design-system.md):
- bg: #1A1A1A, card: #242424, border: #333333
- accent: #1A7A3C, text: #FFFFFF, secondary text: #888888

Auth:
- POST /api/v1/admin/auth/login → JWT stored in localStorage
- All requests: Authorization: Bearer {token}
- Redirect to /login on 401

Tables:
- Use TanStack Table for all data tables
- Pagination: 20 rows per page, server-side
- All action buttons (Suspend, Approve) show confirmation dialog before API call

All admin API routes from 06-technical-architecture.md (Admin Routes section).
```

---

## P16 — BACKEND AUTH MODULE (NestJS)

```
Build the Auth module for the FOODX NestJS backend.

File structure:
src/modules/auth/
  auth.module.ts
  auth.controller.ts
  auth.service.ts
  auth.guard.ts
  dto/
    send-otp.dto.ts     # { phone: string } — validate E.164 format
    verify-otp.dto.ts   # { phone: string, code: string }

Routes (POST /api/v1/auth):
- POST /send-otp: validate phone, call Firebase Auth createPhoneVerification, return { success: true }
- POST /verify-otp: verify code with Firebase, lookup or create user in PostgreSQL, return JWT
- POST /refresh: validate refresh token, issue new JWT
- POST /logout: invalidate token (add to Redis blocklist)

Firebase integration:
- Use firebase-admin SDK
- verifyIdToken() to validate Firebase ID tokens on verify-otp
- User record created in DB on first login with role: 'customer' by default

JWT:
- Signed with JWT_SECRET from env
- Payload: { sub: userId, phone, role }
- Expiry: 30 days
- All protected routes use JwtAuthGuard + extract user from token via @CurrentUser() decorator

Rate limiting:
- /send-otp: max 3 requests per phone per 10 minutes (Redis-based, ioredis)
- /verify-otp: max 3 attempts per phone per 15 minutes, then lockout

All error responses follow { success: false, message: string, code: string } format.
Error codes: OTP_INVALID, OTP_EXPIRED, PHONE_LOCKED, USER_SUSPENDED.
```

---

## P17 — PAYSTACK PAYMENT MODULE (NestJS)

```
Build the Payments module for FOODX handling Paystack integration.

File: src/modules/payments/

Routes:
- POST /api/v1/payments/initiate — authenticated, initiates payment
- POST /api/v1/payments/webhook — public, Paystack webhook receiver

PaymentsService.initiate(userId, orderId):
1. Fetch order from DB, verify it belongs to this user, status = 'pending_payment'
2. Generate Paystack transaction via Paystack API:
   POST https://api.paystack.co/transaction/initialize
   { email: "{phone}@foodx.app", amount: order.total (in kobo), reference: uuid() }
3. Store reference in orders.paystack_ref
4. Return { reference, authorization_url } to client

PaymentsService.handleWebhook(payload, paystackSignature):
1. Verify signature: HMAC SHA512 of raw body using PAYSTACK_SECRET_KEY
2. If signature invalid: return 401
3. If event = "charge.success":
   a. Find order by paystack_ref
   b. Update order: status = 'placed', paid_at = now()
   c. Emit Socket.IO event to restaurant room: order:new { order }
   d. Send FCM push to customer: "Order placed! 🎉"
   e. Create activity log entry
4. If event = "charge.failed": update order status = 'payment_failed', notify customer
5. Always return HTTP 200 to Paystack (even on error — re-process is Paystack's job)

Important:
- Webhook endpoint must be raw body (not JSON parsed) for signature verification
- Use @RawBody() or NestJS raw body middleware
- Webhook URL registered in Paystack dashboard settings

Error handling:
- Order not found: log + return 200 (idempotent)
- Duplicate webhook: check if order already paid, skip if so
```

---

## P18 — SOCKET.IO GATEWAY (NestJS)

```
Build the real-time Socket.IO gateway for FOODX.

File: src/modules/chat/chat.gateway.ts (also handles order + rider events)

Setup:
- @WebSocketGateway({ cors: { origin: '*' }, namespace: '/' })
- JWT auth middleware on connection: validate token from handshake.auth.token
- On connect: join user to personal room "user:{userId}"

Event handlers (from 06-technical-architecture.md — Real-Time Event Map):

Server-side listeners (Client → Server):
- rider:location_update → validate rider role, update riders table lat/lng, broadcast to order room
- chat:send_message → save to messages table, emit chat:message_received to recipient room
- chat:typing → forward to recipient room as chat:typing

Server-side emitters (triggered by services):
- OrdersService calls: this.gateway.emitToRoom("order:{orderId}", "order:status_change", data)
- OrdersService calls: this.gateway.emitToRoom("restaurant:{restaurantId}", "order:new", order)
- OrdersService calls: this.gateway.emitToRoom("rider:{riderId}", "order:assigned", order)
- SocialService calls: emit friend:order_placed to all friend rooms on order creation

Room management:
- Customers join "order:{orderId}" when opening tracking screen (via client event order:join)
- Restaurants always in "restaurant:{restaurantId}" (join on connect based on role)
- Riders always in "rider:{riderId}" (join on connect based on role)

Export GatewayService with emitToRoom(room, event, data) method for use in other modules.
```

---

## References

- Wireframe layouts → `03-wireframe-flows.md`
- Design tokens → `04-design-system.md`
- Feature logic + acceptance criteria → `05-feature-specs.md`
- API routes + DB schema → `06-technical-architecture.md`
- All copy → `07-content-doc.md`