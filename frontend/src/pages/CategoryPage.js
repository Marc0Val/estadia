import React, { useState, useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioCategorias from "../components/Forms/FormularioCategorias";
import Header from "../components/Header";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["NombreCategoria"];

  useEffect(() => {
    const fetchData = async () => {
      setData([
        { NombreCategoria: "Categoria 1" },
        { NombreCategoria: "Categoria 2" },
        { NombreCategoria: "Categoria 3" },
      ]);
    };

    fetchData();
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
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default CategoryPage;
