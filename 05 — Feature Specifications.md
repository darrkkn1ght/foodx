# 05 — Feature Specifications

> This is the document developers build from. Every feature has a description, user story, acceptance criteria, edge cases, and technical notes. High and Medium priority features only.

---

## HIGH PRIORITY FEATURES

---

### F01 — User Onboarding (Signup & Login)

**Description:** New users sign up using their phone number. OTP is sent via SMS. Existing users log in the same way. No email or password required.

**User Story:** As a new user, I want to sign up with my phone number so I can start ordering without a complicated registration process.

**Acceptance Criteria:**
- User can enter a Nigerian phone number (+234 prefix applied automatically)
- OTP of exactly 6 digits is delivered within 30 seconds
- OTP expires after 5 minutes
- User can request a resend after 60 seconds
- After successful OTP, user is prompted to set name and profile photo
- After profile setup, user is prompted to allow location
- If user already has an account, they skip profile setup and go directly to home feed
- On subsequent opens, valid session auto-logs user in (no OTP required for 30 days)

**Edge Cases:**
- Invalid phone number format → show inline error "Enter a valid Nigerian number"
- OTP incorrect → show "Wrong code. X tries remaining" (max 3 tries before lockout)
- 3 failed OTP attempts → 15-minute lockout with countdown shown
- No SMS received → allow resend after 60s, show WhatsApp OTP fallback after 2nd resend
- User closes app during OTP step → resume OTP screen on re-open (same session)
- Profile photo upload fails → allow skip, use initials avatar fallback

**Technical Notes:**
- Auth: Firebase Phone Auth (preferred) or Supabase Auth with OTP
- Session tokens stored in secure device storage (Flutter: `flutter_secure_storage`)
- Phone numbers stored in E.164 format (+2348012345678)
- Profile photos uploaded to Cloudinary on setup; URL stored in user record

---

### F02 — Restaurant Browsing

**Description:** Users can browse all available restaurants, filter by category, and search by name or dish. Restaurants show rating, delivery time, and delivery fee.

**User Story:** As a customer, I want to browse restaurants near me so I can find something I want to eat quickly.

**Acceptance Criteria:**
- Restaurant list loads within 2 seconds on 3G
- Each card shows: photo, name, rating, delivery time range, delivery fee
- User can filter by food category (Burgers, Rice, Chicken, Pizza, Drinks, etc.)
- Search bar filters restaurant list in real time (250ms debounce)
- Closed restaurants are shown at the bottom with a "Closed" badge
- Tapping a restaurant opens its detail page

**Edge Cases:**
- No restaurants available → empty state: "No restaurants near you right now. Check back soon 🍳"
- Search returns no results → "We couldn't find '[query]'. Try something else?"
- Restaurant is closed → detail page is viewable but ordering is blocked with "Opens at [time]"
- Location permission denied → show list for default Ibadan area, prompt for location in banner

**Technical Notes:**
- Restaurants are geo-filtered based on user's saved delivery address or current location
- Restaurant data cached locally for 5 minutes to reduce API calls
- Availability (open/closed) is calculated server-side using restaurant's set hours + current server time (WAT)
- Category filters are a static list defined in the admin panel

---

### F03 — Food Ordering (Cart + Checkout)

**Description:** Users can add items to cart, customise orders, review the cart, and checkout via Paystack. Cart persists across sessions for the same restaurant.

**User Story:** As a customer, I want to build a cart and pay for my order easily so I can get food delivered to me.

**Acceptance Criteria:**
- User can add items from a single restaurant to cart (cross-restaurant ordering is blocked)
- Quantity can be adjusted from 1–10 per item
- Item-level customisation notes can be added (free text, 100 char limit)
- Cart shows subtotal, delivery fee, and total
- Promo code field accepts valid codes and shows discount
- Checkout summary screen shows delivery address, order, and payment method before payment
- Paystack payment modal opens inline
- On successful payment, order is created and user is taken to order confirmation
- Order confirmation shows order ID, estimated time, and "Track order" CTA

**Edge Cases:**
- User tries to add item from a second restaurant → modal: "Your cart has items from [Restaurant A]. Start a new cart?" with "Yes, clear cart" / "Cancel"
- Restaurant goes offline during checkout → payment blocked, error shown, cart preserved
- Payment fails (card declined, timeout) → error shown, cart preserved, user can retry
- Paystack session times out → show "Your payment session expired. Try again."
- Cart is empty at checkout → "Your cart is empty. Add some food first."
- Min order not met → "Minimum order for this restaurant is ₦500"
- Delivery address is outside service area → "We don't deliver here yet. Choose a different address."

