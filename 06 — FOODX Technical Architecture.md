# 06 — FOODX Technical Architecture

> The engineering blueprint. Read this before writing any backend code, designing any API, or defining any database schema. See `05-feature-specs.md` for feature requirements and `instructions.md` for non-negotiable stack rules.

---

## System Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │  Customer App   │  │   Rider App     │  │  Web Dashboards     │  │
│  │  (Flutter iOS   │  │  (Flutter iOS   │  │  Restaurant Partner │  │
│  │   + Android)    │  │   + Android)    │  │  + Admin Panel      │  │
│  │                 │  │                 │  │  (React+Vite+TS)    │  │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘  │
└───────────┼────────────────────┼──────────────────────┼─────────────┘
            │                    │                       │
            │   HTTPS + WSS (Socket.IO)                  │
            │                    │                       │
┌───────────▼────────────────────▼───────────────────────▼─────────────┐
│                         API GATEWAY / NGINX                           │
│              Rate limiting • SSL termination • Routing                │
└───────────────────────────────┬───────────────────────────────────────┘
                                │
┌───────────────────────────────▼───────────────────────────────────────┐
│                      NESTJS BACKEND SERVER                            │
│                                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │  Auth    │ │ Orders   │ │  Social  │ │  Chat    │ │  Admin    │  │
│  │ Module   │ │ Module   │ │  Module  │ │  Module  │ │  Module   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│  │Restaurants│ │  Riders  │ │Payments  │ │Notif.    │                │
│  │  Module  │ │  Module  │ │  Module  │ │  Module  │                │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                │
│                                                                       │
│         Socket.IO Gateway (namespaced: /orders /chat /notifications) │
│         Bull Queue (Redis) for background jobs                        │
└────────────┬──────────────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────────────┐
│                       DATA LAYER                                     │
│                                                                      │
│  ┌─────────────────┐          ┌──────────────────┐                  │
│  │   PostgreSQL    │          │      Redis        │                  │
│  │   (Primary DB)  │          │  (Cache + Queues) │                  │
│  │   via Prisma    │          │                  │                  │
│  └─────────────────┘          └──────────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                 │
│                                                                      │
│  Firebase Auth (OTP)    Paystack (Payments)    Cloudinary (Images)  │
│  Firebase FCM (Push)    Google Maps API        Bull + Redis (Jobs)  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Decisions

| Layer | Technology | Justification |
|-------|-----------|---------------|
| Mobile | Flutter | Single codebase for iOS + Android; excellent performance; strong Nigerian dev community familiarity |
| Web | React + Vite + TypeScript | Industry standard for dashboards; Vite gives fast builds; TypeScript prevents runtime bugs |
| Backend | NestJS | Structured, opinionated Node.js framework; module system prevents spaghetti code; built-in dependency injection |
| ORM | Prisma | Type-safe queries; excellent migration tooling; integrates perfectly with TypeScript |
| Database | PostgreSQL | Relational data fits food delivery domain well; ACID compliance critical for orders/payments |
| Cache | Redis | Session storage, job queues (Bull), rate limiting, socket adapter for horizontal scaling |
| Auth | Firebase Phone Auth | Handles OTP delivery, verification, and rate limiting; no backend SMS infrastructure needed |
| Payments | Paystack | Most trusted Nigerian payment gateway; Naira-native; strong webhook reliability |
| Real-time | Socket.IO | Proven for food delivery real-time (order tracking, chat); works well with NestJS |
| Images | Cloudinary | Automatic image optimisation, CDN delivery, transformation API |
| Push | Firebase FCM | Free tier sufficient for Phase 1; handles both iOS (APNs) and Android |
| Hosting | Railway/Render + Vercel | Railway/Render for backend (auto-deploy from GitHub); Vercel for React apps |

---

## API Structure

