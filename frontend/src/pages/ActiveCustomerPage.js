import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioActivoCliente from "../components/Forms/FormularioActivoCliente";
import Header from "../components/Header";
import BotonPDF from "../components/Buttons/BotonPDF";
import { useClientAssets } from "../context/ClientsAssetsContext";

const ActiveCustomerPage = () => {
  const { clientAssetsProviderProduct, getClientAssetProviderProduct } =
    useClientAssets();

  const columnNames = [
    "id_client_asset",
    "name_",
    "serial_",
    "product",
    "client",
  ];

  useEffect(() => {
    getClientAssetProviderProduct();
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
            data={clientAssetsProviderProduct}
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
        data={clientAssetsProviderProduct}
        totalRecords={clientAssetsProviderProduct.length}
        hiddenColumns={["id_client_asset"]}
        customColumnNames={{
          name_: "Nombre",
          serial_: "Serial",
          product: "Producto",
          client: "Cliente",
        }}
        formType="clients_assets"
      />
    </div>
  );
};

export default ActiveCustomerPage;
