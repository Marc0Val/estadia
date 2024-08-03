import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";

const ServiceOrdersPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "Programada",
    "Inicio",
    "Fin",
    "Cliente",
    "Personal",
    "Estado",
    "PDF",
  ];
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          Programada: "2021-08-01",
          Inicio: "2021-08-01 08:00",
          Fin: "2021-08-01 09:00",
          Cliente: "Cliente 1",
          Personal: "Personal 1",
          Estado: "Activa",
          PDF: "PDF 1",
        },
        {
          Programada: "2021-08-02",
          Inicio: "2021-08-02 08:00",
          Fin: "2021-08-02 09:00",
          Cliente: "Cliente 2",
          Personal: "Personal 2",
          Estado: "Activa",
          PDF: "PDF 2",
        },
        {
          Programada: "2021-08-03",
          Inicio: "2021-08-03 08:00",
          Fin: "2021-08-03 09:00",
          Cliente: "Cliente 3",
          Personal: "Personal 3",
          Estado: "Activa",
          PDF: "PDF 3",
        },
        {
          Programada: "2021-08-04",
          Inicio: "2021-08-04 08:00",
          Fin: "2021-08-04 09:00",
          Cliente: "Cliente 4",
          Personal: "Personal 4",
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
        <i className="fas fa-clipboard-list"></i> Ordenes de Servicio
      </p>
      <hr />

      <Header
        botonAgregar={
          <a
            href="/admin/formulario-orden-servicio"
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
        specialPages={true}
        baseUrl={"/admin/formulario-orden-servicio"}
      />
    </div>
  );
};

export default ServiceOrdersPage;
