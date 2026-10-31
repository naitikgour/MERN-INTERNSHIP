import { useState } from "react";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import Footer from "./components/Footer";
import "./App.css";

const initialBlogs = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Naitik Gour",
    date: "October 20, 2025",
    category: "React",
    summary: "A beginner-friendly guide to understanding React fundamentals and component architecture.",
    content: "React is a powerful library for building interactive user interfaces. By breaking UIs into small reusable components, code becomes easier to maintain, test, and scale. We explored JSX, Virtual DOM, and props passing."
  },
  {
    id: 2,
    title: "Mastering React State with useState",
    author: "Naitik Gour",
    date: "October 22, 2025",
    category: "Hooks",
    summary: "Learn how the useState hook allows functional components to store dynamic data.",
    content: "State enables components to remember user interactions such as button clicks, typed text, and toggles. When state changes, React re-renders only the necessary parts of the DOM efficiently."
  },
  {
    id: 3,
    title: "Handling Side Effects using useEffect",
    author: "Naitik Gour",
    date: "October 25, 2025",
    category: "API & Lifecycle",
    summary: "Understanding how to fetch API data and manage lifecycles in functional React.",
    content: "Side effects like fetching REST APIs or setting timers are handled using useEffect. Dependency arrays allow fine-grained control over when the effect should run, preventing infinite re-rendering loops."
  },
  {
    id: 4,
    title: "Conditional Rendering & Event Handling",
    author: "Naitik Gour",
    date: "October 27, 2025",
    category: "JavaScript",
    summary: "Techniques for conditionally displaying UI elements and responding to user actions.",
    content: "Using ternary operators and logical AND (&&) expressions lets you display different views seamlessly, such as showing welcome messages upon login or toggling expanded details."
  }
];

function App() {
  const [blogs] = useState(initialBlogs);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="search-section">
          <h2>Latest Blog Posts</h2>
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, category, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>

        <BlogList blogs={filteredBlogs} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
