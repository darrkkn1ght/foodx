# 03 — FOODX Wireframe Flows

> Structured text wireframes for every key screen. These are AI IDE implementation instructions, not Figma specs. For visual treatment, see `04-design-system.md`. For copy, see `07-content-doc.md`.

---

## Reading This Document

Each screen is described as:
- **Layout structure** (header / body / footer)
- **Element list** with position and behaviour
- **Interactive states** (default, loading, empty, error)
- **Navigation triggers**

ASCII layout uses: `[ ]` for containers, `( )` for buttons, `___` for inputs, `###` for images/media.

---

## 1. Onboarding Flow

### Screen 1 — Welcome

```
┌─────────────────────────────────┐
│                                 │  ← Status bar (system)
│                                 │
│         [FOODX logo]            │  ← Centered, white on black
│                                 │
│   [###  Illustration  ###]      │  ← Full-width illustration:
│   [ food + friends + phones ]   │    friends eating together, phones visible
│                                 │
│   "Food is better               │  ← Display heading, white, centered
│    when it's shared."           │
│                                 │
│   "Order food, share the moment,│  ← Body text, muted white, centered
│    connect with your people."   │
│                                 │
│                                 │
│   (         Get Started        )│  ← Primary green button, full width
│                                 │
│   Already have an account? Log in│  ← Text link, centered, muted
│                                 │
│  ● ○ ○                          │  ← Page indicator dots, centered bottom
└─────────────────────────────────┘
```

**States:** Only one state (static). Auto-advances dot on swipe.  
**Navigation:** Get Started → Screen 2 | Log in → Phone Number Entry

---

### Screen 2 — Social Layer

```
┌─────────────────────────────────┐
│                                 │
│   [###  Friend Activity  ###]   │  ← Illustration: 3 friends, food photos floating
│                                 │
│   "See what your crew          │
│    is eating."                  │  ← Display heading
│                                 │
│   "Get notified when friends    │
│    order. React. Respond.       │
│    Send them food."             │  ← Body text, muted
│                                 │
│   (           Next             )│  ← Primary green button
│                                 │
│   Skip                          │  ← Text link, right-aligned
│                                 │
│  ○ ● ○                          │  ← Dot 2 active
└─────────────────────────────────┘
```

---

### Screen 3 — Food Gifting

```
┌─────────────────────────────────┐
│                                 │
│   [###  Gift Illustration  ###] │  ← Box with food + ribbon, floating to friend
│                                 │
│   "Buy food for your           │
│    people. Or ask nicely."      │  ← Display heading (note the playful tone)
│                                 │
│   "Send a full meal to a        │
│    friend. Or request one.      │
│    Food is love."               │  ← Body text
│                                 │
│   (        Let's Go            )│  ← Primary green button
│                                 │
│  ○ ○ ●                          │  ← Dot 3 active
└─────────────────────────────────┘
```

---

## 2. OTP Auth Flow

### Phone Number Entry

```
┌─────────────────────────────────┐
│  ←  Back                        │  ← Back nav (goes to onboarding)
│                                 │
│  "Enter your phone number"      │  ← Heading, left-aligned
│  "We'll send you a code"        │  ← Subtext, muted
│                                 │
│  ┌──────┬──────────────────────┐│
│  │ 🇳🇬   │  080 ___ ___ ___    ││  ← Country flag + code selector | Phone input
│  │ +234 │                      ││    Numeric keyboard auto-opens
│  └──────┴──────────────────────┘│
│                                 │
│  [i] Standard messaging rates   │  ← Small disclaimer
│      may apply                  │
│                                 │
│                                 │
│   (      Send Code             )│  ← Disabled until 10 digits entered, then green
│                                 │
│  By continuing, you agree to    │
│  our Terms and Privacy Policy   │  ← Tappable links inline
└─────────────────────────────────┘
```

**Loading state:** Button shows spinner, input disabled.  
**Error state:** Red border on input, error message below ("Something went wrong. Try again.")

---

### OTP Verification

