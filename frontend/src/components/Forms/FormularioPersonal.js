import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioPersonal = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    role: "",
    title: "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del formulario.
    console.log("Datos del formulario enviados:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      last_name: "",
      role: "",
      title: "",
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
            </Form.Control>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
          formData.role === "" ||
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

export default FormularioPersonal;
