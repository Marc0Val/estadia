import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";

const ServiceOrdersPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Folio", "Programado", "Inicio", "Fin", "Cliente", "Personal", "Estado", "PDF"];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-boxes"></i> Ordenes de servicio
      </p>
      <hr />
      <TablaInfo
        rows={data.length}
        columns={columnNames}
        data={data}
        totalRecords={data.length}
      />
    </div>
  );
};

export default ServiceOrdersPage;
