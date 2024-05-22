import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FormularioEmpresa = () => {
  const [formData, setFormData] = useState({
    logo: "",
    sello: "",
    nombre: "",
    apellido: "",
    nombreComercial: "",
    nombreFiscal: "",
    rfc: "",
    telefono: "",
    correo: "",
    simboloMoneda: "",
    nombreMoneda: "",
    formatoMoneda: "",
    pais: "",
    estado: "",
    ciudad: "",
    zonaHoraria: "",
    impuesto: "",
    etiquetaImpuesto: "",
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
      logo: "",
      sello: "",
      nombre: "",
      apellido: "",
      nombreComercial: "",
      nombreFiscal: "",
      rfc: "",
      telefono: "",
      correo: "",
      simboloMoneda: "",
      nombreMoneda: "",
      formatoMoneda: "",
      pais: "",
      estado: "",
      ciudad: "",
      zonaHoraria: "",
      impuesto: "",
      etiquetaImpuesto: "",
      direccion: "",
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="container mt-4"
    >
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formLogo">
            <Form.Label>
              <strong>
                Logo (Sólo formatos jpg, png. Máx. 2Mb.) Recomendación Máx.
                200px por 200px
              </strong>
            </Form.Label>
            <Form.Control
              type="file"
              name="logo"
              onChange={handleFileChange}
              accept=".jpg,.png"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSello">
            <Form.Label>
              <strong>
                Sello (Sólo formatos jpg, png. Máx. 2Mb.) Recomendación Máx.
                200px por 200px
              </strong>
            </Form.Label>
            <Form.Control
              type="file"
              name="sello"
              onChange={handleFileChange}
              accept=".jpg,.png"
            />
          </Form.Group>
        </Col>
      </Row>
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
          <Form.Group controlId="formNombreComercial">
            <Form.Label>
              <strong>Nombre Comercial</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="nombreComercial"
              value={formData.nombreComercial}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formNombreFiscal">
            <Form.Label>
              <strong>Nombre Fiscal</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="nombreFiscal"
              value={formData.nombreFiscal}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formRFC">
            <Form.Label>
              <strong>RFC</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="rfc"
              value={formData.rfc}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formTelefono">
            <Form.Label>
              <strong>Teléfono</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCorreo">
            <Form.Label>
              <strong>Correo electrónico *</strong>
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
          <Form.Group controlId="formSimboloMoneda">
            <Form.Label>
              <strong>Símbolo de moneda *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="simboloMoneda"
              value={formData.simboloMoneda}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formNombreMoneda">
            <Form.Label>
              <strong>Nombre de moneda *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="nombreMoneda"
              value={formData.nombreMoneda}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formFormatoMoneda">
            <Form.Label>
              <strong>Formato de moneda *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="formatoMoneda"
              value={formData.formatoMoneda}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formPais">
            <Form.Label>
              <strong>País *</strong>
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
        <Col>
          <Form.Group controlId="formZonaHoraria">
            <Form.Label>
              <strong>Zona horaria *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="zonaHoraria"
              value={formData.zonaHoraria}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formImpuesto">
            <Form.Label>
              <strong>Impuesto % *</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="impuesto"
              value={formData.impuesto}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formEtiquetaImpuesto">
            <Form.Label>
              <strong>Etiqueta impuesto * Max 20 caracteres.</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="etiquetaImpuesto"
              value={formData.etiquetaImpuesto}
              onChange={handleChange}
              maxLength="20"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formDireccion" className="mb-3">
        <Form.Label>
          <strong>Dirección *</strong>
        </Form.Label>
        <Form.Control
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        disabled={
          formData.nombre === "" ||
          formData.apellido === "" ||
          formData.correo === "" ||
          formData.simboloMoneda === "" ||
          formData.nombreMoneda === "" ||
          formData.formatoMoneda === "" ||
          formData.pais === "" ||
          formData.estado === "" ||
          formData.ciudad === "" ||
          formData.zonaHoraria === "" ||
          formData.impuesto === "" ||
          formData.etiquetaImpuesto === "" ||
          formData.direccion === ""
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

export default FormularioEmpresa;
