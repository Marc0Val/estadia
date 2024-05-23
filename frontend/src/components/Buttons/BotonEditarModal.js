import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const BotonEditarModal = ({ nombreBoton, icono, contenidoModal }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="warning" onClick={() => setShow(true)}>
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

export default BotonEditarModal;
