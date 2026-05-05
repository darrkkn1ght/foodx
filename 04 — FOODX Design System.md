# 04 — FOODX Design System

> The complete visual and interaction language for FOODX. Every UI decision flows from this document. Reference it from `09-prompt-pack.md` prompts and `03-wireframe-flows.md` implementations.

---

## Typography

**Chosen font stack: Space Grotesk + DM Sans**

**Why not Inter or Arial?** Inter is the default for every SaaS product. Arial is legacy. FOODX needs personality — a typeface that feels contemporary, slightly geometric, and culturally confident. Space Grotesk has quirky character in its letterforms (especially the capital G and R) that reads as creative and distinct. DM Sans is highly legible at small sizes and excellent for body copy in mobile contexts.

**Google Fonts CDN:**
```
Space Grotesk: 300, 400, 500, 600, 700
DM Sans: 300, 400, 500
```

### Type Scale

| Token | Font | Size | Weight | Line Height | Usage |
|-------|------|------|--------|-------------|-------|
| `display-xl` | Space Grotesk | 40px | 700 | 1.1 | Hero moments, streak numbers |
| `display-lg` | Space Grotesk | 32px | 700 | 1.15 | Onboarding headlines |
| `display-md` | Space Grotesk | 24px | 600 | 1.2 | Screen titles |
| `heading-lg` | Space Grotesk | 20px | 600 | 1.3 | Section headers, restaurant names |
| `heading-md` | Space Grotesk | 18px | 600 | 1.3 | Card titles, modal headers |
| `heading-sm` | Space Grotesk | 16px | 500 | 1.4 | Item names, labels |
| `body-lg` | DM Sans | 16px | 400 | 1.6 | Primary body copy |
| `body-md` | DM Sans | 14px | 400 | 1.6 | Secondary body, descriptions |
| `body-sm` | DM Sans | 12px | 400 | 1.5 | Captions, timestamps, meta |
| `label-lg` | DM Sans | 14px | 500 | 1.4 | Button labels, tab labels |
| `label-sm` | DM Sans | 12px | 500 | 1.4 | Badge text, chip labels |
| `mono` | JetBrains Mono | 13px | 400 | 1.5 | Order numbers, codes |

---

## Color System

### Dark Mode (Primary — FOODX Default)

```
Background Hierarchy:
  bg-base:       #0F0F0F   ← App background
  bg-surface:    #1A1A1A   ← Cards, containers
  bg-elevated:   #252525   ← Modals, bottom sheets
  bg-overlay:    #2E2E2E   ← Input backgrounds, chips

Brand:
  green-primary:   #1A7A3C   ← Primary actions, brand moments
  green-light:     #22A050   ← Hover states, active chips
  green-subtle:    #0D3D1E   ← Green backgrounds, tinted surfaces
  green-text:      #4DC97A   ← Green text on dark backgrounds

Text:
  text-primary:    #FFFFFF   ← Primary content
  text-secondary:  #B0B0B0   ← Supporting copy, meta
  text-muted:      #666666   ← Placeholders, disabled
  text-inverse:    #0F0F0F   ← Text on green backgrounds

Borders:
  border-default:  #2E2E2E   ← Subtle dividers
  border-strong:   #444444   ← Card borders
  border-focus:    #1A7A3C   ← Input focus ring

Semantic:
  success-bg:      #0D3D1E
  success-text:    #4DC97A
  error-bg:        #3D0D0D
  error-text:      #FF6B6B
  warning-bg:      #3D2D00
  warning-text:    #FFB84D
  info-bg:         #0D1F3D
  info-text:       #4D9FFF
```

### Light Mode

```
Background Hierarchy:
  bg-base:       #F7F7F5   ← App background
  bg-surface:    #FFFFFF   ← Cards, containers
  bg-elevated:   #FFFFFF   ← Modals (shadow-differentiated)
  bg-overlay:    #F0F0EE   ← Input backgrounds

Brand:
  green-primary:   #1A7A3C   ← Same across modes
  green-light:     #156632   ← Darker for hover on white
  green-subtle:    #E8F5EE   ← Light green tinted surfaces
  green-text:      #1A7A3C   ← Green text on light backgrounds

Text:
  text-primary:    #111111
  text-secondary:  #555555
  text-muted:      #999999
  text-inverse:    #FFFFFF

Borders:
  border-default:  #EBEBEB
  border-strong:   #CCCCCC
  border-focus:    #1A7A3C
```

