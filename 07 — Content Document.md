# 07 — Content Document

> Every word in the FOODX app. Written in FOODX's voice: Gen Z, Nigerian, warm, social. Use this as the single source of truth for all UI copy.

---

## BRAND VOICE QUICK REFERENCE

**Warm:** Write like a friend who knows food.  
**Gen Z Nigerian:** Light on slang, heavy on warmth and cultural awareness.  
**Celebratory:** Every order, every streak, every gift is a moment worth marking.  
**Clear first:** Voice never gets in the way of clarity. If it's confusing, rewrite it plainly.

---

## ONBOARDING COPY

### Splash
- Tagline: `Food, friends, and the feeling.`

### Phone Entry Screen
- Heading: `What's your number?`
- Subtext: `We'll send you a one-time code. No passwords needed.`
- CTA: `Continue`

### OTP Verification Screen
- Heading: `Enter the code`
- Subtext: `Sent to [phone number]`
- Resend timer: `Didn't get it? Resend in 0:45`
- Resend CTA: `Resend code`
- Error (wrong code): `Wrong code. [X] tries left.`
- Error (locked out): `Too many tries. Wait 15 minutes before trying again.`
- CTA: `Verify`

### Profile Setup Screen
- Heading: `Set up your profile`
- Subtext: `This is how your friends will find you`
- Name field label: `Your name`
- Name placeholder: `e.g. Temi`
- Photo area label: `Add a photo`
- CTA: `Let's go 🔥`
- Skip photo: `Skip for now`

### Location Permission Screen
- Heading: `Where are we delivering?`
- Subtext: `We need your location so we can find restaurants near you.`
- CTA: `Allow location`
- Secondary: `Enter address manually`

### First Home Greeting (new user)
- `Welcome to FOODX, [Name] 👋`
- `Your friends are eating. You should too.`

---

## HOME FEED COPY

### Greeting (time-based)
- Morning (5am–12pm): `Good morning, [Name] 👋`
- Afternoon (12pm–5pm): `Good afternoon, [Name] 👋`
- Evening (5pm–9pm): `Good evening, [Name] 👋`
- Night (9pm–5am): `Night mode activated, [Name] 🌙`

### Sub-greeting prompts (rotating)
- `What are you eating today?`
- `Your friends are already ordering 👀`
- `Pick something good.`
- `Your next favourite meal is one tap away.`

### Friend Activity Strip
- Section label: `Friends eating now`
- Empty state (no friends with activity): `Your friends haven't ordered yet today. You go first 👑`
- No friends yet: *(strip hidden)*
- CTA on card: `Order same`

### Featured Restaurants section
- Label: `Order from these 🔥`
- Empty state: `No restaurants near you right now. We're expanding fast though 👀`

### Recent order shortcut
- `Pick up where you left off?`
- CTA: `Reorder from [Restaurant]`

### Promo banner
- Free delivery: `Free delivery on your first 3 orders 🎉`
- First 200 users: `You're one of our first 200. Free delivery, on us. 🙌`

---

## RESTAURANT BROWSING COPY

### Search
- Placeholder: `Search restaurants or dishes`
- Recent label: `Recent searches`
- No results: `We couldn't find "[query]". Try something else?`
- Category filters: `All · Burgers · Rice · Chicken · Pizza · Drinks · Sides · Snacks`

### Restaurant Card
- Closed badge: `Closed`
- Delivery time: `[min]–[max] min`
- Delivery fee: `₦[amount] delivery`
- Rating: `⭐ [4.3]`

### Restaurant Detail
- Open status: `Open now`
- Closed status: `Closed · Opens [time]`
- Min order note: `Min. order ₦[amount]`
- No items in category: `Nothing here yet. Come back soon!`

---

## CART & CHECKOUT COPY

### Cart Screen
- Header: `Your cart`
- Restaurant label: `From [Restaurant Name]`
- Note field label: `Add a note`
- Note placeholder: `e.g. Extra sauce, no onions`
- Subtotal: `Subtotal`
- Delivery fee: `Delivery fee`
- Discount label: `Promo discount`
- Total: `Total`
- CTA: `Proceed to checkout → ₦[amount]`
- Empty cart: `Your cart is empty 🛒 Add something tasty.`
- Cross-restaurant conflict modal title: `Start a new cart?`
- Conflict modal body: `Your cart has items from [Restaurant]. Adding from [New Restaurant] will clear it.`
- Conflict confirm: `Yes, clear cart`
- Conflict cancel: `Keep current cart`

