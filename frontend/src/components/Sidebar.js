import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <button className="btn btn-primary d-md-none" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header pt-3">
          <img src={logo} alt="logo" className="grow"/>
        </div>
        <hr />
        <button
          className="btn btn-danger d-md-none"
          onClick={toggleSidebar}
          style={{ marginTop: "40px" }}
        >
          <i className="fas fa-times"></i>
        </button>
        <ul className="list-unstyled components">
          <NavLink to="/admin/" className="lii">
            <li>
              <i className="fas fa-users"></i>
              Personal
            </li>
          </NavLink>
          <NavLink to="/admin/clientes" className="lii">
            <li>
              <i className="fas fa-users"></i>
              Clientes
            </li>
          </NavLink>
          {/* Deshabil por el momento 21/05/2024 */}
          {/* <NavLink to="/admin/documentos" className="lii">
            <li>
              <i className="fas fa-file-alt"></i>
              Documentos
            </li>
          </NavLink> */}
          <NavLink to="/admin/proveedores" className="lii">
            <li>
              <i className="fas fa-truck"></i>
              Proveedores
            </li>
          </NavLink>
          <NavLink to="/admin/contactos" className="lii">
            <li>
              <i className="fas fa-address-book"></i>
              Contactos
            </li>
          </NavLink>
          <NavLink to="/admin/categorias" className="lii">
            <li>
              <i className="fas fa-list"></i>
              Categorías
            </li>
          </NavLink>
          <NavLink to="/admin/productos" className="lii">
            <li>
              <i className="fas fa-box"></i>
              Productos
            </li>
          </NavLink>
          <NavLink to="/admin/servicios" className="lii">
            <li>
              <i className="fas fa-concierge-bell"></i>
              Servicios
            </li>
          </NavLink>
          <NavLink to="/admin/ordenesdservicio" className="lii">
            <li>
              <i className="fas fa-tools"></i>
              Ordenes de Servicio
            </li>
          </NavLink>
          <NavLink to="/admin/cotizaciones" className="lii">
            <li>
              <i className="fas fa-file-invoice-dollar"></i>
              Cotizaciones
            </li>
          </NavLink>
          <NavLink to="/admin/ordenes-de-compra" className="lii">
            <li>
              <i className="fas fa-shopping-cart"></i>
              Ordenes de Compra
            </li>
          </NavLink>
          <NavLink to="/admin/activos-de-clientes" className="lii">
            <li>
              <i className="fas fa-wallet"></i>
              Activos de Clientes
            </li>
          </NavLink>
          {/* Deshabil por el momento 21/05/2024 */}
          {/* <NavLink to="/admin/polizas" className="lii">
            <li>
              <i className="fas fa-file-contract"></i>
              Pólizas
            </li>
          </NavLink> */}
          <button
            className="btn btn-link"
            onClick={toggleDropdown}
            style={{
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-cogs"></i>Configuraciones
          </button>
          <Collapse in={isDropdownOpen}>
            <ul className="list-unstyled">
              <NavLink to="/admin/configuraciones" className="lii">
                <li>
                  <i className="fas fa-cog"></i>Generales
                </li>
              </NavLink>
              <NavLink to="/admin/roles" className="lii">
                <li>
                  <i className="fas fa-cog"></i>Roles y Permisos
                </li>
              </NavLink>
            </ul>
          </Collapse>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
