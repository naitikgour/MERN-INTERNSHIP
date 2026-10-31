# Responsive Dashboard Interface — Mini Project (Week 4, Days 6–7)

A modern, responsive admin dashboard built using React, React Router v6, Tailwind CSS, and Context API.

## Project Structure
```text
src/
├── components/
│   ├── Sidebar.jsx     # Navigation sidebar with responsive collapse
│   ├── Navbar.jsx      # Header with dark/light mode toggle
│   └── Card.jsx        # Analytics stat card component
├── context/
│   └── ThemeContext.jsx # Global dark/light theme state provider
├── pages/
│   ├── Dashboard.jsx   # Analytics overview with stat cards & trends chart
│   ├── Users.jsx       # Users management table with live search
│   ├── Reports.jsx     # Downloadable reports overview
│   └── Settings.jsx    # Application preferences toggles
├── App.jsx             # Main layout and route definitions
├── index.css           # Tailwind base styles
└── index.js            # React root mount
index.html              # Standalone interactive browser runner
package.json            # Project dependencies & scripts
```

## Features
- **React Router Navigation**: Smooth client-side routing between Dashboard, Users, Reports, and Settings.
- **Context API Theme Provider**: Dark/Light mode toggle accessible throughout the entire dashboard.
- **Tailwind CSS UI**: Utility-first responsive design, hover states, transitions, and dark mode class styling.
- **Analytics & User Search**: Stat metrics with trends and interactive real-time user filtering.

## How to Run
- Double-click `index.html` or open with VS Code Live Server to run interactively in any browser with zero installation.
- Or run `npm install` and `npm start` in a standard Node.js development environment.
