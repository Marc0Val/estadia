import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/BotonModal";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  // const columnNames = ["idCodigo","nombre"];
  // mostrar solo el nombre
  const columnNames = ["NombreCategoria"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/categoria");
        setData(result.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudieron cargar los datos de la categoria",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Categoria
      </p>
      <hr />
      <BotonModal
        nombreBoton="Agregar categoria"
        icono="fas fa-plus"
        contenidoModal={
          <form>
            <div className="form-group">
              <label htmlFor="nombreCategoria">
                <strong>Nombre categoria*</strong>
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="nombreCategoria"
                placeholder="Nombre categoria"
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

export default CategoryPage;
