import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioContactos from "../components/Forms/FormularioContactos";
import Header from "../components/Header";

const ContactsPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["idCodigo", "Nombre", "Celular", "Celular", "Telefono"];
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          Nombre: "Juan Perez",
          Celular: "1234567890",
          Correo: "test@test.com",
          Telefono: "1234567890",
        },
        {
          idCodigo: 2,
          Nombre: "Maria Lopez",
          Celular: "0987654321",
          Correo: "test@test.com",
          Telefono: "0987654321",
        },
        {
          idCodigo: 3,
          Nombre: "Pedro Ramirez",
          Celular: "6789012345",
          Correo: "test@test.com",
          Telefono: "6789012345",
        },
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Contactos
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Contacto"
            icono="fas fa-plus"
            contenidoModal={<FormularioContactos />}
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ContactsPage;
