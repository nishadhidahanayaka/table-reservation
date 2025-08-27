import React, { useState } from "react";
import axios from "axios";

const AddMenu = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageFile: file });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadData = new FormData();
      uploadData.append("name", formData.name);
      uploadData.append("image", formData.imageFile);

      await axios.post("http://localhost:4000/api/admin/categories", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Menu category added successfully!");
      setFormData({ name: "", imageFile: null });
      setPreview(null);
    } catch (error) {
      alert("Error adding category");
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Menu Category</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Category Name:</label>
        <input
          type="text"
          name="name"
          placeholder="e.g., Fried Rice (Basmathi)"
          value={formData.name}
          onChange={handleNameChange}
          required
        />

        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
          </div>
        )}

        <button type="submit" className="form-button">Add Category</button>
      </form>
    </div>
  );
};

export default AddMenu;
