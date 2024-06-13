import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2"
import logo from "../../assets/logo.png";

const FormularioRecoverContraseña = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === confirmEmail) {
      Swal.fire({
        title: "Se enviará un correo",
        text: "Se enviará un correo si existe una cuenta asociada a este email",
        icon: "info",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Los correos electrónicos no coinciden",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleReset = () => {
    setEmail("");
    setConfirmEmail("");
  };

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" style={{ width: "80px" }} />
        <hr />
      </div>
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Correo Electrónico *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmEmail" className="mb-3">
          <Form.Label>Confirmar Correo Electrónico *</Form.Label>
          <Form.Control
            type="email"
            name="confirmEmail"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          disabled={email === "" || confirmEmail === "" || email !== confirmEmail}
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
