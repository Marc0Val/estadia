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
      <TablaInfo
        rows={data.length}
        columns={columnNames}
        data={data}
        totalRecords={data.length}
      />
    </div>
  );
};

export default ContactsPage;
