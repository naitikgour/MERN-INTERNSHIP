function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="nav-logo">My Personal Blog</h2>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#articles">Articles</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
