// // src/pages/Home.tsx
// import { useNavigate } from "react-router-dom";
// import "../styles/Home.css"; // Custom styles

// const Home = () => {
//   const navigate = useNavigate();

//   const handleRegisterClick = () => {
//     navigate("/signin");
//   };

//   return (
//     <div className="home-container">
//       <h1 className="title">Welcome to the Library Management System</h1>
//       <button className="register-button" onClick={handleRegisterClick}>
//         Register
//       </button>
//     </div>
//   );
// };

// export default Home;
// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Custom styles

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/signin");
  };

  return (
    <div className="home-container">
      <div className="welcome-box">
        <h1 className="title">Welcome to the Library Management System</h1>
        <button className="register-button" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
