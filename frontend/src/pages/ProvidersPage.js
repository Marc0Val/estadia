import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioProveedores from "../components/Forms/FormularioProveedores";
import Header from "../components/Header";

const ProvidersPage = () => {
  // info de prueba: "empresa", "ciudad", "contacto", "telefono"
  const [data, setData] = useState([]);
  const columnNames = ["empresa", "ciudad", "contacto", "telefono"];

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
          telefono: "1234567890",
        },
        {
          idCodigo: 3,
          empresa: "Empresa 3",
          ciudad: "Ciudad 3",
          contacto: "Contacto 3",
          telefono: "1234567890",
        },
        {
          idCodigo: 4,
          empresa: "Empresa 4",
          ciudad: "Ciudad 4",
          contacto: "Contacto 4",
          telefono: "1234567890",
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
