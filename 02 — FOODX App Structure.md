# 02 — FOODX App Structure

> Every screen, every role, every flow. This is the structural blueprint. See `03-wireframe-flows.md` for layout detail and `04-design-system.md` for visual treatment.

---

## User Roles

| Role | Platform | Access |
|------|----------|--------|
| Customer | Flutter mobile app | Ordering, social, tracking |
| Restaurant Partner | React web dashboard | Menu, orders, analytics |
| Rider | Flutter mobile app | Order fulfillment, earnings |
| Admin | React web panel | Full platform oversight |

---

## Customer App (Flutter — iOS + Android)

### Navigation Architecture
Bottom tab bar with 4 tabs:
- **Tab 1: Home** — personalized feed blending restaurant discovery + friend activity
- **Tab 2: Explore** — full restaurant browse, search, filters
- **Tab 3: Social** — social food feed, posts, friend activity
- **Tab 4: Profile** — personal profile, streaks, order history, settings

Modal overlays: Cart (floating button + full sheet), Order Tracking (full screen modal), Chat (push navigation), Gifting/Request flows (multi-step modal sheet)

---

### Screen List — Customer App

#### Auth & Onboarding

**1. Splash Screen**
- Purpose: Brand moment on app launch; checks auth state
- Key elements: FOODX logo centered on black background, green animated pulse
- Navigation: Auto-routes to Onboarding (new user) or Home (returning user)

**2. Onboarding Screen 1 — Welcome**
- Purpose: Introduce FOODX value proposition
- Key elements: Illustration of food + social moment, headline, subtext, "Get Started" CTA, "I already have an account" link
- Navigation: → Onboarding Screen 2

**3. Onboarding Screen 2 — Social Layer**
- Purpose: Introduce the social differentiator
- Key elements: Friend activity illustration, headline about seeing what friends eat, subtext, "Next" CTA, skip option
- Navigation: → Onboarding Screen 3

**4. Onboarding Screen 3 — Gifting**
- Purpose: Introduce food gifting as a hook feature
- Key elements: Gift/surprise illustration, headline, subtext, "Let's Go" CTA
- Navigation: → Phone Login

**5. Phone Number Entry**
- Purpose: Collect phone number for OTP auth
- Key elements: Nigeria flag + country code (+234), phone number input, "Send Code" CTA, terms of service note
- Navigation: → OTP Verification

**6. OTP Verification**
- Purpose: Verify phone number
- Key elements: 6-digit OTP input (individual boxes), countdown timer (60s), "Resend code" (disabled until timer expires), auto-submit on last digit
- Navigation: → Profile Setup (new user) or Home (returning user)

**7. Profile Setup**
- Purpose: Collect display name and photo
- Key elements: Avatar upload (Cloudinary), display name input, "Continue" CTA, skip option (sets default avatar)
- Navigation: → Home

**8. Delivery Address Setup** *(prompted on first order, not mandatory at signup)*
- Purpose: Save delivery address
- Key elements: Map view, address search bar, "Use my location" button, manual address input, floor/apartment field, save button
- Navigation: → Back to Cart / → Home

---

#### Core Delivery Flow

**9. Home Screen**
- Purpose: Central hub — restaurant discovery + friend activity combined
- Key elements:
  - Top bar: FOODX logo, location selector, notification bell
  - Greeting: "Good evening, [Name]" with time-based message
  - Active order banner (if order in progress): shows status + quick track button
  - Friend activity strip: horizontal scroll of friend recent orders (avatars + food name)
  - Promotions carousel: swipeable promo banners
  - "Order Again" section: past favourite restaurants (if returning user)
  - Restaurant categories: horizontal scroll chips (All, Rice, Chicken, Shawarma, Soup, Snacks, Drinks)
  - Restaurant cards: vertical scroll list of nearby restaurants
  - Floating cart button: appears when cart has items (shows item count + total)
- Navigation: Restaurant cards → Restaurant Detail | Notification bell → Notification Center | Location → Address Picker | Friend avatars → Friend Profile

**10. Explore / Browse Screen**
- Purpose: Full restaurant discovery with search and filtering
- Key elements:
  - Search bar (prominent, top)
  - Active filters row (horizontal scroll chips): Open Now, Under 30 min, Rating 4+, Price range
  - Featured section (3 spotlight restaurants)
  - All restaurants list (card grid)
  - Map toggle button (switches to map view of restaurants)
- Navigation: Restaurant card → Restaurant Detail | Search → Search Results

**11. Search Results Screen**
- Purpose: Show restaurants and menu items matching search query
- Key elements: Query display, result count, tabs (Restaurants | Menu Items), list results, empty state
- Navigation: Result → Restaurant Detail

