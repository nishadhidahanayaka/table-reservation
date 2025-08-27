import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllItems.css";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states for update modal
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedFullPrice, setUpdatedFullPrice] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");

  // Load all items and categories
  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/items");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:4000/api/admin/items/${id}`);
        fetchItems();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setUpdatedName(item.name);
    setUpdatedPrice(item.price);
    setUpdatedFullPrice(item.fullPrice);
    setUpdatedCategory(item.category?._id || "");
    setShowModal(true);
  };

  const handleUpdateSubmit = async () => {
    if (!updatedName || !updatedPrice || !updatedFullPrice || !updatedCategory) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:4000/api/admin/items/${selectedItem._id}`, {
        name: updatedName,
        price: updatedPrice,
        fullPrice: updatedFullPrice,
        category: updatedCategory,
      });
      setShowModal(false);
      fetchItems();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. See console for details.");
    }
  };

  return (
    <div className="container">
      <h2>All Menu Items</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price (Half)</th>
            <th>Price (Full)</th>
            <th>Category</th>
            <th>Category Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="6">No items found.</td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>Rs. {item.price}</td>
              <td>Rs. {item.fullPrice}</td>
              <td>{item.category?.name || "N/A"}</td>
              <td>
                {item.category?.image ? (
                  <img
                    src={`http://localhost:4000${item.category.image}`}
                    alt={item.category.name}
                    className="category-image"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>
                <button className="btn btn-update" onClick={() => handleUpdateClick(item)}>
                  Update
                </button>
                <button className="btn btn-delete" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Item</h3>
            <label>Item Name</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              autoFocus
            />
            <label>Price (Half)</label>
            <input
              type="text"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
            <label>Price (Full)</label>
            <input
              type="text"
              value={updatedFullPrice}
              onChange={(e) => setUpdatedFullPrice(e.target.value)}
            />
            <label>Category</label>
            <select
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button className="btn btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={handleUpdateSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllItems;
