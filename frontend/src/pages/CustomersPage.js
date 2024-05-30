import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioClientes from "../components/Forms/FormularioClientes";
import Header from "../components/Header";

const PersonalPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "idCodigo",
    "empresa",
    "ciudad",
    "contacto",
    "correo",
    "telefono",
    "portal",
  ];
  // informacion de prueba solo 1
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
      ]);
    }

    fetchData();
  }
  , []);
  

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
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default PersonalPage;
