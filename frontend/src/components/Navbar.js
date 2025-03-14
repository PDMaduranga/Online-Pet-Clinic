import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-70 p-4 text-white fixed w-full">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Pet Clinic
        </Link>
        <div>
          <Link to="/userlogin" className="px-4">
            Login
          </Link>
          <Link to="/adminlogin" className="px-4">
            Admin Login
          </Link>
          <Link to="/adminregisterform" className="px-4">
            Admin Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