### Streak & Gamification Colors

```
streak-flame:    #FF6B1A   ← Orange flame icon
streak-glow:     #FF8C42   ← Flame glow effect
streak-cold:     #4D9FFF   ← Broken streak state
milestone-gold:  #FFD700   ← Achievement gold
milestone-bg:    #2D2400   ← Gold milestone background (dark)
```

---

## Spacing System

Base unit: **8px**

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon gaps, tight inline spacing |
| `space-2` | 8px | Component internal padding |
| `space-3` | 12px | Between related elements |
| `space-4` | 16px | Standard component padding |
| `space-5` | 20px | Card padding |
| `space-6` | 24px | Section spacing |
| `space-8` | 32px | Large section gaps |
| `space-10` | 40px | Screen-level padding, hero spacing |
| `space-12` | 48px | Major section breaks |
| `space-16` | 64px | Hero sections |

**Screen horizontal padding:** 16px (left and right)  
**Card padding:** 16px (all sides)  
**Bottom nav safe area:** 16px + device safe area inset

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Chips, tags, small badges |
| `radius-md` | 10px | Buttons, inputs, small cards |
| `radius-lg` | 16px | Cards, bottom sheets |
| `radius-xl` | 24px | Large modals, hero cards |
| `radius-full` | 9999px | Avatars, pill badges, floating buttons |

---

## Button Styles

### Primary Button
```
Background: green-primary (#1A7A3C)
Text: white, label-lg (14px, 500)
Border radius: radius-md (10px)
Height: 52px
Padding: 0 24px
Width: Full width (in forms/checkout) or fit-content (inline)

States:
  Default:  bg #1A7A3C
  Hover:    bg #22A050
  Pressed:  bg #156632, scale 0.98
  Disabled: bg #2E2E2E, text #666666
  Loading:  bg #1A7A3C, spinner replaces label
```

### Secondary Button
```
Background: transparent
Border: 1.5px solid border-strong (#444444 dark / #CCCCCC light)
Text: text-primary, label-lg
Border radius: radius-md
Height: 52px

States:
  Default:  transparent bg
  Hover:    bg bg-overlay
  Pressed:  bg bg-elevated, scale 0.98
  Disabled: opacity 0.4
```

### Ghost Button (text only)
```
Background: transparent
Border: none
Text: green-text (#4DC97A dark / #1A7A3C light), label-lg
Height: 44px
No border radius needed

Usage: "Skip", "Cancel", secondary actions where space is tight
```

### Destructive Button
```
Background: error-bg
Border: 1px solid error-text (transparent alpha)
Text: error-text (#FF6B6B)
Same sizing as Primary

Usage: Delete account, remove item, cancel order
```

### Icon Button
```
Width/Height: 44px × 44px (minimum touch target)
Border radius: radius-full
Background: bg-elevated (dark) / bg-overlay (light)
Icon: 20px, text-secondary
No label

States: Hover darkens bg, pressed scales 0.95
```

### Floating Cart Button
```
Background: green-primary
Border radius: radius-full
Height: 56px
Padding: 0 20px
Shadow: 0 4px 20px rgba(26, 122, 60, 0.4)
Text: white, label-lg
Contains: cart icon (left) + item count + separator + total price
Position: Fixed, bottom 88px center (above nav bar)
```

---

## Component Library

### Restaurant Card
```
Width: Full width (horizontal list) or 160px (horizontal scroll)
Border radius: radius-lg
Background: bg-surface
Overflow: hidden

Structure:
  Image: 40% card height, cover, radius top only
  Content padding: 12px
  Restaurant name: heading-sm, text-primary
  Meta row: body-sm, text-secondary — "Cuisine • ⭐ Rating • X min"
  Delivery fee: body-sm, green-text
  
States:
  Closed overlay: dark overlay on image + "Closed" badge
  Loading: skeleton shimmer (dark grey animation)
```

### Menu Item Card (in Restaurant Detail)
```
Layout: Row — image left (64px × 64px, radius-sm), text right, + button far right
Height: 80px
Padding: 12px 0
Border bottom: 1px border-default (last item no border)

Structure:
  Image: 64×64px, object-fit cover, radius 8px
  Name: heading-sm
  Description: body-sm, text-secondary, max 2 lines
  Price: body-md, text-primary, bold
  Add button: 32px circle, green-primary background, + icon white
```

