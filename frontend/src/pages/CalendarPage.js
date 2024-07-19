import React from "react";
import CalendarComponent from "../components/calendar/Calendar";
import { useEventContext } from "../context/TaskContext";
import Header from "../components/Header";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioTareas from "../components/Forms/FormularioTareas";

const CalendarPage = () => {
  const {
    events,
    showModal,
    currentEvent,
    handleSelectSlot,
    handleSelectEvent,
    handleSaveEvent,
    handleDeleteEvent,
    setShowModal,
    setCurrentEvent,
  } = useEventContext();

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-calendar-alt"></i> Calendario
      </p>
      <hr />
      <Header
        contenido={
          <BotonModal
            nombreBoton="Nueva Asignacion"
            icono="fas fa-plus"
            contenidoModal={<FormularioTareas />}
            titulo="Agregar Nueva Tarea"
          />
        }
      />
      <hr />
      <CalendarComponent
        events={events}
        showModal={showModal}
        currentEvent={currentEvent}
        handleSelectSlot={handleSelectSlot}
        handleSelectEvent={handleSelectEvent}
        handleSaveEvent={handleSaveEvent}
        handleDeleteEvent={handleDeleteEvent}
        setShowModal={setShowModal}
        setCurrentEvent={setCurrentEvent}
      />
    </div>
  );
};

export default CalendarPage;
