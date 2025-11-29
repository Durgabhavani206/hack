import React from "react";
import "./LenderDashboard.css";

function LenderDashboard() {
    return (
        <div className="dash-container">
            <h1>Lender Dashboard</h1>
            <div className="cards">
                <div className="card">Create Loan Offer</div>
                <div className="card">View Borrowers</div>
                <div className="card">Track Payments</div>
                <div className="card">Transaction Records</div>
            </div>
        </div>
    );
}

export default LenderDashboard;
