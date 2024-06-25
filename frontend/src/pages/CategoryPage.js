import React, { useState, useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioCategorias from "../components/Forms/FormularioCategorias";
import Header from "../components/Header";
import { getCategoriesRequest } from "../api/catergory";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const columnNames = ["id_category", "name_"];

  useEffect(() => {
    async function cargarCategorias() {
      const response = await getCategoriesRequest();
      if (Array.isArray(response.data)) {
        // Asegúrate de que response.data sea un arreglo
        setCategories(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setCategories([]);
      }
      console.log(response);
    }
    cargarCategorias();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Categoria
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nueva Categoria"
            icono="fas fa-plus"
            contenidoModal={<FormularioCategorias />}
            titulo="Agregar Categoria"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={categories}
        totalRecords={categories.length}
        fetchElemento={getCategoriesRequest}
        hiddenColumns={["id_category"]}
        customColumnNames={{
          name_: "Nombre",
        }}
      />
    </div>
  );
};

export default CategoryPage;
