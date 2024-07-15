import React, { useState, useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioProveedores from "../components/Forms/FormularioProveedores";
import Header from "../components/Header";
import { getSuppliersRequest } from "../api/suppliers.api";
import BotonPDF from "../components/Buttons/BotonPDF";

const ProvidersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const columnNames = [
    "id_supplier",
    "trade_name",
    "contact_name",
    "email",
    "contact_cell_phone",
  ];

  useEffect(() => {
    async function cargarProveedores() {
      const response = await getSuppliersRequest();
      if (Array.isArray(response.data)) {
        // Asegúrate de que response.data sea un arreglo
        setSuppliers(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setSuppliers([]);
      }
      console.log(response);
    }
    cargarProveedores();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-truck"></i> Proveedores
      </p>
      <hr />
      <Header
        contenido={
          <BotonPDF
            pageTitle={"Proveedores"}
            columns={{
              trade_name: "Empresa",
              contact_name: "Contacto",
              email: "Correo",
              contact_cell_phone: "Teléfono",
            }}
            data={suppliers}
          />
        }
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Proveedor"
            icono="fas fa-plus"
            contenidoModal={<FormularioProveedores />}
            titulo="Agregar Proveedor"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={suppliers}
        totalRecords={suppliers.length}
        fetchElemento={getSuppliersRequest}
        hiddenColumns={["id_supplier"]}
        customColumnNames={{
          trade_name: "Empresa",
          contact_name: "Contacto",
          email: "Correo",
          contact_cell_phone: "Teléfono",
        }}
      />
    </div>
  );
};

export default ProvidersPage;
