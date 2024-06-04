import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/SignIn.css";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  id: string;
  role: string;
}

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("http://localhost:9082/user/signin", {
        username,
        password,
      });
      const token = response.data
   
      localStorage.setItem("token", token);
      console.log(token);
      

      const decodedToken = jwtDecode<DecodedToken>(token);
      const role = decodedToken.role;
      if (role === "admin") {
       
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="cardcss">
        <h5 className="card-title">Sign In</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
            <button type="submit" className="submit-button">
              Sign In
            </button>
            <button
              type="button"
              className="link-button"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
