import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";


function Navbar() {
  return (
    <nav className="navbar fixed-top">
      <Link to="/home">
        <FaHome className="icon" />
      </Link>
      <Link to="/profile">
        <FaUser className="icon" />
      </Link>
      <Link to="/">
        <FaSignOutAlt className="icon" />
      </Link>
    </nav>
  );
}

export default Navbar;
