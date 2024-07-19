import React, { createContext, useState, useEffect, useContext } from "react";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

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
    <EventContext.Provider
      value={{
        events,
        setEvents,
        showModal,
        setShowModal,
        currentEvent,
        setCurrentEvent,
        handleSelectSlot,
        handleSelectEvent,
        handleSaveEvent,
        handleDeleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
