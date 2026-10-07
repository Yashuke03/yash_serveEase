function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">


        <div className="footer-brand">
          <h2>ServeEase</h2>

          <p>
            Find trusted local professionals and book
            services with ease.
          </p>
        </div>


        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
        </div>

        
        <div className="footer-column">
          <h3>Services</h3>

          <a href="#services">Cleaning</a>
          <a href="#services">Plumbing</a>
          <a href="#services">Electrical</a>
          <a href="#services">Repair</a>
        </div>

      
        <div className="footer-column">
          <h3>Contact Us</h3>

          <p> serveEase@services.com</p>
          <p> +91 99872 38427</p>
          <p> Sangli, Maharashtra</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 ServeEase.
        </p>

        <div className="footer-provider">
          <a href="#">Become a Provider</a>
          <a href="#">Provider Login</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;