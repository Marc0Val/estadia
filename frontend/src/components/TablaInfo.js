import React from "react";
import BotonEditarModal from "./Buttons/BotonEditarModal";

const TablaInfo = ({
  columns,
  data,
  totalRecords,
  fetchElemento,
  hiddenColumns = [],
  customColumnNames = {},
}) => {
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
                    nombreBoton=""
                    icono="fa-solid fa-ellipsis"
                    className="btnn"
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
