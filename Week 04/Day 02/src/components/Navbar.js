import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${theme}`}>
      <h2>My Website</h2>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
}

export default Navbar;
