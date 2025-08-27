import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReservationList.css";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTodayOnly, setShowTodayOnly] = useState(false);

  useEffect(() => {
    fetchReservations();
    fetchTables();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:4000/reservations");
      setReservations(res.data);
      setFilteredReservations(res.data);
    } catch (err) {
      console.error("Failed to fetch reservations:", err);
    }
  };

  const fetchTables = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tables");
      setTables(res.data);
    } catch (err) {
      console.error("Failed to fetch tables:", err);
    }
  };

  // Find table name by ID
  const getTableNameById = (tableId) => {
    if (!tableId) return "Unknown Table";
    const id = tableId._id || tableId; // support object or string
    const table = tables.find((t) => t._id === id);
    return table ? table.name : "Unknown Table";
  };

  const handleCheck = async (reservationId, tableId) => {
    const confirmCheck = window.confirm(
      "Do you really want to check (complete) this reservation?"
    );
    if (!confirmCheck) return;

    try {
      // Delete the reservation
      await axios.delete(`http://localhost:4000/reservations/${reservationId}`);

      // Mark table as available
      await axios.put(`http://localhost:4000/tables/${tableId}`, {
        isAvailable: true,
      });

      // Refresh data
      await fetchReservations();
      alert("Reservation checked and table marked as available.");
    } catch (err) {
      console.error("Check action failed:", err);
      alert("Failed to check reservation.");
    }
  };

  // Filter reservations based on search & today's filter
  const filterReservations = (allReservations, search, todayOnly) => {
    let filtered = allReservations;

    if (todayOnly) {
      const todayStr = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((res) => res.date.split("T")[0] === todayStr);
    }

    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (res) =>
          (res.name && res.name.toLowerCase().includes(lowerSearch)) ||
          (res.email && res.email.toLowerCase().includes(lowerSearch)) ||
          (res.mobile && res.mobile.includes(lowerSearch))
      );
    }

    return filtered;
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilteredReservations(filterReservations(reservations, val, showTodayOnly));
  };

  const handleTodayToggle = () => {
    const newShowToday = !showTodayOnly;
    setShowTodayOnly(newShowToday);
    setFilteredReservations(filterReservations(reservations, searchTerm, newShowToday));
  };

  return (
    <div className="reservation-list-container">
      <h2>All Reservations</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by name, email, or mobile"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: "5px", width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleTodayToggle}>
          {showTodayOnly ? "Show All" : "Show Today's Reservations"}
        </button>
      </div>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>Table</th>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.length > 0 ? (
            filteredReservations.map((res) => (
              <tr key={res._id}>
                <td>{getTableNameById(res.tableId)}</td>
                <td>{res.date.split("T")[0]}</td>
                <td>{res.time}</td>
                <td>{res.name}</td>
                <td>{res.mobile}</td>
                <td>{res.email}</td>
                <td>
                  <button
                    className="check-button"
                    onClick={() =>
                      handleCheck(res._id, res.tableId._id || res.tableId)
                    }
                  >
                    ✅ Check
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No reservations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
