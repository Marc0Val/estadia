import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioPersonal from "../components/Forms/FormularioPersonal";
import Header from "../components/Header";

const PersonalPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Nombre", "Celular", "Rol", "Estado"]; 
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          Nombre: "Juan Perez",
          Celular: "1234567890",
          Rol: "Administrador",
          Estado: "Activo",
        },
        {
          idCodigo: 2,
          Nombre: "Maria Lopez",
          Celular: "0987654321",
          Rol: "Cajero",
          Estado: "Activo",
        },
        {
          idCodigo: 3,
          Nombre: "Pedro Ramirez",
          Celular: "6789012345",
          Rol: "Cajero",
          Estado: "Inactivo",
        },
        {
          idCodigo: 4,
          Nombre: "Ana Rodriguez",
          Celular: "5432167890",
          Rol: "Administrador",
          Estado: "Activo",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Personal
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Personal"
            icono="fas fa-plus"
            contenidoModal={<FormularioPersonal />}
            titulo="Agregar Nuevo Personal"
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default PersonalPage;
