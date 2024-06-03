import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/SignUp.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/signup", { username, password });
      if (response.status === 201) {
        navigate("/signin");
      } else {
        console.error("Sign-up failed:", response.data.message);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  return (
    <div className="cardcss">
      <div className="card-body">
        <h5 className="card-title">Sign Up</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
