import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useQuotes } from "../context/QuotesContext";
import { useClients } from "../context/ClientsContext";
import { usePersonal } from "../context/PersonalContext";

const QuotesPage = () => {
  const { quotes, getQuotes } = useQuotes();
  const { clients } = useClients();
  const { personal } = usePersonal();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getQuotes(); // Asegúrate de que quotes están disponibles aquí

      const clientMap = new Map(
        clients.map((client) => [client.id_client, client.contact_name])
      );
      // Similar para personal si es necesario
      // const personalMap = new Map(personal.map(person => [person.id_personal, person.name]));

      const transformedData = quotes.map((quote) => {
        const clientName = clientMap.get(quote.client_id) || "Desconocido";
        // Similar para personal si es necesario

        return {
          id_quote: quote.id_quote,
          Cliente: clientName,
          Fecha: formatDate(quote.validity),
          Total: formatPrice(quote.total || 0),
          // PDF: quote.pdfLink, // Asegúrate de que la propiedad pdfLink esté en quote
        };
      });

      setData(transformedData);
    };

    fetchData();
  }, [quotes, getQuotes, clients, personal]);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Fecha inválida"
      : new Intl.DateTimeFormat("es-MX", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date);
  };

  const columnNames = ["id_quote", "Cliente", "Fecha", "Total", "PDF"];

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
        hiddenColumns={"id_quote, PDF"}
        formType="quotes"
        specialPages={true}
        baseUrl={"/admin/formulario-cotizacion"}
      />
    </div>
  );
};

export default QuotesPage;
