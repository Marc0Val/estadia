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
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          Folio: "1",
          Fecha: "01/01/2021",
          Vencimiento: "01/01/2021",
          Proveedor: "Proveedor 1",
          Monto: "100.00",
          PDF: "PDF",
        },
        {
          Folio: "2",
          Fecha: "02/02/2022",
          Vencimiento: "02/02/2022",
          Proveedor: "Proveedor 2",
          Monto: "200.00",
          PDF: "PDF",
        },
        {
          Folio: "3",
          Fecha: "03/03/2023",
          Vencimiento: "03/03/2023",
          Proveedor: "Proveedor 3",
          Monto: "300.00",
          PDF: "PDF",
        },
        {
          Folio: "4",
          Fecha: "04/04/2024",
          Vencimiento: "04/04/2024",
          Proveedor: "Proveedor 4",
          Monto: "400.00",
          PDF: "PDF",
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
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default PurchaseOrderPage;