```
┌─────────────────────────────────┐
│  ←  Back                        │
│                                 │
│  "Enter the 6-digit code"       │  ← Heading
│  "Sent to +234 803 123 4567"    │  ← Shows masked number, muted
│                                 │
│  ┌───┬───┬───┬───┬───┬───┐     │
│  │ _ │ _ │ _ │ _ │ _ │ _ │     │  ← 6 individual digit boxes
│  └───┴───┴───┴───┴───┴───┘     │    Each is ~48px square
│                                 │    Auto-advances focus on input
│                                 │    Auto-submits on 6th digit
│  Resend code in  0:45           │  ← Countdown timer, grey
│  (becomes tappable at 0:00)     │
│                                 │
│  ← Wrong number? Change it      │  ← Text link
└─────────────────────────────────┘
```

**Error state (wrong OTP):** All 6 boxes turn red, shake animation, clear all inputs.  
**Loading state (verifying):** Boxes replaced with spinner.

---

## 3. Home Screen

```
┌─────────────────────────────────┐
│ FOODX          📍 Bodija    🔔  │  ← Top bar: logo | location | notifications
│─────────────────────────────────│
│                                 │
│ Good evening, Tolu 👋           │  ← Greeting, personalized + time-based
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🛵 Your order is on the way!│ │  ← Active order banner (only if order active)
│ │ Chicken Republic → delivered │ │    Tap to open tracking
│ │ in ~8 mins         [Track →]│ │
│ └─────────────────────────────┘ │
│                                 │
│ ─── Your crew is eating ────    │  ← Section label, small caps style
│ [Ade: Suya][Bimpe: Jollof][+3] │  ← Horizontal scroll, friend avatars + food name
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🎁  FREE DELIVERY TODAY     │ │  ← Promo carousel (swipeable)
│ │     First 200 users only    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ─── Order Again ────────────── │  ← Only shown to returning users
│ [Chicken Republic][Item 7]      │  ← Horizontal scroll
│                                 │
│ ─── What are you feeling? ──── │  ← Category chips
│ [All][Rice][Chicken][Shawarma]  │  ← Horizontal scroll, green active state
│ [Soup][Snacks][Drinks]          │
│                                 │
│ ┌────────────────────────────┐  │
│ │ ###  Chicken Republic  ### │  │  ← Restaurant card
│ │ Nigerian • ⭐ 4.7 • 20 min │  │    Image top, details below
│ │ Delivery: ₦300             │  │
│ └────────────────────────────┘  │
│ ┌────────────────────────────┐  │
│ │ ###      Item 7       ###  │  │
│ │ Local • ⭐ 4.5 • 30 min    │  │
│ │ Delivery: ₦200             │  │
│ └────────────────────────────┘  │
│          (scroll continues)     │
│─────────────────────────────────│
│  🏠 Home  🔍 Explore  📷 Social  👤 Profile │  ← Bottom nav
└─────────────────────────────────┘

         [🛒 2 items • ₦4,800]   ← Floating cart button (appears when cart has items)
                                    Bottom center, above nav bar
```

**Empty state (new user, no friends):** Friend strip replaced with "Add friends to see what they're eating" + invite button.  
**Loading state:** Skeleton loaders for restaurant cards, shimmer animation.

---

## 4. Restaurant Detail Screen

```
┌─────────────────────────────────┐
│ ←     [### Restaurant Photo ###]│  ← Hero image full width, back arrow overlaid
│         ♡ Save    ↗ Share       │  ← Action buttons top right, overlaid on photo
│─────────────────────────────────│
│                                 │
│ Chicken Republic                │  ← Restaurant name, H2
│ ⭐ 4.7 (312 ratings)   🟢 Open  │  ← Rating + open status
│                                 │
│ 🛵 20–30 min  •  ₦300 delivery  │  ← Meta row
│ Minimum order: ₦1,500           │
│                                 │
│─────────────────────────────────│
│ [Burgers][Chicken][Sides][Drinks]│  ← Sticky category tabs (scroll horizontally)
│─────────────────────────────────│
│                                 │
│ Burgers                         │  ← Category header
│                                 │
│ ┌────────────────────────────┐  │
│ │ ###  │ Zinger Burger       │  │  ← Menu item card
│ │ img  │ Crispy chicken with │  │    60px image left, text right
│ │      │ lettuce & mayo      │  │
│ │      │ ₦2,800          [+] │  │    + button (adds to cart)
│ └────────────────────────────┘  │
│                                 │
│ ┌────────────────────────────┐  │
│ │ ### │ Classic Chicken      │  │
│ │     │ 2 pieces, coleslaw   │  │
│ │     │ ₦3,200           [+] │  │
│ └────────────────────────────┘  │
│                                 │
│ (         View Cart  •  ₦6,000 )│  ← Sticky bottom button (shows when cart has items)
│─────────────────────────────────│
│  🏠   🔍   📷   👤             │
└─────────────────────────────────┘
```

