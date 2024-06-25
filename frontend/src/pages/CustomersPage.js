import React, { useState, useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioClientes from "../components/Forms/FormularioClientes";
import Header from "../components/Header";
import { getClientsRequest } from "../api/clients.api";

const PersonalPage = () => {
  const [clients, setClients] = useState([]);
  const columnNames = [
    "id_client",
    "trade_name",
    "city",
    "contact_name",
    "email",
    "phone_or_cell",
  ];

  useEffect(() => {
    async function cargarClientes() {
      const response = await getClientsRequest();
      if (Array.isArray(response.data)) {
        // Asegúrate de que response.data sea un arreglo
        setClients(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setClients([]);
      }
      console.log(response);
    }
    cargarClientes();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Clientes
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
      <TablaInfo
        columns={columnNames}
        data={clients}
        totalRecords={clients.length}
        fetchElemento={getClientsRequest}
        hiddenColumns={["id_client"]}
        customColumnNames={{
          trade_name: "Nombre Comercial",
          city: "Ciudad",
          contact_name: "Nombre de Contacto",
          email: "Correo Electrónico",
          phone_or_cell: "Teléfono o Celular",
        }}
      />
    </div>
  );
};

export default PersonalPage;
