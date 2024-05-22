import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cargo: "",
    titulo: "",
    tipo: "",
    celular: "",
    telefono: "",
    correo: "",
    calle: "",
    numero: "",
    colonia: "",
    pais: "",
    estado: "",
    ciudad: "",
    codigoPostal: "",
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
      apellido: "",
      cargo: "",
      titulo: "",
      tipo: "",
      celular: "",
      telefono: "",
      correo: "",
      calle: "",
      numero: "",
      colonia: "",
      pais: "",
      estado: "",
      ciudad: "",
      codigoPostal: "",
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
          <Form.Group controlId="formApellido">
            <Form.Label>
              <strong>Apellido *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCargo">
            <Form.Label>
              <strong>Cargo *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formTitulo">
            <Form.Label>
              <strong>Titulo *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formTipo">
            <Form.Label>
              <strong>Tipo</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCelular">
            <Form.Label>
              <strong>Celular *</strong>
            </Form.Label>
            <Form.Control
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formTelefono">
            <Form.Label>
              <strong>Telefono</strong>
            </Form.Label>
            <Form.Control
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
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
          <Form.Group controlId="formCalle">
            <Form.Label>
              <strong>Calle</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formNumero">
            <Form.Label>
              <strong>Numero</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
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
          <Form.Group controlId="formPais">
            <Form.Label>
              <strong>Pais</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formEstado">
            <Form.Label>
              <strong>Estado</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCiudad">
            <Form.Label>
              <strong>Ciudad</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="ciudad"
              value={formData.ciudad}
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
      <hr />
      {/* habilitar boton hasta que los campos obligatorios esten llenos */}
      <Button
        variant="success"
        type="submit"
        disabled={
          formData.nombre === "" ||
          formData.apellido === "" ||
          formData.celular === ""
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

export default FormularioContacto;
