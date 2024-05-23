import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioServicios from "../components/Forms/FormularioServicios";
import Header from "../components/Header";

const ServicesPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["idCodigo", "Nombre", "Precio"];

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
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ServicesPage;
