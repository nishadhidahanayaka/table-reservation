import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllTables.css";

const AllTables = () => {
    const [tables, setTables] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    const [updatedName, setUpdatedName] = useState("");
    const [updatedCapacity, setUpdatedCapacity] = useState("");
    const [updatedLocation, setUpdatedLocation] = useState("Inside");
    const [updatedIsAvailable, setUpdatedIsAvailable] = useState(false);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const res = await axios.get("http://localhost:4000/tables");
            setTables(res.data);
        } catch (err) {
            console.error("Error fetching tables:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this table?")) {
            try {
                await axios.delete(`http://localhost:4000/tables/${id}`);
                fetchTables();
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    const handleUpdateClick = (table) => {
        setSelectedTable(table);
        setUpdatedName(table.name);
        setUpdatedCapacity(table.capacity);
        setUpdatedLocation(table.location);
        setUpdatedIsAvailable(table.isAvailable);
        setShowModal(true);
    };

    const handleUpdateSubmit = async () => {
        if (!updatedName || !updatedCapacity || !updatedLocation) {
            alert("Please fill all fields.");
            return;
        }

        try {
            await axios.put(`http://localhost:4000/tables/${selectedTable._id}`, {
                name: updatedName,
                capacity: updatedCapacity,
                location: updatedLocation,
                isAvailable: updatedIsAvailable,
            });
            setShowModal(false);
            fetchTables();
        } catch (err) {
            console.error("Update failed:", err);
            alert("Update failed. See console for details.");
        }
    };

    return (
        <div className="container">
            <h2>All Tables</h2>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Capacity</th>
                        <th>Location</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.length === 0 && (
                        <tr>
                            <td colSpan="5">No tables found.</td>
                        </tr>
                    )}
                    {tables.map((table) => (
                        <tr key={table._id}>
                            <td>{table.name}</td>
                            <td>{table.capacity}</td>
                            <td>{table.location}</td>
                            <td>{table.isAvailable ? "Yes" : "No"}</td>
                            <td>
                                <button className="btn btn-update" onClick={() => handleUpdateClick(table)}>
                                    Update
                                </button>
                                <button className="btn btn-delete" onClick={() => handleDelete(table._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Update Table</h3>
                        <label>Table Name</label>
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            autoFocus
                        />
                        <label>Capacity</label>
                        <input
                            type="number"
                            value={updatedCapacity}
                            onChange={(e) => setUpdatedCapacity(e.target.value)}
                        />
                        <label>Location</label>
                        <select
                            value={updatedLocation}
                            onChange={(e) => setUpdatedLocation(e.target.value)}
                        >
                            <option value="Inside">Inside</option>
                            <option value="Outside">Outside</option>
                        </select>
                        <label>
                            <input
                                type="checkbox"
                                checked={updatedIsAvailable}
                                onChange={(e) => setUpdatedIsAvailable(e.target.checked)}
                            />
                            Available
                        </label>

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

export default AllTables;