**12. Restaurant Detail Screen**
- Purpose: Full restaurant page — info, menu, reviews
- Key elements:
  - Header: restaurant photo (hero), back button, share button, favourite button
  - Restaurant info: name, rating, delivery time, delivery fee, minimum order, open/closed badge
  - Menu categories: sticky horizontal tab bar
  - Menu items: grouped by category, each with photo, name, price, description, "Add" button
  - Sticky "View Cart" button (bottom, appears when cart has items)
- Navigation: Menu item → Item Detail Modal | View Cart → Cart | Back → Explore

**13. Menu Item Detail (Modal)**
- Purpose: Item customisation and add to cart
- Key elements: Item photo (large), name, price, description, customisation options (size, extras, spice level), quantity selector, special instructions text field, "Add to Cart" button with total
- Navigation: Dismiss → Restaurant Detail | Add to Cart → Restaurant Detail (cart updates)

**14. Cart Screen (Bottom Sheet → Full Screen)**
- Purpose: Review order before checkout
- Key elements: Restaurant name, item list (each with quantity controls and remove option), subtotal, delivery fee, service fee, total, promo code input, "Proceed to Checkout" button, "Add more items" link
- Navigation: Checkout → Checkout Screen | Add more → Restaurant Detail

**15. Checkout Screen**
- Purpose: Final order confirmation and payment
- Key elements: Delivery address (with change option), delivery time estimate, order summary (collapsed), payment method (saved cards / add new card), Paystack payment button, order notes field
- Navigation: Payment success → Order Tracking | Payment fail → Error state with retry

**16. Order Tracking Screen**
- Purpose: Live order status from placement to delivery
- Key elements:
  - Map view: rider location pin + delivery address pin, route line
  - Status progress bar: Placed → Confirmed → Preparing → Picked Up → Delivered (5 steps)
  - Current status card: animated status, estimated time remaining
  - Rider card (visible after Picked Up): rider name, photo, rating, call button, chat button
  - Order summary accordion (collapsed by default)
  - "Rate your order" prompt (appears after delivery)
  - "Share this moment" button (posts to social feed)
- Navigation: Back → Home (order still tracked in banner) | Rate → Rating Modal | Share → Create Post

**17. Order Rating Screen (Modal)**
- Purpose: Rate delivery and food quality
- Key elements: Star rating (food), star rating (delivery), optional comment, rider tip option, submit button
- Navigation: Submit → Home with confirmation toast

**18. Notification Center**
- Purpose: All push notifications in-app
- Key elements: Grouped by Today / Earlier, notification cards (icon, title, body, time), mark all read, individual swipe-to-dismiss
- Navigation: Notification tap → relevant screen (Order Tracking, Profile, etc.)

---

#### Social Layer

**19. Social Feed Screen**
- Purpose: Friend and following food posts
- Key elements:
  - Post composer bar (top): avatar + "What did you eat?" prompt
  - Feed: infinite scroll of food posts from friends/following
  - Each post card: avatar, name, restaurant tag, photo, caption, like button + count, comment button + count, share button, timestamp
  - Tab switcher: Friends | Trending (popular local posts)
- Navigation: Post composer → Create Post | Comments → Post Detail | Avatar → Friend Profile

**20. Create Post Screen**
- Purpose: Share a food photo
- Key elements: Camera/gallery picker, photo preview with crop, caption input, restaurant tag (auto-suggests from recent orders), visibility toggle (Friends / Everyone), post button
- Navigation: Post → Social Feed | Cancel → Social Feed

**21. Post Detail Screen**
- Purpose: Full post view with comments
- Key elements: Post photo (full width), poster info, caption, like/comment/share actions, comments list, comment input (sticky bottom)
- Navigation: Back → Social Feed | Avatar → Profile

**22. Friend Activity Screen**
- Purpose: Real-time friend order activity
- Key elements: Live feed of friend orders (name, restaurant, food item, time ago), "Send reaction" quick action per item
- Navigation: Accessible from Home strip or Social tab

---

#### Gamification & Social Features

**23. Streaks Dashboard**
- Purpose: View and manage food ordering streak
- Key elements: Current streak number (large, animated), streak flame icon, calendar heatmap of past 30 days, streak milestone badges (3, 7, 14, 30 days), streak protectors remaining, leaderboard (friends sorted by streak length)
- Navigation: From Profile tab | Badge tap → Badge Detail Modal

**24. Food Gifting Flow — Step 1: Choose Friend**
- Purpose: Select recipient for food gift
- Key elements: Search friends, friend list with avatars, "They need to be on FOODX" note
- Navigation: → Step 2

