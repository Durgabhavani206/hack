import React from "react";
import "./AnalystDashboard.css";

export default function AnalystDashboard({ loanRequests }) {
  // Count status
  const pendingCount = loanRequests.filter(r => r.status === "Pending").length;
  const approvedCount = loanRequests.filter(r => r.status === "Approved").length;
  const rejectedCount = loanRequests.filter(r => r.status === "Rejected").length;

  // Total amounts
  const totalRequested = loanRequests.reduce((sum, r) => sum + Number(r.amount), 0);
  const totalApproved = loanRequests
    .filter(r => r.status === "Approved")
    .reduce((sum, r) => sum + Number(r.amount), 0);

  // Recent requests (last 5)
  const recentRequests = [...loanRequests].reverse().slice(0, 5);

  return (
    <div className="analyst-container">
      <h1>Analyst Dashboard</h1>

      <div className="section">
        <h2>Status Distribution</h2>
        {loanRequests.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul>
            <li>Pending: {pendingCount}</li>
            <li>Approved: {approvedCount}</li>
            <li>Rejected: {rejectedCount}</li>
          </ul>
        )}
      </div>

      <div className="section">
        <h2>Requested vs Approved Amount</h2>
        {loanRequests.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul>
            <li>Total Requested: ₹{totalRequested}</li>
            <li>Total Approved: ₹{totalApproved}</li>
          </ul>
        )}
      </div>

      <div className="section">
        <h2>Recent Loan Requests</h2>
        {recentRequests.length === 0 ? (
          <p>No requests yet</p>
        ) : (
          <ul>
            {recentRequests.map((r) => (
              <li key={r.id}>
                {r.borrower} requested ₹{r.amount} for "{r.purpose}" - <strong>{r.status}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
