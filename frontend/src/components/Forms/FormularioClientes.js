import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FormularioClientes = () => {
  const [formData, setFormData] = useState({
    nombreComercial: "",
    giro: "Por Definir",
    telefonoCelular: "",
    correo: "",
    calle: "",
    numero: "",
    colonia: "",
    codigoPostal: "",
    ciudad: "",
    pais: "",
    estado: "",
    notas: "",
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
      nombreComercial: "",
      giro: "Por Definir",
      telefonoCelular: "",
      correo: "",
      calle: "",
      numero: "",
      colonia: "",
      codigoPostal: "",
      ciudad: "",
      pais: "",
      estado: "",
      notas: "",
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
          <Form.Group controlId="formNombreComercial">
            <Form.Label>
              <strong>Nombre Comercial *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="nombreComercial"
              value={formData.nombreComercial}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formGiro">
            <Form.Label>
              <strong>Giro *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="giro"
              value={formData.giro}
              onChange={handleChange}
              required
            >
              <option>Comercial</option>
              <option>Equipo Medico</option>
              <option>Industrial</option>
              <option>Por Definir</option>
              <option>Restaurantero</option>
              <option>Servicios</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formTelefonoCelular">
            <Form.Label>
              <strong>Telefono/Celular</strong>
            </Form.Label>
            <Form.Control
              type="tel"
              name="telefonoCelular"
              value={formData.telefonoCelular}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCorreo">
            <Form.Label>
              <strong>Correo *</strong>
            </Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCalle">
            <Form.Label>
              <strong>Calle *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formNumero">
            <Form.Label>
              <strong>Numero *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formColonia">
            <Form.Label>
              <strong>Colonia</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="colonia"
              value={formData.colonia}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCodigoPostal">
            <Form.Label>
              <strong>Codigo Postal</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCiudad">
            <Form.Label>
              <strong>Ciudad *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formPais">
            <Form.Label>
              <strong>Pais *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formEstado">
            <Form.Label>
              <strong>Estado *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formNotas">
            <Form.Label>
              <strong>Notas</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Button
        variant="success"
        type="submit"
        disabled={
          formData.nombreComercial === "" ||
          formData.ciudad === "" ||
          formData.pais === "" ||
          formData.estado === ""
            ? true
            : false
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

export default FormularioClientes;
