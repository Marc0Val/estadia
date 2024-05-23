import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";

const QuotesPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "Folio",
    "Fecha",
    "Vencimiento",
    "Cliente",
    "Monto",
    "PDF",
  ];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-file-invoice-dollar"></i> Cotizaciones
      </p>
      <hr />
      <Header />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default QuotesPage;
