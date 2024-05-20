import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";

const PurchaseOrderPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Folio", "Fecha", "Vencimiento", "Proveedor", "Monto", "PDF"];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-file-invoice-dollar"></i> Ordenes de compra
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

export default PurchaseOrderPage;
