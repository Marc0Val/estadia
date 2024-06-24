import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { createRoleRequest } from "../../api/role.api";

// Esquema de validación
const validationSchema = Yup.object().shape({
  name_role: Yup.string().required("Este campo es obligatorio"),
});

const FormularioRol = () => {
  return (
    <Formik
      initialValues={{
        name_role: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          console.log(values);
          // Simulación de llamada a API
          await createRoleRequest(values);
          Swal.fire({
            icon: "success",
            title: "Rol guardado",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al guardar el rol",
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
                <label htmlFor="name_role">
                  <strong>Rol *</strong>
                </label>
                <Field
                  type="text"
                  id="name_role"
                  name="name_role"
                  className={`form-control ${
                    errors.name_role ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="name_role"
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
            <Button variant="secondary" type="reset" className="ms-2">
              <i className="fas fa-eraser"></i> Limpiar
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormularioRol;
