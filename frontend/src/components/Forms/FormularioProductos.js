import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { createProductRequest } from "../../api/products.api";
import { getCategoriesRequest } from "../../api/catergory";
import { getSuppliersRequest } from "../../api/suppliers.api";

// Esquema de validación
const validationSchema = Yup.object().shape({
  name_: Yup.string().required("Este campo es obligatorio"),
  category_id: Yup.string().required("Este campo es obligatorio"),
  unit: Yup.string().required("Este campo es obligatorio"),
  description_: Yup.string().required("Este campo es obligatorio"),
  sale_price: Yup.number().required("Este campo es obligatorio"),
  supplier_id: Yup.string().required("Este campo es obligatorio"),
  reorder_point: Yup.number()
    .min(1, "Debe ser mayor que 0")
    .required("Este campo es obligatorio"),
  initial_stock: Yup.number()
    .min(1, "Debe ser mayor que 0")
    .required("Este campo es obligatorio"),
  minimum_stock: Yup.number()
    .min(1, "Debe ser mayor que 0")
    .required("Este campo es obligatorio"),
});

const FormularioProducto = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await getCategoriesRequest();
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.log("Error al cargar las categorías o no es un arreglo  ");
        }
      } catch (error) {
        console.log(error);
        console.error("Error al cargar las categorías", error);
      }
    };
    cargarCategorias();
  }, []);

  useEffect(() => {
    const cargarProveedores = async () => {
      try {
        const response = await getSuppliersRequest();
        if (Array.isArray(response.data)) {
          setSuppliers(response.data);
        } else {
          console.log("Error al cargar los proveedores o no es un arreglo");
        }
      } catch (error) {
        console.log(error);
        console.error("Error al cargar los proveedores", error);
      }
    };
    cargarProveedores();
  }, []);

  return (
    <Formik
      initialValues={{
        name_: "",
        category_id: "",
        unit: "",
        description_: "",
        sale_price: "",
        model: "",
        factory_code: "",
        supplier_id: "",
        manufacturer_brand: "",
        reorder_point: 1,
        initial_stock: 1,
        minimum_stock: 1,
        product_image: null,
        information_document: null,
        sku: "",
        sat_code: "",
        sat_unit: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          console.log(values);
          await createProductRequest(values);
          Swal.fire({
            icon: "success",
            title: "Producto creado",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al crear el producto",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }}
    >
      {({ setFieldValue, errors, isValid, dirty }) => (
        <Container className="mt-4">
          <Form>
            <p className="text-muted">
              Complete el formulario | (*) Campos obligatorios
            </p>
            <hr />
            <Row className="mb-3">
              <Col>
                <label htmlFor="name_">
                  <strong>Nombre *</strong>
                </label>
                <Field
                  type="text"
                  id="name_"
                  name="name_"
                  className={`form-control ${errors.name_ ? "is-invalid" : ""}`}
                />
                <ErrorMessage
                  name="name_"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="category_id">
                  <strong>Categoría *</strong>
                </label>
                <Field
                  as="select"
                  name="category_id"
                  className={`form-control ${
                    errors.category_id ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Seleccione una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id_category} value={category.id_category}>
                      {category.name_}
                    </option>
                  ))}
                </Field>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="unit">
                  <strong>Unidad *</strong>
                </label>
                <Field
                  as="select"
                  id="unit"
                  name="unit"
                  className={`form-control ${errors.unit ? "is-invalid" : ""}`}
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
                </Field>
                <ErrorMessage
                  name="unit"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="description_">
                  <strong>Descripción *</strong>
                </label>
                <Field
                  as="textarea"
                  id="description_"
                  name="description_"
                  className={`form-control ${
                    errors.description_ ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="description_"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="sale_price">
                  <strong>Precio de venta $ *</strong>
                </label>
                <Field
                  type="number"
                  id="sale_price"
                  name="sale_price"
                  className={`form-control ${
                    errors.sale_price ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="sale_price"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="model">
                  <strong>Modelo</strong>
                </label>
                <Field
                  type="text"
                  id="model"
                  name="model"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="factory_code">
                  <strong>Código de fábrica</strong>
                </label>
                <Field
                  type="text"
                  id="factory_code"
                  name="factory_code"
                  className="form-control"
                />
              </Col>
              <Col>
                <label htmlFor="supplier_id">
                  <strong>Proveedor *</strong>
                </label>
                <Field
                  as="select"
                  name="supplier_id"
                  className={`form-control ${
                    errors.supplier_id ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Seleccione un proveedor</option>
                  {suppliers.map((supplier) => (
                    <option
                      key={supplier.id_supplier}
                      value={supplier.id_supplier}
                    >
                      {supplier.trade_name}
                    </option>
                  ))}
                </Field>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="manufacturer_brand">
                  <strong>Fabricante/Marca</strong>
                </label>
                <Field
                  type="text"
                  id="manufacturer_brand"
                  name="manufacturer_brand"
                  className="form-control"
                />
              </Col>
              <Col>
                <label htmlFor="reorder_point">
                  <strong>Punto de Pedido *</strong>
                </label>
                <Field
                  type="number"
                  id="reorder_point"
                  name="reorder_point"
                  className={`form-control ${
                    errors.reorder_point ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="reorder_point"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="initial_stock">
                  <strong>Stock Inicial *</strong>
                </label>
                <Field
                  type="number"
                  id="initial_stock"
                  name="initial_stock"
                  className={`form-control ${
                    errors.initial_stock ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="initial_stock"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="minimum_stock">
                  <strong>Stock Mínimo *</strong>
                </label>
                <Field
                  type="number"
                  id="minimum_stock"
                  name="minimum_stock"
                  className={`form-control ${
                    errors.minimum_stock ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="minimum_stock"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <hr />
            <Row className="mb-3 mt-5">
              <Col>
                <label htmlFor="product_image">
                  <strong>Imagen del producto</strong>
                </label>
                <input
                  type="file"
                  id="product_image"
                  name="product_image"
                  accept=".jpeg,.jpg,.bmp,.png"
                  className="form-control"
                  onChange={(event) =>
                    setFieldValue("product_image", event.currentTarget.files[0])
                  }
                />
              </Col>
              <Col>
                <label htmlFor="information_document">
                  <strong>Documento informativo</strong>
                </label>
                <input
                  type="file"
                  id="information_document"
                  name="information_document"
                  accept=".pdf,.xls,.xlsx,.doc,.docs,.odt,.ods,.jpeg,.jpg,.bmp,.png"
                  className="form-control"
                  onChange={(event) =>
                    setFieldValue(
                      "information_document",
                      event.currentTarget.files[0]
                    )
                  }
                />
              </Col>
            </Row>
            <hr />
            <h4 className="mt-5 mb-">Más información</h4>
            <Row className="mb-3">
              <Col>
                <label htmlFor="sku">
                  <strong>SKU</strong>
                </label>
                <Field
                  type="text"
                  id="sku"
                  name="sku"
                  className="form-control"
                />
              </Col>
              <Col>
                <label htmlFor="sat_code">
                  <strong>Código SAT</strong>
                </label>
                <Field
                  type="text"
                  id="sat_code"
                  name="sat_code"
                  className="form-control"
                />
              </Col>
              <Col>
                <label htmlFor="sat_unit">
                  <strong>Unidad SAT</strong>
                </label>
                <Field
                  type="text"
                  id="sat_unit"
                  name="sat_unit"
                  className="form-control"
                />
              </Col>
            </Row>
            <hr />
            <Button
              variant="success"
              type="submit"
              disabled={!isValid || !dirty}
            >
              <i className="fas fa-save"></i> Guardar
            </Button>

            <Button variant="danger" type="reset" className="ms-2">
              <i className="fas fa-eraser"></i> Limpiar
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormularioProducto;
