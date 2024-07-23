import React, { useEffect } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioPersonal from "../components/Forms/FormularioPersonal";
import Header from "../components/Header";
import { usePersonal } from "../context/PersonalContext";
import BotonPDF from "../components/Buttons/BotonPDF";

const PersonalPage = () => {
  const { personal, getAllPersonal } = usePersonal();
  const columnNames = ["name_", "last_name", "cell_number", "name_role"];

  useEffect(() => {
    getAllPersonal();
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
        hiddenColumns={["role_id"]}
        customColumnNames={{
          name_: "Nombre",
          last_name: "Apellido",
          cell_number: "Celular",
          name_role: "Rol",
        }}
        formType="personal"
      />
    </div>
  );
};

export default PersonalPage;
