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
import FormularioClientes from "../../components/Forms/FormularioClientes";
import BotonModal from "../../components/Buttons/BotonModal";
import { useServiceOrders } from "../../context/ServiceOrdersContext";
import { useClients } from "../../context/ClientsContext";
import { useServices } from "../../context/ServicesContext";
import { useProducts } from "../../context/ProductsContext";

const FormularioOrdenServicio = ({ id_orden_servicio }) => {
  const { getServiceOrderById, createServiceOrder, updateServiceOrder } =
    useServiceOrders();
  const { getClients, clients } = useClients();
  const { getServices, services } = useServices();
  const { getProducts, products } = useProducts();

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
    personalAsignado: "",
    cantidad: 1,
    producto: "",
    actividades: "",
    recomendaciones: "",
    archivo: null,
    notas: "",
    nivelSatisfaccion: "",
    direccion: "",
    estado: "Creada",
  });

  useEffect(() => {
    if (id_orden_servicio) {
      getServiceOrderById(id_orden_servicio).then((data) => {
        setFormData({
          ...data,
          fechaProgramada: new Date(data.fechaProgramada),
        });
      });
    }
  }, [id_orden_servicio, getServiceOrderById]);

  useEffect(() => {
    getClients();
    getServices();
    getProducts();
  }, []);

  useEffect(() => {
    if (formData.cliente) {
      console.log(formData.cliente);
      const selectedClient = clients.find(
        (client) => client.id_client.toString() === formData.cliente.toString()
      );

      if (selectedClient) {
        setFormData((prevData) => ({
          ...prevData,
          celular: selectedClient.phone_or_cell || "",
          contacto: selectedClient.contact_name || "",
          correo: selectedClient.email || "",
        }));
      } else {
        console.log("Cliente no encontrado:", formData.cliente);
        setFormData((prevData) => ({
          ...prevData,
          celular: "",
          contacto: "",
          correo: "",
        }));
      }
    }
  }, [formData.cliente]);

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
    if (id_orden_servicio) {
      updateServiceOrder(id_orden_servicio, formData).then(() => {
        console.log("Orden de servicio actualizada:", formData);
      });
    } else {
      createServiceOrder(formData).then(() => {
        console.log("Orden de servicio creada:", formData);
      });
    }
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
      personalAsignado: "",
      cantidad: 1,
      producto: "",
      actividades: "",
      recomendaciones: "",
      archivo: null,
      notas: "",
      nivelSatisfaccion: "",
      direccion: "",
      estado: "Creada",
    });
  };

  return (
    <div className="contenedor1 container-fluid">
      <div className="row">
        <div className="col-9">
          <p className="subtitulo">Datos Generales</p>
          <hr />
          <div className="shadow p-3 mb-3 bg-body rounded">
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formCliente">
                  <Form.Label>
                    <div className="d-flex">
                      <div className="mx-3">
                        <strong>Cliente:</strong>
                      </div>
                      <BotonModal
                        icono="fas fa-user-plus"
                        contenidoModal={<FormularioClientes />}
                        titulo={"Agregar Cliente"}
                      />
                    </div>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleChange}
                  >
                    <option>-- Selecciona un cliente-- </option>
                    {clients.map((client) => (
                      <option key={client.id_client} value={client.id_client}>
                        {client.trade_name}
                      </option>
                    ))}
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
                  >
                    <option>-- Selecciona un servicio-- </option>
                    {services.map((service) => (
                      <option
                        key={service.id_service}
                        value={service.id_service}
                      >
                        {service.name_}
                      </option>
                    ))}
                  </Form.Control>
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

              <Col>
                <Form.Group controlId="formPersonalAsignado">
                  <Form.Label>
                    <strong>Personal Asignado</strong>
                  </Form.Label>
                  <Form.Control as="select" name="personalAsignado">
                    <option>-- Selecciona un personal-- </option>
                    <option>Personal 1</option>
                    <option>Personal 2</option>
                    <option>Personal 3</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="shadow p-3 mb-3 bg-body rounded">
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
                <option>-- Productos Disponibles --</option>
                {products.map((product) => (
                  <option key={product.id_product} value={product.id_product}>
                    {product.name_}
                  </option>
                ))}
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
          </div>
          <div className="shadow p-3 mb-3 bg-body rounded">
            <p className="subtitulo">
              <i className="fas fa-box-open"></i>Productos - Refacciones -
              Materiales para servicio
            </p>
            <hr />
          </div>
          <div className="shadow p-3 mb-5 bg-body rounded">
            <Col>
              <Form.Group controlId="formActividades" className="mb-3">
                <Form.Label>
                  <strong>Actividades</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="actividades"
                  value={formData.actividades}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formRecomendaciones" className="mb-3">
                <Form.Label>
                  <strong>Recomendaciones</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="recomendaciones"
                  value={formData.recomendaciones}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </div>
        </div>
        <div className="col-3">
          <div class="card">
            <div className="card-header">
              <p className="subtitulo">Orden de Servicio</p>
            </div>
            <div class="card-body">
              <p className="text-center subtitulo">
                <i className="fas fa-calendar-alt"></i>
                {formData.fechaProgramada.toDateString()}
              </p>
              <p className="text-center">
                <i className="fas fa-tasks"></i>Estado
              </p>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formEstado">
                    <Form.Label>
                      <strong>Estado</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                    >
                      <option>Creada</option>
                      <option>Asignada</option>
                      <option>Proceso</option>
                      <option>Terminada</option>
                      <option>Facturada</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-grid gap-2">
                <Button
                  variant="info"
                  onClick={handleSubmit}
                  disabled={
                    formData.servicio === "" ||
                    formData.fechaProgramada === "" ||
                    formData.inicio === "" ||
                    formData.fin === ""
                  }
                >
                  <i className="fas fa-save"></i> Guardar
                </Button>
                <Button variant="warning" onClick={handleReset}>
                  <i className="fas fa-undo-alt"></i> Limpiar
                </Button>
                {/* regresar btn btn-outline-secondary */}
                <NavLink
                  to="/admin/ordenes-servicio"
                  className="btn btn-outline-secondary"
                >
                  <i className="fas fa-arrow-left"></i> Regresar
                </NavLink>
              </div>
            </div>
            <div class="card-footer">
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

export default FormularioOrdenServicio;
