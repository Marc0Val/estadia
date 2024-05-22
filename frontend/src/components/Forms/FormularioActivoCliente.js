import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioActivoCliente = () => {
  const [formData, setFormData] = useState({
    producto: "",
    cliente: "",
    nombre: "",
    descripcion: "",
    serie: "",
    nroInventario: "",
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
      producto: "",
      cliente: "",
      nombre: "",
      descripcion: "",
      serie: "",
      nroInventario: "",
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="container mt-4"
    >
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formProducto">
            <Form.Label>
              <strong>Producto *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="producto"
              value={formData.producto}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCliente">
            <Form.Label>
              <strong>Cliente</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formNombre">
            <Form.Label>
              <strong>Nombre *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formDescripcion">
            <Form.Label>
              <strong>Descripción *</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formSerie">
            <Form.Label>
              <strong>Serie</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="serie"
              value={formData.serie}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formNroInventario">
            <Form.Label>
              <strong>Nro Inventario</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="nroInventario"
              value={formData.nroInventario}
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
          !formData.producto || !formData.nombre || !formData.descripcion
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
