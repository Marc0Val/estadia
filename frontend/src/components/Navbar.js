import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className="navbar fixed-top">
      <NavLink to="/admin">
        <FaHome className="icon" />
      </NavLink>
      <NavLink to="/profile">
        <FaUser className="icon" />
      </NavLink>
      <NavLink to="/">
        <FaSignOutAlt className="icon" />
      </NavLink>
    </nav>
    // <h1>Jalo?</h1>
  );
}

export default Navbar;
