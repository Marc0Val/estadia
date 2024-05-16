import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
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
        <div className="sidebar-header"></div>
        <ul className="list-unstyled components">
          <Link to="/personal" className="lii">
            <li>
              <i className="fas fa-user"></i>
              Personal
            </li>
          </Link>
          <Link to="/clientes" className="lii">
            <li>
              <i className="fas fa-users"></i>
              Clientes
            </li>
          </Link>
          <Link to="/documentos" className="lii">
            <li>
              <i className="fas fa-file-alt"></i>
              Documentos
            </li>
          </Link>
          <Link to="/fotos" className="lii">
            <li>
              <i className="fas fa-camera"></i>
              Fotos
            </li>
          </Link>
          <Link to="/proveedores" className="lii">
            <li>
              <i className="fas fa-truck"></i>
              Proveedores
            </li>
          </Link>
          <Link to="/contactos" className="lii">
            <li>
              <i className="fas fa-address-book"></i>
              Contactos
            </li>
          </Link>
          <Link to="/categorias" className="lii">
            <li>
              <i className="fas fa-list"></i>
              Categorías
            </li>
          </Link>
          <Link to="/productos" className="lii">
            <li>
              <i className="fas fa-box"></i>
              Productos
            </li>
          </Link>
          <Link to="/servicios" className="lii">
            <li>
              <i className="fas fa-concierge-bell"></i>
              Servicios
            </li>
          </Link>
          <Link to="/ordenes-de-servicio" className="lii">
            <li>
              <i className="fas fa-tools"></i>
              Ordenes de Servicio
            </li>
          </Link>
          <Link to="/cotizaciones" className="lii">
            <li>
              <i className="fas fa-file-invoice-dollar"></i>
              Cotizaciones
            </li>
          </Link>
          <Link to="/ordenes-de-compra" className="lii">
            <li>
              <i className="fas fa-shopping-cart"></i>
              Ordenes de Compra
            </li>
          </Link>
          <Link to="/activos-de-clientes" className="lii">
            <li>
              <i className="fas fa-wallet"></i>
              Activos de Clientes
            </li>
          </Link>
          <Link to="/polizas" className="lii">
            <li>
              <i className="fas fa-file-contract"></i>
              Pólizas
            </li>
          </Link>
        </ul>
        <button className="btn d-md-none" onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
