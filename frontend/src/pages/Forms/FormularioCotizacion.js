import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { Table } from "react-bootstrap";
import FormularioClientes from "../../components/Forms/FormularioClientes";
import BotonModal from "../../components/Buttons/BotonModal";

const FormularioCotizacion = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    cliente: "",
    contacto: "",
    productoCantidad: 1,
    productoSeleccionado: "",
    productoPrecio: 0,
    productoDescuento: 0,
    productoImpuesto: 16,
    vigencia: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = () => {
    const product = products.find(
      (p) => p.id === formData.productoSeleccionado
    );
    setSelectedProducts([
      ...selectedProducts,
      {
        ...product,
        quantity: formData.productoCantidad,
        price: formData.productoPrecio,
        discount: formData.productoDescuento,
        tax: formData.productoImpuesto,
      },
    ]);
  };

  const calculateTotals = () => {
    let subTotal = 0;
    let totalTax = 0;
    selectedProducts.forEach((product) => {
      const productTotal = product.price * product.quantity;
      const discountAmount = (productTotal * product.discount) / 100;
      const taxableAmount = productTotal - discountAmount;
      const taxAmount = (taxableAmount * product.tax) / 100;
      subTotal += taxableAmount;
      totalTax += taxAmount;
    });
    return { subTotal, totalTax, total: subTotal + totalTax };
  };

  const totals = calculateTotals();

  return (
    <div className="contenedor1 container-fluid">
      <div className="row">
        <div className="col-9">
          <div>
            <p className="subtitulo">
              <i className="fas fa-user"></i> Datos del usuario
            </p>
            <hr />
            <div className="shadow p-3 mb-5 bg-body rounded">
              <Col>
                <Form.Group controlId="formCliente">
                  <Form.Label className="mx-3">
                    <strong>Cliente: </strong>
                  </Form.Label>
                  <BotonModal
                    // nombreBoton="Nuevo Cliente"
                    icono="fas fa-user-plus"
                    contenidoModal={<FormularioClientes />}
                    titulo="Nuevo Cliente"
                  />
                  <Form.Control
                    as="select"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleInputChange}
                  >
                    <option>Seleccione</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
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
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </div>
          </div>

          <div className="shadow p-3 mb-5 bg-body rounded">
            <Row>
              <Col>
                <Form.Group controlId="formProductoCantidad">
                  <Form.Label>
                    <strong>Cantidad</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="productoCantidad"
                    min="1"
                    value={formData.productoCantidad}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formProductoSeleccionado">
                  <Form.Label>
                    <strong>Producto</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="productoSeleccionado"
                    value={formData.productoSeleccionado}
                    onChange={handleInputChange}
                  >
                    <option>Seleccione</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formProductoPrecio">
                  <Form.Label>
                    <strong>Precio $</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="productoPrecio"
                    value={formData.productoPrecio}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formProductoDescuento">
                  <Form.Label>
                    <strong>Descuento %</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="productoDescuento"
                    value={formData.productoDescuento}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formProductoImpuesto">
                  <Form.Label>
                    <strong>Impuesto %</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="productoImpuesto"
                    value={formData.productoImpuesto}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="info"
                  onClick={handleAddProduct}
                  className="mt-4"
                >
                  Agregar
                </Button>
              </Col>
            </Row>
          </div>
          <div className="shadow p-3 mb-5 bg-body rounded">
            <p className="subtitulo">
              <i className="fas fa-box"></i> Productos o Servicios
            </p>
            <hr />
          </div>
          <div className="shadow p-3 mb-5 bg-body rounded">
            <Row>
              <Col>
                <Form.Group controlId="formNotas">
                  <Form.Label>
                    <strong>Notas</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formTerminos">
                  <Form.Label>
                    <strong>Términos y Condiciones</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="terminos"
                    value={formData.terminos}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-header">
              <p className="subtitulo">
                <i className="fas fa-file-invoice-dollar"></i> Resumen de
                Cotización
              </p>
            </div>
            <div className="card-body">
              <p className="text-center subtitulo">
                <i className="fas fa-calendar-alt"></i>{" "}
                {startDate.toLocaleDateString()}
              </p>
              <p className="text-center subtitulo">
                Subtotal: ${totals.subTotal.toFixed(2)}
              </p>
              <p className="text-center subtitulo">
                Impuestos: ${totals.totalTax.toFixed(2)}
              </p>
              <p className="text-center subtitulo">
                Total: ${totals.total.toFixed(2)}
              </p>
              <Form.Group controlId="formVigencia">
                <Form.Label>
                  <strong>Vigencia *</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="vigencia"
                  value={formData.vigencia}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="card-footer">
              <div className="d-grid gap-2">
                <Button
                  variant="info"
                  disabled={!formData.cliente || selectedProducts.length === 0}
                >
                  <i className="fas fa-save"></i> Guardar
                </Button>
                <Button
                  variant="warning"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      cliente: "",
                      contacto: "",
                      vigencia: "",
                      notas: "",
                      terminos: "",
                    })
                  }
                >
                  <i className="fas fa-undo-alt"></i> Limpiar
                </Button>
                <NavLink
                  to="/admin/cotizaciones"
                  className="btn btn-outline-secondary"
                >
                  <i className="fas fa-arrow-left"></i> Regresar
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioCotizacion;
