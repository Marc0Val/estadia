import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioTareas from "../components/Forms/FormularioTareas";

moment.locale("es");
const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Sin eventos",
};

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
            nombreBoton="Nuevo Evento"
            icono="fas fa-plus"
            contenidoModal={<FormularioTareas />}
            titulo="Agregar Nuevo Evento"
          />
        }
      />
      <hr />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        toolbar={true}
        messages={messages}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEvent?.title || "Nuevo Evento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={currentEvent?.title || ""}
                onChange={(e) =>
                  setCurrentEvent({ ...currentEvent, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formEventStart">
              <Form.Label>Inicio</Form.Label>
              <Form.Control
                type="datetime-local"
                value={moment(currentEvent?.start).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) =>
                  setCurrentEvent({
                    ...currentEvent,
                    start: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEventEnd">
              <Form.Label>Fin</Form.Label>
              <Form.Control
                type="datetime-local"
                value={moment(currentEvent?.end).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) =>
                  setCurrentEvent({
                    ...currentEvent,
                    end: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Guardar
          </Button>
          {currentEvent?.id && (
            <Button variant="danger" onClick={handleDeleteEvent}>
              Eliminar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarPage;
