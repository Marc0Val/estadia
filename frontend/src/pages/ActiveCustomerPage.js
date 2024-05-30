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
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          Identificador: 1,
          Activo: "Activo 1",
          Cliente: "Cliente 1",
          EstadoPoliza: "Estado Poliza 1",
          VencimientoPoliza: "Vencimiento Poliza 1",
          NroInventario: "Nro Inventario 1",
        },
        {
          Identificador: 2,
          Activo: "Activo 2",
          Cliente: "Cliente 2",
          EstadoPoliza: "Estado Poliza 2",
          VencimientoPoliza: "Vencimiento Poliza 2",
          NroInventario: "Nro Inventario 2",
        },
        {
          Identificador: 3,
          Activo: "Activo 3",
          Cliente: "Cliente 3",
          EstadoPoliza: "Estado Poliza 3",
          VencimientoPoliza: "Vencimiento Poliza 3",
          NroInventario: "Nro Inventario 3",
        },
        {
          Identificador: 4,
          Activo: "Activo 4",
          Cliente: "Cliente 4",
          EstadoPoliza: "Estado Poliza 4",
          VencimientoPoliza: "Vencimiento Poliza 4",
          NroInventario: "Nro Inventario 4",
        },
      ]);
    };

    fetchData();
  }, []);

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
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ActiveCustomerPage;
