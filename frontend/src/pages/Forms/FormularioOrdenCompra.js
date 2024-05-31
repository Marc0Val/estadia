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
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormularioOrdenCompra = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [formData, setFormData] = useState({
    proveedor: "",
    contacto: "",
    productoCantidad: 1,
    productoSeleccionado: "",
    productoCosto: 0,
    productoImpuesto: 16,
    // venci
    vigencia: new Date(today.setDate(today.getDate() + 7)),
    observaciones: "",
    terminos: "",
    archivo: null,
    notas: "",
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
      vigencia: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  const handleReset = () => {
    setFormData({
      proveedor: "",
      contacto: "",
      productoCantidad: 1,
      productoSeleccionado: "",
      productoCosto: 0,
      productoImpuesto: 16,
      vigencia: new Date(today.setDate(today.getDate() + 7)),
      observaciones: "",
      terminos: "",
      archivo: null,
      notas: "",
    });
  };

  return (
    <div className="contenedor1 container-fluid">
      <div className="row">
        <div className="col-9">
          <p className="subtitulo">
            <i className="fas fa-user"></i> Datos generales
          </p>
          <hr />
          <div className="shadow p-3 mb-3 bg-body rounded">
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formProveedor">
                  <Form.Label>
                    <strong>Proveedor</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="proveedor"
                    value={formData.proveedor}
                    onChange={handleChange}
                  >
                    <option>Seleccione</option>
                    {/* ejemplo */}
                    <option>Proveedor 1</option>
                  </Form.Control>
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
            </Row>
            <Row className="mb-3">
              <Col>
                <InputGroup>
                  <FormControl
                    type="number"
                    min="1"
                    name="productoCantidad"
                    value={formData.productoCantidad}
                    onChange={handleChange}
                  />
                  <Form.Control
                    as="select"
                    name="productoSeleccionado"
                    value={formData.productoSeleccionado}
                    onChange={handleChange}
                  >
                    <option>Producto o servicio</option>
                    {/* ejemplo */}
                    <option>Producto 1</option>
                  </Form.Control>
                  <FormControl
                    type="text"
                    placeholder="Costo $"
                    name="productoCosto"
                    value={formData.productoCosto}
                    onChange={handleChange}
                  />
                  <FormControl
                    type="number"
                    placeholder="Impuestos %"
                    name="productoImpuesto"
                    value={formData.productoImpuesto}
                    onChange={handleChange}
                  />
                  <Button variant="primary">Agregar</Button>
                </InputGroup>
              </Col>
            </Row>
          </div>
          <div className="shadow p-3 mb-3 bg-body rounded">
            <p className="subtitulo">
              <i className="fas fa-box-open"></i> Productos o servicios
            </p>
            <hr />
          </div>
          <div className="shadow p-3 mb-5 bg-body rounded">
            <Form.Group controlId="formObservaciones" className="mb-3">
              <Form.Label>
                <strong>Este texto aparecerá arriba de los precios</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTerminos" className="mb-3">
              <Form.Label>
                <strong>
                  Términos y condiciones (puedes agregar tus datos bancarios
                  para pago)
                </strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="terminos"
                value={formData.terminos}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-header">
              <p className="subtitulo">
                <i className="fas fa-file-invoice-dollar"></i> RESUMEN ORDEN DE
                COMPRA
              </p>
            </div>
            <div className="card-body">
              <p className="text-center subtitulo">
                <i className="fas fa-calendar-alt"></i>{" "}
                {startDate.toLocaleDateString()}
              </p>
              <p className="text-center subtitulo">Sub Total: $0.00</p>
              <p className="text-center subtitulo">Impuestos: $0.00</p>
              <p className="text-center subtitulo">Total: $0.00</p>
              <Form.Group controlId="formVigencia" className="mb-3">
                <Form.Label>
                  {/* <strong>Vencimiento *</strong> */}
                  <p className="text-center subtitulo">
                    <i className="fas fa-calendar-alt"></i> Vencimiento*
                  </p>
                </Form.Label>
                <DatePicker
                  selected={formData.vigencia}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </Form.Group>
            </div>
            <div className="card-footer">
              <div className="d-grid gap-2">
                <Button
                  variant="info"
                  onClick={handleSubmit}
                  disabled={!formData.proveedor || !formData.contacto}
                >
                  <i className="fas fa-save"></i> Generar Orden
                </Button>
                <Button variant="warning" onClick={handleReset}>
                  <i className="fas fa-undo-alt"></i> Limpiar
                </Button>
                <NavLink
                  to="/admin/ordenes-de-compra"
                  className="btn btn-outline-secondary"
                >
                  <i className="fas fa-arrow-left"></i> Regresar
                </NavLink>
              </div>
              {/* <Form.Group controlId="formArchivo" className="mb-3">
                <Form.Label>
                  <strong>Archivos</strong>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="archivo"
                  onChange={handleFileChange}
                />
              </Form.Group> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioOrdenCompra;
