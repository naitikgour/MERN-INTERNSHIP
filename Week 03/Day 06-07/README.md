# React Personal Blog UI — Mini Project (Week 3, Days 6–7)

A clean, minimalist personal blog interface built with React components, props, state, dynamic list rendering, and CSS.

## Project Structure
```
src/
├── components/
│   ├── Navbar.js       # Navigation bar
│   ├── BlogList.js     # Dynamically maps through blog posts
│   ├── BlogCard.js     # Reusable card with toggle details state
│   └── Footer.js       # Footer component
├── App.js              # Main container with search filter & state
├── App.css             # Component styling
└── index.js            # React root mount
index.html              # Standalone browser runner & app entry
package.json            # Project dependencies & scripts
```

## Features
- **Modular Components**: Navbar, BlogList, BlogCard, and Footer.
- **Props Passing**: Blog metadata (title, author, date, category, content) passed cleanly down to cards.
- **Dynamic List Rendering**: Array rendered using `.map()` with unique keys.
- **Search Filter**: Real-time filtering by title, category, or summary.
- **State Toggle**: Expand/collapse full article details inside individual cards.

## Run Locally
1. Simply double-click `index.html` or open with Live Server in VS Code to run instantly in any browser.
2. Alternatively, run `npm install` and `npm start` if running in a Node environment.
