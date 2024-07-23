import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";

const PurchaseOrderPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Fecha", "Proveedor", "Total", "Estado", "PDF"];
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          Fecha: "2021-08-01",
          Proveedor: "Proveedor 1",
          Total: "100.00",
          Estado: "Activa",
          PDF: "PDF 1",
        },
        {
          Fecha: "2021-08-02",
          Proveedor: "Proveedor 2",
          Total: "200.00",
          Estado: "Activa",
          PDF: "PDF 2",
        },
        {
          Fecha: "2021-08-03",
          Proveedor: "Proveedor 3",
          Total: "300.00",
          Estado: "Activa",
          PDF: "PDF 3",
        },
        {
          Fecha: "2021-08-04",
          Proveedor: "Proveedor 4",
          Total: "400.00",
          Estado: "Activa",
          PDF: "PDF 4",
        },
      ]);
    };

    fetchData();
  }, []);
  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-file-invoice-dollar"></i> Ordenes de compra
      </p>
      <hr />
      <Header
        botonAgregar={
          <a
            href="/admin/formulario-orden-compra"
            className="btn btn-info"
            role="button"
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
            }}
            title="Crear Nueva Orden"
          >
            <i className="fas fa-plus"></i> Nueva Orden
          </a>
        }
      />
      <TablaInfo
        columns={columnNames}
        data={data}
        totalRecords={data.length}
        formType="purchaseOrder"
      />
    </div>
  );
};

export default PurchaseOrderPage;
