import React, { useEffect, useState } from "react";
import TablaInfo from "../../components/TablaInfo";
import BotonModal from "../../components/Buttons/BotonModal";
import FormularioRol from "../../components/Forms/FormularioRoles";
import { useRoles } from "../../context/RolesContext";

const RolPage = () => {
  const { rolesUsers, getRolesUsers } = useRoles();
  const columnNames = ["id_role", "name_role", "users"];

  useEffect(() => {
    getRolesUsers();
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
        data={rolesUsers}
        totalRecords={rolesUsers.length}
        hiddenColumns={["id_role"]}
        customColumnNames={{
          name_role: "Nombre",
          users: "Usuarios",
        }}
        tipoFormulario="roles"
      />
    </div>
  );
};

export default RolPage;