### Checkout Screen
- Header: `Checkout`
- Delivery section label: `Delivering to`
- Change address: `Change`
- Order section label: `Your order`
- Payment section label: `Payment`
- Paystack label: `Pay with Paystack`
- Promo code label: `Promo code`
- Promo code placeholder: `Enter code`
- Promo CTA: `Apply`
- Promo success: `Code applied! You saved ₦[amount] 🎉`
- Promo error: `That code isn't valid or has expired.`
- CTA: `Pay ₦[amount]`
- Footer: `Powered by Paystack`
- Min order error: `Minimum order for this restaurant is ₦[amount]`
- Outside area error: `We don't deliver to this address yet. Choose a different one.`

### Order Confirmation Screen
- Heading: `Order placed! 🎉`
- Subtext: `Your food from [Restaurant] is on its way. Hang tight.`
- Order ID: `Order #[ID]`
- Estimated time: `Estimated delivery: [X]–[Y] mins`
- CTA: `Track your order`
- Social prompt: `Tell your friends what you ordered 👀`
- Social share CTA: `Share to feed`

---

## ORDER TRACKING COPY

### Status Labels
- `Placed`
- `Confirmed by restaurant`
- `Being prepared 👨‍🍳`
- `Rider assigned`
- `On the way 🛵`
- `Delivered ✅`
- `Cancelled`

### In-Progress Messages
- Restaurant confirmed: `[Restaurant] is cooking your food 🍳`
- Rider assigned: `[Rider name] is on the way to pick it up`
- En route: `[Rider name] is heading to you`
- Running late (>45 min): `Running a bit late 😬 We're on it.`

### ETA Chip
- `Arriving in ~[X] min`
- `Almost there!` (< 5 min)

### Delivery Confirmation
- Heading: `Your food is here! 🍔`
- Subtext: `Hope it hits different today.`
- CTA: `Rate your experience`
- Secondary CTA: `Share this meal`

### Rating Screen
- Heading: `How was it?`
- Rider rating label: `Rate your rider`
- Food rating label: `Rate your food`
- Comment placeholder: `Anything to add? (optional)`
- CTA: `Submit`
- Skip: `Skip`

---

## SOCIAL FEED COPY

### Feed Prompt
- `What are you eating? 🍔`
- *(tappable area that opens post creation)*

### Empty Feed
- `Looks quiet here. Be the first to post what you're eating 📸`

### Post Creation
- Header: `New post`
- Caption placeholder: `Say something about this meal...`
- Tag restaurant: `Tag a restaurant`
- Visibility label: `Who can see this?`
- Friends option: `Friends only`
- Public option: `Everyone`
- CTA: `Share it 🚀`
- Photo required error: `Add a photo first 📸`
- Caption too long: `Keep it under 280 characters`

### Post Actions
- Like: `❤️ [count]`
- Comment: `💬 [count]`
- Share: `↗`
- Order same: `Order same`

### Post Timestamp
- Just now: `just now`
- Minutes: `[X]m ago`
- Hours: `[X]h ago`
- Days: `[X]d ago`

---

## STREAK COPY

### Streak Display (Profile)
- `🔥 [X]-day streak`
- `No streak yet` (if 0)

### Streak Milestone Messages
- Day 3: `Three days strong! You're building something. 🔥`
- Day 7: `A whole week?! You're the FOODX MVP. 🏆`
- Day 14: `Two weeks of ordering. We see you. 👑`
- Day 30: `30 days. A whole month. You're a legend. 🔥🔥🔥`

### Streak Reset
- Push notification: `Your streak ended 😔 But starting fresh is still a W. Order today.`
- In-app: `Streak reset. Let's build it back up 💪`

### Streak Warning (no order by 8pm)
- Push: `Don't break your [X]-day streak! Order something before midnight 🔥`

---

## GIFTING COPY

### Gift Food Flow
- Header: `Send food`
- Friend selector label: `Who are you gifting?`
- Search placeholder: `Search friends`
- Message label: `Add a message`
- Message placeholder: `e.g. Happy birthday! 🎂 Enjoy this.`
- CTA: `Send the gift 🎁`

### Gift Received (Recipient)
- Notification title: `You got gifted food! 🎁`
- Notification body: `[Name] sent you food from [Restaurant]`
- In-app heading: `[Name] sent you food! 🎁`
- Message: `"[their message]"`
- CTA: `See what's coming`

### Gift Sent Confirmation
- `Gift sent! 🎁 [Name] is about to be very happy.`

### Gift Error — Outside Area
- `Your friend is outside our delivery area right now. Try when we expand!`

---

## FOOD REQUEST COPY

### Send Request
- Header: `Ask for food`
- Friend selector label: `Who do you want to ask?`
- Item label: `What do you want? (optional)`
- Item placeholder: `e.g. Jollof rice from Chicken Republic`
- Message placeholder: `Add a note for your friend...`
- CTA: `Send request 🙏`

