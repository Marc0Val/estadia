import React, { useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioContactos from "../components/Forms/FormularioContactos";
import Header from "../components/Header";
import { useContacts } from "../context/ContactsContext";
import BotonPDF from "../components/Buttons/BotonPDF";

const ContactsPage = () => {
  const { contacts, getContacts } = useContacts();
  const columnNames = ["id_contact", "name_", "cell_number", "email", "title"];

  useEffect(() => {
    getContacts();
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
        hiddenColumns={["id_contact"]}
        customColumnNames={{
          name_: "Nombre",
          cell_number: "Número de celular",
          email: "Correo electrónico",
          title: "Título",
        }}
        formType="contacts"
      />
    </div>
  );
};

export default ContactsPage;
