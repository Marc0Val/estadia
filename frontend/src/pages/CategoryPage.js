import React, { useEffect, useContext } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioCategorias from "../components/Forms/FormularioCategorias";
import Header from "../components/Header";
import { useCategories } from "../context/CategoriesContext.jsx";

const CategoryPage = () => {
  const { categories, getCategories } = useCategories();
  const columnNames = ["id_category", "name_"];

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Categoría
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nueva Categoría"
            icono="fas fa-plus"
            contenidoModal={<FormularioCategorias />}
            titulo="Agregar Categoría"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={categories}
        totalRecords={categories.length}
        fetchElemento={getCategories} // Ajusta la función según corresponda
        hiddenColumns={["id_category"]}
        customColumnNames={{
          name_: "Nombre",
        }}
        tipoFormulario="categorias" // Puedes pasar esto al contexto si es necesario
      />
    </div>
  );
};

export default CategoryPage;
