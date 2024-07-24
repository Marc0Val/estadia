import React, { useEffect, useState } from "react";
import TablaInfo from "../../components/TablaInfo";
import BotonModal from "../../components/Buttons/BotonModal";
import FormularioRol from "../../components/Forms/FormularioRoles";
import { useRoles } from "../../context/RolesContext";
import BotonPDF from "../../components/Buttons/BotonPDF";
import Header from "../../components/Header";

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
      <Header
        contenido={
          <BotonPDF
            pageTitle={"Roles"}
            columns={{
              name_role: "Nombre",
              users: "Usuarios",
            }}
            data={rolesUsers}
          />
        }
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Rol"
            icono="fas fa-plus"
            contenidoModal={<FormularioRol />}
            titulo="Agregar Rol"
          />
        }
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
        formType="roles"
      />
    </div>
  );
};

export default RolPage;
