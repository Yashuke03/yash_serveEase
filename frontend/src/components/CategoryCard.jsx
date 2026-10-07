function CategoryCard({ name, icon }) {
  return (
    <div className="category-card">
      <div className="category-icon">
        {icon}
      </div>

      <h3>{name}</h3>

      <p>Explore services</p>
    </div>
  );
}

export default CategoryCard;

