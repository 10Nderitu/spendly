import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth";
import { ExpenseTracker } from "./pages/dashboard";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<ExpenseTracker />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
