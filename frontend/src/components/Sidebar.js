import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-primary d-md-none" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          {/* <div className="text-center sidebarImg grow">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyWhythVZp0TMHYz3yUUxnwy4-b435Hphl28hQbVwKvUdQ-nPxZyRvmYJDYDkqUT83rAQ&usqp=CAU"
              alt="logo"
            />
          </div> */}
        </div>
        <button
          className="btn btn-danger d-md-none"
          onClick={toggleSidebar}
          style={{ marginTop: "10px" }}
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

          <NavLink to="/admin/documentos" className="lii">
            <li>
              <i className="fas fa-file-alt"></i>
              Documentos
            </li>
          </NavLink>
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
          <NavLink to="/admin/ordenes-de-servicio" className="lii">
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
          <NavLink to="/admin/polizas" className="lii">
            <li>
              <i className="fas fa-file-contract"></i>
              Pólizas
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
