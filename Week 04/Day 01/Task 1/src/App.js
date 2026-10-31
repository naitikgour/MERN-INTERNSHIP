import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "800px", margin: "20px auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h2 style={{ padding: "20px", color: "red" }}>404 Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