### Social Post Card
```
Full width, no card border (feed posts are borderless, separated by 1px dividers)

Structure:
  Header row: avatar (40px circle) + name (heading-sm) + restaurant tag (chip) + timestamp + ··· menu
  Image: Full width, 1:1 or 4:3 ratio, radius-lg
  Caption: body-md, text-primary, max 3 lines (expand tap)
  Actions row: ❤️ Like (count) | 💬 Comment (count) | ↗ Share — 16px icons, body-sm counts
```

### Avatar
```
Sizes: 24px (micro), 36px (small), 48px (default), 80px (profile), 96px (profile edit)
Border radius: radius-full
Background (fallback): gradient from green-subtle to green-primary
Initials text: heading-sm or heading-md depending on size, white

Online indicator: 10px green circle, bottom-right, white border 2px
```

### Badge / Pill
```
Height: 22px (small) / 28px (default)
Padding: 0 10px
Border radius: radius-full
Text: label-sm

Variants:
  Open:     bg success-bg, text success-text — "Open"
  Closed:   bg error-bg, text error-text — "Closed"
  New:      bg green-primary, text white — "NEW"
  Popular:  bg warning-bg, text warning-text — "🔥 Popular"
  Streak:   bg streak-flame (#FF6B1A), text white — "🔥 14 days"
```

### Input Field
```
Height: 52px
Border: 1.5px solid border-default
Border radius: radius-md
Background: bg-overlay
Padding: 0 16px
Text: body-lg, text-primary
Placeholder: text-muted

States:
  Focus: border-color green-primary, subtle green glow (box-shadow 0 0 0 3px rgba(26,122,60,0.2))
  Error: border-color error-text, error message below in error-text color
  Disabled: opacity 0.5, cursor not-allowed
```

### OTP Input (6 boxes)
```
Each box: 48px × 56px
Border: 2px solid border-default
Border radius: radius-md
Background: bg-elevated
Text: display-md, centered, text-primary
Gap between boxes: 8px

States:
  Filled: border-color green-primary
  Focus: border-color green-primary, green glow
  Error: all boxes border-color error-text, shake animation (keyframe: translate ±4px, 4 iterations, 300ms)
```

### Bottom Navigation Bar
```
Height: 64px + device safe area
Background: bg-elevated (dark mode: #1A1A1A with top border 1px border-default)
4 tabs: Home | Explore | Social | Profile

Each tab:
  Width: 25% of screen
  Icon: 24px (outline when inactive, filled when active)
  Label: label-sm, 10px, below icon
  Active: green-primary color for icon + label
  Inactive: text-muted color
  
Active indicator: none (color change is sufficient, no dot/pill needed)
```

### Toast Notification
```
Position: top center, 16px from top
Width: screen width - 32px
Height: auto, min 52px
Border radius: radius-lg
Padding: 12px 16px
Background: bg-elevated

Variants:
  Success: left border 4px green-primary, checkmark icon
  Error: left border 4px error-text, X icon
  Info: left border 4px info-text, info icon

Auto-dismiss: 3 seconds, slide up animation
```

### Order Status Chip (on tracking screen)
```
Height: 32px
Padding: 0 14px
Border radius: radius-full
States progression: Placed → Confirmed → Preparing → Picked Up → Delivered

Colors per state:
  Placed:     bg info-bg, text info-text
  Confirmed:  bg warning-bg, text warning-text
  Preparing:  bg warning-bg, text warning-text, animated pulsing dot
  Picked Up:  bg green-subtle, text green-text
  Delivered:  bg success-bg, text success-text
```

### Streak Badge (on profile)
```
Size: 80px × 80px (profile) / 48px × 48px (leaderboard)
Shape: Hexagon (or shield shape) via custom SVG clip path
Background: gradient — streak-glow to streak-flame (only case gradients are allowed)
Number: display-lg, white, bold
Label: label-sm, white, below number
Glow effect: box-shadow 0 0 20px rgba(255, 107, 26, 0.5) — only for active streak
```

### Empty State Component
```
Layout: Centered vertically in available space
Illustration: 120px × 120px SVG (simple, on-brand)
Heading: heading-md, text-primary, centered
Body: body-md, text-secondary, centered, max 2 lines
CTA Button: Primary or Secondary depending on urgency
Spacing: 16px between each element
```