---

## 5. Cart Screen (Bottom Sheet)

```
┌─────────────────────────────────┐
│  ─── handle ───                 │  ← Sheet drag handle
│                                 │
│ Your Order                      │  ← Header
│ From Chicken Republic           │  ← Subtitle, muted
│─────────────────────────────────│
│                                 │
│ Zinger Burger           ₦2,800  │
│ [−] 1 [+]    🗑 Remove          │  ← Quantity controls + remove
│                                 │
│ Classic Chicken         ₦3,200  │
│ [−] 2 [+]    🗑 Remove          │
│                                 │
│ + Add more items                │  ← Link back to restaurant
│─────────────────────────────────│
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🏷 Promo code     [Apply]   │ │  ← Promo code input row
│ └─────────────────────────────┘ │
│                                 │
│ Subtotal          ₦9,200        │
│ Delivery fee      ₦300          │
│ Service fee       ₦100          │
│ ─────────────────────────────   │
│ Total             ₦9,600        │  ← Bold, larger font
│                                 │
│ (      Proceed to Checkout     )│  ← Primary green button
└─────────────────────────────────┘
```

**Empty cart:** Sheet shows empty state — "Your cart is empty. Let's fix that." + browse button.

---

## 6. Checkout Screen

```
┌─────────────────────────────────┐
│ ←  Checkout                     │  ← Navigation bar
│─────────────────────────────────│
│                                 │
│ 📍 Delivery Address             │  ← Section header
│ ┌─────────────────────────────┐ │
│ │ 15 Awolowo Ave, Bodija      │ │  ← Saved address card
│ │ Apartment 4B                │ │
│ │               [Change →]    │ │
│ └─────────────────────────────┘ │
│ + Add a new address             │
│                                 │
│─────────────────────────────────│
│ 🕐 Estimated delivery: 25–35 min│
│─────────────────────────────────│
│                                 │
│ 🗒 Note for restaurant          │  ← Optional field
│ ┌─────────────────────────────┐ │
│ │ e.g. "Extra spicy please"   │ │  ← Placeholder, light text
│ └─────────────────────────────┘ │
│                                 │
│─────────────────────────────────│
│ 💳 Payment Method               │
│                                 │
│ ○  •••• •••• •••• 4532          │  ← Saved card radio option
│ ●  Add new card                 │  ← Selected: opens Paystack widget
│                                 │
│─────────────────────────────────│
│ Order Summary                   │  ← Collapsed accordion, tap to expand
│ Total: ₦9,600                   │
│─────────────────────────────────│
│                                 │
│ (   Pay ₦9,600 with Paystack   )│  ← Primary button, green
│                                 │
│ 🔒 Secured by Paystack          │  ← Trust signal, small grey text
└─────────────────────────────────┘
```

---

## 7. Order Tracking Screen

```
┌─────────────────────────────────┐
│ ←  Tracking your order          │
│─────────────────────────────────│
│                                 │
│ [###########  MAP  ###########] │  ← Google Maps / MapBox embed
│ [  📍 Restaurant                │    Rider pin animates in real time
│     ──── route ────             │    Customer pin at delivery address
│              📍 You           ] │
│                                 │
│─────────────────────────────────│
│                                 │
│ Order confirmed ✅              │
│ ─●────○────○────○────○──       │  ← Progress: Placed → Confirmed → Preparing
│  ✅   🔵   ○    ○    ○          │    → Picked Up → Delivered
│                                 │    Green = done, Blue = current, Grey = pending
│ Preparing your order...         │  ← Current status label, animated ellipsis
│ Estimated: ~18 minutes          │
│                                 │
│─────────────────────────────────│
│                                 │
│ [###] Emeka (Rider)   ⭐ 4.8    │  ← Rider card (appears after pickup)
│ Honda CB  •  KWS 234 AB        │    Photo, name, rating, bike + plate
│                (📞 Call) (💬 Chat)│  ← Action buttons
│                                 │
│─────────────────────────────────│
│ Order #FDX-00234               │  ← Collapsed summary, tap to expand
│ Chicken Republic  •  ₦9,600    │
└─────────────────────────────────┘
```

