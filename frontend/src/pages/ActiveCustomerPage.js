import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/BotonModal";

const ActiveCustomerPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "Identificador",
    "Activo",
    "Cliente",
    "EstadoPoliza",
    "VencimientoPoliza",
    "NroInventario",
  ];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-user"></i> Clientes activos
      </p>
      <hr />
      <BotonModal
        nombreBoton="Agregar cliente"
        icono="fas fa-plus"
        contenidoModal={
          <form>
            <div className="form-group">
              <label htmlFor="nombre">
                <strong>Nombre*</strong>
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">
                <strong>Apellido*</strong>
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido"
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">
                <strong>Teléfono*</strong>
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="telefono"
                placeholder="Teléfono"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <strong>Email*</strong>
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">
                <strong>Dirección*</strong>
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="direccion"
                placeholder="Dirección"
              />
            </div>
            <div className="form-group">
              <label htmlFor="estadoPoliza">
                <strong>Estado de la póliza*</strong>
              </label>
              <select
                required
                className="form-control"
                id="estadoPoliza"
                placeholder="Estado de la póliza"
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="vencimientoPoliza">
                <strong>Vencimiento de la póliza*</strong>
              </label>
              <input
                required
                type="date"
                className="form-control"
                id="vencimientoPoliza"
                placeholder="Vencimiento de la póliza"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nroInventario">
                <strong>Nro de inventario*</strong>
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="nroInventario"
                placeholder="Nro de inventario"
              />
            </div>
          </form>
        }
      />
      <hr />

      <TablaInfo
        rows={data.length}
        columns={columnNames}
        data={data}
        totalRecords={data.length}
      />
    </div>
  );
};

export default ActiveCustomerPage;
