import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import LenderDashboard from "./LenderDashboard";
import BorrowerDashboard from "./BorrowerDashboard";
import AnalystDashboard from "./AnalystDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/lender" element={<LenderDashboard />} />
        <Route path="/borrower" element={<BorrowerDashboard />} />
        <Route path="/analyst" element={<AnalystDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