**Post-delivery state:** Map replaced with ✅ animation, status shows Delivered, "Rate your experience" and "Share this moment" buttons appear.

---

## 8. Social Feed Screen

```
┌─────────────────────────────────┐
│ Social                    🔔    │  ← Tab header + notifications
│─────────────────────────────────│
│ [Friends] [Trending]            │  ← Tab switcher
│─────────────────────────────────│
│                                 │
│ ┌─────────────────────────────┐ │  ← Post composer (sticky top)
│ │ [👤] What did you eat today?│ │    Tapping opens Create Post
│ └─────────────────────────────┘ │
│                                 │
│ ─────────────────────────────   │
│ [👤] Tolu Adeyemi   2 min ago   │  ← Post card
│ 📍 Chicken Republic, Bodija     │
│                                 │
│ [######## Food Photo ########]  │  ← Full-width food photo
│                                 │
│ "This jollof rice will change   │
│  your life I'm not lying 😭🔥"  │  ← Caption
│                                 │
│ ❤️ 24  💬 8   ↗ Share           │  ← Reaction row
│                                 │
│ ─────────────────────────────   │
│ (next post...)                  │
└─────────────────────────────────┘
```

**Empty state (no friends have posted):** Illustration + "None of your friends have posted yet. You go first!" + "Share what you ate" button.

---

## 9. User Profile Screen

```
┌─────────────────────────────────┐
│                        [Edit]   │  ← Edit profile button top right (own profile)
│                                 │
│        [### Avatar ###]         │  ← Profile photo, centered, 80px circle
│                                 │
│         Tolu Adeyemi            │  ← Display name, centered
│         @toluade                │  ← Username handle, muted, centered
│         "Eating my way through  │  ← Bio, centered, muted
│          Ibadan 🍽️"             │
│                                 │
│  ┌──────────┬──────────┬──────┐ │
│  │   🔥 14  │  🛒  47  │ 👥 23│ │  ← Stats row: Streak | Orders | Friends
│  │  Day     │  Orders  │ Friends│ │
│  └──────────┴──────────┴──────┘ │
│                                 │
│  [Add Friend] [Message]         │  ← Actions (shown on other people's profiles)
│                                 │
│─────────────────────────────────│
│                                 │
│ [###][###][###]                 │  ← Food posts grid (3 columns, Instagram-style)
│ [###][###][###]                 │
│ [###][###][###]                 │
│                                 │
└─────────────────────────────────┘
```

---

## 10. Streaks Dashboard

```
┌─────────────────────────────────┐
│ ←  Your Streak                  │
│─────────────────────────────────│
│                                 │
│         🔥                      │  ← Large animated flame icon (bouncing)
│         14                      │  ← Streak count, very large (display font, green)
│     Day Streak                  │  ← Label
│                                 │
│  "You're on fire! Keep it up."  │  ← Dynamic message based on streak length
│                                 │
│─────────────────────────────────│
│                                 │
│ ─── Last 30 Days ───            │
│ [M][T][W][T][F][S][S]  ← week 1 │  ← Calendar heatmap
│ [●][●][●][○][●][●][●]           │    Green = ordered, Empty = missed
│ [●][●][●][●][●][●][●]           │
│ [●][●][●][●][●][●][●]           │
│ [●][●][○][●][●][●][●]  ← today  │
│                                 │
│─────────────────────────────────│
│                                 │
│ ─── Milestones ───              │
│ ✅ 3-Day Starter       (earned) │  ← Badge list
│ ✅ Week Warrior  7 days (earned) │
│ 🔒 Two Weeks    14 days         │  ← Next milestone, locked with progress
│    ████████░░░  [12/14]         │
│ 🔒 Monthly Legend  30 days      │
│                                 │
│─────────────────────────────────│
│ ─── Friends' Streaks ───        │
│ 1. Bimpe Akin  🔥 21 days       │  ← Leaderboard
│ 2. You         🔥 14 days       │
│ 3. Ade Okon    🔥 9 days        │
└─────────────────────────────────┘
```

---

## 11. Food Gifting Flow

### Step 1: Choose Recipient

```
┌─────────────────────────────────┐
│ ←  Send Food to a Friend        │
│─────────────────────────────────│
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔍 Search friends...        │ │  ← Search input
│ └─────────────────────────────┘ │
│                                 │
│ Your Friends                    │
│                                 │
│ [👤] Bimpe Akin         [Select]│  ← Friend row with select button
│ [👤] Ade Okonkwo        [Select]│
│ [👤] Chioma Eze         [Select]│
│                                 │
│ Recently gifted                 │
│ [👤] Tunde Bello        [Select]│
└─────────────────────────────────┘
```

