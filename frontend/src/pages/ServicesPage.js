import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/BotonModal";

const ServicesPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["idCodigo", "Nombre", "Precio"];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-boxes"></i> Servicios
      </p>
      <hr />
      <BotonModal
        nombreBoton="Agregar servicio"
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
              <label htmlFor="categoria">
                <strong>Categoría*</strong>
              </label>
              <select
                required
                className="form-control"
                id="categoria"
                placeholder="Categoría"
              >
                <option value="1">Categoria de las creadas</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="precio">
                <strong>Precio*</strong>
              </label>
              <input
                required
                type="number"
                className="form-control"
                id="precio"
                placeholder="Precio"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">
                <strong>Descripción*</strong>
              </label>
              <textarea
                required
                className="form-control"
                id="descripcion"
                placeholder="Descripción"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="unidadSat">
                <strong>Unidad SAT</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="unidadSat"
                placeholder="Unidad SAT"
              />
            </div>
            <div className="form-group">
              <label htmlFor="codigoSat">
                <strong>Código SAT</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="codigoSat"
                placeholder="Código SAT"
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
              <button type="reset" className="btn btn-secondary mr-2">
                <i className="fas fa-eraser"></i>
              </button>
            </div>
          </form>
        }
      />

      <TablaInfo
        rows={data.length}
        columns={columnNames}
        data={data}
        totalRecords={data.length}
      />
    </div>
  );
};

export default ServicesPage;