---

## Motion Principles

### Philosophy
Motion should feel native to the phone, not like a web app trying to be fancy. Favour platform-native transitions. Add delight only for milestone moments (streak achievements, gift sent, order delivered).

### Timing Tokens
| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `motion-fast` | 150ms | ease-out | Button presses, chip selects |
| `motion-default` | 250ms | ease-in-out | Screen transitions, modal opens |
| `motion-slow` | 400ms | ease-in-out | Loading states, celebrations |
| `motion-spring` | 350ms | spring(1, 80, 10, 0) | Card entrances, order status updates |

### Specific Animations

**Screen transitions:** Slide from right (push navigation), slide down (modal dismiss), fade (tab switches)

**Bottom sheet open:** Slide up from bottom, 300ms, cubic-bezier(0.2, 0, 0, 1) — matches Material/iOS feel

**Order status update:** Status pill transitions with a left-to-right fill animation (400ms). Previous state fades, new state slides in.

**Streak milestone:** Full-screen confetti burst (particle system, 2 seconds). Streak number counter animates up. Flame icon bounces 3 times.

**Gift sent confirmation:** Food emoji rain (6 random emojis, 1.5 seconds). Gift box opens animation.

**Floating cart button appearance:** Scale from 0 to 1, 200ms spring animation. Disappears with reverse.

**Item quantity change:** Count number flips (vertical scroll animation), 150ms.

**Pull to refresh:** Custom FOODX logo animation (logo rotates/bounces while loading).

---

## Iconography

**Style:** Lucide Icons (outline style, 2px stroke weight, rounded joins)  
**Size:** 20px (inline/nav), 24px (prominent actions), 32px (feature icons)  
**Color:** Inherits from context — text-secondary by default, green-primary when active

**Custom icons needed (SVG, design team responsibility):**
- FOODX flame/streak icon (custom, not a standard fire emoji)
- Food gift box icon
- Food request icon ("hand holding food")
- Rider helmet icon

**Emoji usage:** Allowed in copy and social content. Never in functional UI elements (buttons, labels, status indicators). Exception: streak flame emoji in informal social contexts.

---

## Do / Don't

| Context | DO | DON'T |
|---------|-----|-------|
| **Primary color** | Use `#1A7A3C` for primary buttons, active states, and brand moments | Use green as a background for large surfaces or decorative fills |
| **Typography** | Use Space Grotesk for headings, DM Sans for body | Use Inter, Arial, Roboto, or system defaults |
| **Empty states** | Write warm, FOODX-voiced copy (see `07-content-doc.md`) | Show "No data found" or default framework empty states |
| **Buttons** | Use full-width primary buttons for primary actions on a screen | Stack multiple primary buttons; one primary action per screen |
| **Streaks** | Animate streak numbers and use the flame design system components | Use the standard orange fire emoji as the streak UI element |
| **Error messages** | "Your payment didn't go through — check your card details and try again" | "Transaction error code: ERR_PAYMENT_003" |
| **Loading** | Skeleton loaders that match the shape of real content | Generic spinners in the center of the screen for content loading |
| **Cards** | Use `bg-surface` with `border-strong` border on dark mode | Use white cards on a dark background (too high contrast) |
| **Images** | Always include 1:1 or 4:3 aspect ratio constraints with object-fit: cover | Allow images to load unconstrained and cause layout shift |
| **Rounded corners** | `radius-lg` (16px) for cards, `radius-full` for avatars and pills | Mix corner radii within the same component type |
| **Spacing** | Stick to the 8px grid token system | Use arbitrary values like 7px, 11px, or 23px |
| **Touch targets** | Minimum 44×44px for all tappable elements | Create tappable text links smaller than 44px height |
| **Status colors** | Use semantic colors (success/error/warning) for status indicators | Use brand green for "success" states — they are different concepts |
| **Social posts** | Borderless, full-width photos separated by dividers | Put social posts inside card boxes with borders |
| **Notifications** | Sound + visual for new incoming restaurant orders | Silent-only notifications for time-sensitive events |

---

*This design system is implemented in `09-prompt-pack.md` prompts. Component usage per screen is described in `03-wireframe-flows.md`. Copy for all states is in `07-content-doc.md`.*