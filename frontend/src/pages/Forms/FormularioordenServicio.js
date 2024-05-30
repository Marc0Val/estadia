import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormularioOrdenServicio = () => {
  const [formData, setFormData] = useState({
    cliente: "",
    celular: "",
    contacto: "",
    correo: "",
    servicio: "",
    fechaProgramada: new Date(),
    inicio: "",
    fin: "",
    precio: "",
    cantidad: 1,
    producto: "",
    actividades: "",
    recomendaciones: "",
    archivo: null,
    notas: "",
    nivelSatisfaccion: "",
    direccion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      archivo: e.target.files[0],
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fechaProgramada: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  const handleReset = () => {
    setFormData({
      cliente: "",
      celular: "",
      contacto: "",
      correo: "",
      servicio: "",
      fechaProgramada: new Date(),
      inicio: "",
      fin: "",
      precio: "",
      cantidad: 1,
      producto: "",
      actividades: "",
      recomendaciones: "",
      archivo: null,
      notas: "",
      nivelSatisfaccion: "",
      direccion: "",
    });
  };

  return (
    <div className="contenedor container-fluid">
      <hr />
      <Container>
        <Form onSubmit={handleSubmit} onReset={handleReset}>
          <h4>Datos Generales</h4>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formCliente">
                <Form.Label>
                  <strong>Cliente</strong>
                </Form.Label>

                <Form.Control
                  as="select"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                >
                  <option>Seleccione</option>
                  {/* ejemplo */}
                  <option>Cliente 1</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCelular">
                <Form.Label>
                  <strong>Celular</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formContacto">
                <Form.Label>
                  <strong>Contacto</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="contacto"
                  value={formData.contacto}
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
              <Form.Group controlId="formServicio">
                <Form.Label>
                  <strong>Servicio *</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFechaProgramada">
                <Form.Label>
                  <strong>Fecha programada *</strong>
                </Form.Label>
                <DatePicker
                  selected={formData.fechaProgramada}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formInicio">
                <Form.Label>
                  <strong>Inicio *</strong>
                </Form.Label>
                <Form.Control
                  type="time"
                  name="inicio"
                  value={formData.inicio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFin">
                <Form.Label>
                  <strong>Fin *</strong>
                </Form.Label>
                <Form.Control
                  type="time"
                  name="fin"
                  value={formData.fin}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPrecio">
                <Form.Label>
                  <strong>Precio $</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <InputGroup className="mb-3">
            <FormControl
              type="number"
              min="1"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
            />
            <Form.Control
              as="select"
              name="producto"
              value={formData.producto}
              onChange={handleChange}
            >
              <option>
                Productos - Refacciones - Materiales para servicio
              </option>
            </Form.Control>
            <Button variant="primary">Agregar</Button>
          </InputGroup>
          <Form.Group controlId="formInformacionAdicional" className="mb-3">
            <Form.Label>
              <strong>Información adicional</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="informacionAdicional"
              value={formData.informacionAdicional}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formActividades" className="mb-3">
            <Form.Label>
              <strong>Actividades</strong> (Max. 4000 caracteres)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="actividades"
              value={formData.actividades}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formRecomendaciones" className="mb-3">
            <Form.Label>
              <strong>Recomendaciones</strong> (Max. 4000 caracteres)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="recomendaciones"
              value={formData.recomendaciones}
              onChange={handleChange}
            />
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formArchivo" className="mb-3">
                <Form.Label>
                  <strong>Seleccionar archivo</strong>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="archivo"
                  accept=".jpg,.png,.pdf,.xls,.xlsx,.doc,.docs,.odt,.ods,.jpeg,.bmp"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formNotas" className="mb-3">
                <Form.Label>
                  <strong>Notas</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            Guardar Orden
          </Button>
          <Button variant="secondary" type="reset" className="ms-2">
            Limpiar
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default FormularioOrdenServicio;
