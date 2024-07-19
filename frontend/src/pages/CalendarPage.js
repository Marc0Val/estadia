import React, { useState } from "react";
import CalendarComponent from "../components/calendar/Calendar";
import Header from "../components/Header";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioTareas from "../components/Forms/FormularioTareas";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    setCurrentEvent({ start, end, title: "" });
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (currentEvent.id) {
      setEvents(
        events.map((event) =>
          event.id === currentEvent.id ? currentEvent : event
        )
      );
    } else {
      setCurrentEvent({ ...currentEvent, id: events.length + 1 });
      setEvents([...events, { ...currentEvent, id: events.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== currentEvent.id));
    setShowModal(false);
  };

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-calendar-alt"></i> Calendario
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nueva Tarea"
            icono="fas fa-plus"
            contenidoModal={<FormularioTareas />}
            titulo="Agregar Nueva Tarea"
          />
        }
      />
      <hr />
      <CalendarComponent
        events={events}
        setEvents={setEvents}
        showModal={showModal}
        setShowModal={setShowModal}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        handleSelectSlot={handleSelectSlot}
        handleSelectEvent={handleSelectEvent}
        handleSaveEvent={handleSaveEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default CalendarPage;
