import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioCategoria = () => {
  const [formData, setFormData] = useState({
    name_category: "",
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
      name_category: "",
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
          <Form.Group controlId="formCategoria">
            <Form.Label>
              <strong>Categoria *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la categoria"
              name="name_category"
              value={formData.name_category}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Button
        variant="success"
        type="submit"
        disabled={formData.name_category === "" ? true : false}
      >
        <i className="fas fa-save"></i> Guardar
      </Button>
      <Button variant="warning" type="reset">
        <i className="fas fa-undo"></i> Limpiar
      </Button>
    </Form>
  );
};

export default FormularioCategoria;
