import React, { useEffect, useState } from "react";
import TablaInfo from "../../components/TablaInfo";
import BotonModal from "../../components/Buttons/BotonModal";
import FormularioRol from "../../components/Forms/FormularioRol";

const RolPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Rol", "Usuario"];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-user-tag"></i> Roles
      </p>
      <hr />
      <BotonModal
        nombreBoton="Nuevo Personal"
        icono="fas fa-plus"
        contenidoModal={<FormularioRol />}
      />
      <hr />
      {/*crear tabla para roles y usuarios sin el componente*/}
      <TablaInfo
        rows={data.length}
        columns={columnNames}
        data={data}
        totalRecords={data.length}
      />
    </div>
  );
};

export default RolPage;
