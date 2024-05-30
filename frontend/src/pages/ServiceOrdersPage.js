import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Header from "../components/Header";

const ServiceOrdersPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "Folio",
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
          Folio: "1",
          Programada: "01/01/2021",
          Inicio: "01/01/2021",
          Fin: "01/01/2021",
          Cliente: "Cliente 1",
          Personal: "Personal 1",
          Estado: "Activo",
          PDF: "PDF",
        },
        {
          Folio: "2",
          Programada: "02/02/2022",
          Inicio: "02/02/2022",
          Fin: "02/02/2022",
          Cliente: "Cliente 2",
          Personal: "Personal 2",
          Estado: "Activo",
          PDF: "PDF",
        },
        {
          Folio: "3",
          Programada: "03/03/2023",
          Inicio: "03/03/2023",
          Fin: "03/03/2023",
          Cliente: "Cliente 3",
          Personal: "Personal 3",
          Estado: "Inactivo",
          PDF: "PDF",
        },
        {
          Folio: "4",
          Programada: "04/04/2024",
          Inicio: "04/04/2024",
          Fin: "04/04/2024",
          Cliente: "Cliente 4",
          Personal: "Personal 4",
          Estado: "Activo",
          PDF: "PDF",
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
      <Header />

      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ServiceOrdersPage;