**Base URL:** `https://api.foodx.ng/v1`
**Auth header:** `Authorization: Bearer <jwt_token>`
**Standard response shape:**
```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

### Auth Routes `/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/send-otp` | Send OTP to phone number | No |
| POST | `/auth/verify-otp` | Verify OTP, return JWT | No |
| POST | `/auth/refresh` | Refresh access token | Refresh token |
| POST | `/auth/logout` | Invalidate refresh token | Yes |
| GET | `/auth/me` | Get current user profile | Yes |

### User Routes `/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/users/me` | Update profile (name, bio, avatar) |
| GET | `/users/:id` | Get public user profile |
| GET | `/users/me/friends` | List friends |
| POST | `/users/:id/friend-request` | Send friend request |
| PATCH | `/users/friend-requests/:id` | Accept/decline friend request |
| DELETE | `/users/:id/unfriend` | Remove friend |
| GET | `/users/search?q=` | Search users by name |
| POST | `/users/me/addresses` | Add delivery address |
| GET | `/users/me/addresses` | List saved addresses |
| PATCH | `/users/me/addresses/:id` | Update address |
| DELETE | `/users/me/addresses/:id` | Delete address |

### Restaurant Routes `/restaurants`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/restaurants` | List available restaurants (with filters) |
| GET | `/restaurants/search?q=&category=` | Search restaurants + menu items |
| GET | `/restaurants/:id` | Get restaurant detail |
| GET | `/restaurants/:id/menu` | Get full menu |
| POST | `/restaurants` | Create restaurant (admin only) |
| PATCH | `/restaurants/:id` | Update restaurant (partner or admin) |
| PATCH | `/restaurants/:id/status` | Toggle online/offline (partner) |
| PUT | `/restaurants/:id/hours` | Update operating hours |

### Menu Routes `/restaurants/:id/menu`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/restaurants/:id/menu/categories` | List menu categories |
| POST | `/restaurants/:id/menu/categories` | Add category |
| PATCH | `/restaurants/:id/menu/categories/:catId` | Update category |
| DELETE | `/restaurants/:id/menu/categories/:catId` | Delete category |
| POST | `/restaurants/:id/menu/items` | Add menu item |
| PATCH | `/restaurants/:id/menu/items/:itemId` | Update menu item |
| DELETE | `/restaurants/:id/menu/items/:itemId` | Delete menu item |
| PATCH | `/restaurants/:id/menu/items/:itemId/availability` | Toggle item availability |

### Order Routes `/orders`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create order (initiates Paystack payment) |
| GET | `/orders` | List user's orders |
| GET | `/orders/:id` | Get order detail |
| PATCH | `/orders/:id/status` | Update order status (restaurant/rider/admin) |
| POST | `/orders/:id/rate` | Rate a completed order |
| POST | `/orders/:id/cancel` | Cancel order |
| GET | `/orders/:id/tracking` | Get tracking data (rider location + status) |
| POST | `/orders/gift` | Create gift order |

### Rider Routes `/riders`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/riders` | Register as rider |
| GET | `/riders/me` | Get rider profile |
| PATCH | `/riders/me/status` | Toggle online/offline |
| PATCH | `/riders/me/location` | Update rider GPS coordinates |
| GET | `/riders/me/orders` | Get rider's active + past orders |
| PATCH | `/riders/orders/:id/accept` | Accept order |
| PATCH | `/riders/orders/:id/decline` | Decline order |
| PATCH | `/riders/orders/:id/pickup` | Confirm pickup (with photo URL) |
| PATCH | `/riders/orders/:id/deliver` | Confirm delivery (with photo URL) |
| GET | `/riders/me/earnings` | Get earnings summary + history |

### Social Routes `/social`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/social/feed` | Get friend feed (paginated) |
| GET | `/social/trending` | Get trending public posts |
| POST | `/social/posts` | Create post |
| GET | `/social/posts/:id` | Get single post |
| DELETE | `/social/posts/:id` | Delete own post |
| POST | `/social/posts/:id/like` | Like/unlike post (toggle) |
| GET | `/social/posts/:id/comments` | Get comments |
| POST | `/social/posts/:id/comments` | Add comment |
| DELETE | `/social/posts/:id/comments/:commentId` | Delete own comment |
| POST | `/social/posts/:id/report` | Report post |

### Gifting Routes `/gifts`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/gifts` | Send food gift (creates gift order) |
| GET | `/gifts/sent` | List sent gifts |
| GET | `/gifts/received` | List received gifts |
| POST | `/gifts/:id/thank` | Send thank-you reaction |

