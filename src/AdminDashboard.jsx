import React from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
    return (
        <div className="dash-container">
            <h1>Admin Dashboard</h1>
            <div className="cards">
                <div className="card">Manage Users</div>
                <div className="card">View System Logs</div>
                <div className="card">Approve Lenders</div>
                <div className="card">Security Settings</div>
            </div>
        </div>
    );
}

export default AdminDashboard;
