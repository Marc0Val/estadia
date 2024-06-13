import React from "react";
import BotonEditarModal from "./Buttons/BotonEditarModal";

const TablaInfo = ({ columns, data, totalRecords, fetchElemento }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-hover">
        <thead>
          <tr>
            {totalRecords > 0 ? (
              <th colSpan={columns.length + 1} className="text-center">
                Total de registros: {totalRecords}
              </th>
            ) : (
              <th colSpan={columns.length + 1}></th>
            )}
          </tr>
          <tr>
            {columns.map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
            <th className="text-center">Accion</th>
          </tr>
        </thead>
        <tbody>
          {totalRecords > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {columns.map((columnName, colIndex) => (
                  <td key={colIndex}>{row[columnName]}</td>
                ))}
                <td className="actions">
                  <BotonEditarModal nombreBoton="" icono="fa-solid fa-ellipsis" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
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
