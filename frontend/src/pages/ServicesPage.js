import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioServicios from "../components/Forms/FormularioServicios";
import Header from "../components/Header";
import { getServicesRequest } from "../api/services.api";
import BotonPDF from "../components/Buttons/BotonPDF";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function cargarServicios() {
      const response = await getServicesRequest();
      if (Array.isArray(response.data)) {
        // Asegúrate de que response.data sea un arreglo
        setServices(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setServices([]);
      }
      console.log(response);
    }
    cargarServicios();
  }, []);

  const columnNames = ["id_service", "name_", "sale_price"];
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
            contenidoModal={<FormularioServicios />}
            titulo="Agregar Servicio"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={services}
        totalRecords={services.length}
        fetchElemento={getServicesRequest}
        hiddenColumns={["id_service"]}
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
