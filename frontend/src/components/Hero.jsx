function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <h1>
          Local services,
          <span> made simple.</span>
        </h1>

        <p>
          Find trusted local professionals for your everyday needs.
          Book reliable services quickly and easily with ServeEase.
        </p>

        <div className="hero-search">
          <input type="text"
            placeholder="What service do you need?"
          />

          <button>Search</button>
        </div>

        <div className="hero-actions">
          <button className="primary-btn">
            Explore Services
          </button>

          <button className="secondary-btn">
            Become a Provider
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;