import React, { useState, useEffect } from "react";
import "./LenderDashboard.css";

export default function LenderDashboard() {
  const [loanRequests, setLoanRequests] = useState([]);
  const [stats, setStats] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
    totalInvested: 0,
    expectedReturn: 0,
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(stored);
    calculateStats(stored);
  }, []);

  const calculateStats = (requests) => {
    const approvedLoans = requests.filter(r => r.status === "Approved");
    const rejectedLoans = requests.filter(r => r.status === "Rejected");
    const pendingLoans = requests.filter(r => r.status === "Pending");

    const totalInvested = approvedLoans.reduce(
      (sum, r) => sum + parseFloat(r.amount),
      0
    );

    // Expected return formula: amount * term * 0.01 * 12 (simplified)
    const expectedReturn = approvedLoans.reduce(
      (sum, r) => sum + parseFloat(r.amount) * parseFloat(r.term) * 0.01,
      0
    );

    setStats({
      approved: approvedLoans.length,
      rejected: rejectedLoans.length,
      pending: pendingLoans.length,
      totalInvested,
      expectedReturn,
    });
  };

  const handleDecision = (id, status) => {
    const updated = loanRequests.map(req =>
      req.id === id ? { ...req, status, approvedDate: status === "Approved" ? new Date().toLocaleDateString() : null } : req
    );
    setLoanRequests(updated);
    localStorage.setItem("loanRequests", JSON.stringify(updated));
    calculateStats(updated);
  };

  // Next due: earliest approved loan
  const nextDue = loanRequests
    .filter(r => r.status === "Approved")
    .sort((a, b) => new Date(a.approvedDate) - new Date(b.approvedDate))[0];

  return (
    <div className="lender-container">
      <h1>Lender Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card approved">
          <h3>Approved Loans</h3>
          <h2>{stats.approved}</h2>
        </div>
        <div className="stat-card rejected">
          <h3>Rejected Loans</h3>
          <h2>{stats.rejected}</h2>
        </div>
        <div className="stat-card pending">
          <h3>Pending Requests</h3>
          <h2>{stats.pending}</h2>
        </div>
        <div className="stat-card total-invested">
          <h3>Total Invested</h3>
          <h2>₹{stats.totalInvested.toLocaleString()}</h2>
        </div>
        <div className="stat-card expected-return">
          <h3>Expected Return</h3>
          <h2>₹{stats.expectedReturn.toLocaleString()}</h2>
        </div>
        <div className="stat-card next-due">
          <h3>Next Due</h3>
          {nextDue ? (
            <p>{nextDue.borrower} - ₹{nextDue.amount}</p>
          ) : (
            <p>No due</p>
          )}
        </div>
      </div>

      {/* Loan Requests Table */}
      <div className="request-section">
        <h2>Loan Requests</h2>
        {loanRequests.length === 0 ? (
          <p className="empty-msg">No loan requests available</p>
        ) : (
          <table className="loan-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Borrower</th>
                <th>Amount</th>
                <th>Term</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Decision</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map(req => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.borrower}</td>
                  <td>₹{req.amount}</td>
                  <td>{req.term} mo</td>
                  <td>{req.purpose}</td>
                  <td>
                    <span className={`status ${req.status.toLowerCase()}`}>{req.status}</span>
                  </td>
                  <td>
                    {req.status === "Pending" ? (
                      <>
                        <button className="btn-accept" onClick={() => handleDecision(req.id, "Approved")}>Approve</button>
                        <button className="btn-reject" onClick={() => handleDecision(req.id, "Rejected")}>Reject</button>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
