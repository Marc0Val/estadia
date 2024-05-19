import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/BotonModal";

const ProvidersPage = () => {
  const [formData, setFormData] = useState({
    nombreComercial: "",
    giro: "",
    telefono: "",
    correo: "",
    pais: "",
    estado: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    ubicacion: "",
    paginaWeb: "",
    cuentasBancarias: "",
    nombreFacturacion: "",
    numeroFacturacion: "",
    domicilioFacturacion: "",
    notas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/registro",
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema con el registro",
      });
    }
  };
  const [data, setData] = useState([]);
  const columnNames = ["idCodigo", "empresa", "ciudad", "contacto", "telefono"];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-truck"></i> Proveedores
      </p>
      <hr />
      <TablaInfo
        rows={data.length}
        columns={columnNames}
        data={data}
        totalRecords={data.length}
      />
      <BotonModal
        nombreBoton="Agregar Proveedor"
        icono="fas fa-plus"
        contenidoModal={
          <div className="row">
            <div className="col-6">
              <form onSubmit={handleSubmit} className="">
                <div className="mb-3">
                  <label className="form-label">Nombre comercial *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombreComercial"
                    value={formData.nombreComercial}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Giro *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="giro"
                    value={formData.giro}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono/celular *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">País *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ciudad *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Código Postal</label>
                  <input
                    type="text"
                    className="form-control"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ubicación</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Página/portal web</label>
                  <input
                    type="url"
                    className="form-control"
                    name="paginaWeb"
                    value={formData.paginaWeb}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cuentas bancarias</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cuentasBancarias"
                    value={formData.cuentasBancarias}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre de Facturación</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombreFacturacion"
                    value={formData.nombreFacturacion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Número de Facturación</label>
                  <input
                    type="text"
                    className="form-control"
                    name="numeroFacturacion"
                    value={formData.numeroFacturacion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Domicilio de Facturación</label>
                  <input
                    type="text"
                    className="form-control"
                    name="domicilioFacturacion"
                    value={formData.domicilioFacturacion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Notas</label>
                  <textarea
                    className="form-control"
                    name="notas"
                    value={formData.notas}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                  <button type="reset" className="btn btn-secondary mx-2">
                    <i className="fas fa-eraser"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ProvidersPage;
