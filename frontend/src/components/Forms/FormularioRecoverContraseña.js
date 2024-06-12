import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const FormularioRecoverContraseña = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del formulario.
    console.log("Correo enviado:", email);
  };

  const handleReset = () => {
    setEmail("");
  };
  return (
    <Container className="mt-4">
        <div className="mb-3">
            <strong>Ingrese su correo para recuperar su contraseña</strong>

        </div>
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>
            <strong>Correo *</strong>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          disabled={email === "" ? true : false}
        >
          <i className="fas fa-save"></i> Enviar
        </Button>
        <Button variant="secondary" type="reset" className="ms-2">
          <i className="fas fa-eraser"></i> Limpiar
        </Button>
      </Form>
    </Container>
  );
};

export default FormularioRecoverContraseña;
