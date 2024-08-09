import React, { useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useServiceOrders } from "../context/ServiceOrdersContext";

const ServiceOrdersPage = () => {
  const { serviceOrders, getServiceOrders } = useServiceOrders();
  // console.log(serviceOrders);

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

  useEffect(() => {
    getServiceOrders();
  }, []);

  // Map the serviceOrders data to the format expected by TablaInfo
  const data = serviceOrders.map((order) => ({
    id_service_order: order.id_service_order,
    Programada: order.scheduled_date,
    Inicio: order.start_time,
    Fin: order.end_time,
    Cliente: order.client_id,
    Personal: order.personal_id,
    Estado: order.state_,
    // PDF: order.pdfLink,
  }));

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
