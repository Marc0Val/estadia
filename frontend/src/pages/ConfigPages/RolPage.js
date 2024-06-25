import React, { useEffect, useState } from "react";
import TablaInfo from "../../components/TablaInfo";
import BotonModal from "../../components/Buttons/BotonModal";
import FormularioRol from "../../components/Forms/FormularioRol";
import { getRolesUsersRequest } from "../../api/role.api";

const RolPage = () => {
  const [roles, setRoles] = useState([]);
  const columnNames = ["id_role", "name_role", "users"];

  useEffect(() => {
    async function cargarRoles() {
      const response = await getRolesUsersRequest();
      if (Array.isArray(response.data)) {
        setRoles(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setRoles([]);
      }
      console.log(response);
    }
    cargarRoles();
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
        titulo="Agregar Nuevo Rol"
      />
      <hr />
      <TablaInfo
        columns={columnNames}
        data={roles}
        totalRecords={roles.length}
        hiddenColumns={["id_role"]}
        customColumnNames={{
          name_role: "Nombre",
          users: "Usuarios",
        }}
      />
    </div>
  );
};

export default RolPage;
