import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useClients } from "../../context/ClientsContext";
import { useProducts } from "../../context/ProductsContext";
import FormularioClientes from "../../components/Forms/FormularioClientes";
import BotonModal from "../../components/Buttons/BotonModal";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuotes } from "../../context/QuotesContext";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object({
  client_id: Yup.string().required("El cliente es obligatorio"),
  validity: Yup.string().required("La vigencia es obligatoria"),
});

const FormularioCotizacion = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);

  const { id } = useParams();

  const [addedProducts, setAddedProducts] = useState([]);

  const [formData, setFormData] = useState({
    client_id: "",
    product_id: "",
    contact_name: "",
    quantity: 1,
    price: 0,
    discount: 0,
    iva: 16,
    validity: formattedDate,
    files: "",
    notes: "",
    total: 0,
    subtotal: 0,
    totalIva: 0,
    products: [],
  });

  // Contextos
  const { clients, getClients } = useClients();
  const { products, getProducts } = useProducts();
  const { createQuote, updateQuote, getQuote } = useQuotes();

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

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

  useEffect(() => {
    console.log("Datos de productos añadidos:", addedProducts);
  }, [addedProducts]);

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

  useEffect(() => {
    if (id) {
      getQuote(id).then((data) => {
        console.log(data);

        setFormData({
          ...data,
          validity: new Date(data.validity),
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
  }, [id, getQuote]);

  useEffect(() => {
    if (formData.client_id) {
      console.log(formData);
      const selectedClient = clients.find(
        (client) =>
          client.id_client.toString() === formData.client_id.toString()
      );
      if (selectedClient) {
        setFormData((prevState) => ({
          ...prevState,
          contact_name: selectedClient.contact_name || "",
        }));
      }
    } else {
      console.log("No se recibió client_id");
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

  useEffect(() => {
    if (id) {
      console.log(id);
      getQuote(id).then((data) => {
        setFormData({
          ...data,
        });
      });
    } else {
      console.log("ne");
    }
  }, [id, getQuote]);

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

  const totals = calculateTotals();

  const handleSubmit = () => {
    const totals = calculateTotals();
    const formattedData = {
      ...formData,
      client_id: parseInt(formData.client_id, 10),
      product_id: parseInt(formData.product_id, 10),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      validity: formData.validity,
      total: parseFloat(totals.total.toFixed(2)),
      subtotal: parseFloat(totals.subTotal.toFixed(2)),
      totalIva: parseFloat(totals.totalIva.toFixed(2)),
      products: addedProducts,
    };

    console.log("Datos a enviar:", formattedData);

    if (id) {
      console.log(id);
      updateQuote(id, formattedData).then(() => {
        Swal.fire({
          icon: "success",
          title: "Cotización actualizada",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      createQuote(formattedData).then(() => {
        Swal.fire({
          icon: "success",
          title: "Cotización creada",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };

  return (
    <Formik
      initialValues={formData}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
                          onChange={handleChange}
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
                          name="contact_name"
                          onChange={handleChange}
                          className={`form-control ${
                            errors.contact_name ? "is-invalid" : ""
                          }`}
                          readOnly
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                  <div className="shadow p-3 mb-3 bg-body rounded">
                    <Row>
                      <Col>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Producto</th>
                              <th>Cantidad</th>
                              <th>Precio Unitario</th>
                              <th>Descuento</th>
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
                                      {(product.discount || 0).toFixed(2)}
                                    </td>
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
                <div className="shadow p-3 mb-5 bg-body rounded">
                  <Row>
                    <Col>
                      <label htmlFor="notes">
                        <strong>Notas *</strong>
                      </label>
                      <Field
                        as="textarea"
                        id="notes"
                        name="notes"
                        onChange={handleChange}
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