**Technical Notes:**
- Cart state managed client-side (local storage + state)
- Cart is tied to a restaurant ID — one restaurant per cart session
- Paystack integration: use Paystack Inline JS/Flutter SDK
- Payment webhook: Paystack sends confirmation to backend on successful charge
- Order is created in DB only after Paystack payment confirmation webhook received
- Delivery fee calculated server-side based on distance (Phase 1: flat ₦200 fee for Ibadan)

---

### F04 — Order Tracking (Real-Time)

**Description:** After an order is placed, the customer can track their order status in real time from placement through to delivery. Rider's location is shown on a live map.

**User Story:** As a customer, I want to see exactly where my food is so I'm not left wondering when it will arrive.

**Acceptance Criteria:**
- Order status updates in real time via Socket.IO (no manual refresh needed)
- Status steps: Placed → Confirmed by Restaurant → Preparing → Rider Assigned → Rider En Route → Delivered
- Rider's GPS location updates on map every 10 seconds
- ETA is calculated and displayed, updating as rider moves
- Customer can call or chat with rider from tracking screen
- Push notification sent at each status change
- On delivery, customer receives "Your food is here!" notification + in-app celebration

**Edge Cases:**
- Rider app loses internet mid-delivery → last known location shown, "Location updating…" shown
- Restaurant rejects order → notification: "Sorry, [Restaurant] couldn't take your order. Your payment will be refunded."
- No rider available within 10 minutes → notification sent to customer, admin alerted
- Customer closes app during delivery → push notifications continue
- Delivery takes > 60 minutes → yellow warning shown: "Running a bit late 😬 We're on it."

**Technical Notes:**
- Socket.IO event: `rider:location_update` (emitted by rider app every 10s)
- Socket.IO event: `order:status_change` (emitted by backend on status change)
- Customer subscribes to room: `order:{orderId}` on tracking screen mount
- Map: Google Maps Flutter plugin (or Mapbox if cost is a concern)
- ETA calculated using Google Maps Directions API (or estimated via straight-line distance for Phase 1)
- Push via Firebase Cloud Messaging (FCM) for all status changes

---

### F05 — Rider App

**Description:** A lightweight Flutter app for riders to receive delivery requests, navigate to restaurants and customers, and confirm deliveries.

**User Story:** As a rider, I want to receive delivery jobs, navigate to the right place, and confirm deliveries easily from my phone.

**Acceptance Criteria:**
- Rider can toggle online/offline status
- Incoming order requests show: restaurant name, pickup area, delivery area, estimated earnings, time to respond (30 seconds)
- Rider can accept or reject each request
- On accept, rider gets navigation to restaurant address
- Rider marks pickup as complete → triggers "Rider En Route" status for customer
- Delivery confirmation requires: "Delivered" tap + customer OTP or photo
- Rider sees today's earnings and trip count on home screen

**Edge Cases:**
- Rider misses response within 30 seconds → order auto-reassigned, no penalty for first miss
- Rider accepts but can't find restaurant → in-app chat with restaurant
- Customer not available on delivery → rider can take a photo + mark delivered after 2 attempts
- Rider app crashes mid-delivery → on re-open, active delivery resumes
- Rider goes offline mid-delivery → delivery continues, rider flagged for review

**Technical Notes:**
- Rider GPS tracked via Flutter location package, emitted via Socket.IO
- Rider availability state stored in Redis for fast querying
- Order assignment: first available online rider within defined radius gets notified
- If no rider accepts within 5 minutes, admin is alerted

---

### F06 — Restaurant Dashboard

**Description:** A mobile app (or web dashboard) for restaurant staff to receive orders, manage their menu, and track earnings.

**User Story:** As a restaurant partner, I want to see incoming orders and manage my menu so I can run my FOODX operations efficiently.

**Acceptance Criteria:**
- New orders trigger a loud audio alert + push notification
- Restaurant can accept or reject each order within 2 minutes (system auto-cancels at timeout)
- Order queue shows: pending, in preparation, ready for pickup
- Restaurant can mark order as "Ready for Pickup" to trigger rider dispatch
- Menu items can be toggled available/unavailable instantly
- Menu items can have price and description edited
- New menu items can be added with photo upload (Cloudinary)
- Restaurant can set daily hours and mark as temporarily closed

