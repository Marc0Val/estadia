import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioClientes from "../components/Forms/FormularioClientes";
import Header from "../components/Header";

const PersonalPage = () => {
  // info de prueba: empresa	ciudad	contacto	correo	telefono	portal
  const [data, setData] = useState([]);
  const columnNames = [
    "empresa",
    "ciudad",
    "contacto",
    "correo",
    "telefono",
    "portal",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          empresa: "Empresa 1",
          ciudad: "Ciudad 1",
          contacto: "Contacto 1",
          correo: "test@test.com",
          telefono: "1234567890",
          portal: "www.test.com",
        },
        {
          idCodigo: 2,
          empresa: "Empresa 2",
          ciudad: "Ciudad 2",
          contacto: "Contacto 2",
          correo: "test@test.com",
          telefono: "1234567890",
          portal: "www.test.com",
        },
        {
          idCodigo: 3,
          empresa: "Empresa 3",
          ciudad: "Ciudad 3",
          contacto: "Contacto 3",
          correo: "test@test.com",
          telefono: "1234567890",
          portal: "www.test.com",
        },
        {
          idCodigo: 4,
          empresa: "Empresa 4",
          ciudad: "Ciudad 4",
          contacto: "Contacto 4",
          correo: "test@test.com",
          telefono: "1234567890",
          portal: "www.test.com",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Personal
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Cliente"
            icono="fas fa-plus"
            contenidoModal={<FormularioClientes />}
            titulo="Agregar Cliente"
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default PersonalPage;
