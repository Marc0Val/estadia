import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioPersonal from "../components/Forms/FormularioPersonal";
import Header from "../components/Header";
import { getPersonalRoleRequest } from "../api/personal.api";
import BotonPDF from "../components/Buttons/BotonPDF";

const PersonalPage = () => {
  const [personal, setPersonal] = useState([]);
  const columnNames = ["name_", "last_name", "cell_number", "name_role"];

  useEffect(() => {
    async function cargarPersonal() {
      const response = await getPersonalRoleRequest();
      if (Array.isArray(response.data)) {
        // Asegúrate de que response.data sea un arreglo
        setPersonal(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setPersonal([]);
      }
      console.log(response);
    }
    cargarPersonal();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Personal
      </p>
      <hr />
      <Header
        contenido={
          <BotonPDF
            pageTitle={"Personal"}
            columns={{
              name_: "Nombre",
              last_name: "Apellido",
              cell_number: "Celular",
              name_role: "Rol",
            }}
            data={personal}
          />
        }
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Personal"
            icono="fas fa-plus"
            contenidoModal={<FormularioPersonal />}
            titulo="Agregar Nuevo Personal"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={personal}
        totalRecords={personal.length}
        fetchElemento={getPersonalRoleRequest}
        hiddenColumns={["role_id"]}
        customColumnNames={{
          name_: "Nombre",
          last_name: "Apellido",
          cell_number: "Celular",
          name_role: "Rol",
        }}
        tipoFormulario="personal"
      />
    </div>
  );
};

export default PersonalPage;
