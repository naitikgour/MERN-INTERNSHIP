import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app ${theme}`}>
        <Navbar />
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
