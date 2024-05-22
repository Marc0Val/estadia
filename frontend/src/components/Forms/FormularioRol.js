import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FormularioRol = () => {
  const [rol, setRol] = useState("");

  const handleChange = (e) => {
    setRol(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del formulario.
    console.log("Rol enviado:", rol);
  };

  const handleReset = () => {
    setRol("");
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Group controlId="formRol" className="mb-3">
          <Form.Label>
            <strong>Rol *</strong>
          </Form.Label>
          <Form.Control
            type="text"
            name="rol"
            value={rol}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          disabled={rol === "" ? true : false}
        >
          <i className="fas fa-save"></i> Guardar
        </Button>
        <Button variant="secondary" type="reset" className="ms-2">
          <i className="fas fa-eraser"></i> Limpiar
        </Button>
      </Form>
    </Container>
  );
};

export default FormularioRol;
