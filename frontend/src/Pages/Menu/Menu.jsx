import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/categories");
        setMenuItems(res.data);
      } catch (err) {
        console.error("Error loading menu categories:", err);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <Link to={`/menu/${item._id}`} key={item._id} className="menu-card">
            <div className="menu-image-wrapper">
              <img
                src={`http://localhost:4000${item.image}`}
                alt={item.name}
                className="menu-image"
              />
            </div>
            <h3 className="menu-name">{item.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
