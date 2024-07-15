import React, { useEffect, useState } from "react";
import BotonModal from "../components/Buttons/BotonModal";
import Header from "../components/Header";
import FormularioTareas from "../components/Forms/FormularioTareas";

const CalendarPage = () => {
  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-calendar-alt"></i> Calendario
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Evento"
            icono="fas fa-plus"
            contenidoModal={<FormularioTareas />}
            titulo="Agregar Nuevo Evento"
          />
        }
      />
    </div>
  );
};

export default CalendarPage;