### Food Request Routes `/food-requests`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/food-requests` | Send food request |
| GET | `/food-requests/outgoing` | List my outgoing requests |
| GET | `/food-requests/incoming` | List incoming requests to me |
| PATCH | `/food-requests/:id/accept` | Accept request (triggers gift payment flow) |
| PATCH | `/food-requests/:id/decline` | Decline request |

### Chat Routes `/chat`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/chat/conversations` | List all chat conversations |
| GET | `/chat/conversations/:id/messages` | Get messages (paginated) |
| POST | `/chat/conversations` | Start or get existing conversation |
| DELETE | `/chat/conversations/:id` | Archive conversation |
| GET | `/chat/threads` | List all DM threads |
| GET | `/chat/thread/:userId` | Get messages with a specific user |

### Streak Routes `/streaks`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/streaks/me` | Get my streak data |
| GET | `/streaks/leaderboard` | Get friends leaderboard |
| GET | `/streaks/milestones` | Get earned milestones |

### Payment Routes `/payments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/initialize` | Initialize Paystack transaction |
| POST | `/payments/initiate` | Alias: initiate Paystack payment, returns reference |
| POST | `/payments/webhook/paystack` | Paystack webhook handler (public) |
| GET | `/payments/verify/:reference` | Verify payment status |
| POST | `/payments/refund` | Issue refund (admin only) |

### Notifications Routes `/notifications`

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/notifications/token` | Register FCM token |
| GET | `/notifications` | List recent notifications |
| POST | `/notifications/read` | Mark as read |

### Admin Routes `/admin`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Platform stats |
| GET | `/admin/users` | List all users |
| PATCH | `/admin/users/:id/suspend` | Suspend user |
| PUT | `/admin/users/:id` | Update user (suspend, ban) |
| GET | `/admin/restaurants` | List all restaurants |
| PATCH | `/admin/restaurants/:id/approve` | Approve restaurant |
| PUT | `/admin/restaurants/:id` | Update restaurant |
| GET | `/admin/orders` | All orders with filters |
| GET | `/admin/analytics` | Platform analytics |
| POST | `/admin/promo-codes` | Create promo code |
| GET | `/admin/promo-codes` | List promo codes |
| PUT | `/admin/promos/:id` | Update promo code |
| GET | `/admin/audit` | Audit log |

---

## Database Schema

### Core Tables

```sql
-- Users
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone         VARCHAR(15) UNIQUE NOT NULL,  -- E.164 format
  display_name  VARCHAR(40) NOT NULL,
  username      VARCHAR(30) UNIQUE,
  bio           VARCHAR(150),
  avatar_url    TEXT,
  role          ENUM('customer', 'restaurant', 'rider', 'admin') DEFAULT 'customer',
  is_suspended  BOOLEAN DEFAULT false,
  is_active     BOOLEAN DEFAULT true,
  fcm_token     TEXT,  -- latest device token
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles (extended settings)
CREATE TABLE user_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  allow_gifts     BOOLEAN DEFAULT true,
  order_alerts_on BOOLEAN DEFAULT true,
  current_streak  INT DEFAULT 0,
  longest_streak  INT DEFAULT 0,
  last_order_date DATE,
  fcm_token       TEXT
);