### Request Received (Recipient)
- Notification: `[Name] is hungry 😅 They're asking you to buy them food.`
- In-app heading: `[Name] is asking for food`
- Request message shown
- CTA: `Accept and order for them ❤️`
- Decline: `Decline`

### Request Expired
- `This food request expired. They must have sorted themselves out 😅`

### Request Accepted
- To requester: `[Name] accepted your request! Food is on the way 🎉`

### Request Declined
- To requester: `[Name] couldn't do it this time. The audacity 😂`

---

## IN-APP CHAT COPY

### Chat List
- Empty state: `No conversations yet. Start by messaging a friend.`
- Timestamp: `just now / [X]m / [X]h / [weekday] / [date]`

### Chat Thread
- Message placeholder: `Message [Name]...`
- Send food shortcut: `Send food 🍔`
- Typing indicator: `[Name] is typing...`
- Failed message: `Tap to retry`
- Photo send CTA: `📷`

---

## PUSH NOTIFICATION TEMPLATES

*(See full list in `06-technical-architecture.md` — Notifications section)*

Additional templates:

| Event | Title | Body |
|-------|-------|------|
| Friend request | `[Name] wants to be friends` | `Tap to accept their request on FOODX` |
| Friend accepted | `[Name] accepted your request! 🙌` | `You can now see their food activity` |
| New comment on post | `[Name] commented` | `"[first 50 chars of comment]"` |
| New like | `[Name] liked your post ❤️` | *(no body needed)* |
| App update | `FOODX just got better` | `Update now to get the latest features` |

---

## ERROR MESSAGES

| Error Type | Message |
|-----------|---------|
| No internet | `No internet connection. Check your signal and try again.` |
| Server error | `Something went wrong on our end. Try again in a moment.` |
| Session expired | `You've been logged out. Sign in again to continue.` |
| Photo upload fail | `Couldn't upload your photo. Try again.` |
| Payment failed | `Payment didn't go through. Try a different card or bank.` |
| Payment timeout | `Your payment session expired. Start checkout again.` |
| Rider unavailable | `No riders available right now. Hang tight — we're working on it.` |
| Restaurant offline | `[Restaurant] isn't accepting orders right now. Try another.` |
| Location unavailable | `Couldn't get your location. Enter your address manually.` |
| OTP fail | `Wrong code. [X] tries left.` |
| Lockout | `Too many tries. Wait 15 minutes before trying again.` |

---

## EMPTY STATES

| Screen | Message |
|--------|---------|
| Order history (no orders) | `No orders yet. Your first one is just a tap away.` |
| Social feed (no posts) | `Looks quiet here. Be the first to post what you're eating 📸` |
| Friends list (no friends) | `You haven't added any friends yet. Find people you know.` |
| Notifications (none) | `All caught up! Nothing new right now.` |
| Chat list (no chats) | `No conversations yet. Say hello to a friend.` |
| Search results (none) | `We couldn't find "[query]". Try something else?` |
| Restaurant menu (no items) | `This restaurant is still setting up their menu. Check back soon.` |

---

## MARKETING WEBSITE COPY (Landing Page)

### Hero Section
- Headline: `Food, friends, and the feeling.`
- Subheadline: `FOODX is the food delivery app built for how Gen Z actually eats — together. Order, share, gift, and flex.`
- CTA: `Get early access`
- Secondary CTA: `See how it works`

### Feature 1 — Delivery
- Headline: `Order in minutes. Track in real time.`
- Body: `Restaurants you know, food you love, at your door. Real-time tracking so you always know where your order is.`

### Feature 2 — Social
- Headline: `Your friends are eating. Now you'll know about it.`
- Body: `See what your friends are ordering, post your food moments, and discover your next favourite spot through the people you trust.`

### Feature 3 — Gifting
- Headline: `Send food. Make someone's day.`
- Body: `Gift a meal to a friend. Request food from your people. FOODX makes food a love language.`

### Feature 4 — Streaks
- Headline: `Keep the streak. Hold the crown.`
- Body: `Order every day, build your streak, and let your profile show everyone you're serious about the food life. 🔥`

### Social Proof
- `Launching in Ibadan first. You should be there from day one.`

### Download CTA Section
- Heading: `Ready to eat?`
- Body: `Join the first 200 users and get free delivery. FOODX is coming to Ibadan.`
- CTA: `Join the waitlist`

### Footer
- `FOODX — Ibadan, Nigeria 🇳🇬`
- `Made for the culture.`

---

## References

- All voice rules → `01-product-brief.md` (Tone & Voice section)
- Where copy appears in screens → `03-wireframe-flows.md`
- Push notification triggers → `06-technical-architecture.md`