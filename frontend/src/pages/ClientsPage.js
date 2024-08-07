import React, { useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioClientes from "../components/Forms/FormularioClientes";
import Header from "../components/Header";
import { useClients } from "../context/ClientsContext.jsx";
import BotonPDF from "../components/Buttons/BotonPDF.js";

const ClientsPage = () => {
  const { clients, getClients } = useClients();
  const columnNames = [
    "id_client",
    "trade_name",
    "city",
    "contact_name",
    "email",
    "phone_or_cell",
  ];

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Clientes
      </p>
      <hr />
      <Header
        contenido={
          <BotonPDF
            pageTitle={"Clientes"}
            columns={{
              trade_name: "Nombre Comercial",
              city: "Ciudad",
              contact_name: "Contacto",
              email: "Correo",
              phone_or_cell: "Celular",
            }}
            data={clients}
          />
        }
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Cliente"
            icono="fas fa-plus"
            contenidoModal={<FormularioClientes />}
            titulo="Agregar Cliente"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={clients}
        totalRecords={clients.length}
        hiddenColumns={["id_client"]}
        customColumnNames={{
          trade_name: "Nombre Comercial",
          city: "Ciudad",
          contact_name: "Nombre de Contacto",
          email: "Correo Electrónico",
          phone_or_cell: "Teléfono o Celular",
        }}
        formType="clients"
      />
    </div>
  );
};

export default ClientsPage;
