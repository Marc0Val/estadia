import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useServiceOrders } from "../context/ServiceOrdersContext";
import { useClients } from "../context/ClientsContext";
import { usePersonal } from "../context/PersonalContext";

const ServiceOrdersPage = () => {
  const { serviceOrders, getServiceOrders } = useServiceOrders();
  const { clients } = useClients();
  const { personal } = usePersonal();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getServiceOrders(); // Asegúrate de que serviceOrders están disponibles aquí

      // Mapear IDs a nombres para clientes y personal
      const clientMap = new Map(
        clients.map((client) => [client.id_client, client.contact_name])
      );
      const personalMap = new Map(
        personal.map((person) => [person.id_personal, person.name_])
      );

      // Transformar los datos
      const transformedData = serviceOrders.map((order) => {
        const clientName = clientMap.get(order.client_id) || "Desconocido";
        const personalName =
          personalMap.get(order.personal_id) || "Desconocido";

        return {
          id_service_order: order.id_service_order,
          Programada: formatDate(order.scheduled_date),
          Inicio: order.start_time,
          Fin: order.end_time,
          Cliente: clientName,
          Personal: personalName,
          Estado: order.state_,
          // PDF: order.pdfLink,
        };
      });

      setData(transformedData);
    };

    fetchData();
  }, [serviceOrders, getServiceOrders, clients, personal]);

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

  const columnNames = [
    "id_service_order",
    "Programada",
    "Inicio",
    "Fin",
    "Cliente",
    "Personal",
    "Estado",
    // "PDF",
  ];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-clipboard-list"></i> Ordenes de Servicio
      </p>
      <hr />
      <Header
        botonAgregar={
          <Link
            to="/admin/formulario-orden-servicio"
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
        hiddenColumns={["id_service_order"]}
        specialPages={true}
        formType="service-orders"
        baseUrl={"/admin/formulario-orden-servicio"}
      />
    </div>
  );
};

export default ServiceOrdersPage;