### Step 3: Confirm & Pay

```
┌─────────────────────────────────┐
│ ←  Confirm Gift                 │
│─────────────────────────────────│
│                                 │
│ 🎁 Sending to Bimpe Akin        │  ← Recipient summary
│                                 │
│ 📍 Delivering to:               │
│ 15 Queen Elizabeth Rd, UI Campus│  ← Recipient's saved address
│                                 │
│ ─── What you're sending ─────   │
│ Zinger Burger  x1    ₦2,800     │
│ Chicken Fries  x1    ₦1,500     │
│                                 │
│ Subtotal             ₦4,300     │
│ Delivery             ₦300       │
│ Total                ₦4,600     │
│                                 │
│ ✍️ Add a message (optional)     │
│ ┌─────────────────────────────┐ │
│ │ e.g. "Enjoy! You deserve it"│ │
│ └─────────────────────────────┘ │
│                                 │
│ (    Send this Gift  ₦4,600   ) │  ← Green button, Paystack payment
└─────────────────────────────────┘
```

---

## 12. Rider App — Active Order

```
┌─────────────────────────────────┐
│ Active Delivery        ⚠️ Help  │
│─────────────────────────────────│
│                                 │
│ ─● Pick Up ──○ On the Way ──○─  │  ← Status progress
│                                 │
│ 📍 Pick Up From:                │
│ Chicken Republic                │
│ 14 Dugbe Rd, Ibadan             │
│                                 │
│ (   Navigate to Restaurant    ) │  ← Opens Google Maps with restaurant coords
│                                 │
│─────────────────────────────────│
│                                 │
│ Order #FDX-00234               │
│ Zinger Burger  x1               │  ← Items list
│ Classic Chicken  x2             │
│ Special note: "Extra spicy"     │
│                                 │
│─────────────────────────────────│
│                                 │
│ Customer: T. Adeyemi    📞      │  ← Masked customer contact
│ Delivering to: Bodija           │  ← General area only (privacy)
│                                 │
│ Your earnings: ₦450             │
│                                 │
│ (      Confirm Pickup  📷     ) │  ← Takes photo of food before leaving restaurant
│                                 │
│ ⚠️ Report a problem             │
└─────────────────────────────────┘
```

---

## 13. Restaurant Dashboard — Order Queue

```
┌─────────────────────────────────────────────────┐
│ FOODX Dashboard    Chicken Republic    ● Online  │  ← Header bar
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌─────────┬─────────────┬───────────────────┐   │
│ │ NEW (2) │ PREPARING(3)│  READY (1)        │   │  ← Kanban columns
│ │─────────│─────────────│───────────────────│   │
│ │ #00234  │   #00231    │     #00228        │   │
│ │ 3 items │   5 items   │     2 items       │   │
│ │ ₦9,600  │   ₦15,200   │     ₦4,100        │   │
│ │ 2min ago│  18min ago  │    32 min ago     │   │
│ │ 0:58 ⏱️ │             │                   │   │  ← Timer on new orders
│ │[Accept] │  [Ready ✓]  │  [Rider assigned] │   │
│ │[Reject] │             │                   │   │
│ └─────────┴─────────────┴───────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**New order alert:** Audio ping + red badge on browser tab + order card pulses green.  
**Auto-reject:** If not accepted within 60 seconds, order auto-rejects and customer is notified.

---

## Navigation Summary

### Customer App Tab Flow
```
Home ←→ Explore ←→ Social ←→ Profile
  ↓          ↓         ↓         ↓
Restaurant  Search  PostDetail  Settings
  ↓
 Cart → Checkout → Tracking
```

### Modal / Sheet Flows (appear over any tab)
```
Cart (floating button) → Checkout → Tracking
Gifting → Choose Friend → Choose Food → Confirm → Sent
Request → Choose Friend → Choose Food → Sent
Incoming Request → Accept/Decline
Notification → Deep link to relevant screen
```

---

*All copy referenced in these wireframes is defined in `07-content-doc.md`. All visual styling is defined in `04-design-system.md`. Screen priority is defined in `02-app-structure.md`.*