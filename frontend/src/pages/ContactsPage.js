import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/BotonModal";

const ContactsPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["idCodigo", "Nombre", "Celular", "Celular", "Telefono"];
  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Contactos
      </p>
      <hr />
      <BotonModal
        nombreBoton="Agregar Contacto"
        icono="fas fa-plus"
        contenidoModal={
          <div class="row pre-scrollable">
            {/* formulario que pida
            Nombre *
Apellido *
Cargo *
Título *
Tipo
Celular *
Teléfono
Correo
Direccion*
Código Postal
siendo los campos con * obligatorios
            */}
            <form>
              <div className="form-group">
                <label htmlFor="nombreCompleto">
                  <strong>Nombre completo*</strong>
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="nombreCompleto"
                  placeholder="Nombre completo"
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
                <label htmlFor="cargo">
                  <strong>Cargo*</strong>
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="cargo"
                  placeholder="Cargo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="titulo">
                  <strong>Título*</strong>
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="titulo"
                  placeholder="Título"
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">
                  <strong>Tipo</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipo"
                  placeholder="Tipo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="celular">
                  <strong>Celular*</strong>
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="celular"
                  placeholder="Celular"
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
                <label htmlFor="correo">
                  <strong>Correo</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  placeholder="Correo"
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
                <label htmlFor="codigoPostal">
                  <strong>Código Postal</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="codigoPostal"
                  placeholder="Código Postal"
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
          </div>

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

export default ContactsPage;
