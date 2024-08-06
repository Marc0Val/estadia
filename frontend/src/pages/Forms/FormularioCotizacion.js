import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useClients } from "../../context/ClientsContext";
import { useProducts } from "../../context/ProductsContext";
import FormularioClientes from "../../components/Forms/FormularioClientes";
import BotonModal from "../../components/Buttons/BotonModal";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// esquema de validacion con Yup
const validationSchema = Yup.object({
  client_id: Yup.string().required("El cliente es obligatorio"),
  quantity: Yup.number().required("La cantidad es obligatoria"),
  product_id: Yup.string().required("El producto es obligatorio"),
  price: Yup.number().required("El precio es obligatorio"),
  discount: Yup.number().required("El descuento es obligatorio"),
  iva: Yup.number().required("El impuesto es obligatorio"),
  // validity: Yup.date().required("La vigencia es obligatoria"),
  files: Yup.string().required("El archivo es obligatorio"),
  notes: Yup.string().required("Las notas son obligatorias"),
});

const FormularioCotizacion = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    client_id: "",
    contact: "",
    quantity: 1,
    product_id: "",
    price: 0,
    discount: 0,
    iva: 16,
    validity: "",
    files: "",
    notes: "",
  });

  // Contextos
  const { clients, getClients } = useClients();
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

  useEffect(() => {
    if (formData.client_id) {
      const selectedClient = clients.find(
        (client) =>
          client.id_client.toString() === formData.client_id.toString()
      );
      if (selectedClient) {
        setFormData((prevState) => ({
          ...prevState,
          contact: selectedClient.contact_name || "",
        }));
      }
    }
  }, [formData.client_id, clients]);

  useEffect(() => {
    if (formData.product_id) {
      const selectedProduct = products.find(
        (product) =>
          product.id_product.toString() === formData.product_id.toString()
      );
      if (selectedProduct) {
        setFormData((prevState) => ({
          ...prevState,
          price: selectedProduct.sale_price || 0,
        }));
      }
    }
  }, [formData.product_id, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = () => {
    const product = products.find((p) => p.id_product === formData.product_id);
    setSelectedProducts([
      ...selectedProducts,
      {
        ...product,
        quantity: formData.quantity,
        price: formData.price,
        discount: formData.discount,
        iva: formData.iva,
      },
    ]);
  };

  const calculateTotals = () => {
    let subTotal = 0;
    let totalIva = 0;
    selectedProducts.forEach((product) => {
      const productTotal = product.price * product.quantity;
      const discountAmount = (productTotal * product.discount) / 100;
      const taxableAmount = productTotal - discountAmount;
      const ivaAmount = (taxableAmount * product.iva) / 100;
      subTotal += taxableAmount;
      totalIva += ivaAmount;
    });
    return { subTotal, totalIva, total: subTotal + totalIva };
  };

  const totals = calculateTotals();

  return (
    <Formik
      initialValues={formData}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          console.log(values);
          resetForm();
        } catch (error) {
          console.error("Error al guardar la cotización:", error);
        }
      }}
    >
      {({ handleSubmit, errors, isValid, dirty, resetForm }) => (
        <Form onSubmit={handleSubmit}>
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
                        <Field
                          as="select"
                          name="client_id"
                          className={`form-select ${
                            errors.client_id ? "is-invalid" : ""
                          }`}
                        >
                          <option>Seleccione</option>
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
                      <Form.Group controlId="formContacto">
                        <Form.Label>
                          <strong>Contacto</strong>
                        </Form.Label>
                        <Field
                          type="text"
                          name="contact"
                          className={`form-control ${
                            errors.contact ? "is-invalid" : ""
                          }`}
                        />
                      </Form.Group>
                    </Col>
                  </div>
                </div>

                <div className="shadow p-3 mb-5 bg-body rounded">
                  <Row>
                    <Col>
                      <label htmlFor="quantity">
                        <strong>Cantidad *</strong>
                      </label>
                      <Field
                        type="number"
                        id="quantity"
                        name="quantity"
                        className={`form-control ${
                          errors.quantity ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="invalid-feedback"
                      />
                    </Col>
                    <Col>
                      <label htmlFor="product_id">
                        <strong>Producto *</strong>
                      </label>
                      <Field
                        as="select"
                        name="product_id"
                        className={`form-select ${
                          errors.product_id ? "is-invalid" : ""
                        }`}
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
                      </Field>
                      <ErrorMessage
                        name="product_id"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                    <Col>
                      <label htmlFor="price">
                        <strong>Precio *</strong>
                      </label>
                      <Field
                        type="number"
                        id="price"
                        name="price"
                        className={`form-control ${
                          errors.price ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="invalid-feedback"
                      />
                    </Col>
                    <Col>
                      <label htmlFor="discount">
                        <strong>Descuento *</strong>
                      </label>
                      <Field
                        type="number"
                        id="discount"
                        name="discount"
                        className={`form-control ${
                          errors.discount ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="discount"
                        component="div"
                        className="invalid-feedback"
                      />
                    </Col>
                    <Col>
                      <label htmlFor="iva">
                        <strong>Impuesto *</strong>
                      </label>
                      <Field
                        type="number"
                        id="iva"
                        name="iva"
                        className={`form-control ${
                          errors.iva ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="iva"
                        component="div"
                        className="invalid-feedback"
                      />
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
                      {/* <Form.Group controlId="formNotas">
                        <Form.Label>
                          <strong>Notas</strong>
                        </Form.Label>
                        <Field
                          as="textarea"
                          rows={3}
                          name="notes"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="notes"
                          component="div"
                          className="text-danger"
                        />
                      </Form.Group> */}
                      <label htmlFor="notes">
                        <strong>Notas *</strong>
                      </label>
                      <Field
                        as="textarea"
                        id="notes"
                        name="notes"
                        className={`form-control ${
                          errors.notes ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="invalid-feedback"
                      />
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
                      Impuestos: ${totals.totalIva.toFixed(2)}
                    </p>
                    <p className="text-center subtitulo">
                      Total: ${totals.total.toFixed(2)}
                    </p>

                    <label htmlFor="validity">
                      <strong>Vigencia *</strong>
                    </label>
                    <Field
                      type="date"
                      id="validity"
                      name="validity"
                      className={`form-control ${
                        errors.validity ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="validity"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="card-footer">
                    <div className="d-grid gap-2">
                      <Button
                        variant="info"
                        type="submit"
                        disabled={!isValid || !dirty}
                      >
                        <i className="fas fa-save"></i> Guardar Cotización
                      </Button>
                      <Button
                        variant="danger"
                        type="reset"
                        onClick={() => resetForm()}
                      >
                        <i className="fas fa-eraser"></i> Limpiar
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
        </Form>
      )}
    </Formik>
  );
};

export default FormularioCotizacion;

// import React, { useState, useEffect } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useClients } from "../../context/ClientsContext";
// import { useProducts } from "../../context/ProductsContext";
// import FormularioClientes from "../../components/Forms/FormularioClientes";
// import BotonModal from "../../components/Buttons/BotonModal";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// // esquema de validacion con Yup
// const validationSchema = Yup.object({
//   client_id: Yup.string().required("El cliente es obligatorio"),
//   quantity: Yup.number().required("La cantidad es obligatoria"),
//   product_id: Yup.string().required("El producto es obligatorio"),
//   price: Yup.number().required("El precio es obligatorio"),
//   discount: Yup.number().required("El descuento es obligatorio"),
//   iva: Yup.number().required("El impuesto es obligatorio"),
//   // validity: Yup.date().required("La vigencia es obligatoria"),
//   files: Yup.string().required("El archivo es obligatorio"),
//   notes: Yup.string().required("Las notas son obligatorias"),
// });

// const FormularioCotizacion = () => {
//   const today = new Date();
//   const [startDate, setStartDate] = useState(today);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     client_id: "",
//     contact: "",
//     quantity: 1,
//     product_id: "",
//     price: 0,
//     discount: 0,
//     iva: 16,
//     validity: "",
//     files: "",
//     notes: "",
//   });

//   // Contextos
//   const { clients, getClients } = useClients();
//   const { products, getProducts } = useProducts();

//   useEffect(() => {
//     getClients();
//     getProducts();
//   }, [getClients, getProducts]);

//   useEffect(() => {
//     if (formData.client_id) {
//       const selectedClient = clients.find(
//         (client) =>
//           client.id_client.toString() === formData.client_id.toString()
//       );
//       if (selectedClient) {
//         setFormData((prevState) => ({
//           ...prevState,
//           contact: selectedClient.contact_name || "",
//         }));
//       }
//     }
//   }, [formData.client_id, clients]);

//   useEffect(() => {
//     if (formData.product_id) {
//       const selectedProduct = products.find(
//         (product) =>
//           product.id_product.toString() === formData.product_id.toString()
//       );
//       if (selectedProduct) {
//         setFormData((prevState) => ({
//           ...prevState,
//           price: selectedProduct.sale_price || 0,
//         }));
//       }
//     }
//   }, [formData.product_id, products]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddProduct = () => {
//     const product = products.find((p) => p.id_product === formData.product_id);
//     setSelectedProducts([
//       ...selectedProducts,
//       {
//         ...product,
//         quantity: formData.quantity,
//         price: formData.price,
//         discount: formData.discount,
//         iva: formData.iva,
//       },
//     ]);
//   };

//   const calculateTotals = () => {
//     let subTotal = 0;
//     let totalIva = 0;
//     selectedProducts.forEach((product) => {
//       const productTotal = product.price * product.quantity;
//       const discountAmount = (productTotal * product.discount) / 100;
//       const taxableAmount = productTotal - discountAmount;
//       const ivaAmount = (taxableAmount * product.iva) / 100;
//       subTotal += taxableAmount;
//       totalIva += ivaAmount;
//     });
//     return { subTotal, totalIva, total: subTotal + totalIva };
//   };

//   const totals = calculateTotals();

//   return (
//     <Formik
//       initialValues={formData}
//       enableReinitialize={true}
//       validationSchema={validationSchema}
//       onSubmit={async (values, { resetForm }) => {
//         try {
//           console.log(values);
//           resetForm();
//         } catch (error) {
//           console.error("Error al guardar la cotización:", error);
//         }
//       }}
//     >
//       {({ handleSubmit, errors, isValid, dirty, resetForm }) => (
//         <Form onSubmit={handleSubmit}>
//           <div className="contenedor1 container-fluid">
//             <div className="row">
//               <div className="col-9">
//                 <div>
//                   <p className="subtitulo">
//                     <i className="fas fa-user"></i> Datos del usuario
//                   </p>
//                   <hr />
//                   <div className="shadow p-3 mb-5 bg-body rounded">
//                     <Col>
//                       <Form.Group controlId="formCliente">
//                         <Form.Label className="mx-3">
//                           <strong>Cliente: </strong>
//                         </Form.Label>
//                         <BotonModal
//                           icono="fas fa-user-plus"
//                           contenidoModal={<FormularioClientes />}
//                           titulo="Nuevo Cliente"
//                         />
//                         <Field
//                           as="select"
//                           name="client_id"
//                           className={`form-select ${
//                             errors.client_id ? "is-invalid" : ""
//                           }`}
//                         >
//                           <option>Seleccione</option>
//                           {clients.map((client) => (
//                             <option
//                               key={client.id_client}
//                               value={client.id_client}
//                             >
//                               {client.trade_name}
//                             </option>
//                           ))}
//                         </Field>
//                         <ErrorMessage
//                           name="client_id"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col>
//                       <Form.Group controlId="formContacto">
//                         <Form.Label>
//                           <strong>Contacto</strong>
//                         </Form.Label>
//                         <Field
//                           type="text"
//                           name="contact"
//                           className={`form-control ${
//                             errors.contact ? "is-invalid" : ""
//                           }`}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </div>
//                 </div>

//                 <div className="shadow p-3 mb-5 bg-body rounded">
//                   <Row>
//                     <Col>
//                       <label htmlFor="quantity">
//                         <strong>Cantidad *</strong>
//                       </label>
//                       <Field
//                         type="number"
//                         id="quantity"
//                         name="quantity"
//                         className={`form-control ${
//                           errors.quantity ? "is-invalid" : ""
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="quantity"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </Col>
//                     <Col>
//                       <label htmlFor="product_id">
//                         <strong>Producto *</strong>
//                       </label>
//                       <Field
//                         as="select"
//                         name="product_id"
//                         className={`form-select ${
//                           errors.product_id ? "is-invalid" : ""
//                         }`}
//                       >
//                         <option>Seleccione</option>
//                         {products.map((product) => (
//                           <option
//                             key={product.id_product}
//                             value={product.id_product}
//                           >
//                             {product.name_}
//                           </option>
//                         ))}
//                       </Field>
//                       <ErrorMessage
//                         name="product_id"
//                         component="div"
//                         className="text-danger"
//                       />
//                     </Col>
//                     <Col>
//                       <label htmlFor="price">
//                         <strong>Precio *</strong>
//                       </label>
//                       <Field
//                         type="number"
//                         id="price"
//                         name="price"
//                         className={`form-control ${
//                           errors.price ? "is-invalid" : ""
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="price"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </Col>
//                     <Col>
//                       <label htmlFor="discount">
//                         <strong>Descuento *</strong>
//                       </label>
//                       <Field
//                         type="number"
//                         id="discount"
//                         name="discount"
//                         className={`form-control ${
//                           errors.discount ? "is-invalid" : ""
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="discount"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </Col>
//                     <Col>
//                       <label htmlFor="iva">
//                         <strong>Impuesto *</strong>
//                       </label>
//                       <Field
//                         type="number"
//                         id="iva"
//                         name="iva"
//                         className={`form-control ${
//                           errors.iva ? "is-invalid" : ""
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="iva"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </Col>
//                     <Col>
//                       <Button
//                         variant="info"
//                         onClick={handleAddProduct}
//                         className="mt-4"
//                       >
//                         Agregar
//                       </Button>
//                     </Col>
//                   </Row>
//                 </div>
//                 <div className="shadow p-3 mb-5 bg-body rounded">
//                   <p className="subtitulo">
//                     <i className="fas fa-box"></i> Productos o Servicios
//                   </p>
//                   <hr />
//                 </div>
//                 <div className="shadow p-3 mb-5 bg-body rounded">
//                   <Row>
//                     <Col>
//                       {/* <Form.Group controlId="formNotas">
//                         <Form.Label>
//                           <strong>Notas</strong>
//                         </Form.Label>
//                         <Field
//                           as="textarea"
//                           rows={3}
//                           name="notes"
//                           className="form-control"
//                         />
//                         <ErrorMessage
//                           name="notes"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </Form.Group> */}
//                       <label htmlFor="notes">
//                         <strong>Notas *</strong>
//                       </label>
//                       <Field
//                         as="textarea"
//                         id="notes"
//                         name="notes"
//                         className={`form-control ${
//                           errors.notes ? "is-invalid" : ""
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="notes"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </Col>
//                   </Row>
//                 </div>
//               </div>
//               <div className="col-3">
//                 <div className="card">
//                   <div className="card-header">
//                     <p className="subtitulo">
//                       <i className="fas fa-file-invoice-dollar"></i> Resumen de
//                       Cotización
//                     </p>
//                   </div>
//                   <div className="card-body">
//                     <p className="text-center subtitulo">
//                       <i className="fas fa-calendar-alt"></i>{" "}
//                       {startDate.toLocaleDateString()}
//                     </p>
//                     <p className="text-center subtitulo">
//                       Subtotal: ${totals.subTotal.toFixed(2)}
//                     </p>
//                     <p className="text-center subtitulo">
//                       Impuestos: ${totals.totalIva.toFixed(2)}
//                     </p>
//                     <p className="text-center subtitulo">
//                       Total: ${totals.total.toFixed(2)}
//                     </p>

//                     <label htmlFor="validity">
//                       <strong>Vigencia *</strong>
//                     </label>
//                     <Field
//                       type="date"
//                       id="validity"
//                       name="validity"
//                       className={`form-control ${
//                         errors.validity ? "is-invalid" : ""
//                       }`}
//                     />
//                     <ErrorMessage
//                       name="validity"
//                       component="div"
//                       className="invalid-feedback"
//                     />
//                   </div>
//                   <div className="card-footer">
//                     <div className="d-grid gap-2">
//                       <Button
//                         variant="info"
//                         type="submit"
//                         disabled={!isValid || !dirty}
//                       >
//                         <i className="fas fa-save"></i> Guardar Cotización
//                       </Button>
//                       <Button
//                         variant="danger"
//                         type="reset"
//                         onClick={() => resetForm()}
//                       >
//                         <i className="fas fa-eraser"></i> Limpiar
//                       </Button>
//                       <NavLink to="/admin/cotizaciones">
//                         <Button variant="secondary">Volver</Button>
//                       </NavLink>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default FormularioCotizacion;
