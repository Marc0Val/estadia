import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioCategoria from "../components/Forms/FormularioCategorias";
import Header from "../components/Header";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["NombreCategoria"];

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
            contenidoModal={<FormularioCategoria />}
          />
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
