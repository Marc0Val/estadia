import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FormularioClientes = () => {
  const [formData, setFormData] = useState({
    trade_name: "",
    business_type: "Por Definir",
    phone_or_cell: "",
    email: "",
    street: "",
    number: "",
    neighborhood: "",
    postal_code: "",
    city: "",
    country: "",
    state: "",
    notes: "",
    contact_name: "",
    contact_title: "",
    contact_area_or_position: "",
    contact_cell_phone: "",
    contact_email: "",
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
      trade_name: "",
      business_type: "Por Definir",
      phone_or_cell: "",
      email: "",
      street: "",
      number: "",
      neighborhood: "",
      postal_code: "",
      city: "",
      country: "",
      state: "",
      notes: "",
      contact_name: "",
      contact_title: "",
      contact_area_or_position: "",
      contact_cell_phone: "",
      contact_email: "",
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
          <Form.Group controlId="formTradeName">
            <Form.Label>
              <strong>Nombre Comercial *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="trade_name"
              value={formData.trade_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formBusinessType">
            <Form.Label>
              <strong>Giro *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="business_type"
              value={formData.business_type}
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
          <Form.Group controlId="formPhoneOrCell">
            <Form.Label>
              <strong>Teléfono/Celular</strong>
            </Form.Label>
            <Form.Control
              type="tel"
              name="phone_or_cell"
              value={formData.phone_or_cell}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
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
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formStreet">
            <Form.Label>
              <strong>Calle *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formNumber">
            <Form.Label>
              <strong>Número *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formNeighborhood">
            <Form.Label>
              <strong>Colonia</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formPostalCode">
            <Form.Label>
              <strong>Código Postal</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCity">
            <Form.Label>
              <strong>Ciudad *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCountry">
            <Form.Label>
              <strong>País *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formState">
            <Form.Label>
              <strong>Estado *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formNotes">
            <Form.Label>
              <strong>Notas</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <h5>Información de Contacto</h5>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formContactName">
            <Form.Label>
              <strong>Nombre de Contacto *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formContactTitle">
            <Form.Label>
              <strong>Título de Contacto</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="contact_title"
              value={formData.contact_title}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formContactAreaOrPosition">
            <Form.Label>
              <strong>Área o Posición</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="contact_area_or_position"
              value={formData.contact_area_or_position}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formContactCellPhone">
            <Form.Label>
              <strong>Celular de Contacto *</strong>
            </Form.Label>
            <Form.Control
              type="tel"
              name="contact_cell_phone"
              value={formData.contact_cell_phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formContactEmail">
            <Form.Label>
              <strong>Correo de Contacto *</strong>
            </Form.Label>
            <Form.Control
              type="email"
              name="contact_email"
              value={formData.contact_email}
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
        disabled={
          !formData.trade_name ||
          !formData.business_type ||
          !formData.email ||
          !formData.street ||
          !formData.number ||
          !formData.city ||
          !formData.country ||
          !formData.state ||
          !formData.contact_name ||
          !formData.contact_cell_phone ||
          !formData.contact_email
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
