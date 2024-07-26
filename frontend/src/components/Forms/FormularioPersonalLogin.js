import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioPersonalLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    role_: "Empleado",
    email: "",
    cell_number: "",
    country: "",
    state: "",
    city: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del formulario.
    //console.log("Datos del formulario enviados:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      last_name: "",
      role_: "Empleado",
      email: "",
      cell_number: "",
      country: "",
      state: "",
      city: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="container mt-4"
    >
      <p className="text-muted">
        Complete el formulario | (*) Campos obligatorios
      </p>
      <hr />
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formName">
            <Form.Label>
              <strong>Nombre *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formLastName">
            <Form.Label>
              <strong>Apellido *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formRole">
            <Form.Label>
              <strong>Rol *</strong>
            </Form.Label>
            <Form.Control type="text" name="role" value="Empleado" readOnly />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formTitle">
            <Form.Label>
              <strong>Título</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formEmail">
            <Form.Label>
              <strong>Correo *</strong>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCellNumber">
            <Form.Label>
              <strong>Celular *</strong>
            </Form.Label>
            <Form.Control
              type="tel"
              name="cell_number"
              value={formData.cell_number}
              onChange={(e) =>
                setFormData({ ...formData, cell_number: e.target.value })
              }
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formPhone">
            <Form.Label>
              <strong>Teléfono</strong>
            </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formAddress">
            <Form.Label>
              <strong>Dirección *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCountry">
            <Form.Label>
              <strong>País</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formState">
            <Form.Label>
              <strong>Estado</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCity">
            <Form.Label>
              <strong>Ciudad</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formPassword">
            <Form.Label>
              <strong>Contraseña *</strong>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              minLength="6"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>
              <strong>Confirmar Contraseña *</strong>
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              minLength="6"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Button
        variant="success"
        type="submit"
        disabled={
          formData.name === "" ||
          formData.last_name === "" ||
          formData.email === "" ||
          formData.cell_number === "" ||
          formData.address === "" ||
          formData.password === "" ||
          formData.confirmPassword === ""
        }
      >
        <i className="fas fa-save"></i> Guardar
      </Button>
      <Button variant="warning" type="reset">
        <i className="fas fa-undo"></i> Limpiar
      </Button>
    </Form>
  );
};

export default FormularioPersonalLogin;
