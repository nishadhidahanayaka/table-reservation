import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllCategories.css";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await axios.delete(`http://localhost:4000/api/admin/categories/${id}`);
      fetchCategories();
    }
  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setUpdatedName(category.name);
    setPreview(`http://localhost:4000${category.image}`);
    setUpdatedImage(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", updatedName);
      if (updatedImage) formData.append("image", updatedImage);

      await axios.put(
        `http://localhost:4000/api/admin/categories/${selectedCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="categories-container">
      <h2>All Menu Categories</h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>
                <img
                  src={`http://localhost:4000${cat.image}`}
                  alt={cat.name}
                  className="category-img"
                />
              </td>
              <td>{cat.name}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleUpdateClick(cat)}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(cat._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="3">No categories found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update Category</h3>

            <label>Name</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="modal-input"
              autoFocus
            />

            <label>Change Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img src={preview} alt="Preview" className="modal-preview" />
            )}

            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={handleUpdateSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
