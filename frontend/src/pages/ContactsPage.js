import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioContactos from "../components/Forms/FormularioContactos";
import Header from "../components/Header";

const ContactsPage = () => {
  // info de prueba: Nombre	Celular	Celular	Telefono
  const [data, setData] = useState([]);
  const columnNames = ["Nombre", "Celular", "Correo", "Telefono"];
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          Nombre: "Nombre 1",
          Celular: "1234567890",
          Correo: "test@test.com",
          Telefono: "1234567890",
        },
        {
          idCodigo: 2,
          Nombre: "Nombre 2",
          Celular: "1234567890",
          Correo: "test@test.com",
          Telefono: "1234567890",
        },
        {
          idCodigo: 3,
          Nombre: "Nombre 3",
          Celular: "1234567890",
          Correo: "test@test.com",
          Telefono: "1234567890",
        },
        {
          idCodigo: 4,
          Nombre: "Nombre 4",
          Celular: "1234567890",
          Correo: "test@test.com",
          Telefono: "1234567890",
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
            titulo="Agregar Contacto"
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ContactsPage;
