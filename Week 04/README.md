# Week 04: React Router, Context API, Tailwind CSS, Performance Optimization & Dashboard Mini Project

This directory contains all completed daily hands-on tasks and the 2-day mini project for **Week 4** of the MERN Full Stack Internship Program.

---

## Directory Overview

```text
Week 04/
├── Day 01/                          # React Router & Multi-page Navigation
│   ├── Task 1/                      # 4 Pages (Home, About, Contact, Dashboard) + NavLink
│   │   ├── index.html
│   │   └── src/
│   │       ├── App.js
│   │       ├── components/Navbar.js & Navbar.css
│   │       └── pages/Home.js, About.js, Contact.js, Dashboard.js
│   └── Task 3/                      # Dynamic URL parameters (/user/:id)
│       ├── index.html
│       ├── App.js
│       └── UserProfile.js
│
├── Day 02/                          # Props Drilling & Context API
│   ├── index.html                   # Browser runner for global theme toggle
│   └── src/
│       ├── App.css                  # Light & Dark theme definitions
│       ├── App.js                   # ThemeContext.Provider wrap
│       ├── components/Navbar.js     # Consumes ThemeContext with useContext()
│       ├── components/Home.js
│       └── context/ThemeContext.js
│
├── Day 03/                          # Tailwind CSS Basics & Integration
│   ├── index.html                   # Browser runner with Tailwind CDN
│   ├── App.jsx
│   ├── Task 1/ButtonCard.jsx        # Converted CSS component to Tailwind
│   ├── Task 2/ResponsiveNavbar.jsx  # Mobile hamburger navigation
│   └── Task 3/CardLayout.jsx        # Responsive card grid
│
├── Day 04/                          # Advanced Tailwind & Component Design
│   ├── index.html                   # Browser runner with custom color config
│   ├── App.jsx
│   ├── Task 1/InteractiveCard.jsx   # Hover, focus ring & transition effects
│   └── Task 2/CustomThemeDemo.jsx   # Custom theme color palette
│
├── Day 05/                          # Performance Optimization
│   ├── index.html                   # Browser runner with React.memo verification
│   ├── App.jsx
│   ├── Task 1/MemoDemo.jsx          # React.memo child re-render prevention
│   └── Task 2/AboutLazy.jsx         # Lazy loaded component via Suspense
│
└── Day 06-07/                       # Mini Project: Responsive Admin Dashboard
    ├── package.json
    ├── README.md
    ├── index.html                   # Interactive live dashboard runner
    └── src/
        ├── App.jsx                  # Main layout with ThemeProvider and Router
        ├── index.css
        ├── index.js
        ├── components/
        │   ├── Sidebar.jsx          # Collapsible navigation sidebar
        │   ├── Navbar.jsx           # Dark/Light mode toggle header
        │   └── Card.jsx             # Analytics metric card
        ├── context/
        │   └── ThemeContext.jsx     # Dark mode context
        └── pages/
            ├── Dashboard.jsx        # Analytics stat cards + trends chart
            ├── Users.jsx            # User management table + search filter
            ├── Reports.jsx          # Downloadable reports
            └── Settings.jsx         # Preference toggles
```

---

## Daily Concepts Covered
- **Day 01**: Single Page Application routing, `BrowserRouter`, `Routes`, `Route`, `<NavLink>` active highlighting, and `useParams()`.
- **Day 02**: Solving prop drilling with Context API, `createContext()`, `Provider`, and `useContext()` for a global dark/light theme.
- **Day 03**: Tailwind CSS utility classes, responsive prefixes (`sm:`, `md:`, `lg:`), mobile navigation, and grid layouts.
- **Day 04**: Interactive pseudo-classes (`hover:`, `focus:`, `active:`), smooth transitions, and custom color palette configuration.
- **Day 05**: React component rendering lifecycle, memoizing child components using `React.memo()`, and dynamic code-splitting using `React.lazy()` and `Suspense`.
- **Day 06–07**: Capstone responsive admin dashboard bringing together React Router, Context API, Tailwind dark mode, and modular component architecture.
