import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioActivoCliente from "../components/Forms/FormularioActivoCliente";
import Header from "../components/Header";

const ActiveCustomerPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Nombre", "Correo", "Telefono", "Ciudad", "Estado"];
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          Nombre: "Cliente 1",
          Correo: "test@test.com",
          Telefono: "1234567890",
          Ciudad: "Ciudad 1",
          Estado: "Activo",
        },
        {
          idCodigo: 2,
          Nombre: "Cliente 2",
          Correo: "test@test.com",
          Telefono: "1234567890",
          Ciudad: "Ciudad 2",
          Estado: "Activo",
        },
        {
          idCodigo: 3,
          Nombre: "Cliente 3",
          Correo: "test@test.com",
          Telefono: "1234567890",
          Ciudad: "Ciudad 3",
          Estado: "Activo",
        },
        {
          idCodigo: 4,
          Nombre: "Cliente 4",
          Correo: "test@test.com",
          Telefono: "1234567890",
          Ciudad: "Ciudad 4",
          Estado: "Activo",
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
