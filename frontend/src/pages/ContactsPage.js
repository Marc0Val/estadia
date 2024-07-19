import React, { useState, useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioContactos from "../components/Forms/FormularioContactos";
import Header from "../components/Header";
import { getContactsRequest } from "../api/contacts.api";
import BotonPDF from "../components/Buttons/BotonPDF";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  const columnNames = ["id_contact", "name_", "cell_number", "email", "title"];

  useEffect(() => {
    async function cargarContactos() {
      const response = await getContactsRequest();
      if (Array.isArray(response.data)) {
        setContacts(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setContacts([]);
      }
      console.log(response);
    }
    cargarContactos();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Contactos
      </p>
      <hr />
      <Header
        contenido={
          <BotonPDF
            pageTitle={"Contactos"}
            columns={{
              name_: "Nombre",
              cell_number: "Número de celular",
              email: "Correo electrónico",
              title: "Título",
            }}
            data={contacts}
          />
        }
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Contacto"
            icono="fas fa-plus"
            contenidoModal={<FormularioContactos />}
            titulo="Agregar Contacto"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={contacts}
        totalRecords={contacts.length}
        fetchElemento={getContactsRequest}
        hiddenColumns={["id_contact"]}
        customColumnNames={{
          name_: "Nombre",
          cell_number: "Número de celular",
          email: "Correo electrónico",
          title: "Título",
        }}
        tipoFormulario="contacts"
      />
    </div>
  );
};

export default ContactsPage;
