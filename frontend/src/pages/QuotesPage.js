import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useQuotes } from "../context/QuotesContext";

const QuotesPage = () => {
  const { quotes, getQuotes } = useQuotes();
  console.log(quotes);

  const columnNames = ["id_quote", "Cliente", "Fecha", "Total", "PDF"];

  useEffect(() => {
    getQuotes();
  }, []);

  const data = quotes.map((quote) => ({
    id_quote: quote.id_quote,
    Cliente: quote.client_id,
    Fecha: quote.validity,
    Total: quote.total,
    // PDF: order.pdfLink,
  }));

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-file-invoice-dollar"></i> Cotizaciones
      </p>
      <hr />
      <Header
        botonAgregar={
          <Link
            to="/admin/formulario-cotizacion"
            className="btn btn-info"
            role="button"
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
            }}
            title="Crear Nueva Orden"
          >
            <i className="fas fa-plus"></i> Nueva Cotizacion
          </Link>
        }
      />
      <TablaInfo
        columns={columnNames}
        data={data}
        totalRecords={data.length}
        hiddenColumns={"id_quote"}
        formType="quotes"
        specialPages={true}
        baseUrl={"/admin/formulario-cotizacion"}
      />
    </div>
  );
};

export default QuotesPage;
