import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [loanRequests, setLoanRequests] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(storedRequests);
  }, []);

  const filteredRequests =
    filter === "All"
      ? loanRequests
      : loanRequests.filter((r) => r.status === filter);

  // Statistics
  const stats = {
    totalRequests: loanRequests.length,
    approved: loanRequests.filter(r => r.status === "Approved").length,
    rejected: loanRequests.filter(r => r.status === "Rejected").length,
    pending: loanRequests.filter(r => r.status === "Pending").length,
    totalAmount: loanRequests.reduce((sum, r) => sum + parseFloat(r.amount), 0)
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card total">
          <h3>Total Requests</h3>
          <h2>{stats.totalRequests}</h2>
        </div>
        <div className="stat-card approved">
          <h3>Approved</h3>
          <h2>{stats.approved}</h2>
        </div>
        <div className="stat-card rejected">
          <h3>Rejected</h3>
          <h2>{stats.rejected}</h2>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <h2>{stats.pending}</h2>
        </div>
        <div className="stat-card total-amount">
          <h3>Total Amount</h3>
          <h2>₹{stats.totalAmount.toLocaleString()}</h2>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-section">
        <label>Filter by Status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Loan Requests Table */}
      <div className="table-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Term</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Approved Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.borrower}</td>
                <td>₹{req.amount}</td>
                <td>{req.term} mo</td>
                <td>{req.purpose}</td>
                <td>
                  <span className={`status ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td>{req.createdAt}</td>
                <td>{req.approvedDate || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
