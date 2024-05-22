import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BotonModal = ({ nombreBoton, icono, contenidoModal }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="info" onClick={() => setShow(true)}>
        <i className={icono}></i> {nombreBoton}
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{nombreBoton}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{contenidoModal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BotonModal;
