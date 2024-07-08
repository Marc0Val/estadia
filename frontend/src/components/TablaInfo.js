import React, { useCallback } from "react";
import BotonEditarModal from "./Buttons/BotonEditarModal";
import FormularioClientes from "../components/Forms/FormularioClientes";
import FormularioCategorias from "../components/Forms/FormularioCategorias";
import FormularioRoles from "../components/Forms/FormularioRoles";

const TablaInfo = ({
  columns,
  data,
  totalRecords,
  hiddenColumns = [],
  customColumnNames = {},
  tipoFormulario,
}) => {
  const obtenerIdParaFormulario = useCallback(
    (tipoFormulario, row) => {
      console.log(tipoFormulario);
      switch (tipoFormulario) {
        case "clients":
          console.log(`ID de cliente: ${row.id_client}`);
          return row.id_client;
        case "categories":
          console.log(`ID de categoría: ${row.id_category}`);
          return row.id_category;
        case "roles":
          console.log(`ID de rol: ${row.id_role}`);
          return row.id_role;
        default:
          return null;
      }
    },
    [tipoFormulario]
  );

  const obtenerComponenteFormulario = useCallback((tipoFormulario, id) => {
    switch (tipoFormulario) {
      case "clients":
        return <FormularioClientes id_cliente={id} />;
      case "categories":
        return <FormularioCategorias id_categoria={id} />;
      case "roles":
        return <FormularioRoles id_rol={id} />;
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
                        tipoFormulario,
                        obtenerIdParaFormulario(tipoFormulario, row)
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