**25. Food Gifting Flow — Step 2: Choose Restaurant & Food**
- Purpose: Browse and select food to gift
- Key elements: Restaurant browse (same as Explore), cart for gift (separate from personal cart), note field ("Add a message to your gift")
- Navigation: → Step 3

**26. Food Gifting Flow — Step 3: Confirm Delivery**
- Purpose: Confirm gift recipient's delivery address
- Key elements: Recipient's saved addresses (they must have one), "Recipient will be notified to add an address" if none saved, order summary, total cost, "Send this gift" button (Paystack)
- Navigation: → Gift sent confirmation screen

**27. Gift Sent Confirmation**
- Purpose: Celebratory confirmation of sent gift
- Key elements: Animation (confetti/food emoji rain), "Your gift is on its way to [Name]!" message, share to social feed button, back to home button
- Navigation: Share → Create Post | Home → Home

**28. Food Request Flow — Step 1: Choose Friend**
- Purpose: Select who to request food from
- Key elements: Friend list, recent requestees highlighted
- Navigation: → Step 2

**29. Food Request Flow — Step 2: Choose Food**
- Purpose: Select what you want
- Key elements: Restaurant browse, food selection, optional note ("I'm so hungry please 😭")
- Navigation: → Request sent confirmation

**30. Received Food Request Screen**
- Purpose: View and respond to food request from friend
- Key elements: Requester's avatar + name, requested food items, restaurant, total cost, their message, "Buy it for them" (Paystack flow) | "Can't right now" (decline) buttons
- Navigation: Buy → Gifting payment flow | Decline → Confirmation modal

---

#### Profile & Settings

**31. User Profile Screen**
- Purpose: Personal profile hub
- Key elements: Avatar, display name, bio (optional), streak counter (prominent), total orders, friends count, food posts grid (Instagram-style), edit profile button
- Navigation: Streak → Streaks Dashboard | Friends count → Friends List | Post → Post Detail | Edit → Edit Profile

**32. Edit Profile Screen**
- Purpose: Update profile information
- Key elements: Avatar upload, display name edit, bio edit, delivery addresses manage, notification preferences
- Navigation: Save → Profile

**33. Friends List Screen**
- Purpose: Manage friend connections
- Key elements: Search for users, my friends list, incoming requests, sent requests, "Invite friends" (share app link)
- Navigation: User → Friend Profile | Invite → Share sheet

**34. Friend Profile Screen**
- Purpose: View another user's public profile
- Key elements: Their avatar, name, streak, orders (count), food posts, add friend / pending / friends status button
- Navigation: Post → Post Detail | Back → Previous screen

**35. Settings Screen**
- Purpose: App preferences and account management
- Key elements: Notification settings, privacy settings (who sees orders, who sees posts), payment methods, saved addresses, help & support, log out, delete account
- Navigation: From Profile | Sub-sections push new screens

**36. Notification Preferences Screen**
- Purpose: Granular notification control
- Key elements: Toggles for: Order updates, Friend order alerts, Gift received, Food requests, Streak reminders, Promotions
- Navigation: From Settings

---

## Restaurant Partner Dashboard (React Web)

**R1. Login Screen**
- Email/password auth (restaurant partners, not OTP)
- Forgot password flow

**R2. Dashboard Overview**
- Today's orders (count, revenue)
- Pending orders alert badge
- Quick stats: orders this week, average rating, top selling item
- Recent orders list (last 10)

**R3. Live Order Queue**
- Real-time incoming orders (Socket.IO)
- New order alert (sound + visual pulse)
- Each order: customer name, items, total, time received, accept/reject buttons (60s auto-reject countdown)
- Accepted orders: status pipeline (Confirmed → Preparing → Ready for pickup)
- Mark as ready button triggers rider dispatch notification

**R4. Order Detail**
- Full order breakdown: items, quantities, special instructions, customer note
- Customer delivery address (for reference)
- Payment confirmation
- Status update buttons

**R5. Menu Management**
- Categories list (add/edit/delete/reorder)
- Menu items per category (add/edit/delete)
- Item fields: name, description, price, photo (Cloudinary upload), available toggle, customisation options
- Bulk availability toggle (e.g., "mark all chicken items as unavailable")

**R6. Restaurant Profile & Hours**
- Restaurant name, photo, description, contact
- Operating hours per day (open/close times, closed toggle)
- Delivery radius setting
- Minimum order value setting
- Online/offline toggle (immediately stops new orders)

**R7. Analytics**
- Revenue chart (daily/weekly/monthly)
- Top selling items
- Order completion rate
- Average order value
- Customer ratings breakdown

**R8. Payouts**
- Pending payout balance
- Payout history
- Bank account details management

---

