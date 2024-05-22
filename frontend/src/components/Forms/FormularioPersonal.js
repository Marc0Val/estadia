import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioPersonal = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rol: "",
    titulo: "",
    correo: "",
    celular: "",
    telefono: "",
    direccion: "",
    notificar: false,
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
      rol: "",
      titulo: "",
      correo: "",
      celular: "",
      telefono: "",
      direccion: "",
      notificar: false,
      contraseña: "",
      confirmarContraseña: "",
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
          <Form.Group controlId="formRol">
            <Form.Label>
              <strong>Rol *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="">
                Seleccione un rol(estos tienen que venir de la base de datos xd
                o los disponibles)
              </option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formTitulo">
            <Form.Label>
              <strong>Titulo</strong>
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
          <Form.Group controlId="formCorreo">
            <Form.Label>
              <strong>Correo *</strong>
            </Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
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
      </Row>
      <Row className="mb-3">
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
          <Form.Group controlId="formDireccion">
            <Form.Label>
              <strong>Direccion *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formNotificar">
            <Form.Check
              type="checkbox"
              label="Notificar"
              name="notificar"
              checked={formData.notificar}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formContraseña">
            <Form.Label>
              <strong>Contraseña *</strong>
            </Form.Label>
            <Form.Control
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              minLength="6"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formConfirmarContraseña">
            <Form.Label>
              <strong>Confirmar Contraseña *</strong>
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              minLength="6"
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
          formData.nombre === "" ||
          formData.apellido === "" ||
          formData.rol === "" ||
          formData.correo === "" ||
          formData.celular === "" ||
          formData.direccion === "" ||
          formData.contraseña === "" ||
          formData.confirmarContraseña === ""
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

export default FormularioPersonal;
