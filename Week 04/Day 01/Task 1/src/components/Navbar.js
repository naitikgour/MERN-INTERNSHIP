import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")} end>Home</NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? "link active" : "link")}>About</NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? "link active" : "link")}>Contact</NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "link active" : "link")}>Dashboard</NavLink>
    </nav>
  );
}

export default Navbar;
