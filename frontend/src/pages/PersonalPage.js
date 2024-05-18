import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/BotonModal";

const PersonalPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["idCodigo", "Nombre", "Celular", "Rol", "Estado"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/personal");
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
              <label htmlFor="rol">
                <strong>Rol*</strong>
              </label>
              <select
                required
                className="form-control"
                id="rol"
                placeholder="Rol"
              >
                <option value="">Selecciona un rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Operador">Operador</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="titulo">
                <strong>Titulo</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Titulo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo">
                <strong>Correo*</strong>
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="correo"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="celular">
                <strong>Celular*</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="celular"
                placeholder="Celular"
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">
                <strong>Direccion*</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                placeholder="Direccion"
              />
            </div>
            <hr />
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="notificar"
              />
              <label className="form-check-label" htmlFor="notificar">
                <strong>Notificar por correo</strong>
              </label>
            </div>
            <hr />
            <div className="form-group">
              <label htmlFor="contrasena">
                <strong>Contraseña*</strong>
              </label>
              <input
                required
                type="password"
                className="form-control"
                id="contrasena"
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmarContrasena">
                <strong>Confirmar contraseña*</strong>
              </label>
              <input
                required
                type="password"
                className="form-control"
                id="confirmarContrasena"
                placeholder="Confirmar contraseña"
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

export default PersonalPage;

// ignora, es solo logica no implementada de la pagina de personal en la que se actualizan los datos cada 5 segundos
// peeeeero hace peticiones de forma que puede volver lento el servidor

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import TablaInfo from "../components/TablaInfo";

// const PersonalPage = () => {
//   const [data, setData] = useState([]);
//   const columnNames = ["idCodigo", "Nombre", "celular", "rol", "estado"];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await axios.get("http://localhost:3001/personal");
//         setData(result.data);
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'No se pudieron cargar los datos del personal',
//         });
//       }
//     };

//     fetchData();

//     // Actualizar los datos cada 5 segundos
//     const intervalId = setInterval(fetchData, 5000);

//     // Limpiar el intervalo cuando el componente se desmonte
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="contenedor container-fluid">
//       <p className="subtitulo">
//         <i className="fas fa-users"></i> Personal
//       </p>
//       <hr />
//       <TablaInfo
//         rows={data}
//         columns={columnNames.length}
//         columnNames={columnNames}
//         totalRecords={data.length}
//       />
//     </div>
//   );
// };

// export default PersonalPage;
