import React, { useCallback } from "react";
import BotonEditarModal from "./Buttons/BotonEditarModal";
import FormularioClientes from "../components/Forms/FormularioClientes";
import FormularioCategorias from "../components/Forms/FormularioCategorias";
import FormularioRoles from "../components/Forms/FormularioRoles";
import FormularioPersonal from "./Forms/FormularioPersonal";
import FormularioContactos from "./Forms/FormularioContactos";
import FormularioProveedores from "./Forms/FormularioProveedores";
import FormularioServicio from "./Forms/FormularioServicios";
import FormularioProductos from "./Forms/FormularioProductos";
import FormularioActivoCliente from "./Forms/FormularioActivoCliente";

const TablaInfo = ({
  columns,
  data,
  totalRecords,
  hiddenColumns = [],
  customColumnNames = {},
  formType,
}) => {
  const obtenerIdParaFormulario = useCallback(
    (formType, row) => {
      // console.log(formType);
      switch (formType) {
        case "clients":
          //console.log(`ID de cliente: ${row.id_client}`);
          return row.id_client;
        case "categories":
         //console.log(`ID de categoría: ${row.id_category}`);
          return row.id_category;
        case "roles":
          //console.log(`ID de rol: ${row.id_role}`);
          return row.id_role;
        case "personal":
          //console.log(`ID de personal: ${row.id_personal}`);
          return row.id_personal;
        case "contacts":
          //console.log(`ID de contacto: ${row.id_contact}`);
          return row.id_contact;
        case "suppliers":
          //console.log(`ID de proveedor: ${row.id_supplier}`);
          return row.id_supplier;
        case "services":
          //console.log(`ID de servicio: ${row.id_service}`);
          return row.id_service;
        case "products":
          //console.log(`ID de producto: ${row.id_product}`);
          return row.id_product;
        case "clients_assets":
          //console.log(`ID de Activo de Cliente: ${row.id_client_asset}`);
          return row.id_client_asset;
        default:
          return null;
      }
    },
    [formType]
  );

  const obtenerComponenteFormulario = useCallback((formType, id) => {
    switch (formType) {
      case "clients":
        return <FormularioClientes id_cliente={id} />;
      case "categories":
        return <FormularioCategorias id_categoria={id} />;
      case "roles":
        return <FormularioRoles id_rol={id} />;
      case "personal":
        return <FormularioPersonal id_personal={id} />;
      case "contacts":
        return <FormularioContactos id_contact={id} />;
      case "suppliers":
        return <FormularioProveedores id_supplier={id} />;
      case "services":
        return <FormularioServicio id_service={id} />;
      case "products":
        return <FormularioProductos id_product={id} />;
      case "clients_assets":
        return <FormularioActivoCliente id_client_asset={id} />;
      default:
        return null;
    }
  }, []);

  return (
    <div className="table-responsive">
      <table className="table align-middle table-hover">
        <thead>
          <tr>
            {totalRecords > 0 ? (
              <th
                colSpan={Object.keys(customColumnNames).length + 1}
                className="text-center"
              >
                Total de registros: {totalRecords}
              </th>
            ) : (
              <th colSpan={Object.keys(customColumnNames).length + 1}></th>
            )}
          </tr>
          <tr>
            {columns.map((columnName, index) =>
              hiddenColumns.includes(columnName) ? null : (
                <th key={index}>
                  {customColumnNames[columnName] || columnName}
                </th>
              )
            )}
            <th className="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {totalRecords > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {columns.map((columnName, colIndex) =>
                  hiddenColumns.includes(columnName) ? null : (
                    <td key={colIndex}>{row[columnName]}</td>
                  )
                )}
                <td>
                  <BotonEditarModal
                    nombreBoton="Editar"
                    icono="bi bi-pencil"
                    contenidoModal={() =>
                      obtenerComponenteFormulario(
                        formType,
                        obtenerIdParaFormulario(formType, row)
                      )
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={Object.keys(customColumnNames).length + 1}
                className="text-center"
              >
                <strong>Ningún dato disponible en esta tabla</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaInfo;
