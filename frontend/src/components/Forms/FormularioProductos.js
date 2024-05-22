import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioProducto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    unidad: "",
    descripcion: "",
    precioVenta: "",
    modelo: "",
    codigoFabrica: "",
    proveedor: "",
    fabricante: "",
    puntoPedido: 1,
    stockInicial: 1,
    stockMinimo: 1,
    imagenProducto: null,
    documentoInformativo: null,
    sku: "",
    codigoSAT: "",
    unidadSAT: "",
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
      nombre: "",
      categoria: "",
      unidad: "",
      descripcion: "",
      precioVenta: "",
      modelo: "",
      codigoFabrica: "",
      proveedor: "",
      fabricante: "",
      puntoPedido: 1,
      stockInicial: 1,
      stockMinimo: 1,
      imagenProducto: null,
      documentoInformativo: null,
      sku: "",
      codigoSAT: "",
      unidadSAT: "",
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
          <Form.Group controlId="formCategoria">
            <Form.Label>
              <strong>Categoria *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecciona una categoría(supongo que de las ya creadas se cargan
                aqui xd)
              </option>
              <option value="1">Categoría 1</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formUnidad">
            <Form.Label>
              <strong>Unidad *</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="unidad"
              value={formData.unidad}
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
          <Form.Group controlId="formDescripcion">
            <Form.Label>
              <strong>Descripcion *</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formPrecioVenta">
            <Form.Label>
              <strong>Precio de venta $ *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="precioVenta"
              value={formData.precioVenta}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formModelo">
            <Form.Label>
              <strong>Modelo</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCodigoFabrica">
            <Form.Label>
              <strong>Código de fábrica</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="codigoFabrica"
              value={formData.codigoFabrica}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formProveedor">
            <Form.Label>
              <strong>Proveedor *</strong>
            </Form.Label>
            {/* seleccionable */}
            <Form.Control
              as="select"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecciona un proveedor(supongo que de los ya creados se cargan
                aqui xd)
              </option>
              <option value="1">Proveedor 1</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formFabricante">
            <Form.Label>
              <strong>Fabricante/Marca</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="fabricante"
              value={formData.fabricante}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formPuntoPedido">
            <Form.Label>
              <strong>Punto de Pedido *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="puntoPedido"
              value={formData.puntoPedido}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formStockInicial">
            <Form.Label>
              <strong>Stock Inicial *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="stockInicial"
              value={formData.stockInicial}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formStockMinimo">
            <Form.Label>
              <strong>Stock Mínimo *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="stockMinimo"
              value={formData.stockMinimo}
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
          <Form.Group controlId="formImagenProducto">
            <Form.Label>
              <strong>Imagen del producto</strong>
            </Form.Label>
            <Form.Control
              type="file"
              name="imagenProducto"
              accept=".jpeg,.jpg,.bmp,.png"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formDocumentoInformativo">
            <Form.Label>
              <strong>Documento informativo</strong>
            </Form.Label>
            <Form.Control
              type="file"
              name="documentoInformativo"
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
          <Form.Group controlId="formCodigoSAT">
            <Form.Label>
              <strong>Código SAT</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="codigoSAT"
              value={formData.codigoSAT}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formUnidadSAT">
            <Form.Label>
              <strong>Unidad SAT</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="unidadSAT"
              value={formData.unidadSAT}
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
            formData.nombre &&
            formData.categoria &&
            formData.unidad &&
            formData.descripcion &&
            formData.precioVenta &&
            formData.proveedor &&
            formData.puntoPedido &&
            formData.stockInicial &&
            formData.stockMinimo
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
