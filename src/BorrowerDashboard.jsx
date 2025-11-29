import React from "react";
import "./BorrowerDashboard.css";

function BorrowerDashboard() {
    return (
        <div className="dash-container">
            <h1>Borrower Dashboard</h1>
            <div className="cards">
                <div className="card">Apply for Loan</div>
                <div className="card">My Loans</div>
                <div className="card">Payment Schedule</div>
                <div className="card">Upload Documents</div>
            </div>
        </div>
    );
}

export default BorrowerDashboard;
