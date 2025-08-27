import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin-dashboard.css";

const AddMenuItem = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [item, setItem] = useState({
    name: "",
    price: "",
    fullPrice: "",
  });

  const [addedItems, setAddedItems] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/categories"); // adjust if needed
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (!selectedCategoryId || !item.name.trim() || !item.price.trim() || !item.fullPrice.trim()) {
      alert("Please fill all fields");
      return;
    }

    setAddedItems([
      ...addedItems,
      {
        ...item,
        category: selectedCategoryId,
      },
    ]);

    // Reset inputs and category selection
    setSelectedCategoryId("");
    setItem({ name: "", price: "", fullPrice: "" });
  };

  const handleDeleteItem = (index) => {
    const updated = [...addedItems];
    updated.splice(index, 1);
    setAddedItems(updated);
  };

  const handleSubmitAll = async () => {
    try {
      console.log("Submitting items:", addedItems);
      const response = await axios.post("http://localhost:4000/api/admin/items", addedItems);
      alert("Menu items saved successfully!");
      setAddedItems([]);
    } catch (error) {
      alert("Failed to save items");
      console.error(error);
    }
  };

  return (
    <div className="add-item-container">
      <div className="add-item-form">
        <h3>Add Menu Item</h3>

        <label htmlFor="category-select">Category:</label>
        <select
          id="category-select"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label htmlFor="item-name">Item Name:</label>
        <input
          id="item-name"
          type="text"
          name="name"
          placeholder="e.g., Chicken Rice"
          value={item.name}
          onChange={handleChange}
        />

        <label htmlFor="half-price">Half Price:</label>
        <input
          id="half-price"
          type="text"
          name="price"
          placeholder="e.g., 720 /-"
          value={item.price}
          onChange={handleChange}
        />

        <label htmlFor="full-price">Full Price:</label>
        <input
          id="full-price"
          type="text"
          name="fullPrice"
          placeholder="e.g., 970 /-"
          value={item.fullPrice}
          onChange={handleChange}
        />

        <button type="button" onClick={handleAddItem} className="form-button">
          + Add to List
        </button>
      </div>

      <div className="added-item-list">
        <h3>Items Added</h3>
        {addedItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <ul>
            {addedItems.map((itm, idx) => (
              <li key={idx}>
                <div className="item-entry">
                  <span>
                    <strong>{itm.name}</strong> (
                    {
                      // Find category name by ID from categories list
                      categories.find((cat) => cat._id === itm.category)?.name || "Unknown"
                    }
                    ) — Half: {itm.price}, Full: {itm.fullPrice}
                  </span>
                  <button onClick={() => handleDeleteItem(idx)} className="delete-button" title="Delete Item">
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {addedItems.length > 0 && (
          <button onClick={handleSubmitAll} className="submit-all-button">
            Submit All to DB
          </button>
        )}
      </div>
    </div>
  );
};

export default AddMenuItem;
