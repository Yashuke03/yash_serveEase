function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo">
          ServeEase
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Get Started</button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;