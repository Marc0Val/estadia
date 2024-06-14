import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioServicios from "../components/Forms/FormularioServicios";
import Header from "../components/Header";

const ServicesPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Nombre", "Precio"];
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          Nombre: "Servicio 1",
          Precio: "10.00",
        },
        {
          idCodigo: 2,
          Nombre: "Servicio 2",
          Precio: "20.00",
        },
        {
          idCodigo: 3,
          Nombre: "Servicio 3",
          Precio: "30.00",
        },
        {
          idCodigo: 4,
          Nombre: "Servicio 4",
          Precio: "40.00",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-boxes"></i> Servicios
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Servicio"
            icono="fas fa-plus"
            contenidoModal={<FormularioServicios />}
            titulo="Agregar Servicio"
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ServicesPage;
