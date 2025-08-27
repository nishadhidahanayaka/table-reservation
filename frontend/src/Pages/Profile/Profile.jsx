import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const imageUrl = user.profilePhotoPath;

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);

  // Fetch tables for name lookup
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get("http://localhost:4000/tables");
        setTables(res.data);
      } catch (err) {
        console.error("Failed to fetch tables:", err);
      }
    };
    fetchTables();
  }, []);

  // Fetch reservations for current user
  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        // Assuming backend supports filtering reservations by user email or ID
        // Change the query param if you filter by user._id or something else
        const res = await axios.get(`http://localhost:4000/reservations?email=${user.email}`);
        setReservations(res.data);
      } catch (err) {
        console.error("Failed to fetch user reservations:", err);
      }
    };
    if (user?.email) {
      fetchUserReservations();
    }
  }, [user]);

  // Helper to get table name by ID
  const getTableNameById = (tableId) => {
    if (!tableId) return "Unknown Table";
    const id = tableId._id || tableId;
    const table = tables.find((t) => t._id === id);
    return table ? table.name : "Unknown Table";
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f4f9ff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    margin: "40px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const imageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
    border: "4px solid #3b82f6",
  };

  const infoStyle = {
    textAlign: "left",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.03)",
    marginBottom: "30px",
  };

  const headingStyle = {
    fontSize: "16px",
    margin: "10px 0",
    color: "#333",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const thStyle = {
    borderBottom: "2px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f0f0f0",
  };

  const tdStyle = {
    borderBottom: "1px solid #ddd",
    padding: "8px",
  };

  return (
    <div style={containerStyle}>
      <img src={imageUrl} alt="Profile" style={imageStyle} />
      <div style={infoStyle}>
        <h4 style={headingStyle}>Name: {user.username}</h4>
        <h4 style={headingStyle}>Mailing Address: {user.mailingAddress}</h4>
        <h4 style={headingStyle}>Billing Address: {user.billingAddress}</h4>
        <h4 style={headingStyle}>Preferred Diner#: {user.dinerNumber}</h4>
        <h4 style={headingStyle}>Points: {user.points}</h4>
        <h4 style={headingStyle}>Preferred Payment: {user.paymentMethod}</h4>
      </div>

      <div style={{ width: "100%" }}>
        <h3>Your Reservations</h3>
        {reservations.length === 0 ? (
          <p>You have no reservations.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Table</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res._id}>
                  <td style={tdStyle}>{getTableNameById(res.tableId)}</td>
                  <td style={tdStyle}>{res.date.split("T")[0]}</td>
                  <td style={tdStyle}>{res.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;
