import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const FormularioRol = () => {
  const [role, setRole] = useState("");

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del formulario.
    console.log("Rol enviado:", role);
  };

  const handleReset = () => {
    setRole("");
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <p className="text-muted">
          Complete el formulario | (*) Campos obligatorios
        </p>
        <hr />
        <Form.Group controlId="formRole" className="mb-3">
          <Form.Label>
            <strong>Rol *</strong>
          </Form.Label>
          <Form.Control
            type="text"
            name="role_"
            value={role}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={role === ""}>
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
