import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioActivoCliente from "../components/Forms/FormularioActivoCliente";
import Header from "../components/Header";

const ActiveCustomerPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "Identificador",
    "Activo",
    "Cliente",
    "EstadoPoliza",
    "VencimientoPoliza",
    "NroInventario",
  ];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-user"></i> Clientes activos
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Cliente Activo"
            icono="fas fa-plus"
            contenidoModal={<FormularioActivoCliente />}
          />
        }
      />
      <TablaInfo
        rows={data.length}
        columns={columnNames}
        data={data}
        totalRecords={data.length}
      />
    </div>
  );
};

export default ActiveCustomerPage;