**Edge Cases:**
- Restaurant doesn't respond to order within 2 minutes → auto-cancel, customer notified, refund issued
- Restaurant marks closed mid-rush → pending orders are preserved, no new orders accepted
- Menu photo upload fails → item saved without photo, placeholder shown
- Restaurant loses internet → orders queue locally, sync on reconnect (best effort)

**Technical Notes:**
- Restaurant auth: staff login via phone OTP (same system as customers, different role flag)
- Real-time orders via Socket.IO room: `restaurant:{restaurantId}`
- Menu data cached on client, invalidated on any menu update
- Photos uploaded to Cloudinary via signed upload URL

---

### F07 — Admin Panel

**Description:** A web-based React dashboard for FOODX operators to manage the entire platform.

**User Story:** As an admin, I want to see all platform activity and manage users, restaurants, riders, and promotions so I can keep FOODX running smoothly.

**Acceptance Criteria:**
- Admin can view all users, search by name/phone, suspend or ban accounts
- Admin can approve or reject restaurant applications
- Admin can view and manually update any order status
- Admin can create and deactivate promo codes (flat ₦ off or %)
- Admin can set delivery fee per zone
- Admin can view key metrics: total orders today, GMV, active users
- Admin panel is web-only (React), accessible via secure URL + admin credentials
- All admin actions are logged with timestamp and admin user ID

**Edge Cases:**
- Admin accidentally bans a user → undo available within 10 minutes
- Admin creates duplicate promo code → validation error shown
- Admin changes delivery fee → takes effect on next order, not retroactively

**Technical Notes:**
- Admin auth: email + password (not phone OTP — admin is internal team only)
- Admin roles: Super Admin (full access) and Operations Admin (no financial settings)
- All admin API routes require Bearer token with admin role claim
- Audit log stored in `admin_actions` table

---

## MEDIUM PRIORITY FEATURES

---

### F08 — Social Feed

**Description:** Users can post food photos, captions, and restaurant tags to a social feed visible to friends/followers.

**User Story:** As a customer, I want to share what I'm eating with my friends so food becomes a social moment, not just a meal.

**Acceptance Criteria:**
- User can post a photo from camera or gallery
- Caption is optional, max 280 characters
- Restaurant tagging is optional (searchable by restaurant name)
- Post is visible to friends by default, toggled to public optionally
- Feed is chronological (with ranked relevance in future phases)
- Users can like and comment on posts
- Each post shows an "Order same" button that deep-links to the restaurant

**Edge Cases:**
- Photo upload fails → "Couldn't upload photo. Try again."
- Caption exceeds 280 chars → counter shown in red, post button disabled
- User posts without photo → text-only post allowed with minimal styling
- User deletes post → removed from all feeds immediately

**Technical Notes:**
- Photos uploaded to Cloudinary (max 5MB, compressed client-side before upload)
- Feed populated via feed API: friends' posts + followed restaurants + own posts
- Feed data paginated (20 posts per page, infinite scroll)
- "Order same" deep link: `/restaurant/{restaurantId}?from=social_feed`

---

### F09 — Order Alerts (Friend Activity)

**Description:** When a user places an order, their friends receive an in-app notification (and optionally a push notification) showing what they ordered and from which restaurant.

**User Story:** As a customer, I want to know when my friends are ordering food so I can join in or get inspired.

**Acceptance Criteria:**
- Order alerts are sent to all mutual friends when an order is placed
- Alert includes: friend's name, restaurant name, general item category (not exact items — privacy)
- Friend can tap alert to deep-link to the same restaurant
- User can toggle off order alerts from settings (privacy option)
- Alerts appear in the Friend Activity strip on the home feed
- Push notification for order alert (if friend has notifications enabled)

**Edge Cases:**
- User has no friends → Friend Activity strip is hidden
- Friend has alerts disabled → they appear in activity feed but no push sent
- Alert for a restaurant that is now closed → CTA shows "Opens at [time]" instead

**Technical Notes:**
- Socket.IO event: `friend:order_placed` emitted to friend room on order creation
- Alert stores: friend's user ID, restaurant ID, restaurant name, item category, timestamp
- FCM push sent with low priority (not intrusive)

---

### F10 — Food Streaks

**Description:** Users earn and maintain a streak by ordering on consecutive days. Streaks are visible on their profile and create social pressure to keep going.

**User Story:** As a customer, I want to build a food streak so I can show friends I'm consistent and feel rewarded for ordering regularly.

