import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  const cerrarSesion = async () => {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Estás por cerrar sesión",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await logout();
          Swal.fire({
            icon: "success",
            title: "Logout exitoso",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/";
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        <NavLink to="/admin" className="navbar-brand">
          <FaHome className="me-2 icon lii" />
        </NavLink>
        <ul className="nav justify-content-end">
          <li>
            <button
              type="button"
              className="btn"
              title="Cerrar Sesión"
              onClick={cerrarSesion}
            >
              <FaSignOutAlt className="icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
