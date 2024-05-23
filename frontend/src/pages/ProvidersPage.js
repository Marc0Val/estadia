import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioProveedores from "../components/Forms/FormularioProveedores";
import Header from "../components/Header";

const ProvidersPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["idCodigo", "empresa", "ciudad", "contacto", "telefono"];
  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-truck"></i> Proveedores
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Proveedor"
            icono="fas fa-plus"
            contenidoModal={<FormularioProveedores />}
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ProvidersPage;