## Rider App (Flutter Mobile)

**RD1. Login Screen**
- Phone OTP (same Firebase Auth)
- First-time: documents upload (government ID, bike photo)

**RD2. Home / Status Screen**
- Online/Offline toggle (large, prominent)
- Today's earnings (₦ amount)
- Trips today (count)
- Incoming order alert overlay (when online and order available)

**RD3. Incoming Order Alert (Modal Overlay)**
- Restaurant name + address
- Delivery address (general area, not full address for privacy)
- Estimated earnings for this trip
- Distance to restaurant
- Accept button (large, green) + Decline button (small)
- 30-second auto-decline countdown

**RD4. Active Order Screen**
- Current order details: restaurant info, items list, customer name
- Status steps: Pick Up → On the Way → Delivered
- "Navigate to Restaurant" button (opens Google Maps / Apple Maps)
- "Navigate to Customer" button (appears after pickup confirmation)
- "Confirm Pickup" button (takes photo of food)
- "Confirm Delivery" button (takes photo at door)
- Call customer button (masked number)
- Report problem button

**RD5. Earnings Screen**
- Total lifetime earnings
- This week / this month
- Trip history list (each trip: date, route summary, earnings)
- Payout request button

**RD6. Rider Profile**
- Photo, name, rating, total trips
- Documents status (verified / pending)
- Settings (notification preferences, bank account for payouts)

---

## Admin Panel (React Web)

**A1. Login** — Email/password, 2FA encouraged

**A2. Dashboard** — Platform-wide KPIs: total orders today, active riders, active restaurants, revenue today, issues flagged

**A3. User Management** — Search users, view profiles, suspend/unsuspend, view order history, delete account

**A4. Restaurant Management** — Approve new restaurants, edit details, suspend, view analytics, manage commission rate

**A5. Rider Management** — Approve new riders, view documents, suspend, view earnings and trip history

**A6. Order Management** — All orders with filter/search, order detail view, manual status override, refund trigger

**A7. Promotions Manager** — Create/edit promo codes (% off, flat off, free delivery), set usage limits and expiry, target by user segment

**A8. Social Content Moderation** — Flagged posts, reported users, content removal tools

**A9. Analytics Dashboard** — Revenue charts, user growth, order volume, retention metrics, restaurant performance league table

**A10. Support Tickets** — Incoming support requests, assignment, resolution tracking

**A11. Platform Settings** — Delivery fee configuration, commission rates, featured restaurants management, FCM announcement broadcasts

---

## Screen Priority Build Order

| Priority | Screen | Role | Rationale |
|----------|--------|------|-----------|
| 1 | Phone Number Entry | Customer | Nothing works without auth |
| 2 | OTP Verification | Customer | Auth completion |
| 3 | Profile Setup | Customer | Minimum viable identity |
| 4 | Home Screen | Customer | First experience post-auth |
| 5 | Restaurant Detail | Customer | Core delivery loop |
| 6 | Cart Screen | Customer | Core delivery loop |
| 7 | Checkout Screen | Customer | Revenue-generating |
| 8 | Order Tracking | Customer | Trust and retention |
| 9 | Restaurant Dashboard — Order Queue | Restaurant | Partners need this to receive orders |
| 10 | Restaurant Dashboard — Menu Mgmt | Restaurant | Partners need this to go live |
| 11 | Rider — Incoming Order + Active Order | Rider | Required for any delivery to complete |
| 12 | Admin — Order Management | Admin | Required to oversee operations |
| 13 | Admin — User/Restaurant/Rider Mgmt | Admin | Required for platform control |
| 14 | Explore / Browse | Customer | Enhances discovery |
| 15 | Notification Center | Customer | Retention driver |
| 16 | Social Feed | Customer | Phase 2 |
| 17 | Create Post | Customer | Phase 2 |
| 18 | Streaks Dashboard | Customer | Phase 2 |
| 19 | Food Gifting Flow | Customer | Phase 2 |
| 20 | Food Request Flow | Customer | Phase 2 |
| 21 | In-App Chat | Customer | Phase 2 |
| 22 | User Profile | Customer | Phase 2 |
| 23 | Friend Activity | Customer | Phase 2 |
| 24 | Post Detail | Customer | Phase 2 |
| 25 | Rider Earnings | Rider | Phase 2 |
| 26 | Restaurant Analytics | Restaurant | Phase 2 |
| 27 | Admin Analytics | Admin | Phase 2 |
| 28 | Ad Rewards | Customer | Phase 3 |

---

*For layout details of each screen, see `03-wireframe-flows.md`. For component design, see `04-design-system.md`. For feature acceptance criteria, see `05-feature-specs.md`.*