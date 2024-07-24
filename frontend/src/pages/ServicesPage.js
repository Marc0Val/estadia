import React, { useEffect } from "react";
import { useServices } from "../context/ServicesContext";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioServicio from "../components/Forms/FormularioServicios";
import Header from "../components/Header";
import BotonPDF from "../components/Buttons/BotonPDF";

const ServicesPage = () => {
  const { services, getServices } = useServices();

  useEffect(() => {
    getServices();
  }, []);

  const columnNames = ["id", "name_", "sale_price"];

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-boxes"></i> Servicios
      </p>
      <hr />
      <Header
        contenido={
          <BotonPDF
            pageTitle={"Servicios"}
            columns={{
              name_: "Nombre",
              sale_price: "Precio",
            }}
            data={services}
          />
        }
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Servicio"
            icono="fas fa-plus"
            contenidoModal={<FormularioServicio />}
            titulo="Agregar Servicio"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={services}
        totalRecords={services.length}
        fetchElemento={getServices}
        hiddenColumns={["id"]}
        customColumnNames={{
          name_: "Nombre",
          sale_price: "Precio",
        }}
        formType="services"
      />
    </div>
  );
};

export default ServicesPage;
