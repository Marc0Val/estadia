import React, { useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioProveedores from "../components/Forms/FormularioProveedores";
import Header from "../components/Header";
import { useSuppliers } from "../context/SuppliersContext";
import BotonPDF from "../components/Buttons/BotonPDF";

const SuppliersPage = () => {
  const { suppliers, getSuppliers } = useSuppliers();
  // const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const columnNames = [
    "id_supplier",
    "trade_name",
    "contact_name",
    "email",
    "contact_cell_phone",
  ];

  useEffect(() => {
    getSuppliers();
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
            data={suppliers} // Cambiar a filteredSuppliers en el futuro
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
        data={suppliers} // Cambiar a filteredSuppliers en el futuro
        totalRecords={suppliers.length} // Cambiar a filteredSuppliers.length en el futuro
        fetchElemento={getSuppliers}
        hiddenColumns={["id_supplier"]}
        customColumnNames={{
          trade_name: "Empresa",
          contact_name: "Contacto",
          email: "Correo",
          contact_cell_phone: "Teléfono",
        }}
        formType="suppliers"
      />
    </div>
  );
};

export default SuppliersPage;
