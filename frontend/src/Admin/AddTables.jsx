import React, { useState } from "react";
import axios from "axios";
import "./AddTable.css";

const AddTables = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    isAvailable: true,
    location: "Inside", // Default value
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/tables", formData);
      alert("Table added successfully!");
      setFormData({ name: "", capacity: "", isAvailable: true, location: "Inside" });
    } catch (error) {
      console.error("Error adding table:", error);
      alert("Failed to add table.");
    }
  };

  return (
    <div className="add-table-container">
      <h2>Add New Table</h2>
      <form className="add-table-form" onSubmit={handleSubmit}>
        <label>Table Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
          min="1"
        />

        <label>Available:</label>
        <input
          type="checkbox"
          name="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
        />

        <label>Location:</label>
        <select name="location" value={formData.location} onChange={handleChange} required>
          <option value="Inside">Inside</option>
          <option value="Outside">Outside</option>
        </select>

        <button type="submit">Add Table</button>
      </form>
    </div>
  );
};

export default AddTables;
