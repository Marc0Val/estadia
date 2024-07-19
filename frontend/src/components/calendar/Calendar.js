import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEventContext } from "../../context/TaskContext";

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

const CalendarComponent = () => {
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
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={["month", "week", "day", "agenda"]}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentEvent?.id ? "Editar Evento" : "Nuevo Evento"}
          </Modal.Title>
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
          <Button
            variant="success"
            onClick={handleSaveEvent}
            disabled={
              !currentEvent?.title || !currentEvent?.start || !currentEvent?.end
            }
          >
            <i className="fas fa-save"></i> Guardar
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>

          {currentEvent?.id && (
            <Button variant="danger" onClick={handleDeleteEvent}>
              <i className="fas fa-trash"></i> Eliminar
            </Button>
          )}
          <Button variant="light" onClick={() => setCurrentEvent(null)}>
            <i className="fas fa-eraser"></i> Limpiar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
