import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";

const PurchaseOrderPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "Folio",
    "Fecha",
    "Vencimiento",
    "Proveedor",
    "Monto",
    "PDF",
  ];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-file-invoice-dollar"></i> Ordenes de compra
      </p>
      <hr />
      <Header />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default PurchaseOrderPage;
