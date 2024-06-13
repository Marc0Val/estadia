import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioProducto = () => {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    unit: "",
    description: "",
    sale_price: "",
    model: "",
    factory_code: "",
    supplier_id: "",
    manufacturer_brand: "",
    reorder_point: 1,
    initial_stock: 1,
    minimum_stock: 1,
    product_image: null,
    information_document: null,
    sku: "",
    sat_code: "",
    sat_unit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del formulario.
    console.log("Datos del formulario enviados:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      category_id: "",
      unit: "",
      description: "",
      sale_price: "",
      model: "",
      factory_code: "",
      supplier_id: "",
      manufacturer_brand: "",
      reorder_point: 1,
      initial_stock: 1,
      minimum_stock: 1,
      product_image: null,
      information_document: null,
      sku: "",
      sat_code: "",
      sat_unit: "",
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
          <Form.Group controlId="formName">
            <Form.Label>
              <strong>Nombre *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCategory">
            <Form.Label>
              <strong>Categoría *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecciona una categoría
              </option>
              <option value="1">Categoría 1</option>
              {/* Añadir más opciones según sea necesario */}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formUnit">
            <Form.Label>
              <strong>Unidad *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            >
              <option value="Por Definir">Por Definir</option>
              <option value="Conjunto">Conjunto</option>
              <option value="Cubeta">Cubeta</option>
              <option value="gramo">gramo</option>
              <option value="galon">galon</option>
              <option value="Kilogramo">Kilogramo</option>
              <option value="Kit">Kit</option>
              <option value="Metro Cuadrado">Metro Cuadrado</option>
              <option value="Metro Cubico">Metro Cubico</option>
              <option value="Metro">Metro</option>
              <option value="Onza">Onza</option>
              <option value="Pieza">Pieza</option>
              <option value="Rollo">Rollo</option>
              <option value="Tramo">Tramo</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formDescription">
            <Form.Label>
              <strong>Descripción *</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formSalePrice">
            <Form.Label>
              <strong>Precio de venta $ *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="sale_price"
              value={formData.sale_price}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formModel">
            <Form.Label>
              <strong>Modelo</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formFactoryCode">
            <Form.Label>
              <strong>Código de fábrica</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="factory_code"
              value={formData.factory_code}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSupplier">
            <Form.Label>
              <strong>Proveedor *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="supplier_id"
              value={formData.supplier_id}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecciona un proveedor
              </option>
              <option value="1">Proveedor 1</option>
              {/* Añadir más opciones según sea necesario */}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formManufacturerBrand">
            <Form.Label>
              <strong>Fabricante/Marca</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="manufacturer_brand"
              value={formData.manufacturer_brand}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formReorderPoint">
            <Form.Label>
              <strong>Punto de Pedido *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="reorder_point"
              value={formData.reorder_point}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formInitialStock">
            <Form.Label>
              <strong>Stock Inicial *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="initial_stock"
              value={formData.initial_stock}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formMinimumStock">
            <Form.Label>
              <strong>Stock Mínimo *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="minimum_stock"
              value={formData.minimum_stock}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row className="mb-3 mt-5">
        <Col>
          <Form.Group controlId="formProductImage">
            <Form.Label>
              <strong>Imagen del producto</strong>
            </Form.Label>
            <Form.Control
              type="file"
              name="product_image"
              accept=".jpeg,.jpg,.bmp,.png"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formInformationDocument">
            <Form.Label>
              <strong>Documento informativo</strong>
            </Form.Label>
            <Form.Control
              type="file"
              name="information_document"
              accept=".pdf,.xls,.xlsx,.doc,.docs,.odt,.ods,.jpeg,.jpg,.bmp,.png"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <h4 className="mt-5 mb-">Más información</h4>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formSKU">
            <Form.Label>
              <strong>SKU</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSatCode">
            <Form.Label>
              <strong>Código SAT</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="sat_code"
              value={formData.sat_code}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSatUnit">
            <Form.Label>
              <strong>Unidad SAT</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="sat_unit"
              value={formData.sat_unit}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Button
        variant="success"
        type="submit"
        disabled={
          !(
            formData.name &&
            formData.category_id &&
            formData.unit &&
            formData.description &&
            formData.sale_price &&
            formData.supplier_id &&
            formData.reorder_point &&
            formData.initial_stock &&
            formData.minimum_stock
          )
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

export default FormularioProducto;
