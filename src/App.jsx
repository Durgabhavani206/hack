import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import LenderDashboard from "./LenderDashboard";
import BorrowerDashboard from "./BorrowerDashboard";
import AnalystDashboard from "./AnalystDashboard";

function App() {
  // -------------------------
  // SHARED LOAN REQUEST STATE
  // -------------------------
  const [loanRequests, setLoanRequests] = useState([]);

  // Borrower sends request
  const handleBorrowerRequest = (request) => {
    setLoanRequests([...loanRequests, request]);
  };

  // Lender decision (Approve/Reject)
  const handleLenderDecision = (id, status) => {
    const updatedRequests = loanRequests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    setLoanRequests(updatedRequests);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/lender"
          element={
            <LenderDashboard
              loanRequests={loanRequests}
              onDecision={handleLenderDecision}
            />
          }
        />

        <Route
          path="/borrower"
          element={
            <BorrowerDashboard onSendRequest={handleBorrowerRequest} />
          }
        />

        <Route
          path="/analyst"
          element={<AnalystDashboard loanRequests={loanRequests} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
