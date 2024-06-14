import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";

const QuotesPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Cliente", "Fecha", "Total", "PDF"];
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          Cliente: "Cliente 1",
          Fecha: "2021-08-01",
          Total: "100.00",
          PDF: "PDF 1",
        },
        {
          Cliente: "Cliente 2",
          Fecha: "2021-08-02",
          Total: "200.00",
          PDF: "PDF 2",
        },
        {
          Cliente: "Cliente 3",
          Fecha: "2021-08-03",
          Total: "300.00",
          PDF: "PDF 3",
        },
        {
          Cliente: "Cliente 4",
          Fecha: "2021-08-04",
          Total: "400.00",
          PDF: "PDF 4",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-file-invoice-dollar"></i> Cotizaciones
      </p>
      <hr />
      <Header
        botonAgregar={
          <a
            href="/admin/formulario-cotizacion"
            className="btn btn-info"
            role="button"
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
            }}
            title="Crear Nueva Orden"
          >
            <i className="fas fa-plus"></i> Nueva Cotizacion
          </a>
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default QuotesPage;
