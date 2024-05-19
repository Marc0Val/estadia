import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/BotonModal";

const PersonalPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "idCodigo",
    "empresa",
    "ciudad",
    "contacto",
    "correo",
    "telefono",
    "portal",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/clientes");
        setData(result.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudieron cargar los datos del personal",
        });
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    nombreComercial: "",
    giro: "",
    telefono: "",
    direccion: "",
    notas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones
    if (
      formData.nombreComercial.length < 2 ||
      formData.nombreComercial.length > 60
    ) {
      Swal.fire(
        "Error",
        "Nombre Comercial debe tener entre 2 y 60 caracteres.",
        "error"
      );
      return;
    }
    if (formData.giro === "") {
      Swal.fire("Error", "Debe seleccionar un giro.", "error");
      return;
    }
    if (
      formData.telefono &&
      (formData.telefono.length < 10 || formData.telefono.length > 20)
    ) {
      Swal.fire(
        "Error",
        "Teléfono/Celular debe tener entre 10 y 20 caracteres.",
        "error"
      );
      return;
    }
    if (formData.direccion.length < 5 || formData.direccion.length > 30) {
      Swal.fire(
        "Error",
        "Dirección debe tener entre 5 y 30 caracteres.",
        "error"
      );
      return;
    }
    if (
      formData.notas &&
      (formData.notas.length < 5 || formData.notas.length > 50)
    ) {
      Swal.fire("Error", "Notas debe tener entre 5 y 50 caracteres.", "error");
      return;
    }

    Swal.fire("Éxito", "Formulario enviado correctamente.", "success");
    // Aquí puedes agregar la lógica para enviar los datos a un servidor o manejar la información
  };

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Personal
      </p>
      <hr />
      <BotonModal
        nombreBoton="Agregar personal"
        icono="fas fa-plus"
        contenidoModal={
          <form onSubmit={handleSubmit}>
            <div className="contenedor mb-3">
              <label htmlFor="nombreComercial" className="form-label">
                <strong>Nombre Comercial*</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreComercial"
                name="nombreComercial"
                value={formData.nombreComercial}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="60"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="giro" className="form-label">
                <strong>Giro*</strong>
              </label>
              <select
                className="form-select"
                id="giro"
                name="giro"
                value={formData.giro}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un giro</option>
                <option value="Comercial">Comercial</option>
                <option value="Equipo Médico">Equipo Médico</option>
                <option value="Industrial">Industrial</option>
                <option value="Restaurantero">Restaurantero</option>
                <option value="Servicios">Servicios</option>
                <option value="Por Definir">Por Definir</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                <strong>Teléfono/Celular</strong>
              </label>
              <input
                type="tel"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                minLength="10"
                maxLength="20"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                <strong>Dirección*</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                minLength="5"
                maxLength="30"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="notas" className="form-label">
                <strong>Notas</strong>
              </label>
              <textarea
                className="form-control"
                id="notas"
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                minLength="5"
                maxLength="50"
              />
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

export default PersonalPage;
