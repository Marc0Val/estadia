import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="sidebar-wrapper">
      <button className="btn btn-primary d-md-none" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header pt-3">
          <img src={logo} alt="logo" className="grow" />
        </div>
        <button
          className="btn btn-danger d-md-none"
          onClick={toggleSidebar}
          style={{ marginTop: "52px" }}
        >
          <i className="fas fa-times"></i>
        </button>
        <ul className="list-unstyled components">
          <NavLink to="/admin/" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/" ? "active" : ""}
            >
              <i className="fas fa-users"></i>
              Personal
            </li>
          </NavLink>
          <NavLink to="/admin/clientes" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/clientes" ? "active" : ""}
            >
              <i className="fas fa-users"></i>
              Clientes
            </li>
          </NavLink>
          <NavLink to="/admin/proveedores" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/proveedores" ? "active" : ""}
            >
              <i className="fas fa-truck"></i>
              Proveedores
            </li>
          </NavLink>
          <NavLink to="/admin/contactos" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/contactos" ? "active" : ""}
            >
              <i className="fas fa-address-book"></i>
              Contactos
            </li>
          </NavLink>
          <NavLink to="/admin/categorias" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/categorias" ? "active" : ""}
            >
              <i className="fas fa-list"></i>
              Categorías
            </li>
          </NavLink>
          <NavLink to="/admin/productos" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/productos" ? "active" : ""}
            >
              <i className="fas fa-box"></i>
              Productos
            </li>
          </NavLink>
          <NavLink to="/admin/servicios" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/servicios" ? "active" : ""}
            >
              <i className="fas fa-concierge-bell"></i>
              Servicios
            </li>
          </NavLink>
          <NavLink to="/admin/ordenes-servicio" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/ordenes-servicio" ? "active" : ""}
            >
              <i className="fas fa-tools"></i>
              Ordenes de Servicio
            </li>
          </NavLink>
          <NavLink to="/admin/cotizaciones" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/cotizaciones" ? "active" : ""}
            >
              <i className="fas fa-file-invoice-dollar"></i>
              Cotizaciones
            </li>
          </NavLink>
          <NavLink to="/admin/ordenes-de-compra" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/ordenes-de-compra" ? "active" : ""}
            >
              <i className="fas fa-shopping-cart"></i>
              Ordenes de Compra
            </li>
          </NavLink>
          <NavLink to="/admin/activos-de-clientes" className="lii">
            <li
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              className={location.pathname === "/admin/activos-de-clientes" ? "active" : ""}
            >
              <i className="fas fa-wallet"></i>
              Activos de Clientes
            </li>
          </NavLink>
          <button className="btn btn-link" onClick={toggleDropdown}>
            <i className="fas fa-cogs"></i>Configuraciones
          </button>
          <Collapse in={isDropdownOpen}>
            <ul className="list-unstyled sub-options">
              <NavLink to="/admin/roles" className="lii">
                <li
                  
                  className={location.pathname === "/admin/roles" ? "active" : ""}
                >
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
