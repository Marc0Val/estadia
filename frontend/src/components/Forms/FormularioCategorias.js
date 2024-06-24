import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { createCategorieRequest } from "../../api/catergory";

// Esquema de validación
const validationSchema = Yup.object().shape({
  name_: Yup.string().required("Este campo es obligatorio"),
});

const FormularioCategorias = () => {
  return (
    <Formik
      initialValues={{
        name_: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          console.log(values);
          await createCategorieRequest(values);
          Swal.fire({
            icon: "success",
            title: "Categoría creada",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al crear la categoría",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }}
    >
      {({ handleChange, handleSubmit, values, errors, isValid, dirty }) => (
        <Container className="mt-4">
          <Form>
            <p className="text-muted">
              Complete el formulario | (*) Campos obligatorios
            </p>
            <hr />
            <Row className="mb-3">
              <Col>
                <label htmlFor="name_">
                  <strong>Nombre de la categoría *</strong>
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
            </Row>
            <hr />
            <Row>
              <Col>
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
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormularioCategorias;


