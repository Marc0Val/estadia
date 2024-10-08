// frontend/src/pages/PurchaseOrderPage.js
import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const PurchaseOrderPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Fecha", "Proveedor", "Total", "Estado", "PDF"];

  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          id: 1,
          Fecha: "2021-08-01",
          Proveedor: "Proveedor 1",
          Total: "100.00",
          Estado: "Activa",
          PDF: "PDF 1",
        },
        {
          id: 2,
          Fecha: "2021-08-02",
          Proveedor: "Proveedor 2",
          Total: "200.00",
          Estado: "Activa",
          PDF: "PDF 2",
        },
        {
          id: 3,
          Fecha: "2021-08-03",
          Proveedor: "Proveedor 3",
          Total: "300.00",
          Estado: "Activa",
          PDF: "PDF 3",
        },
        {
          id: 4,
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
          <Link
            to="/admin/formulario-orden-compra"
            className="btn btn-info"
            role="button"
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
            }}
            title="Crear Nueva Orden"
          >
            <i className="fas fa-plus"></i> Nueva Orden
          </Link>
        }
      />
      <TablaInfo
        columns={columnNames}
        data={data}
        totalRecords={data.length}
        specialPages={true}
        formType={"purchase-orders"}
        baseUrl="/admin/formulario-orden-compra"
      />
    </div>
  );
};

export default PurchaseOrderPage;
