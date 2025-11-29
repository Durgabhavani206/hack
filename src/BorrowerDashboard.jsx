import React, { useState, useEffect } from "react";
import "./BorrowerDashboard.css";

export default function BorrowerDashboard() {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [term, setTerm] = useState("");
  const [requests, setRequests] = useState([]);
  const [rate, setRate] = useState(12); // default interest rate %
  const [calculatedInterest, setCalculatedInterest] = useState(0);

  // Load all requests from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loanRequests")) || [];
    setRequests(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !purpose || !term) {
      alert("Please fill all fields");
      return;
    }

    const newRequest = {
      id: "REQ" + Date.now(),
      amount: parseFloat(amount),
      purpose,
      term: parseInt(term),
      status: "Pending",
      borrower: "Current User",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [...requests, newRequest];
    setRequests(updated);
    localStorage.setItem("loanRequests", JSON.stringify(updated));

    setAmount("");
    setPurpose("");
    setTerm("");
    setCalculatedInterest(0);

    alert("Loan Request Sent!");
  };

  const calculateInterest = () => {
    // Simple interest = P * R * T / 100
    const interest = (amount * rate * term) / 1200; // monthly term, rate yearly
    setCalculatedInterest(interest.toFixed(2));
  };

  return (
    <div className="borrower-container">
      <h1>Borrower Dashboard</h1>

      <div className="form-card">
        <h3>Request New Loan</h3>

        <form onSubmit={handleSubmit}>
          <label>Loan Amount</label>
          <input
            type="number"
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>Purpose</label>
          <input
            type="text"
            value={purpose}
            placeholder="Why do you need the loan?"
            onChange={(e) => setPurpose(e.target.value)}
          />

          <label>Term (in months)</label>
          <input
            type="number"
            value={term}
            placeholder="Ex: 12"
            onChange={(e) => setTerm(e.target.value)}
          />

          <label>Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            placeholder="Ex: 12"
            onChange={(e) => setRate(e.target.value)}
          />

          <button type="button" className="btn-calc" onClick={calculateInterest}>
            Calculate Interest
          </button>
          {calculatedInterest > 0 && (
            <p className="calc-result">
              Estimated Interest: ₹{calculatedInterest}
            </p>
          )}

          <button type="submit" className="btn-submit">
            Send Request
          </button>
        </form>
      </div>

      {/* Loan Requests Table */}
      <div className="requests-table-card">
        <h3>My Loan Requests</h3>
        {requests.length === 0 ? (
          <p className="empty-msg">No loan requests yet.</p>
        ) : (
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Term (mo)</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>₹{req.amount}</td>
                  <td>{req.purpose}</td>
                  <td>{req.term}</td>
                  <td className={`status ${req.status.toLowerCase()}`}>
                    {req.status}
                  </td>
                  <td>{req.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
