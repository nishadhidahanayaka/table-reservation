import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./admin-dashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <Link to="add-menu" className="sidebar-link">➕ Add Menu</Link>
          <Link to="add-menu-item" className="sidebar-link">🍽️ Add Menu Item</Link>
          <Link to="all-categories" className="sidebar-link">📂 All Categories</Link>
          <Link to="all-items" className="sidebar-link">📂 All Items</Link>
          <Link to="add-tables" className="sidebar-link">🪑 Add Tables</Link>
          <Link to="all-tables" className="sidebar-link">📋 All Tables</Link>
          <Link to="reservation-list" className="sidebar-link">📅 Reservation List</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
