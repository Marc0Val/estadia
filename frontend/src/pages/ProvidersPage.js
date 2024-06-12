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
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          empresa: "Empresa 1",
          ciudad: "Ciudad 1",
          contacto: "Contacto 1",
          telefono: "1234567890",
        },
        {
          idCodigo: 2,
          empresa: "Empresa 2",
          ciudad: "Ciudad 2",
          contacto: "Contacto 2",
          telefono: "0987654321",
        },
      ]);
    };

    fetchData();
  }, []);
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
            titulo="Agregar Proveedor"
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ProvidersPage;