-- Device Tokens (one user, many devices)
CREATE TABLE device_tokens (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  token     TEXT NOT NULL,
  platform  ENUM('ios', 'android'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Delivery Addresses
CREATE TABLE delivery_addresses (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  label        VARCHAR(50),  -- "Home", "Office", etc.
  address_line TEXT NOT NULL,
  apartment    VARCHAR(50),
  city         VARCHAR(50) DEFAULT 'Ibadan',
  latitude     DECIMAL(10, 8),
  longitude    DECIMAL(11, 8),
  is_primary   BOOLEAN DEFAULT false,
  is_default   BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Restaurants
CREATE TABLE restaurants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id        UUID REFERENCES users(id),
  name            VARCHAR(100) NOT NULL,
  description     TEXT,
  photo_url       TEXT,
  cuisine_types   TEXT[],  -- ['Nigerian', 'Fast Food']
  phone           VARCHAR(15),
  email           VARCHAR(100) UNIQUE,
  password_hash   TEXT NOT NULL,  -- for dashboard login
  address         TEXT,
  latitude        DECIMAL(10, 8),
  longitude       DECIMAL(11, 8),
  delivery_radius INTEGER DEFAULT 5000,  -- metres
  min_order       INTEGER DEFAULT 1000,  -- kobo
  delivery_fee    INTEGER DEFAULT 30000, -- kobo (₦300)
  commission_rate DECIMAL(4, 2) DEFAULT 10.00,  -- percentage
  rating          DECIMAL(3, 2) DEFAULT 0.0,
  rating_count    INTEGER DEFAULT 0,
  is_online       BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  is_approved     BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Operating Hours
CREATE TABLE operating_hours (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  day_of_week   INTEGER NOT NULL,  -- 0=Sunday, 6=Saturday
  open_time     TIME NOT NULL,
  close_time    TIME NOT NULL,
  is_closed     BOOLEAN DEFAULT false
);

-- Menu Categories
CREATE TABLE menu_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name          VARCHAR(50) NOT NULL,
  sort_order    INTEGER DEFAULT 0,
  is_available  BOOLEAN DEFAULT true
);

-- Menu Items
CREATE TABLE menu_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name          VARCHAR(100) NOT NULL,
  description   TEXT,
  price         INTEGER NOT NULL,  -- kobo
  photo_url     TEXT,
  is_available  BOOLEAN DEFAULT true,
  customisations JSONB DEFAULT '[]',  -- [{name, type, options: [{label, price_add}]}]
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        VARCHAR(20) UNIQUE NOT NULL,  -- FDX-00001
  customer_id         UUID REFERENCES users(id),
  restaurant_id       UUID REFERENCES restaurants(id),
  rider_id            UUID REFERENCES riders(id),
  delivery_address_id UUID REFERENCES delivery_addresses(id),
  status              ENUM('placed','confirmed','preparing','rider_assigned','picked_up','en_route','delivered','cancelled','refunded') DEFAULT 'placed',
  subtotal            INTEGER NOT NULL,   -- kobo
  delivery_fee        INTEGER NOT NULL,   -- kobo
  service_fee         INTEGER DEFAULT 10000,  -- kobo (₦100)
  discount            INTEGER DEFAULT 0,  -- kobo
  total               INTEGER NOT NULL,   -- kobo
  promo_code_id       UUID REFERENCES promo_codes(id),
  paystack_reference  VARCHAR(100) UNIQUE,
  customer_note       TEXT,
  is_gift             BOOLEAN DEFAULT false,
  gift_sender_id      UUID REFERENCES users(id),
  gift_message        TEXT,
  pickup_photo_url    TEXT,
  delivery_photo_url  TEXT,
  paid_at             TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at        TIMESTAMPTZ,
  picked_up_at        TIMESTAMPTZ,
  delivered_at        TIMESTAMPTZ,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id             UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id         UUID REFERENCES menu_items(id),
  name                 VARCHAR(100) NOT NULL,  -- snapshot at time of order
  price                INTEGER NOT NULL,       -- kobo, snapshot
  quantity             INTEGER NOT NULL DEFAULT 1,
  customisations       JSONB DEFAULT '{}',
  special_instructions TEXT
);

-- Riders
CREATE TABLE riders (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  display_name   VARCHAR(40) NOT NULL,
  phone          VARCHAR(15) NOT NULL,
  photo_url      TEXT,
  id_doc_url     TEXT,
  bike_photo_url TEXT,
  vehicle_type   VARCHAR(50),
  is_approved    BOOLEAN DEFAULT false,
  is_online      BOOLEAN DEFAULT false,
  is_suspended   BOOLEAN DEFAULT false,
  current_lat    DECIMAL(10, 8),
  current_lng    DECIMAL(11, 8),
  last_seen      TIMESTAMPTZ,
  rating         DECIMAL(3, 2) DEFAULT 5.0,
  rating_count   INTEGER DEFAULT 0,
  total_trips    INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0,  -- kobo
  bank_name      VARCHAR(100),
  bank_account   VARCHAR(10),
  bank_code      VARCHAR(10),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Friendships
CREATE TABLE friendships (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status       ENUM('pending', 'accepted', 'declined', 'blocked') DEFAULT 'pending',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(requester_id, recipient_id)
);

-- Streaks
CREATE TABLE streaks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  current_streak  INTEGER DEFAULT 0,
  longest_streak  INTEGER DEFAULT 0,
  last_order_date DATE,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Streak Milestones
CREATE TABLE streak_milestones (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
  milestone_days INTEGER NOT NULL,
  achieved_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, milestone_days)
);

-- Social Posts
CREATE TABLE social_posts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id  UUID REFERENCES restaurants(id),
  order_id       UUID REFERENCES orders(id),
  caption        VARCHAR(280),
  photo_urls     TEXT[] NOT NULL,
  visibility     ENUM('friends', 'public') DEFAULT 'friends',
  likes_count    INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_flagged     BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Post Likes
CREATE TABLE post_likes (
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id    UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- Post Comments
CREATE TABLE post_comments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  content    VARCHAR(200) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Food Requests
CREATE TABLE food_requests (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id  UUID REFERENCES restaurants(id),
  items_snapshot JSONB NOT NULL,
  note           VARCHAR(100),
  status         ENUM('pending','accepted','declined','expired') DEFAULT 'pending',
  expires_at     TIMESTAMPTZ NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Rooms
CREATE TABLE chat_rooms (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Room Members
CREATE TABLE chat_room_members (
  chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  last_read_at TIMESTAMPTZ,
  PRIMARY KEY (chat_room_id, user_id)
);

-- Chat Messages
CREATE TABLE chat_messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id    UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  content      TEXT NOT NULL,
  type         ENUM('text', 'photo', 'post_share', 'restaurant_share') DEFAULT 'text',
  photo_url    TEXT,
  metadata     JSONB DEFAULT '{}',
  is_read      BOOLEAN DEFAULT false,
  read_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Promo Codes
CREATE TABLE promo_codes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code          VARCHAR(20) UNIQUE NOT NULL,
  type          ENUM('percent_off','flat_off','free_delivery'),
  discount_type ENUM('flat', 'percent'),
  value         INTEGER,  -- percent or kobo amount
  min_order     INTEGER DEFAULT 0,
  max_uses      INTEGER,
  uses_per_user INTEGER DEFAULT 1,
  used_count    INTEGER DEFAULT 0,
  expires_at    TIMESTAMPTZ,
  is_active     BOOLEAN DEFAULT true,
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Promo Code Usage
CREATE TABLE promo_code_uses (
  promo_code_id UUID REFERENCES promo_codes(id),
  user_id       UUID REFERENCES users(id),
  order_id      UUID REFERENCES orders(id),
  used_at       TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (promo_code_id, user_id, order_id)
);

-- Admin Logs
CREATE TABLE admin_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id    UUID REFERENCES users(id),
  action      VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id   UUID,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- User Credits (ad rewards)
CREATE TABLE user_credits (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  amount     INTEGER NOT NULL,  -- kobo
  source     ENUM('ad_reward', 'promo', 'refund', 'admin_grant'),
  expires_at TIMESTAMPTZ,
  used_at    TIMESTAMPTZ,
  order_id   UUID REFERENCES orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Real-Time Event Map (Socket.IO)

### Namespaces

- `/orders` — order status and rider tracking
- `/chat` — direct messages
- `/notifications` — push-style real-time notifications

### Socket.IO Rooms

| Room | Subscribers | Purpose |
|------|------------|---------|
| `order:{orderId}` | Customer, Rider, Restaurant | Order-specific updates |
| `restaurant:{restaurantId}` | Restaurant staff | New order alerts |
| `user:{userId}` | Individual user | Personal notifications, chat |
| `rider:{riderId}` | Rider | Assignment notifications |

### Client → Server Events

| Event | Emitted By | Payload |
|-------|-----------|---------|
| `rider:location_update` | Rider app | `{ riderId, lat, lng }` |
| `order:restaurant_confirm` | Restaurant app | `{ orderId, estimatedTime }` |
| `order:rider_pickup` | Rider app | `{ orderId }` |
| `order:rider_deliver` | Rider app | `{ orderId, photoUrl? }` |
| `chat:send_message` | Any user | `{ recipientId, content, type }` |
| `chat:typing` | Any user | `{ recipientId }` |
| `chat:read` | Any user | `{ userId, readAt }` |

### Server → Client Events

| Event | Received By | Payload |
|-------|------------|---------|
| `order:new` | Restaurant | `{ orderId, orderNumber, items, total, customerNote }` |
| `order:status_change` | Customer | `{ orderId, status, timestamp, estimatedMinutes }` |
| `order:assigned` | Rider | `{ order + pickup details }` |
| `order:rider_assigned` | Customer | `{ riderId, riderName, riderPhoto, riderRating, bikePlate }` |
| `order:delivered` | Customer | `{ orderId, deliveredAt, deliveryPhotoUrl }` |
| `rider:location` | Customer | `{ lat, lng, eta }` |
| `friend:order_placed` | Friends | `{ userId, restaurantName, category }` |
| `chat:message_received` | Recipient | `{ message object }` |
| `chat:typing` | Recipient | `{ senderId, isTyping }` |
| `notification:push` | Any user | `{ type, title, body, data, timestamp }` |

**Notification types:** `friend_order`, `gift_received`, `food_request`, `streak_risk`, `streak_milestone`

---

## Auth Flow

```
1. User enters phone number → POST /auth/send-otp
   Server calls Firebase Admin SDK to send OTP via Firebase Phone Auth

2. User enters OTP → POST /auth/verify-otp { phone, otp, firebaseIdToken }
   Client first verifies OTP with Firebase (returns firebaseIdToken)
   Server verifies firebaseIdToken with Firebase Admin SDK
   Server creates/fetches user record in PostgreSQL
   Server issues JWT access token (1hr) + refresh token (30 days)
   Server stores refresh token hash in Redis with user_id key

3. Authenticated requests → Authorization: Bearer {accessToken}
   Server middleware validates JWT signature + expiry
   Injects user object into request context

4. Token refresh → POST /auth/refresh { refreshToken }
   Server validates refresh token against Redis
   Issues new access token + new refresh token
   Invalidates old refresh token (rotation)

5. Logout → POST /auth/logout
   Server deletes refresh token from Redis
   Client clears all tokens from secure storage

Flutter secure storage: flutter_secure_storage package
JWT secret: 256-bit random secret in environment variables
```

---

## Payment Flow (Paystack)

```
1. User taps "Pay ₦X,XXX with Paystack"
   Client calls: POST /payments/initialize
   Body: { orderId, amount, email (generated: phone@foodx.ng) }
   Server initializes Paystack transaction: POST https://api.paystack.co/transaction/initialize
   Returns: { authorizationUrl, accessCode, reference }

2. Client opens Paystack modal/webview with authorizationUrl
   User completes payment (card / bank transfer / USSD)

3. Paystack sends webhook to: POST /payments/webhook/paystack
   Server verifies signature:
     hash = HMAC-SHA512(rawBody, PAYSTACK_SECRET_KEY)
     Compare with x-paystack-signature header
   Server processes event 'charge.success':
     - Find order by reference
     - Mark order as 'placed', set paid_at
     - Emit order:new to restaurant via Socket.IO
     - Send FCM push to customer: "Order confirmed!"
     - Queue fan-out job for friend order alerts

4. Client polls GET /payments/verify/{reference} as fallback
   (In case Paystack redirect fires before webhook)

5. Refunds (admin-triggered):
   POST https://api.paystack.co/refund
   Body: { transaction: paystackReference, amount (optional) }
   Full refund if amount omitted
```

---

## File Upload Flow (Cloudinary)

```
For profile photos and food post photos (client-side upload):
1. Client requests upload signature: GET /media/upload-signature
   Server returns: { signature, timestamp, apiKey, cloudName, folder }

2. Client uploads directly to Cloudinary:
   POST https://api.cloudinary.com/v1_1/{cloudName}/image/upload
   Form data: { file, signature, timestamp, api_key, folder, transformation }
   Returns: { secure_url, public_id, width, height }

3. Client sends secure_url to backend to save in DB

For rider/restaurant photos (server-side upload):
1. Client sends binary to: POST /media/upload
2. Server streams to Cloudinary using cloudinary SDK
3. Server saves secure_url to DB, returns to client

Transformations applied at upload:
  - Max width: 1200px
  - Max height: 1200px
  - Format: webp (auto-converted)
  - Quality: auto
  - Folder structure: foodx/{env}/{type}/{userId}/
```

---

## Push Notification Triggers (FCM)

| Event | Recipient | Title | Body |
|-------|-----------|-------|------|
| Order placed | Customer | "Order Confirmed! ✅" | "Your order from {restaurant} is being prepared." |
| Restaurant confirms | Customer | "It's confirmed 👨‍🍳" | "{restaurant} is on it. Est. {time} mins." |
| Rider assigned | Customer | "Rider on the way 🛵" | "{riderName} is picking up your order." |
| Order picked up | Customer | "Food picked up! 🍱" | "{riderName} has your food and is heading to you." |
| Order delivered | Customer | "Delivered! 🎉" | "Your order from {restaurant} has arrived. Enjoy!" |
| New order | Restaurant | "New Order! 🔔" | "Order #{orderNumber} just came in. ₦{total}" |
| Order cancelled | Customer | "Order Cancelled" | "Your order was cancelled. You won't be charged." |
| Gift received | Recipient | "You got a food gift! 🎁" | "{senderName} sent you food from {restaurant}." |
| Food request received | Recipient | "Someone's hungry 😅" | "{requesterName} is asking you to buy them food." |
| Friend ordered | Friend | "{name} just ordered 🍗" | "{name} ordered from {restaurant}. Check it out!" |
| Streak reminder | Customer | "Don't break your streak! 🔥" | "You haven't ordered today. Keep your {n}-day streak alive!" |
| Streak milestone | Customer | "New Badge Earned! 🏆" | "You've hit a {n}-day streak. You're on fire!" |
| Chat message | Recipient | "{senderName}" | "{messagePreview}" |

---

## Environment Variables

```bash
# Server
NODE_ENV=production
PORT=3000
API_URL=https://api.foodx.ng/v1
FRONTEND_URL=https://foodx.ng

# Database
DATABASE_URL=postgresql://user:password@host:5432/foodx

# Redis
REDIS_URL=redis://default:password@host:6379

# JWT
JWT_SECRET=<256-bit-random-secret>
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=30d

# Firebase
FIREBASE_PROJECT_ID=foodx-prod
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@foodx.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Paystack
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=foodx
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Google Maps
GOOGLE_MAPS_API_KEY=...

# FCM
FCM_SERVER_KEY=...

# Admin
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=

# App Config
PLATFORM_SERVICE_FEE=10000  # kobo (₦100)
MAX_RIDER_ASSIGN_ATTEMPTS=3
ORDER_AUTO_REJECT_SECONDS=60
```

---

## Hosting

| Service | Platform |
|---------|----------|
| Backend API | Railway (recommended) or Render |
| Web (Admin + Marketing) | Vercel |
| Database | Railway managed PostgreSQL or Supabase PostgreSQL |
| Redis | Railway managed Redis or Upstash |

---

## Local Development Setup

```bash
# Prerequisites
Node.js 20+, PostgreSQL 15+, Redis 7+, Flutter 3.19+

# Backend setup
git clone https://github.com/foodx/api
cd api
npm install
cp .env.example .env  # fill in values
npx prisma migrate dev
npx prisma db seed
npm run start:dev

# Web dashboard
git clone https://github.com/foodx/dashboard
cd dashboard
npm install
cp .env.example .env.local
npm run dev

# Flutter app
git clone https://github.com/foodx/app
cd app
flutter pub get
cp .env.example .env
flutter run
```

---

*For feature requirements that inform these technical decisions, see `05-feature-specs.md`. For environment-specific deployment notes, see `instructions.md`.*