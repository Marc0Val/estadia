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
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    scheduled_date: new Date(),
    start_time: "",
    end_time: "",
    price: "",
    activities: "",
    recomendations: "",
    files: null,
    notes: "",
    state_: "Creada",
    products: [],
    quantity: 1,
  });

  // Nuevo estado para productos agregados
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      getServiceOrder(id).then((data) => {
        // console.log("Datos de la orden de servicio:", data);

        setFormData({
          ...data,
          scheduled_date: new Date(data.scheduled_date),
          quantity: 1,
        });

        // Manejo de productos
        if (typeof data.products === "string" && data.products) {
          try {
            const productsArray = JSON.parse(data.products);
            if (Array.isArray(productsArray)) {
              console.log("Productos cargados (array):", productsArray);
              setAddedProducts(productsArray);
            } else {
              console.log("El contenido de data.products no es un array.");
              setAddedProducts([]);
            }
          } catch (error) {
            console.error("Error al parsear data.products:", error);
            setAddedProducts([]);
          }
        } else if (Array.isArray(data.products)) {
          console.log("Productos cargados (array):", data.products);
          setAddedProducts(data.products);
        } else {
          setAddedProducts([]); // Maneja productos como un array vacío si no hay datos
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

  /*   const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: e.target.files[0],
    });
  };
 */
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
          name_: product.name_, // Solo el nombre del producto
          quantity: parseInt(formData.quantity), // Solo la cantidad
          additional_info: formData.additional_info, // Solo la información adicional
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
      scheduled_date: formData.scheduled_date.toISOString().split("T")[0],
      products: addedProducts,
    };

    console.log("Datos a enviar:", formattedData);

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
      contact_name: "",
      contact_phone: "",
      contact_email: "",
      scheduled_date: new Date(),
      start_time: "",
      end_time: "",
      price: "",
      quantity: 1,
      activities: "",
      recomendations: "",
      files: null,
      notes: null,
      state_: "Creada",
      products: [],
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
                    name="start_time"
                    value={formData.start_time}
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
                    name="end_time"
                    value={formData.end_time}
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
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formPersonalAsignado">
                  <Form.Label>
                    <strong>Personal Asignado</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="personal_id"
                    value={formData.personal_id}
                    onChange={handleChange}
                  >
                    <option value="">-- Selecciona un personal --</option>
                    {personal.map((person) => (
                      <option
                        key={person.id_personal}
                        value={person.id_personal}
                      >
                        {person.name_}
                      </option>
                    ))}
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
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
              <Form.Control
                as="select"
                name="product_id"
                value={formData.product_id}
                onChange={handleChange}
              >
                <option>-- Productos Disponibles --</option>
                {products.map((product) => (
                  <option key={product.id_product} value={product.id_product}>
                    {product.name_}
                  </option>
                ))}
              </Form.Control>
              <Button
                variant="primary"
                className="mt-4"
                onClick={handleAddProduct}
              >
                Agregar
              </Button>
            </InputGroup>
            <Form.Group controlId="formInformacionAdicional" className="mb-3">
              <Form.Label>
                <strong>Información adicional</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="additional_info"
                value={formData.additional_info}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="shadow p-3 mb-3 bg-body rounded">
            <p className="subtitulo">
              <i className="fas fa-box-open"></i>Productos - Refacciones -
              Materiales para servicio
            </p>
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
                      {Array.isArray(addedProducts) &&
                        addedProducts.map((product, index) => (
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
                  name="activities"
                  value={formData.activities}
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
                  name="recomendations"
                  value={formData.recomendations}
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
                {formData.scheduled_date.toDateString()}
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
                      name="state_"
                      value={formData.state_}
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
                  name="notes"
                  value={formData.notes}
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
