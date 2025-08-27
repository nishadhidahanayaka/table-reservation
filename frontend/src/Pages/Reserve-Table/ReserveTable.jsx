import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Your user context
import "./ReserveTable.css";

const ReserveTable = () => {
  const { user } = useContext(AuthContext);

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [name, setName] = useState(user?.username || "");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    // Load available tables from DB
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reservationDate || !reservationTime || !selectedTable || !name || !mobile || !email) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const reservationData = {
        tableId: selectedTable,
        date: reservationDate,
        time: reservationTime,
        name,
        mobile,
        email,
        userId: user ? user._id : null, // If logged in, include user ID
      };

      // Send reservation data to backend
      await axios.post("http://localhost:4000/reservations", reservationData);

      alert("Table reserved successfully!");
      // Clear form or redirect
      setSelectedTable("");
      setReservationDate("");
      setReservationTime("");
      if (!user) {
        setName("");
        setMobile("");
        setEmail("");
      }
    } catch (err) {
      console.error("Reservation failed:", err);
      alert("Failed to reserve table. Please try again.");
    }
  };

  // Simple time slots example (you can customize)
  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM", "06:00 PM",
    "07:00 PM", "08:00 PM", "09:00 PM",
  ];

  return (
    <div className="reserve-container">
      <h2>Reserve a Table</h2>
      <form onSubmit={handleSubmit} className="reserve-form">
        <label>
          Date:
          <input
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
          />
        </label>

        <label>
          Time:
          <select value={reservationTime} onChange={(e) => setReservationTime(e.target.value)}>
            <option value="">Select time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </label>

        <label>
          Table:
          <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
            <option value="">Select a table</option>
            {tables
              .filter((table) => table.isAvailable) // ✅ Only show available tables
              .map((table) => (
                <option key={table._id} value={table._id}>
                  {table.name} (Capacity: {table.capacity}, Location: {table.location})
                </option>
              ))}
          </select>
        </label>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!!user} // Disable if logged in
            required
          />
        </label>

        <label>
          Mobile Number:
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="07xxxxxxxx"
            pattern="[0-9]{10}"
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!user} // Disable if logged in
            required
          />
        </label>

        <button type="submit">Reserve Table</button>
      </form>
    </div>
  );
};

export default ReserveTable;
