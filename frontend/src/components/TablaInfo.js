// import React from "react";

// const TablaInfo = ({ rows, columns, columnNames, totalRecords }) => {
//   return (
//     <div className="table-responsive">
//       <table className="table align-middle table-hover">
//         <thead>
//           <tr>
//             <th colSpan={columnNames.length}>
//               Total de registros: {totalRecords}
//             </th>
//           </tr>
//           <tr>
//             {columnNames.map((columnName, index) => (
//               <th key={index}>{columnName}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columnNames.map((columnName, colIndex) => (
//                 <td key={colIndex}>
//                   {row[columnName]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TablaInfo;
// import React from "react";

// const TablaInfo = ({ rows, columns, data, totalRecords }) => {
//   return (
//     <div className="table-responsive">
//       <table className="table align-middle table-hover">
//         <thead>
//           <tr>
//             <th colSpan={columns.length}>Total de registros: {totalRecords}</th>
//           </tr>
//           <tr>
//             {columns.map((columnName, index) => (
//               <th key={index}>{columnName}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((columnName, colIndex) => (
//                 <td key={colIndex}>{row[columnName]}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TablaInfo;

import React from "react";

const TablaInfo = ({ columns, data, totalRecords }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-hover">
        <thead>
          <tr>
            {totalRecords > 0 ? (
              <th colSpan={columns.length}>
                Total de registros: {totalRecords}
              </th>
            ) : (
              <th colSpan={columns.length}></th>
            )}
          </tr>
          <tr>
            {columns.map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {totalRecords > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((columnName, colIndex) => (
                  <td key={colIndex}>{row[columnName]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
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
