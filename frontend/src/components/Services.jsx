import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <section className="services" id="services">
      <div className="section-heading">
        <h2>Popular Services</h2>

        <p>
          Discover reliable services from local professionals.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;