**Acceptance Criteria:**
- Streak increments by 1 each day the user places at least one completed order
- Streak resets to 0 if user does not order for a full calendar day (WAT)
- Streak is displayed on profile with flame emoji (🔥) and count
- Milestone streak messages shown at: 3, 7, 14, 30 days
- Streak visible on friend profiles
- Streak freeze mechanic: not in MVP (noted for future)

**Edge Cases:**
- User places 3 orders in one day → streak counts as 1 day
- Order is cancelled → does not count toward streak
- User in different timezone → streak calculated in WAT (West Africa Time UTC+1)
- User's streak hits 7 days → special in-app celebration animation + notification

**Technical Notes:**
- `user_streaks` table: user_id, current_streak, longest_streak, last_order_date
- Streak calculation runs server-side on order completion
- Streak reset checked daily via cron job (WAT midnight)

---

### F11 — Food Gifting

**Description:** A user can send a food order to a friend's delivery address as a gift. The friend receives the food and a message.

**User Story:** As a customer, I want to send food to a friend as a gift so I can make their day better without being there in person.

**Acceptance Criteria:**
- User selects a friend from their friends list
- User selects a restaurant and adds items to cart
- Delivery address defaults to friend's saved address (user can override)
- User adds a personal message (max 160 chars)
- Payment is charged to the gift sender
- Friend receives a notification: "[Name] sent you food 🎁"
- Friend sees the gift reveal screen with message and order details
- Friend can track the delivery as normal

**Edge Cases:**
- Friend has no saved address → sender must input address manually
- Gift order fails after payment → full refund to sender
- Sender and recipient in different service areas → error: "Your friend is outside our delivery area"
- Friend declines to receive gift → not in MVP; gifts auto-accept

**Technical Notes:**
- Gift orders flagged in orders table: `is_gift: true`, `gift_sender_id`, `gift_message`
- Friend's address fetched only with their consent (privacy flag: `allow_friends_to_send_gifts`)
- Notification template: "🎁 [Sender] just sent you food from [Restaurant]!"

---

### F12 — Food Requests

**Description:** A user can request a friend to buy them food. The friend sees the request and can accept (pay and order) or decline.

**User Story:** As a customer, I want to ask a friend to buy me food so I can get a meal even when I'm short on funds or just want the gesture.

**Acceptance Criteria:**
- User selects a friend and sends a food request with optional item details or free-text message
- Friend receives notification: "[Name] is requesting food from you 🍕"
- Friend can accept (pay) or decline
- If accepted, friend is taken to cart pre-filled with requested items (or restaurant if free-text)
- If declined, requester is notified
- Requests expire after 24 hours if not responded to

**Edge Cases:**
- Friend has no payment method → they must add one before accepting
- Requested restaurant is closed when friend tries to accept → show restaurant hours
- User sends multiple requests → only 1 pending request per friend pair at a time
- Request spam → rate limit: max 3 requests per day per user

**Technical Notes:**
- `food_requests` table: requester_id, recipient_id, restaurant_id, items_json, message, status, expires_at
- Push notification on request received + reminder after 4 hours if unanswered

---

### F13 — In-App Chat

**Description:** Users can send direct messages to friends within the FOODX app. Chat includes a "Send food" shortcut for gifting within conversation.

**User Story:** As a customer, I want to chat with friends inside FOODX so I can coordinate orders without leaving the app.

**Acceptance Criteria:**
- User can start a DM with any friend
- Chat supports: text messages, photo sharing (from gallery or camera)
- Messages delivered in real time via Socket.IO
- Unread message count shown on chat tab badge
- "Send food 🍔" shortcut button in chat opens the gifting flow pre-filled with that friend
- Messages are persisted (user can scroll up to see history)
- Online status shown on friend avatar (green dot = online)

**Edge Cases:**
- Message fails to send → red error indicator, tap to retry
- Recipient is offline → message stored, delivered on next open
- Photo send fails → error shown, text still sends
- User blocks another user → no further messages, existing thread hidden

**Technical Notes:**
- Real-time: Socket.IO room per conversation `chat:{userId1}_{userId2}` (sorted user IDs)
- Message persistence: `messages` table (sender_id, recipient_id, content, type, created_at)
- Photos: uploaded to Cloudinary, URL stored in message record
- Unread count: maintained in Redis, synced to DB periodically

---

## References

- Screen layouts for each feature → `03-wireframe-flows.md`
- Technical implementation details → `06-technical-architecture.md`
- All copy for each feature → `07-content-doc.md`
- AI prompts to build each feature → `09-prompt-pack.md`