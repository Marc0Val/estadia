import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";

const ServiceOrdersPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "Folio",
    "Programada",
    "Inicio",
    "Fin",
    "Cliente",
    "Personal",
    "Estado",
    "PDF",
  ];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-clipboard-list"></i> Ordenes de Servicio
      </p>
      <hr />
      <Header />

      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ServiceOrdersPage;
