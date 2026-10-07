function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-image">
        🛠️
      </div>

      <div className="service-content">
        <h3>{service.name}</h3>

        <p>{service.description}</p>

        <div className="service-footer">
          <span>₹{service.price}</span>

          <button>View Service</button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;