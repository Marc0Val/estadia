import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa"
import Swal from "sweetalert2";

const Navbar = () => {
  // funcion para cerrar sesion
  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás por cerrar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        // redireccionar a la pagina principal
        window.location.href = "/";
      }
    });
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        <NavLink to="/admin" className="navbar-brand">
          <FaHome className="me-2 lii" />
        </NavLink>
        <ul className="nav justify-content-end">
          <li>
            <button type="button" className="btn" title="Cerrar Sesion">
              <FaSignOutAlt className="icon" onClick={cerrarSesion} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
