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
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useServiceOrders } from "../../context/ServiceOrdersContext";
import { useClients } from "../../context/ClientsContext";
import { useServices } from "../../context/ServicesContext";
import { useProducts } from "../../context/ProductsContext";
import { usePersonal } from "../../context/PersonalContext";

const FormularioOrdenServicio = () => {
  const { getServiceOrder, createServiceOrder, updateServiceOrder } =
    useServiceOrders();
  const { getClients, clients } = useClients();
  const { getServices, services } = useServices();
  const { getProducts, products } = useProducts();
  const { getAllPersonal, personal } = usePersonal();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    client_id: "",
    service_id: "",
    personal_id: "",
    product_id: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    scheduled_date: new Date(),
    start_time: "",
    end_time: "",
    price: "",
    quantity: 1,
    additional_info: "",
    activities: "",
    recomendations: "",
    files: null,
    notes: null,
    state_: "Creada",
  });

  // Nuevo estado para productos agregados
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      getServiceOrder(id).then((data) => {
        setFormData({
          ...data,
          scheduled_date: new Date(data.scheduled_date),
        });
        // Cargar productos si los hay en la orden
        if (data.products) {
          setAddedProducts(data.products);
        }
      });
    }
  }, [id, getServiceOrder]);

  useEffect(() => {
    getClients();
    getServices();
    getProducts();
    getAllPersonal();
  }, []);

  useEffect(() => {
    if (formData.client_id) {
      const selectedClient = clients.find(
        (client) =>
          client.id_client.toString() === formData.client_id.toString()
      );

      if (selectedClient) {
        setFormData((prevData) => ({
          ...prevData,
          contact_phone: selectedClient.contact_cell_phone || "",
          contact_name: selectedClient.contact_name || "",
          contact_email: selectedClient.contact_email || "",
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          contact_phone: "",
          contact_name: "",
          contact_email: "",
        }));
      }
    }
  }, [formData.client_id, clients]);

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
      files: e.target.files[0],
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      scheduled_date: date,
    });
  };

  const handleAddProduct = () => {
    const product = products.find(
      (p) => p.id_product === parseInt(formData.product_id)
    );
    if (product) {
      setAddedProducts((prevProducts) => [
        ...prevProducts,
        {
          ...product,
          quantity: parseInt(formData.quantity),
          additional_info: formData.additional_info,
        },
      ]);
      // Limpiar los campos después de agregar
      setFormData((prevData) => ({
        ...prevData,
        product_id: "",
        quantity: 1,
        additional_info: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      client_id: parseInt(formData.client_id, 10),
      service_id: parseInt(formData.service_id, 10),
      personal_id: parseInt(formData.personal_id, 10),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      scheduled_date: formData.scheduled_date.toISOString().split("T")[0],
      products: addedProducts,
    };

    if (id) {
      updateServiceOrder(id, formattedData).then(() => {
        Swal.fire({
          icon: "success",
          title: "Orden de Servicio actualizada",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      createServiceOrder(formattedData).then(() => {
        Swal.fire({
          icon: "success",
          title: "Orden de Servicio creada",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };

  const handleReset = () => {
    setFormData({
      client_id: "",
      service_id: "",
      personal_id: "",
      product_id: "",
      contact_name: "",
      contact_phone: "",
      contact_email: "",
      scheduled_date: new Date(),
      start_time: "",
      end_time: "",
      price: "",
      quantity: 1,
      additional_info: "",
      activities: "",
      recomendations: "",
      files: null,
      notes: null,
      state_: "Creada",
    });
    setAddedProducts([]);
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
                    name="client_id"
                    value={formData.client_id}
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
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    readOnly
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
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    readOnly
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
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    readOnly
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
                    name="service_id"
                    value={formData.service_id}
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
                    selected={formData.scheduled_date}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    className="form-control"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHoraInicio">
                  <Form.Label>
                    <strong>Hora inicio</strong>
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHoraFin">
                  <Form.Label>
                    <strong>Hora fin</strong>
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formPrecio">
                  <Form.Label>
                    <strong>Precio *</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formProducto">
                  <Form.Label>
                    <strong>Producto *</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleChange}
                    required
                  >
                    <option>-- Selecciona un producto-- </option>
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
                <Form.Group controlId="formCantidad">
                  <Form.Label>
                    <strong>Cantidad</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formInfoAdicional">
                  <Form.Label>
                    <strong>Info Adicional</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="additional_info"
                    value={formData.additional_info}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={handleAddProduct}
                >
                  Agregar Producto
                </Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formActividades">
                  <Form.Label>
                    <strong>Actividades</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="activities"
                    value={formData.activities}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formRecomendaciones">
                  <Form.Label>
                    <strong>Recomendaciones</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="recomendations"
                    value={formData.recomendations}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formArchivos">
                  <Form.Label>
                    <strong>Archivos</strong>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="files"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formNotas">
                  <Form.Label>
                    <strong>Notas</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEstado">
                  <Form.Label>
                    <strong>Estado</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="state_"
                    value={formData.state_}
                    onChange={handleChange}
                  >
                    <option value="Creada">Creada</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Finalizada">Finalizada</option>
                    <option value="Cancelada">Cancelada</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={handleSubmit}
                >
                  {id ? "Actualizar Orden" : "Crear Orden"}
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  Limpiar
                </Button>
              </Col>
            </Row>
          </div>
          <hr />
          <p className="subtitulo">Productos Agregados</p>
          <div className="shadow p-3 mb-3 bg-body rounded">
            <Row>
              <Col>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Info Adicional</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addedProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name_}</td>
                        <td>{product.quantity}</td>
                        <td>{product.additional_info}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() =>
                              setAddedProducts((prevProducts) =>
                                prevProducts.filter((_, i) => i !== index)
                              )
                            }
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </div>
        <div className="col-3">
          <NavLink to="/servicio">
            <Button variant="outline-secondary" className="mt-4">
              Regresar
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FormularioOrdenServicio;
