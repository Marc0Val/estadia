import React, { useState } from "react";
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
import FormularioProveedores from "../../components/Forms/FormularioProveedores";
import BotonModal from "../../components/Buttons/BotonModal";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validación con Yup
const validationSchema = Yup.object({
  supplier_id: Yup.string().required("El proveedor es obligatorio"),
  product_id: Yup.string().required("El producto es obligatorio"),
  quantity: Yup.number().required("La cantidad es obligatoria"),
  price: Yup.number().required("El precio es obligatorio"),
  iva: Yup.number().required("El impuesto es obligatorio"),
  validity: Yup.date().required("La vigencia es obligatoria"),
  // files: Yup.string().required("El archivo es obligatorio"),
  notes: Yup.string().required("Las notas son obligatorias"),
});

const FormularioOrdenCompra = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [formData, setFormData] = useState({
    supplier_id: "",
    contact: "",
    product_id: "",
    quantity: 1,
    price: 0,
    iva: 16,
    validity: new Date(today.setDate(today.getDate() + 7)),
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      validity: date,
    });
  };

  const handleSubmit = (values) => {};

  const handleReset = () => {
    setFormData({
      supplier_id: "",
      contact: "",
      product_id: "",
      quantity: 1,
      price: 0,
      iva: 16,
      validity: new Date(today.setDate(today.getDate() + 7)),
      notes: "",
    });
  };

  return (
    <Formik
      intialValues={formData}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {({ errors, isValid, dirtty, resetForm }) => (
        <div className="contenedor1 container-fluid">
          <div className="row">
            <div className="col-9">
              <p className="subtitulo">
                <i className="fas fa-user"></i> Datos generales
              </p>
              <hr />
              <div className="shadow p-3 mb-3 bg-body rounded">
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formProveedor">
                      <Form.Label className="mx-3">
                        <strong>Proveedor:</strong>
                      </Form.Label>
                      <BotonModal
                        icono="fas fa-plus"
                        contenidoModal={<FormularioProveedores />}
                        titulo="Agregar Proveedor"
                      />
                      <Field
                        as="select"
                        id="supplier_id"
                        name="supplier_id"
                        // value={values.supplier_id}
                        className={`form-select ${
                          errors.supplier_id ? "is-invalid" : "is-valid"
                        }`}
                      >
                        <option>Seleccione</option>
                        {/* ejemplo */}
                        <option>Proveedor</option>
                      </Field>
                      <ErrorMessage
                        name="supplier_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <label htmlFor="contact">
                      <strong>Contacto</strong>
                    </label>
                    <Field
                      type="text"
                      id="contact"
                      name="contact"
                      // value={values.contact}
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <InputGroup>
                      <label htmlFor="quantity">
                        <strong>Cantidad</strong>
                      </label>

                      <Field
                        type="number"
                        min="1"
                        name="quantity"
                        // value={values.quantity}
                        className={`form-control ${
                          errors.quantity ? "is-invalid" : "is-valid"
                        }`}
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <label htmlFor="price">
                        <strong>Precio</strong>
                      </label>
                      <Field
                        type="number"
                        name="price"
                        // value={values.price}
                        className={`form-control ${
                          errors.price ? "is-invalid" : "is-valid"
                        }`}
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <label htmlFor="iva">
                        <strong>Impuestos</strong>
                      </label>
                      <Field
                        type="number"
                        name="iva"
                        // value={values.iva}
                        className={`form-control ${
                          errors.iva ? "is-invalid" : "is-valid"
                        }`}
                      />
                      <ErrorMessage
                        name="iva"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <InputGroup>
                      <Field
                        as="select"
                        name="product_id"
                        // value={values.product_id}
                        className="form-control"
                      >
                        <option>Producto o servicio</option>
                        {/* ejemplo */}
                        <option>Producto 1</option>
                      </Field>
                      <Field
                        type="text"
                        placeholder="Costo $"
                        name="price"
                        // value={values.price}

                        className="form-control"
                      />
                      <Field
                        type="number"
                        placeholder="Impuestos %"
                        name="iva"
                        // value={values.iva}
                        className="form-control"
                      />
                      <Button variant="primary">Agregar</Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
              <div className="shadow p-3 mb-3 bg-body rounded">
                <p className="subtitulo">
                  <i className="fas fa-box-open"></i> Productos o servicios
                </p>
                <hr />
              </div>
              {/* <div className="shadow p-3 mb-5 bg-body rounded">
            <Form.Group controlId="formObservaciones" className="mb-3">
              <Form.Label>
                <strong>
                  Este texto aparecerá arriba de los precios
                </strong>
              </Form.Label>
              <Field
                as="textarea"
                rows={3}
                name="observaciones"
                value={values.observaciones}
                className="form-control"
              />
              <ErrorMessage
                name="observaciones"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>
            <Form.Group controlId="formTerminos" className="mb-3">
              <Form.Label>
                <strong>
                  Términos y condiciones (puedes agregar tus datos
                  bancarios para pago)
                </strong>
              </Form.Label>
              <Field
                as="textarea"
                rows={3}
                name="terminos"
                value={values.terminos}
                className="form-control"
              />
              <ErrorMessage
                name="terminos"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>
          </div> */}
            </div>
            <div className="col-3">
              <div className="card">
                <div className="card-header">
                  <p className="subtitulo">
                    <i className="fas fa-file-invoice-dollar"></i> RESUMEN ORDEN
                    DE COMPRA
                  </p>
                </div>
                <div className="card-body">
                  <p className="text-center subtitulo">
                    <i className="fas fa-calendar-alt"></i>{" "}
                    {startDate.toLocaleDateString()}
                  </p>
                  <p className="text-center subtitulo">Sub Total: $0.00</p>
                  <p className="text-center subtitulo">Impuestos: $0.00</p>
                  <p className="text-center subtitulo">Total: $0.00</p>

                  {/* <Form.Group controlId="formVigencia" className="mb-3">
                <Form.Label>
                  
                  <p className="text-center subtitulo">
                    <i className="fas fa-calendar-alt"></i> Vencimiento*
                  </p>
                </Form.Label>
                <DatePicker
                  selected={values.validity}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
                <ErrorMessage
                  name="validity"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group> */}
                  <label htmlFor="validity">
                    <strong>Vigencia</strong>
                  </label>
                  <DatePicker
                    // selected={values.validity}

                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className={`form-control ${
                      errors.validity ? "is-invalid" : "is-valid"
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
                      disabled={!isValid || !dirtty}
                    >
                      <i className="fas fa-save"></i> Generar Orden
                    </Button>
                    <Button variant="danger" type="reset" onClick={handleReset}>
                      <i className="fas fa-eraser"></i> Limpiar
                    </Button>
                    <NavLink
                      to="/admin/ordenes-de-compra"
                      className="btn btn-outline-secondary"
                    >
                      <i className="fas fa-arrow-left"></i> Regresar
                    </NavLink>
                  </div>
                  {/* <Form.Group controlId="formArchivo" className="mb-3">
                <Form.Label>
                  <strong>Archivos</strong>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="archivo"
                  onChange={handleFile
                />
              </Form.Group> */}
                  {/* <Form.Group controlId="formNotas" className="mb-3">
                <Form.Label>
                  <strong>Notas</strong>
                </Form.Label>
                <Field
                  as="textarea"
                  rows={3}
                  name="notes"
                  value={values.notes}
                  className="form-control"
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group> */}
                  <label htmlFor="notes">
                    <strong>Notas</strong>
                  </label>
                  <Field
                    as="textarea"
                    rows={3}
                    name="notes"
                    // value={values.notes}
                    className={`form-control ${
                      errors.notes ? "is-invalid" : "is-valid"
                    }`}
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="invalid-feedback"
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

export default FormularioOrdenCompra;

// import React, { useState } from "react";
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
// import FormularioProveedores from "../../components/Forms/FormularioProveedores";
// import BotonModal from "../../components/Buttons/BotonModal";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// // Validación con Yup
// const validationSchema = Yup.object({
//   supplier_id: Yup.string().required("El proveedor es obligatorio"),
//   product_id: Yup.string().required("El producto es obligatorio"),
//   quantity: Yup.number().required("La cantidad es obligatoria"),
//   price: Yup.number().required("El precio es obligatorio"),
//   iva: Yup.number().required("El impuesto es obligatorio"),
//   validity: Yup.date().required("La vigencia es obligatoria"),
//   // files: Yup.string().required("El archivo es obligatorio"),
//   notes: Yup.string().required("Las notas son obligatorias"),
// });

// const FormularioOrdenCompra = () => {
//   const today = new Date();
//   const [startDate, setStartDate] = useState(today);
//   const [formData, setFormData] = useState({
//     supplier_id: "",
//     contact: "",
//     product_id: "",
//     quantity: 1,
//     price: 0,
//     iva: 16,
//     validity: new Date(today.setDate(today.getDate() + 7)),
//     notes: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleDateChange = (date) => {
//     setFormData({
//       ...formData,
//       validity: date,
//     });
//   };

//   const handleSubmit = (values) => {};

//   const handleReset = () => {
//     setFormData({
//       supplier_id: "",
//       contact: "",
//       product_id: "",
//       quantity: 1,
//       price: 0,
//       iva: 16,
//       validity: new Date(today.setDate(today.getDate() + 7)),
//       notes: "",
//     });
//   };

//   return (
//     <Formik
//       intialValues={formData}
//       validationSchema={validationSchema}
//       onSubmit={async (values, { resetForm }) => {
//         console.log(values);
//         resetForm();
//       }}
//     >
//       {({ errors, isValid, dirtty, resetForm }) => (
//         <div className="contenedor1 container-fluid">
//           <div className="row">
//             <div className="col-9">
//               <p className="subtitulo">
//                 <i className="fas fa-user"></i> Datos generales
//               </p>
//               <hr />
//               <div className="shadow p-3 mb-3 bg-body rounded">
//                 <Row className="mb-3">
//                   <Col>
//                     <Form.Group controlId="formProveedor">
//                       <Form.Label className="mx-3">
//                         <strong>Proveedor:</strong>
//                       </Form.Label>
//                       <BotonModal
//                         icono="fas fa-plus"
//                         contenidoModal={<FormularioProveedores />}
//                         titulo="Agregar Proveedor"
//                       />
//                       <Field
//                         as="select"
//                         id="supplier_id"
//                         name="supplier_id"
//                         // value={values.supplier_id}
//                         className={`form-select ${
//                           errors.supplier_id ? "is-invalid" : "is-valid"
//                         }`}
//                       >
//                         <option>Seleccione</option>
//                         {/* ejemplo */}
//                         <option>Proveedor</option>
//                       </Field>
//                       <ErrorMessage
//                         name="supplier_id"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <label htmlFor="contact">
//                       <strong>Contacto</strong>
//                     </label>
//                     <Field
//                       type="text"
//                       id="contact"
//                       name="contact"
//                       // value={values.contact}
//                       className="form-control"
//                     />
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col>
//                     <InputGroup>
//                       <label htmlFor="quantity">
//                         <strong>Cantidad</strong>
//                       </label>

//                       <Field
//                         type="number"
//                         min="1"
//                         name="quantity"
//                         // value={values.quantity}
//                         className={`form-control ${
//                           errors.quantity ? "is-invalid" : "is-valid"
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="quantity"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </InputGroup>
//                   </Col>
//                   <Col>
//                     <InputGroup>
//                       <label htmlFor="price">
//                         <strong>Precio</strong>
//                       </label>
//                       <Field
//                         type="number"
//                         name="price"
//                         // value={values.price}
//                         className={`form-control ${
//                           errors.price ? "is-invalid" : "is-valid"
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="price"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </InputGroup>
//                   </Col>
//                   <Col>
//                     <InputGroup>
//                       <label htmlFor="iva">
//                         <strong>Impuestos</strong>
//                       </label>
//                       <Field
//                         type="number"
//                         name="iva"
//                         // value={values.iva}
//                         className={`form-control ${
//                           errors.iva ? "is-invalid" : "is-valid"
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="iva"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </InputGroup>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col>
//                     <InputGroup>
//                       <Field
//                         as="select"
//                         name="product_id"
//                         // value={values.product_id}
//                         className="form-control"
//                       >
//                         <option>Producto o servicio</option>
//                         {/* ejemplo */}
//                         <option>Producto 1</option>
//                       </Field>
//                       <Field
//                         type="text"
//                         placeholder="Costo $"
//                         name="price"
//                         // value={values.price}

//                         className="form-control"
//                       />
//                       <Field
//                         type="number"
//                         placeholder="Impuestos %"
//                         name="iva"
//                         // value={values.iva}
//                         className="form-control"
//                       />
//                       <Button variant="primary">Agregar</Button>
//                     </InputGroup>
//                   </Col>
//                 </Row>
//               </div>
//               <div className="shadow p-3 mb-3 bg-body rounded">
//                 <p className="subtitulo">
//                   <i className="fas fa-box-open"></i> Productos o servicios
//                 </p>
//                 <hr />
//               </div>
//               {/* <div className="shadow p-3 mb-5 bg-body rounded">
//             <Form.Group controlId="formObservaciones" className="mb-3">
//               <Form.Label>
//                 <strong>
//                   Este texto aparecerá arriba de los precios
//                 </strong>
//               </Form.Label>
//               <Field
//                 as="textarea"
//                 rows={3}
//                 name="observaciones"
//                 value={values.observaciones}
//                 className="form-control"
//               />
//               <ErrorMessage
//                 name="observaciones"
//                 component="div"
//                 className="invalid-feedback"
//               />
//             </Form.Group>
//             <Form.Group controlId="formTerminos" className="mb-3">
//               <Form.Label>
//                 <strong>
//                   Términos y condiciones (puedes agregar tus datos
//                   bancarios para pago)
//                 </strong>
//               </Form.Label>
//               <Field
//                 as="textarea"
//                 rows={3}
//                 name="terminos"
//                 value={values.terminos}
//                 className="form-control"
//               />
//               <ErrorMessage
//                 name="terminos"
//                 component="div"
//                 className="invalid-feedback"
//               />
//             </Form.Group>
//           </div> */}
//             </div>
//             <div className="col-3">
//               <div className="card">
//                 <div className="card-header">
//                   <p className="subtitulo">
//                     <i className="fas fa-file-invoice-dollar"></i> RESUMEN ORDEN
//                     DE COMPRA
//                   </p>
//                 </div>
//                 <div className="card-body">
//                   <p className="text-center subtitulo">
//                     <i className="fas fa-calendar-alt"></i>{" "}
//                     {startDate.toLocaleDateString()}
//                   </p>
//                   <p className="text-center subtitulo">Sub Total: $0.00</p>
//                   <p className="text-center subtitulo">Impuestos: $0.00</p>
//                   <p className="text-center subtitulo">Total: $0.00</p>

//                   {/* <Form.Group controlId="formVigencia" className="mb-3">
//                 <Form.Label>

//                   <p className="text-center subtitulo">
//                     <i className="fas fa-calendar-alt"></i> Vencimiento*
//                   </p>
//                 </Form.Label>
//                 <DatePicker
//                   selected={values.validity}
//                   onChange={handleDateChange}
//                   dateFormat="dd/MM/yyyy"
//                   className="form-control"
//                 />
//                 <ErrorMessage
//                   name="validity"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </Form.Group> */}
//                   <label htmlFor="validity">
//                     <strong>Vigencia</strong>
//                   </label>
//                   <DatePicker
//                     // selected={values.validity}

//                     onChange={handleDateChange}
//                     dateFormat="dd/MM/yyyy"
//                     className={`form-control ${
//                       errors.validity ? "is-invalid" : "is-valid"
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="validity"
//                     component="div"
//                     className="invalid-feedback"
//                   />
//                 </div>
//                 <div className="card-footer">
//                   <div className="d-grid gap-2">
//                     <Button
//                       variant="info"
//                       type="submit"
//                       disabled={!isValid || !dirtty}
//                     >
//                       <i className="fas fa-save"></i> Generar Orden
//                     </Button>
//                     <Button variant="danger" type="reset" onClick={handleReset}>
//                       <i className="fas fa-eraser"></i> Limpiar
//                     </Button>
//                     <NavLink
//                       to="/admin/ordenes-de-compra"
//                       className="btn btn-outline-secondary"
//                     >
//                       <i className="fas fa-arrow-left"></i> Regresar
//                     </NavLink>
//                   </div>
//                   {/* <Form.Group controlId="formArchivo" className="mb-3">
//                 <Form.Label>
//                   <strong>Archivos</strong>
//                 </Form.Label>
//                 <Form.Control
//                   type="file"
//                   name="archivo"
//                   onChange={handleFile
//                 />
//               </Form.Group> */}
//                   {/* <Form.Group controlId="formNotas" className="mb-3">
//                 <Form.Label>
//                   <strong>Notas</strong>
//                 </Form.Label>
//                 <Field
//                   as="textarea"
//                   rows={3}
//                   name="notes"
//                   value={values.notes}
//                   className="form-control"
//                 />
//                 <ErrorMessage
//                   name="notes"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </Form.Group> */}
//                   <label htmlFor="notes">
//                     <strong>Notas</strong>
//                   </label>
//                   <Field
//                     as="textarea"
//                     rows={3}
//                     name="notes"
//                     // value={values.notes}
//                     className={`form-control ${
//                       errors.notes ? "is-invalid" : "is-valid"
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="notes"
//                     component="div"
//                     className="invalid-feedback"
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

// export default FormularioOrdenCompra;
