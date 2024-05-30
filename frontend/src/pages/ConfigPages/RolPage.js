import React, { useEffect, useState } from "react";
import TablaInfo from "../../components/TablaInfo";
import BotonModal from "../../components/Buttons/BotonModal";
import FormularioRol from "../../components/Forms/FormularioRol";

const RolPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["Rol", "Usuario"];
  // informacion de prueba que muestre 2 roles y cuantos usarios tiene cada uno
  useEffect(() => {
    setData([
      { Rol: "Administrador", Usuario: 3 },
      { Rol: "Usuario", Usuario: 5 },
    ]);
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-user-tag"></i> Roles
      </p>
      <hr />
      <BotonModal
        nombreBoton="Agregar Rol"
        icono="fas fa-plus"
        contenidoModal={<FormularioRol />}
      />
      <hr />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default RolPage;
