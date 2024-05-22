import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioProveedor = () => {
  const [formData, setFormData] = useState({
    nombreComercial: "",
    giro: "Por Definir",
    telefonoCelular: "",
    correo: "",
    pais: "",
    estado: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    ubicacion: "",
    paginaWeb: "",
    cuentasBancarias: "",
    nombreFacturacion: "",
    numeroFacturacion: "",
    domicilioFacturacion: "",
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
      pais: "",
      estado: "",
      direccion: "",
      ciudad: "",
      codigoPostal: "",
      ubicacion: "",
      paginaWeb: "",
      cuentasBancarias: "",
      nombreFacturacion: "",
      numeroFacturacion: "",
      domicilioFacturacion: "",
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
              <strong>Telefono/Celular *</strong>
            </Form.Label>
            <Form.Control
              type="tel"
              name="telefonoCelular"
              value={formData.telefonoCelular}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCorreo">
            <Form.Label>
              <strong>Correo</strong>
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
          <Form.Group controlId="formDireccion">
            <Form.Label>
              <strong>Direccion</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
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
      </Row>
      <Row className="mb-3">
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
        <Col>
          <Form.Group controlId="formUbicacion">
            <Form.Label>
              <strong>Ubicacion</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formPaginaWeb">
            <Form.Label>
              <strong>Pagina/Portal Web</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="paginaWeb"
              value={formData.paginaWeb}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCuentasBancarias">
            <Form.Label>
              <strong>Cuentas Bancarias</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="cuentasBancarias"
              value={formData.cuentasBancarias}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formNombreFacturacion">
            <Form.Label>
              <strong>Nombre de Facturacion</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="nombreFacturacion"
              value={formData.nombreFacturacion}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formNumeroFacturacion">
            <Form.Label>
              <strong>Numero de Facturacion</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="numeroFacturacion"
              value={formData.numeroFacturacion}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formDomicilioFacturacion">
            <Form.Label>
              <strong>Domicilio de Facturacion</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="domicilioFacturacion"
              value={formData.domicilioFacturacion}
              onChange={handleChange}
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
      {/* habilitar boton hasta que los campos obligatorios esten llenos */}
      <Button
        variant="success"
        type="submit"
        disabled={
          formData.nombreComercial === "" ||
          formData.telefonoCelular === "" ||
          formData.pais === "" ||
          formData.estado === "" ||
          formData.ciudad === ""
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
