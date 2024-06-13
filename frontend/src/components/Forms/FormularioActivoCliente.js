import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioActivoCliente = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    client_id: "",
    name: "",
    description: "",
    serial: "",
    inventory_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del formulario.
    console.log("Datos del formulario enviados:", formData);
  };

  const handleReset = () => {
    setFormData({
      product_id: "",
      client_id: "",
      name: "",
      description: "",
      serial: "",
      inventory_number: "",
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
          <Form.Group controlId="formProduct">
            <Form.Label>
              <strong>Producto *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formClient">
            <Form.Label>
              <strong>Cliente</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
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
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formDescription">
            <Form.Label>
              <strong>Descripción *</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formSerial">
            <Form.Label>
              <strong>Serie</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="serial"
              value={formData.serial}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formInventoryNumber">
            <Form.Label>
              <strong>Nro Inventario</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="inventory_number"
              value={formData.inventory_number}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Button
        variant="success"
        type="submit"
        disabled={
          !formData.product_id || !formData.name || !formData.description
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

export default FormularioActivoCliente;
