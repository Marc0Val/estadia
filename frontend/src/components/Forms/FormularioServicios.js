import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { createServiceRequest } from "../../api/services.api";
import { getCategoriesRequest } from "../../api/category.api";

// Esquema de validación
const validationSchema = Yup.object().shape({
  name_: Yup.string().required("Este campo es obligatorio"),
  category_id: Yup.string().required("Este campo es obligatorio"),
  sale_price: Yup.number()
    .required("Este campo es obligatorio")
    .typeError("Debe ser un número"),
  description_: Yup.string().required("Este campo es obligatorio"),
  sat_unit: Yup.string(),
  sat_code: Yup.string(),
});

const FormularioServicio = () => {
  const [categories, setCategories] = useState([]);

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
  return (
    <Formik
      initialValues={{
        name_: "",
        category_id: "Por Definir",
        sale_price: "",
        description_: "",
        sat_unit: "",
        sat_code: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          console.log(values);
          await createServiceRequest(values);
          Swal.fire({
            icon: "success",
            title: "Servicio creado",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al crear el servicio",
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
                    <option
                      key={category.id_category}
                      value={category.id_category}
                    >
                      {category.name_}
                    </option>
                  ))}
                </Field>
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
            </Row>
            <Row className="mb-3">
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
                  rows={3}
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
                <label htmlFor="sat_unit">
                  <strong>Unidad SAT</strong>
                </label>
                <Field
                  type="text"
                  id="sat_unit"
                  name="sat_unit"
                  className="form-control"
                />
                <ErrorMessage
                  name="sat_unit"
                  component="div"
                  className="invalid-feedback"
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
                <ErrorMessage
                  name="sat_code"
                  component="div"
                  className="invalid-feedback"
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
            <Button variant="warning" type="reset">
              <i className="fas fa-undo"></i> Limpiar
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormularioServicio;
