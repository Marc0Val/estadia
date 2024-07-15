import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioActivoCliente from "../components/Forms/FormularioActivoCliente";
import Header from "../components/Header";
import { getClientAssetProviderProductRequest } from "../api/clientassets.api";
import BotonPDF from "../components/Buttons/BotonPDF";

const ActiveCustomerPage = () => {
  const [activeCustomer, setActiveCustomer] = useState([]);

  const columnNames = [
    "id_client_asset",
    "name_",
    "serial_",
    "product",
    "client",
  ];

  useEffect(() => {
    async function cargarClientesActivos() {
      const response = await getClientAssetProviderProductRequest();
      if (Array.isArray(response.data)) {
        // Asegúrate de que response.data sea un arreglo
        setActiveCustomer(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setActiveCustomer([]);
      }
      console.log(response);
    }
    cargarClientesActivos();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-user"></i> Clientes activos
      </p>
      <hr />
      <Header
        contenido={
          <BotonPDF
            pageTitle={"Clientes activos"}
            columns={{
              name_: "Nombre",
              serial_: "Serial",
              product: "Producto",
              client: "Cliente",
            }}
            data={activeCustomer}
          />
        }
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Cliente Activo"
            icono="fas fa-plus"
            contenidoModal={<FormularioActivoCliente />}
          />
        }
      />

      <TablaInfo
        columns={columnNames}
        data={activeCustomer}
        totalRecords={activeCustomer.length}
        hiddenColumns={["id_client_asset"]}
        customColumnNames={{
          name_: "Nombre",
          serial_: "Serial",
          product: "Producto",
          client: "Cliente",
        }}
      />
    </div>
  );
};

export default ActiveCustomerPage;
