import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryMenuPage.css";

const CategoryMenuPage = () => {
  const { id } = useParams(); // Category ID from URL
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategoryAndItems = async () => {
      try {
        // Fetch categories and find selected category
        const categoryRes = await axios.get("http://localhost:4000/api/admin/categories");
        const matchedCategory = categoryRes.data.find(cat => cat._id === id);
        setCategory(matchedCategory);

        // Fetch all items and filter by category id (handle populated or unpopulated category)
        const itemRes = await axios.get("http://localhost:4000/api/admin/items");
        const filteredItems = itemRes.data.filter(item => {
          if (typeof item.category === "object" && item.category !== null) {
            return item.category._id === id;
          }
          return item.category === id;
        });
        setItems(filteredItems);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchCategoryAndItems();
  }, [id]);

  const handleBack = () => {
    navigate("/menu");
  };

  if (!category) return <div className="loading">Loading category...</div>;

  return (
    <div className="category-page">
      <div className="category-header">
        <img
          src={`http://localhost:4000${category.image}`}
          alt={category.name}
          className="category-banner"
        />
        <div className="overlay">
          <h1 className="category-title">{category.name}</h1>
          <button className="back-button" onClick={handleBack}>
            ← Back to Menu
          </button>
        </div>
      </div>

      <div className="item-list">
        {items.length === 0 ? (
          <p className="empty-text">No items available.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="item-card">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <div className="price-line">
                  <span className="item-half-price">Half: Rs. {item.price}</span>
                  <span className="item-full-price">Full: Rs. {item.fullPrice}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryMenuPage;
