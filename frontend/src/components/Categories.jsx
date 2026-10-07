import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <section className="categories">
      <div className="section-heading">
        <h2>Explore Services</h2>

        <p>
          Find the right service for your everyday needs.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            name={category.name}
          />
        ))}
      </div>
    </section>
  );
}

export default Categories;