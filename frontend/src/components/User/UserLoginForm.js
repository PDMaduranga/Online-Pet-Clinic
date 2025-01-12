import React, { useState } from "react";
import { login } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (data.user) {
        localStorage.setItem("token", data.token); // Store token
        if (data.user.role === "Clinic") {
          navigate("/clinicdashboard"); // Redirect to clinic dashboard
        } else if (data.user.role === "Owner") {
          navigate("/ownerdashboard"); // Redirect to owner dashboard
        }
      } else {
        alert("User login failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/assets/pet clinic Backgraund.jpg')" }}
      >
        <form
          onSubmit={handleUserLogin}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
            User Login
          </h2>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
