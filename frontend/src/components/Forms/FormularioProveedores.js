import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioProveedor = () => {
  const [formData, setFormData] = useState({
    trade_name: "",
    business_type: "Por Definir",
    cell_number: "",
    email: "",
    country: "",
    state: "",
    address: "",
    city: "",
    postal_code: "",
    location: "",
    website: "",
    bank_accounts: "",
    billing_name: "",
    billing_number: "",
    billing_address: "",
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
      cell_number: "",
      email: "",
      country: "",
      state: "",
      address: "",
      city: "",
      postal_code: "",
      location: "",
      website: "",
      bank_accounts: "",
      billing_name: "",
      billing_number: "",
      billing_address: "",
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
          <Form.Group controlId="formCellNumber">
            <Form.Label>
              <strong>Teléfono/Celular *</strong>
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
        <Col>
          <Form.Group controlId="formEmail">
            <Form.Label>
              <strong>Correo</strong>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
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
          <Form.Group controlId="formAddress">
            <Form.Label>
              <strong>Dirección</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
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
      </Row>
      <Row className="mb-3">
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
        <Col>
          <Form.Group controlId="formLocation">
            <Form.Label>
              <strong>Ubicación</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formWebsite">
            <Form.Label>
              <strong>Página/Portal Web</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBankAccounts">
            <Form.Label>
              <strong>Cuentas Bancarias</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="bank_accounts"
              value={formData.bank_accounts}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formBillingName">
            <Form.Label>
              <strong>Nombre de Facturación</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="billing_name"
              value={formData.billing_name}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBillingNumber">
            <Form.Label>
              <strong>Número de Facturación</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="billing_number"
              value={formData.billing_number}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formBillingAddress">
            <Form.Label>
              <strong>Domicilio de Facturación</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="billing_address"
              value={formData.billing_address}
              onChange={handleChange}
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
          !formData.cell_number ||
          !formData.country ||
          !formData.state ||
          !formData.city ||
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

export default FormularioProveedor;
