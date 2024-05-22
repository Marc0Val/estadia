import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioServicio = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "Por Definir",
    precioVenta: "",
    descripcion: "",
    unidadSAT: "",
    codigoSAT: "",
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
      nombre: "",
      categoria: "Por Definir",
      precioVenta: "",
      descripcion: "",
      unidadSAT: "",
      codigoSAT: "",
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
        <Col>
          <Form.Group controlId="formCategoria">
            <Form.Label>
              <strong>Categoría *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option>
                Por Definir (supongo que se cargan las de las bases de datos)
              </option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formPrecioVenta">
            <Form.Label>
              <strong>Precio de venta $ *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="precioVenta"
              value={formData.precioVenta}
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
          <Form.Group controlId="formUnidadSAT">
            <Form.Label>
              <strong>Unidad SAT</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="unidadSAT"
              value={formData.unidadSAT}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCodigoSAT">
            <Form.Label>
              <strong>Código SAT</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="codigoSAT"
              value={formData.codigoSAT}
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
          !(
            formData.nombre &&
            formData.categoria &&
            formData.precioVenta &&
            formData.descripcion
          )
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

export default FormularioServicio;
