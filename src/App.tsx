// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./index.css";
import UserDashboard from "./components/UserDashboard";
import  AdminDashboard from "./components/AdminDashboard";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-dashboard" element={<UserDashboard onRequestClose={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
       
      </Routes>
    </Router>
  );
};

export default App;
