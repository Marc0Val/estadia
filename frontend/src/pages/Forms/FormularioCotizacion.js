import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useClients } from "../../context/ClientsContext";
import { useProducts } from "../../context/ProductsContext";
import FormularioClientes from "../../components/Forms/FormularioClientes";
import BotonModal from "../../components/Buttons/BotonModal";

const FormularioCotizacion = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
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

  // Contextos
  const { clients, getClients } = useClients();
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getClients();
    getProducts();
  }, [getClients, getProducts]);

  useEffect(() => {
    if (formData.cliente) {
      const selectedClient = clients.find(
        (client) => client.id_client.toString() === formData.cliente.toString()
      );
      if (selectedClient) {
        setFormData((prevState) => ({
          ...prevState,
          contacto: selectedClient.contact_name || "",
        }));
      }
    }
  }, [formData.cliente, clients]);

  useEffect(() => {
    if (formData.productoSeleccionado) {
      const selectedProduct = products.find(
        (product) =>
          product.id_product.toString() ===
          formData.productoSeleccionado.toString()
      );
      if (selectedProduct) {
        setFormData((prevState) => ({
          ...prevState,
          productoPrecio: selectedProduct.sale_price || 0,
        }));
      }
    }
  }, [formData.productoSeleccionado, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = () => {
    const product = products.find(
      (p) => p.id_product === formData.productoSeleccionado
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
                      <option key={client.id_client} value={client.id_client}>
                        {client.trade_name}
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
                      <option
                        key={product.id_product}
                        value={product.id_product}
                      >
                        {product.name_}
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
                    readOnly // Precio solo para mostrar, no editable por el usuario
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
                <Button variant="primary" type="submit">
                  Guardar Cotización
                </Button>
                <NavLink to="/admin/cotizaciones">
                  <Button variant="secondary">Volver</Button>
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
