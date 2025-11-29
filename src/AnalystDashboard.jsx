import React from "react";
import "./AnalystDashboard.css";

function AnalystDashboard() {
    return (
        <div className="dash-container">
            <h1>Financial Analyst Dashboard</h1>
            <div className="cards">
                <div className="card">Risk Assessment</div>
                <div className="card">Loan Performance</div>
                <div className="card">Generate Reports</div>
                <div className="card">Analytics Dashboard</div>
            </div>
        </div>
    );
}

export default AnalystDashboard;
