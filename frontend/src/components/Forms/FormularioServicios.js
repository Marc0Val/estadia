import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioServicio = () => {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "Por Definir",
    sale_price: "",
    description: "",
    sat_unit: "",
    sat_code: "",
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
      name: "",
      category_id: "Por Definir",
      sale_price: "",
      description: "",
      sat_unit: "",
      sat_code: "",
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
          <Form.Group controlId="formCategory">
            <Form.Label>
              <strong>Categoría *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="category_id"
              value={formData.category_id}
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
          <Form.Group controlId="formSalePrice">
            <Form.Label>
              <strong>Precio de venta $ *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="sale_price"
              value={formData.sale_price}
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
          <Form.Group controlId="formSatUnit">
            <Form.Label>
              <strong>Unidad SAT</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="sat_unit"
              value={formData.sat_unit}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSatCode">
            <Form.Label>
              <strong>Código SAT</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="sat_code"
              value={formData.sat_code}
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
            formData.name &&
            formData.category_id &&
            formData.sale_price &&
            formData.description
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
