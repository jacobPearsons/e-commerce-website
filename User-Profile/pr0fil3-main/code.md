Professional AI Development Prompt

I need a production-grade User Profile & Analytics Dashboard SaaS application called "ProfilePro" that solves the problem of fragmented user identity and engagement tracking for SaaS platforms, content creators, and professional freelancers.

The core value proposition is: To provide a centralized, white-labelable dashboard that users can embed in any service, offering them a unified view of their profile, performance metrics, and engagement data across platforms, thereby increasing user retention and satisfaction.

Technical Stack

    Frontend: React 18 with TypeScript, styled with Tailwind CSS

    Routing: React Router v6 (using Link for navigation)

    Backend: Mocked for Node.js (Express) API routes

    Database: Telegram API for sending messages and handles the databse.

    Authentication: Mocked auth context, designed for integration with Auth0

    Additional: Recharts or ApexCharts for data visualization, react-hook-form for forms, framer-motion for subtle animations, and react-aria for accessibility primitives.

Core Features (in priority order)

    Modular Dashboard Overview: A highly visual, at-a-glance summary of the user's key metrics.

        Drag-and-drop widget rearrangement for personalized layouts

        Performance-optimized widget rendering (memoization, virtual scrolling)

        Real-time data updates on key metrics (using WebSocket-ready architecture)

    Unified User Profile Management: A single source of truth for a user's professional identity.

        Rich text bio with @mention support

        Skills/Endorsements system with tag management

        File upload for avatar, cover photo, and documents with compression and CDN-ready structure

        Public/private visibility controls for each profile section

    Cross-Platform Analytics Hub: Visualizes user engagement data from integrated services.

        Multi-variant chart types (line, bar, pie) with accessible descriptions (aria-label)

        Date range picker for custom analysis periods

        Data export functionality (CSV, JSON)

        Custom metric definition for power users

Features explicitly OUT of scope:

    Built-in payment processing integration (will be mocked)

    Actual third-party API integrations (data will be mocked with realistic shapes)

    Native mobile application (focus is on a responsive PWA)

UI/UX Requirements

    Design Style: Modern "Glassmorphism" with a clean, professional aesthetic. Use backdrop filters sparingly on key components like cards and the nav bar.

    Color Scheme: Primary blue (#3B82F6), with a complementary palette from Tailwind's default spectrum. Must include a fully functional, system-aware dark/light mode toggle.

    Responsive Design: Mobile-first approach. The sidebar must collapse into a hamburger menu on small screens. All data visualizations must remain readable and interactive on mobile via responsive chart libraries.

Data Model

    User:

        Fields: id (string), email (string), name (string), username (string), avatarUrl (string), coverUrl (string), bio (string), createdAt (DateTime)

        Relationships: hasMany(ProfileView), hasMany(Skill), hasMany(Activity)

    ProfileView:

        Fields: id (string), viewedAt (DateTime), viewerId (string - nullable)

        Relationships: belongsTo(User)

    Skill:

        Fields: id (string), name (string), endorsementCount (int)

        Relationships: belongsTo(User)

Authentication and Authorization

    Provider: Context API for mock auth, designed for Next-Auth or Auth0.

    Roles: Single user role for this MVP, with data ownership checks (users can only see their own data).

    Security: All API calls must check for a valid mock user session. Password hashing is out of scope for the mock phase.

Payment Integration (if applicable)

    Provider: Stripe

    Plans: Free (basic analytics), Pro ($9/mo - advanced metrics, white-labeling), Enterprise (custom).

Development Approach

    Start with: Setting up the Vite + React + TypeScript + Tailwind project with absolute imports, path aliasing, and a robust folder structure.

    Build incrementally:

        Project boilerplate and mock auth context.

        Responsive dashboard layout component (sidebar, navbar, main content area).

        Static User Profile page.

        Interactive Dashboard overview with mock data widgets.

        Analytics page with static charts.

        Implement interactivity: theme toggle, widget dragging, chart filters.

    Prioritize:

        Performance: Lighthouse CI checks. Focus on Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS). Use lazy loading for dashboard sections and images.

        Accessibility: Full WCAG AA compliance. Keyboard navigation, screen reader announcements, correct ARIA attributes on all interactive elements (charts, forms, buttons), and high color contrast ratios in both themes.

        Code Quality: Enforced via ESLint and Prettier. All components must be typed with TypeScript. Reusable logic must be abstracted into custom hooks.