---
name: Kumho NPP Portal
colors:
  surface: '#fcf8ff'
  surface-dim: '#dbd8e4'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2fe'
  surface-container: '#efecf8'
  surface-container-high: '#e9e6f3'
  surface-container-highest: '#e4e1ed'
  on-surface: '#1b1b23'
  on-surface-variant: '#464554'
  inverse-surface: '#303038'
  inverse-on-surface: '#f2effb'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#904900'
  on-tertiary: '#ffffff'
  tertiary-container: '#b55d00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#fcf8ff'
  on-background: '#1b1b23'
  surface-variant: '#e4e1ed'
typography:
  h1:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
---

## Brand & Style

The design system is built upon a **Corporate Modern** aesthetic, prioritizing clarity, efficiency, and professional trust. It is designed for high-utility enterprise environments where data density and legibility are paramount.

The visual narrative is "Information First." By leveraging a strict functionalist approach, the system minimizes cognitive load through purposeful whitespace and a restrained color palette. The interface evokes a sense of reliability and precision, using structural alignment and a disciplined component library to ensure a seamless user experience for professional workflows.

## Colors

The color strategy uses a **Violet Primary** to signify action and brand identity, paired with a **Green Success** state for positive feedback and completion status. 

- **Primary (#6366F1):** Used for key action buttons, active navigation states, and focus indicators.
- **Success (#10B981):** Reserved for validation, completion markers, and positive data trends.
- **Neutral Palette:** Employs a light gray background (#F9FAFB) to provide contrast for white surface cards (#FFFFFF). 
- **Typography:** Uses Dark Gray (#374151) for primary content to ensure high legibility while avoiding the harshness of pure black.

## Typography

This design system utilizes **Inter** exclusively to maintain a utilitarian and systematic feel. The hierarchy is established through a clear contrast in font weight and size.

Headlines are slightly tightened with negative letter spacing to feel more cohesive, while body text maintains standard tracking for optimal readability. Labels use medium and semi-bold weights to distinguish interactive metadata from static content. For mobile views, H1 scales down to 24px and H2 to 20px to prevent awkward line breaks in constrained widths.

## Layout & Spacing

The system follows an **8px grid** (with 4px sub-steps) to ensure mathematical harmony across all components.

- **Desktop:** 12-column fluid grid with 24px gutters. Content is typically housed within cards that span 3, 4, 6, or 12 columns.
- **Sidebar:** A fixed-width sidebar (256px) persists on the left, pushing the main content area.
- **Mobile:** Transition to a 4-column grid with 16px margins. The sidebar collapses into a hamburger menu or bottom navigation depending on the specific module depth.

## Elevation & Depth

This design system utilizes a **Low-Contrast Tonal** approach. Depth is created primarily through color differentiation between the background (#F9FAFB) and foreground cards (#FFFFFF).

Shadows are used sparingly and must be "soft"—defined by large blur radii and very low opacity (e.g., `0px 4px 6px -1px rgba(0, 0, 0, 0.05)`). Elements do not "hover" far from the surface; the goal is to provide just enough lift to separate interactive cards from the canvas. There are no heavy shadows or multi-layered blurs.

## Shapes

The shape language is defined by **Subtle Roundedness**. A standard radius of 8px (0.5rem) is applied to all primary containers, including buttons, input fields, and cards. 

This consistent curvature softens the professional "edges" of the portal without appearing overly playful or consumer-focused. Small elements like checkboxes and tags may use a smaller 4px radius to maintain visual proportion. Large modal containers should not exceed 12px radius.

## Components

- **Buttons:** Solid #6366F1 with white text. 8px radius. State changes are handled by subtle darkening of the violet on hover.
- **Inputs:** Outlined with #E5E7EB. On focus, the border transitions to #6366F1 with a 2px outer glow (ring) of the same color at 20% opacity.
- **Cards:** White background, 8px radius, 1px border (#E5E7EB), and a soft shadow. Cards should contain 24px internal padding.
- **Sidebar Navigation:** Transparent background for items. Active state uses a light violet tint background (5-10% opacity) with a 4px vertical violet pill indicator on the left edge and violet-colored line icons.
- **Status Chips:** Small, semi-bold text. Success states use a light green background with dark green text, following the 8px radius rule.
- **Data Tables:** Clean, borderless rows with 1px horizontal dividers (#E5E7EB). Zebra striping is not used; instead, use a subtle background change on row hover.