import React, { useState, useEffect, useContext } from "react";
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
import { usePurchaseOrders } from "../../context/PurchaseOrdersContext";
import { useSuppliers } from "../../context/SuppliersContext"; // Importa tu contexto de proveedores
import { useProducts } from "../../context/ProductsContext"; // Importa tu contexto de productos
import { useServices } from "../../context/ServicesContext"; // Importa tu contexto de servicios

// Validación con Yup
const validationSchema = Yup.object({
  // supplier_id: Yup.string().required("El proveedor es obligatorio"),
  product_id: Yup.string().required("El producto es obligatorio"),
  quantity: Yup.number().required("La cantidad es obligatoria"),
  price: Yup.number().required("El precio es obligatorio"),
  iva: Yup.number().required("El impuesto es obligatorio"),
  validity: Yup.date().required("La vigencia es obligatoria"),
  // notes: Yup.string().required("Las notas son obligatorias"),
});

const FormularioOrdenCompra = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  const [addedProducts, setAddedProducts] = useState([]);

  const [formData, setFormData] = useState({
    supplier_id: "",
    contact_name: "",
    product_id: "",
    quantity: 1,
    price: 0,
    iva: 16,
    validity: new Date(today.setDate(today.getDate())),
    notes: "",
  });

  // Accede a los contextos
  const { suppliers, getSuppliers } = useSuppliers();
  const { products, getProducts } = useProducts();
  const { services, getServices } = useServices();

  useEffect(() => {
    getSuppliers();
    getProducts();
    getServices();
  }, []);

  useEffect(() => {
    if (formData.supplier_id && suppliers.length > 0) {
      const selectedSupplier = suppliers.find(
        (supplier) =>
          supplier.id_supplier.toString() === formData.supplier_id.toString()
      );
      if (selectedSupplier) {
        setFormData((prevData) => ({
          ...prevData,
          contact_name: selectedSupplier.contact_name,
        }));
      }
    }
  }, [formData.supplier_id, suppliers]);

  // Actualizar el precio cuando se selecciona un producto
  useEffect(() => {
    if (formData.product_id) {
      console.log(formData.product_id);
      const selectedProduct = products.find(
        (product) =>
          product.id_product.toString() === formData.product_id.toString()
      );

      if (selectedProduct) {
        console.log("ye");
        setFormData((prevData) => ({
          ...prevData,
          price: selectedProduct.sale_price,
        }));
      }
    }
  }, [formData.product_id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "quantity" ||
        name === "price" ||
        name === "discount" ||
        name === "iva"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handleAddProduct = () => {
    const product = products.find(
      (p) => p.id_product === parseInt(formData.product_id, 10)
    );
    if (product) {
      setAddedProducts((prevProducts) => [
        ...prevProducts,
        {
          name_: product.name_,
          quantity: parseFloat(formData.quantity) || 1,
          discount: parseFloat(formData.discount) || 0,
          price: parseFloat(formData.price) || 0,
          iva: parseFloat(formData.iva) || 16,
        },
      ]);
      // Limpiar los campos después de agregar
      setFormData((prevData) => ({
        ...prevData,
        product_id: "",
        quantity: 1,
        price: 0,
        discount: 0,
      }));
    }
  };

  const calculateTotals = () => {
    let subTotal = 0;
    let totalIva = 0;
    addedProducts.forEach((product) => {
      const productTotal =
        (Number.isFinite(product.price) ? product.price : 0) *
        (Number.isFinite(product.quantity) ? product.quantity : 1);
      const discountAmount =
        (productTotal *
          (Number.isFinite(product.discount) ? product.discount : 0)) /
        100;
      const taxableAmount = productTotal - discountAmount;
      const ivaAmount =
        (taxableAmount * (Number.isFinite(product.iva) ? product.iva : 16)) /
        100;
      subTotal += taxableAmount;
      totalIva += ivaAmount;
    });
    return {
      subTotal: parseFloat(subTotal.toFixed(2)),
      totalIva: parseFloat(totalIva.toFixed(2)),
      total: parseFloat((subTotal + totalIva).toFixed(2)),
    };
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      validity: date,
    });
  };

  const totals = calculateTotals();

  const handleSubmit = () => {};

  const handleReset = () => {
    setFormData({
      supplier_id: "",
      contact_name: "",
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
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, isValid, dirty, resetForm }) => (
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
                        // id="supplier_id"
                        name="supplier_id"
                        value={formData.supplier_id}
                        onChange={handleChange}
                        className={`form-select ${
                          errors.supplier_id ? "is-invalid" : "is-valid"
                        }`}
                      >
                        <option>-- Proveedores Disponibles --</option>
                        {suppliers.map((supplier) => (
                          <option
                            key={supplier.id_supplier}
                            value={supplier.id_supplier}
                          >
                            {supplier.trade_name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="supplier_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <label htmlFor="contact_name">
                      <strong>Contacto</strong>
                    </label>
                    <Field
                      type="text"
                      id="contact_name"
                      name="contact_name"
                      value={formData.contact_name}
                      className="form-control"
                    />
                  </Col>
                  {/* <Col>
                    <label htmlFor="name">
                      <strong>Nombre</strong>
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : "is-valid"
                      }`}
                    />
                  </Col> */}
                </Row>
                <Row className="mb-3"></Row>
              </div>
              <div className="shadow p-3 mb-3 bg-body rounded">
                <p className="subtitulo">
                  <i className="fas fa-box-open"></i> Productos o servicios
                  disponibles
                </p>
                <Row className="mb-3">
                  <InputGroup>
                    <label htmlFor="quantity">
                      <strong>Cantidad</strong>
                    </label>

                    <Field
                      type="number"
                      min="1"
                      name="quantity"
                      value={formData.quantity}
                      className={`form-control ${
                        errors.quantity ? "is-invalid" : "is-valid"
                      }`}
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="invalid-feedback"
                    />

                    <Form.Control
                      as="select"
                      name="product_id"
                      value={formData.product_id}
                      onChange={handleChange}
                    >
                      <option>-- Productos Disponibles --</option>
                      {products.map((product) => (
                        <option
                          key={product.id_product}
                          value={product.id_product}
                        >
                          {product.name_}
                        </option>
                      ))}
                      {services.map((service) => (
                        <option
                          key={service.id_service}
                          value={service.id_service}
                        >
                          {service.name_}
                        </option>
                      ))}
                    </Form.Control>
                    <Button variant="primary" onClick={handleAddProduct}>
                      Agregar
                    </Button>
                  </InputGroup>
                  <Col>
                    <InputGroup>
                      <label htmlFor="price">
                        <strong>Precio</strong>
                      </label>
                      <Field
                        type="number"
                        name="price"
                        value={formData.price}
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
                <hr />
              </div>
              <div className="shadow p-3 mb-5 bg-body rounded">
                <p className="subtitulo">
                  <i className="fas fa-box"></i> Productos o Servicios
                </p>
                <div className="shadow p-3 mb-3 bg-body rounded">
                  <Row>
                    <Col>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(addedProducts) &&
                            addedProducts.map((product, index) => {
                              console.log("Producto en la tabla:", product); // Verifica los datos del producto
                              return (
                                <tr key={index}>
                                  <td>{product.name_ || "Desconocido"}</td>
                                  <td>{product.quantity || 0}</td>
                                  <td>${(product.price || 0).toFixed(2)}</td>
                                  <td>
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        setAddedProducts((prevProducts) =>
                                          prevProducts.filter(
                                            (_, i) => i !== index
                                          )
                                        )
                                      }
                                    >
                                      Eliminar
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                </div>
                <hr />
              </div>
              {/* <div className="shadow p-3 mb-5 bg-body rounded">
                <Form.Group controlId="formObservaciones" className="mb-3">
                  <Form.Label>
                    <strong>Este texto aparecerá arriba de los precios</strong>
                  </Form.Label>
                  <Field
                    as="textarea"
                    rows={3}
                    name="observaciones"
                    value={formData.observaciones}
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
                      Términos y condiciones (puedes agregar tus datos bancarios
                      para pago)
                    </strong>
                  </Form.Label>
                  <Field
                    as="textarea"
                    rows={3}
                    name="terminos"
                    value={formData.terminos}
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

                  <p className="text-center subtitulo">
                    Subtotal: ${totals.subTotal.toFixed(2)}
                  </p>
                  <p className="text-center subtitulo">
                    Impuestos: ${totals.totalIva.toFixed(2)}
                  </p>
                  <p className="text-center subtitulo">
                    Total: ${totals.total.toFixed(2)}
                  </p>

                  <Form.Group controlId="formVigencia" className="mb-3">
                    <Form.Label>
                      <p className="text-center subtitulo">
                        <i className="fas fa-calendar-alt"></i> Vencimiento*
                      </p>
                    </Form.Label>

                    <DatePicker
                      selected={formData.validity}
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
                  </Form.Group>
                </div>
                <div className="card-footer">
                  <div className="d-grid gap-2">
                    <Button
                      variant="info"
                      type="submit"
                      disabled={!isValid || !dirty}
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
                      // onChange={handleFile}
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
                      value={formData.notes}
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
                    value={formData.notes}
                    onChange={handleChange}
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
