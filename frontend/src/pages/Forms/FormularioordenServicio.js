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
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  client_id: Yup.string().required("Este campo es obligatorio"),
  contact_id: Yup.string().required("Este campo es obligatorio"),
  service_id: Yup.string().required("Este campo es obligatorio"),
  personal_id: Yup.string().required("Este campo es obligatorio"),
  scheduled_date: Yup.date().required("Este campo es obligatorio"),
  start_time: Yup.string().required("Este campo es obligatorio"),
  end_time: Yup.string().required("Este campo es obligatorio"),
  price: Yup.number().required("Este campo es obligatorio"),
  quantity: Yup.number().required("Este campo es obligatorio"),
  product_id: Yup.string().required("Este campo es obligatorio"),
  additional_info: Yup.string().required("Este campo es obligatorio"),
  activities: Yup.string().required("Este campo es obligatorio"),
  recomendations: Yup.string().required("Este campo es obligatorio"),
  // files: Yup.string().required("Este campo es obligatorio"),
  notes: Yup.string().required("Este campo es obligatorio"),
});

const FormularioOrdenServicio = ({ id_orden_servicio }) => {
  const { getServiceOrderById, createServiceOrder, updateServiceOrder } =
    useServiceOrders();
  const { getClients, clients } = useClients();
  const { getServices, services } = useServices();
  const { getProducts, products } = useProducts();

  const [formData, setFormData] = useState({
    client_id: "",
    contact_id: "",
    service_id: "",
    scheduled_date: new Date(),
    start_time: "",
    end_time: "",
    price: "",
    personal_id: "",
    quantity: 1,
    product_id: "",
    activities: "",
    recomendations: "",
    // files: null,
    notes: "",
    satisfaction_level: "",
    address: "",
    status: "Creada",
  });

  useEffect(() => {
    if (id_orden_servicio) {
      getServiceOrderById(id_orden_servicio).then((data) => {
        setFormData({
          ...data,
          scheduled_date: new Date(data.scheduled_date),
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
    if (formData.client_id) {
      console.log(formData.client_id);
      const selectedClient = clients.find(
        (client) =>
          client.id_client.toString() === formData.client_id.toString()
      );

      if (selectedClient) {
        setFormData((prevData) => ({
          ...prevData,
          contact_id: selectedClient.contact_id || "",
        }));
      } else {
        console.log("Cliente no encontrado:", formData.client_id);
        setFormData((prevData) => ({
          ...prevData,
          contact_id: "",
        }));
      }
    }
  }, [formData.client_id]);

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

  const handleSubmit = (values) => {
    if (id_orden_servicio) {
      updateServiceOrder(id_orden_servicio, values).then(() => {
        console.log("Orden de servicio actualizada:", values);
      });
    } else {
      createServiceOrder(values).then(() => {
        console.log("Orden de servicio creada:", values);
      });
    }
  };

  const handleReset = () => {
    setFormData({
      client_id: "",
      contact_id: "",
      service_id: "",
      scheduled_date: new Date(),
      start_time: "",
      end_time: "",
      price: "",
      personal_id: "",
      quantity: 1,
      product_id: "",
      activities: "",
      recomendations: "",
      // files: null,
      notes: "",
      satisfaction_level: "",
      address: "",
      status: "Creada",
    });
  };

  return (
    <Formik
      initialValues={formData}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (id_orden_servicio) {
            await updateServiceOrder(id_orden_servicio, values);
            Swal.fire({
              icon: "success",
              title: "Orden de servicio actualizada",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            await createServiceOrder(values);
            Swal.fire({
              icon: "success",
              title: "Orden de servicio creada",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al guardar la orden de servicio",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }}
    >
      {({ errors, isValid, dirty, resetForm }) => (
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
                      <Field
                        as="select"
                        name="client_id"
                        value={formData.client_id}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.client_id ? "is-invalid" : ""
                        }`}
                      >
                        <option>-- Selecciona un cliente-- </option>
                        {clients.map((client) => (
                          <option
                            key={client.id_client}
                            value={client.id_client}
                          >
                            {client.trade_name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="client_id"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <label htmlFor="cellphone">
                      <strong>Celular</strong>
                    </label>
                    <Field
                      type="text"
                      id="cellphone"
                      name="cellphone"
                      className="form-control"
                    />
                  </Col>
                  <Col>
                    <label htmlFor="contact_id">
                      <strong>Contacto</strong>
                    </label>
                    <Field
                      type="text"
                      id="contact_id"
                      name="contact_id"
                      className="form-control"
                    />
                  </Col>
                  <Col>
                    {/* <label htmlFor="email">
                      <strong>Email</strong>
                    </label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                    /> */}
                    {/* entrada para servicio */}
                    <Form.Group controlId="formServicio">
                      <Form.Label>
                        <strong>Servicio *</strong>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="service_id"
                        value={formData.service_id}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.service_id ? "is-invalid" : ""
                        }
                      `}
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
                      <ErrorMessage
                        name="service_id"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  {/* <Col></Col> */}
                  <Col>
                    <label htmlFor="scheduled_date">
                      <strong>Fecha de programación *</strong>
                    </label>
                    <DatePicker
                      selected={formData.scheduled_date}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      className={`form-control ${
                        errors.scheduled_date ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="scheduled_date"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col>
                    <label htmlFor="start_time">
                      <strong>Inicio *</strong>
                    </label>
                    <Field
                      type="time"
                      id="start_time"
                      name="start_time"
                      className={`form-control ${
                        errors.start_time ? "is-invalid" : ""
                      }`}
                    />

                    <ErrorMessage
                      name="start_time"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col>
                    <label htmlFor="end_time">
                      <strong>Fin *</strong>
                    </label>
                    <Field
                      type="time"
                      id="end_time"
                      name="end_time"
                      className={`form-control ${
                        errors.end_time ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="end_time"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col>
                    <label htmlFor="price">
                      <strong>Precio $</strong>
                    </label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      }`}
                    />
                  </Col>
                  <Col>
                    <label htmlFor="personal_id">
                      <strong>Personal Asignado</strong>
                    </label>
                    <Field
                      as="select"
                      name="personal_id"
                      value={formData.personal_id}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.personal_id ? "is-invalid" : ""
                      }`}
                    >
                      <option>-- Selecciona un personal-- </option>
                      <option>Personal 1</option>
                      <option>Personal 2</option>
                      <option>Personal 3</option>
                    </Field>
                    <ErrorMessage
                      name="personal_id"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
              </div>
              <div className="shadow p-3 mb-3 bg-body rounded">
                <InputGroup className="mb-3">
                  <label htmlFor="quantity">
                    <strong>Cantidad</strong>
                  </label>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    className={`form-control ${
                      errors.quantity ? "is-invalid" : ""
                    }`}
                  />
                  <label htmlFor="product_id">
                    <strong>Producto</strong>
                  </label>
                  <Field
                    as="select"
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.product_id ? "is-invalid" : ""
                    }`}
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
                  </Field>
                  <ErrorMessage
                    name="product_id"
                    component="div"
                    className="text-danger"
                  />
                  <Button variant="primary">Agregar</Button>
                </InputGroup>
                <label htmlFor="additional_info">
                  <strong>Información adicional</strong>
                </label>
                <Field
                  as="textarea"
                  rows={3}
                  id="additional_info"
                  name="additional_info"
                  className={`form-control ${
                    errors.additional_info ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="additional_info"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="shadow p-3 mb-5 bg-body rounded">
                <Col>
                  <label htmlFor="activities">
                    <strong>Actividades</strong>
                  </label>

                  <Field
                    as="textarea"
                    rows={3}
                    id="activities"
                    name="activities"
                    className={`form-control ${
                      errors.activities ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="activities"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col>
                  <label htmlFor="recomendations">
                    <strong>Recomendaciones</strong>
                  </label>
                  <Field
                    as="textarea"
                    rows={3}
                    id="recomendations"
                    name="recomendations"
                    className={`form-control ${
                      errors.recomendations ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="recomendations"
                    component="div"
                    className="text-danger"
                  />
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
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option>Creada</option>
                          <option>Asignada</option>
                          <option>Proceso</option>
                          <option>Terminada</option>
                          <option>Facturada</option>
                        </Form.Control>
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="text-danger"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-grid gap-2">
                    <Button
                      variant="info"
                      type="submit"
                      disabled={!isValid || !dirty}
                    >
                      <i className="fas fa-save"></i> Guardar
                    </Button>
                    <Button
                      variant="danger"
                      type="button"
                      className="mt-2"
                      onClick={() => handleReset()}
                    >
                      <i className="fas fa-eraser"></i> Limpiar
                    </Button>

                    <NavLink
                      to="/admin/ordenes-servicio"
                      className="btn btn-outline-secondary"
                    >
                      <i className="fas fa-arrow-left"></i> Regresar
                    </NavLink>
                  </div>
                </div>
                <div class="card-footer">
                  <label htmlFor="notes">
                    <strong>Notas</strong>
                  </label>
                  <Field
                    as="textarea"
                    rows={3}
                    id="notes"
                    name="notes"
                    className={`form-control ${
                      errors.notes ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FormularioOrdenServicio;

// import React, { useState, useEffect } from "react";
// import {
//   Form,
//   Button,
//   Row,
//   Col,
//   Container,
//   InputGroup,
//   FormControl,
// } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import FormularioClientes from "../../components/Forms/FormularioClientes";
// import BotonModal from "../../components/Buttons/BotonModal";
// import { useServiceOrders } from "../../context/ServiceOrdersContext";
// import { useClients } from "../../context/ClientsContext";
// import { useServices } from "../../context/ServicesContext";
// import { useProducts } from "../../context/ProductsContext";
// import Swal from "sweetalert2";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// // Esquema de validación con Yup
// const validationSchema = Yup.object().shape({
//   client_id: Yup.string().required("Este campo es obligatorio"),
//   contact_id: Yup.string().required("Este campo es obligatorio"),
//   service_id: Yup.string().required("Este campo es obligatorio"),
//   personal_id: Yup.string().required("Este campo es obligatorio"),
//   scheduled_date: Yup.date().required("Este campo es obligatorio"),
//   start_time: Yup.string().required("Este campo es obligatorio"),
//   end_time: Yup.string().required("Este campo es obligatorio"),
//   price: Yup.number().required("Este campo es obligatorio"),
//   quantity: Yup.number().required("Este campo es obligatorio"),
//   product_id: Yup.string().required("Este campo es obligatorio"),
//   additional_info: Yup.string().required("Este campo es obligatorio"),
//   activities: Yup.string().required("Este campo es obligatorio"),
//   recomendations: Yup.string().required("Este campo es obligatorio"),
//   // files: Yup.string().required("Este campo es obligatorio"),
//   notes: Yup.string().required("Este campo es obligatorio"),
// });

// const FormularioOrdenServicio = ({ id_orden_servicio }) => {
//   const { getServiceOrderById, createServiceOrder, updateServiceOrder } =
//     useServiceOrders();
//   const { getClients, clients } = useClients();
//   const { getServices, services } = useServices();
//   const { getProducts, products } = useProducts();

//   const [formData, setFormData] = useState({
//     client_id: "",
//     contact_id: "",
//     service_id: "",
//     scheduled_date: new Date(),
//     start_time: "",
//     end_time: "",
//     price: "",
//     personal_id: "",
//     quantity: 1,
//     product_id: "",
//     activities: "",
//     recomendations: "",
//     // files: null,
//     notes: "",
//     satisfaction_level: "",
//     address: "",
//     status: "Creada",
//   });

//   useEffect(() => {
//     if (id_orden_servicio) {
//       getServiceOrderById(id_orden_servicio).then((data) => {
//         setFormData({
//           ...data,
//           scheduled_date: new Date(data.scheduled_date),
//         });
//       });
//     }
//   }, [id_orden_servicio, getServiceOrderById]);

//   useEffect(() => {
//     getClients();
//     getServices();
//     getProducts();
//   }, []);

//   useEffect(() => {
//     if (formData.client_id) {
//       console.log(formData.client_id);
//       const selectedClient = clients.find(
//         (client) =>
//           client.id_client.toString() === formData.client_id.toString()
//       );

//       if (selectedClient) {
//         setFormData((prevData) => ({
//           ...prevData,
//           contact_id: selectedClient.contact_id || "",
//         }));
//       } else {
//         console.log("Cliente no encontrado:", formData.client_id);
//         setFormData((prevData) => ({
//           ...prevData,
//           contact_id: "",
//         }));
//       }
//     }
//   }, [formData.client_id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       files: e.target.files[0],
//     });
//   };

//   const handleDateChange = (date) => {
//     setFormData({
//       ...formData,
//       scheduled_date: date,
//     });
//   };

//   const handleSubmit = (values) => {
//     if (id_orden_servicio) {
//       updateServiceOrder(id_orden_servicio, values).then(() => {
//         console.log("Orden de servicio actualizada:", values);
//       });
//     } else {
//       createServiceOrder(values).then(() => {
//         console.log("Orden de servicio creada:", values);
//       });
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       client_id: "",
//       contact_id: "",
//       service_id: "",
//       scheduled_date: new Date(),
//       start_time: "",
//       end_time: "",
//       price: "",
//       personal_id: "",
//       quantity: 1,
//       product_id: "",
//       activities: "",
//       recomendations: "",
//       // files: null,
//       notes: "",
//       satisfaction_level: "",
//       address: "",
//       status: "Creada",
//     });
//   };

//   return (
//     <Formik
//       initialValues={formData}
//       enableReinitialize={true}
//       validationSchema={validationSchema}
//       onSubmit={async (values, { resetForm }) => {
//         try {
//           if (id_orden_servicio) {
//             await updateServiceOrder(id_orden_servicio, values);
//             Swal.fire({
//               icon: "success",
//               title: "Orden de servicio actualizada",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           } else {
//             await createServiceOrder(values);
//             Swal.fire({
//               icon: "success",
//               title: "Orden de servicio creada",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           }
//           resetForm();
//         } catch (error) {
//           Swal.fire({
//             icon: "error",
//             title: "Error al guardar la orden de servicio",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         }
//       }}
//     >
//       {({ errors, isValid, dirty, resetForm }) => (
//         <div className="contenedor1 container-fluid">
//           <div className="row">
//             <div className="col-9">
//               <p className="subtitulo">Datos Generales</p>
//               <hr />
//               <div className="shadow p-3 mb-3 bg-body rounded">
//                 <Row className="mb-3">
//                   <Col>
//                     <Form.Group controlId="formCliente">
//                       <Form.Label>
//                         <div className="d-flex">
//                           <div className="mx-3">
//                             <strong>Cliente:</strong>
//                           </div>
//                           <BotonModal
//                             icono="fas fa-user-plus"
//                             contenidoModal={<FormularioClientes />}
//                             titulo={"Agregar Cliente"}
//                           />
//                         </div>
//                       </Form.Label>
//                       <Field
//                         as="select"
//                         name="client_id"
//                         value={formData.client_id}
//                         onChange={handleChange}
//                         className={`form-control ${
//                           errors.client_id ? "is-invalid" : ""
//                         }`}
//                       >
//                         <option>-- Selecciona un cliente-- </option>
//                         {clients.map((client) => (
//                           <option
//                             key={client.id_client}
//                             value={client.id_client}
//                           >
//                             {client.trade_name}
//                           </option>
//                         ))}
//                       </Field>
//                       <ErrorMessage
//                         name="client_id"
//                         component="div"
//                         className="text-danger"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <label htmlFor="cellphone">
//                       <strong>Celular</strong>
//                     </label>
//                     <Field
//                       type="text"
//                       id="cellphone"
//                       name="cellphone"
//                       className="form-control"
//                     />
//                   </Col>
//                   <Col>
//                     <label htmlFor="contact_id">
//                       <strong>Contacto</strong>
//                     </label>
//                     <Field
//                       type="text"
//                       id="contact_id"
//                       name="contact_id"
//                       className="form-control"
//                     />
//                   </Col>
//                   <Col>
//                     {/* <label htmlFor="email">
//                       <strong>Email</strong>
//                     </label>
//                     <Field
//                       type="text"
//                       id="email"
//                       name="email"
//                       className="form-control"
//                     /> */}
//                     {/* entrada para servicio */}
//                     <Form.Group controlId="formServicio">
//                       <Form.Label>
//                         <strong>Servicio *</strong>
//                       </Form.Label>
//                       <Form.Control
//                         as="select"
//                         name="service_id"
//                         value={formData.service_id}
//                         onChange={handleChange}
//                         className={`form-control ${
//                           errors.service_id ? "is-invalid" : ""
//                         }
//                       `}
//                       >
//                         <option>-- Selecciona un servicio-- </option>
//                         {services.map((service) => (
//                           <option
//                             key={service.id_service}
//                             value={service.id_service}
//                           >
//                             {service.name_}
//                           </option>
//                         ))}
//                       </Form.Control>
//                       <ErrorMessage
//                         name="service_id"
//                         component="div"
//                         className="text-danger"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   {/* <Col></Col> */}
//                   <Col>
//                     <label htmlFor="scheduled_date">
//                       <strong>Fecha de programación *</strong>
//                     </label>
//                     <DatePicker
//                       selected={formData.scheduled_date}
//                       onChange={handleDateChange}
//                       dateFormat="dd/MM/yyyy"
//                       className={`form-control ${
//                         errors.scheduled_date ? "is-invalid" : ""
//                       }`}
//                     />
//                     <ErrorMessage
//                       name="scheduled_date"
//                       component="div"
//                       className="text-danger"
//                     />
//                   </Col>
//                   <Col>
//                     <label htmlFor="start_time">
//                       <strong>Inicio *</strong>
//                     </label>
//                     <Field
//                       type="time"
//                       id="start_time"
//                       name="start_time"
//                       className={`form-control ${
//                         errors.start_time ? "is-invalid" : ""
//                       }`}
//                     />

//                     <ErrorMessage
//                       name="start_time"
//                       component="div"
//                       className="text-danger"
//                     />
//                   </Col>
//                   <Col>
//                     <label htmlFor="end_time">
//                       <strong>Fin *</strong>
//                     </label>
//                     <Field
//                       type="time"
//                       id="end_time"
//                       name="end_time"
//                       className={`form-control ${
//                         errors.end_time ? "is-invalid" : ""
//                       }`}
//                     />
//                     <ErrorMessage
//                       name="end_time"
//                       component="div"
//                       className="text-danger"
//                     />
//                   </Col>
//                   <Col>
//                     <label htmlFor="price">
//                       <strong>Precio $</strong>
//                     </label>
//                     <Field
//                       type="number"
//                       id="price"
//                       name="price"
//                       className={`form-control ${
//                         errors.price ? "is-invalid" : ""
//                       }`}
//                     />
//                   </Col>
//                   <Col>
//                     <label htmlFor="personal_id">
//                       <strong>Personal Asignado</strong>
//                     </label>
//                     <Field
//                       as="select"
//                       name="personal_id"
//                       value={formData.personal_id}
//                       onChange={handleChange}
//                       className={`form-control ${
//                         errors.personal_id ? "is-invalid" : ""
//                       }`}
//                     >
//                       <option>-- Selecciona un personal-- </option>
//                       <option>Personal 1</option>
//                       <option>Personal 2</option>
//                       <option>Personal 3</option>
//                     </Field>
//                     <ErrorMessage
//                       name="personal_id"
//                       component="div"
//                       className="text-danger"
//                     />
//                   </Col>
//                 </Row>
//               </div>
//               <div className="shadow p-3 mb-3 bg-body rounded">
//                 <InputGroup className="mb-3">
//                   <label htmlFor="quantity">
//                     <strong>Cantidad</strong>
//                   </label>
//                   <Field
//                     type="number"
//                     id="quantity"
//                     name="quantity"
//                     className={`form-control ${
//                       errors.quantity ? "is-invalid" : ""
//                     }`}
//                   />
//                   <label htmlFor="product_id">
//                     <strong>Producto</strong>
//                   </label>
//                   <Field
//                     as="select"
//                     name="product_id"
//                     value={formData.product_id}
//                     onChange={handleChange}
//                     className={`form-control ${
//                       errors.product_id ? "is-invalid" : ""
//                     }`}
//                   >
//                     <option>-- Selecciona un producto-- </option>
//                     {products.map((product) => (
//                       <option
//                         key={product.id_product}
//                         value={product.id_product}
//                       >
//                         {product.name_}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="product_id"
//                     component="div"
//                     className="text-danger"
//                   />
//                   <Button variant="primary">Agregar</Button>
//                 </InputGroup>
//                 <label htmlFor="additional_info">
//                   <strong>Información adicional</strong>
//                 </label>
//                 <Field
//                   as="textarea"
//                   rows={3}
//                   id="additional_info"
//                   name="additional_info"
//                   className={`form-control ${
//                     errors.additional_info ? "is-invalid" : ""
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="additional_info"
//                   component="div"
//                   className="text-danger"
//                 />
//               </div>
//               <div className="shadow p-3 mb-5 bg-body rounded">
//                 <Col>
//                   <label htmlFor="activities">
//                     <strong>Actividades</strong>
//                   </label>

//                   <Field
//                     as="textarea"
//                     rows={3}
//                     id="activities"
//                     name="activities"
//                     className={`form-control ${
//                       errors.activities ? "is-invalid" : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="activities"
//                     component="div"
//                     className="text-danger"
//                   />
//                 </Col>
//                 <Col>
//                   <label htmlFor="recomendations">
//                     <strong>Recomendaciones</strong>
//                   </label>
//                   <Field
//                     as="textarea"
//                     rows={3}
//                     id="recomendations"
//                     name="recomendations"
//                     className={`form-control ${
//                       errors.recomendations ? "is-invalid" : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="recomendations"
//                     component="div"
//                     className="text-danger"
//                   />
//                 </Col>
//               </div>
//             </div>
//             <div className="col-3">
//               <div class="card">
//                 <div className="card-header">
//                   <p className="subtitulo">Orden de Servicio</p>
//                 </div>
//                 <div class="card-body">
//                   <p className="text-center subtitulo">
//                     <i className="fas fa-calendar-alt"></i>
//                     {formData.scheduled_date.toDateString()}
//                   </p>
//                   <p className="text-center">
//                     <i className="fas fa-tasks"></i>Estado
//                   </p>
//                   <Row className="mb-3">
//                     <Col>
//                       <Form.Group controlId="formEstado">
//                         <Form.Label>
//                           <strong>Estado</strong>
//                         </Form.Label>
//                         <Form.Control
//                           as="select"
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                         >
//                           <option>Creada</option>
//                           <option>Asignada</option>
//                           <option>Proceso</option>
//                           <option>Terminada</option>
//                           <option>Facturada</option>
//                         </Form.Control>
//                         <ErrorMessage
//                           name="status"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <div className="d-grid gap-2">
//                     <Button
//                       variant="info"
//                       type="submit"
//                       disabled={!isValid || !dirty}
//                     >
//                       <i className="fas fa-save"></i> Guardar
//                     </Button>
//                     <Button
//                       variant="danger"
//                       type="button"
//                       className="mt-2"
//                       onClick={() => handleReset()}
//                     >
//                       <i className="fas fa-eraser"></i> Limpiar
//                     </Button>

//                     <NavLink
//                       to="/admin/ordenes-servicio"
//                       className="btn btn-outline-secondary"
//                     >
//                       <i className="fas fa-arrow-left"></i> Regresar
//                     </NavLink>
//                   </div>
//                 </div>
//                 <div class="card-footer">
//                   <label htmlFor="notes">
//                     <strong>Notas</strong>
//                   </label>
//                   <Field
//                     as="textarea"
//                     rows={3}
//                     id="notes"
//                     name="notes"
//                     className={`form-control ${
//                       errors.notes ? "is-invalid" : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="notes"
//                     component="div"
//                     className="text-danger"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Formik>
//   );
// };

// export default FormularioOrdenServicio;
