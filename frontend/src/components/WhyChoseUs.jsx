function WhyChooseUs() {
  const benefits = [
    {
      icon: "✓",
      title: "Trusted Professionals",
      description:
        "Connect with reliable local service providers."
    },
    {
      icon: "⚡",
      title: "Easy Booking",
      description:
        "Find and book the service you need in just a few steps."
    },
    {
      icon: "📍",
      title: "Local & Reliable",
      description:
        "Discover service providers available in your area."
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="section-heading">
        <h2>Why Choose ServeEase?</h2>

        <p>
          Everything you need to find and book local services with confidence.
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <div className="benefit-card" key={benefit.title}>
            <div className="benefit-icon">
              {benefit.icon}
            </div>

            <h3>{benefit.title}</h3>

            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;