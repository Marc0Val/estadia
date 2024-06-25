import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { createClientRequest } from "../../api/clients.api";

// Esquema de validación
const validationSchema = Yup.object().shape({
  trade_name: Yup.string().required("Este campo es obligatorio"),
  business_type: Yup.string().required("Este campo es obligatorio"),
  phone_or_cell: Yup.string(),
  email: Yup.string()
    .email("Correo inválido")
    .required("Este campo es obligatorio"),
  street: Yup.string().required("Este campo es obligatorio"),
  number_: Yup.string().required("Este campo es obligatorio"),
  neighborhood: Yup.string(),
  postal_code: Yup.string(),
  city: Yup.string().required("Este campo es obligatorio"),
  country: Yup.string().required("Este campo es obligatorio"),
  state_: Yup.string().required("Este campo es obligatorio"),
  notes: Yup.string(),
  contact_name: Yup.string().required("Este campo es obligatorio"),
  contact_title: Yup.string(),
  contact_area_or_position: Yup.string(),
  contact_cell_phone: Yup.string().required("Este campo es obligatorio"),
  contact_email: Yup.string()
    .email("Correo inválido")
    .required("Este campo es obligatorio"),
});

const FormularioClientes = () => {
  return (
    <Formik
      initialValues={{
        trade_name: "",
        business_type: "Por Definir",
        phone_or_cell: "",
        email: "",
        street: "",
        number_: "",
        neighborhood: "",
        postal_code: "",
        city: "",
        country: "",
        state_: "",
        notes: "",
        contact_name: "",
        contact_title: "",
        contact_area_or_position: "",
        contact_cell_phone: "",
        contact_email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          console.log(values);
          await createClientRequest(values);
          Swal.fire({
            icon: "success",
            title: "Cliente creado",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al crear el cliente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }}
    >
      {({ isValid, dirty }) => (
        <Container className="mt-4">
          <Form>
            <p className="text-muted">
              Complete el formulario | (*) Campos obligatorios
            </p>
            <hr />
            <Row className="mb-3">
              <Col>
                <label htmlFor="trade_name">
                  <strong>Nombre Comercial *</strong>
                </label>
                <Field
                  type="text"
                  id="trade_name"
                  name="trade_name"
                  className="form-control"
                />
                <ErrorMessage
                  name="trade_name"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="business_type">
                  <strong>Giro *</strong>
                </label>
                <Field
                  as="select"
                  id="business_type"
                  name="business_type"
                  className="form-control"
                >
                  <option value="Comercial">Comercial</option>
                  <option value="Equipo Medico">Equipo Medico</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Por Definir">Por Definir</option>
                  <option value="Restaurantero">Restaurantero</option>
                  <option value="Servicios">Servicios</option>
                </Field>
                <ErrorMessage
                  name="business_type"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="phone_or_cell">
                  <strong>Teléfono/Celular</strong>
                </label>
                <Field
                  type="tel"
                  id="phone_or_cell"
                  name="phone_or_cell"
                  className="form-control"
                />
                <ErrorMessage
                  name="phone_or_cell"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="email">
                  <strong>Correo *</strong>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="street">
                  <strong>Calle *</strong>
                </label>
                <Field
                  type="text"
                  id="street"
                  name="street"
                  className="form-control"
                />
                <ErrorMessage
                  name="street"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="number_">
                  <strong>Número *</strong>
                </label>
                <Field
                  type="text"
                  id="number_"
                  name="number_"
                  className="form-control"
                />
                <ErrorMessage
                  name="number_"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="neighborhood">
                  <strong>Colonia</strong>
                </label>
                <Field
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  className="form-control"
                />
                <ErrorMessage
                  name="neighborhood"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="postal_code">
                  <strong>Código Postal</strong>
                </label>
                <Field
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  className="form-control"
                />
                <ErrorMessage
                  name="postal_code"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="city">
                  <strong>Ciudad *</strong>
                </label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="country">
                  <strong>País *</strong>
                </label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="state_">
                  <strong>Estado *</strong>
                </label>
                <Field
                  type="text"
                  id="state_"
                  name="state_"
                  className="form-control"
                />
                <ErrorMessage
                  name="state_"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="notes">
                  <strong>Notas</strong>
                </label>
                <Field
                  as="textarea"
                  id="notes"
                  name="notes"
                  className="form-control"
                  rows={3}
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <hr />
            <h5>Información de Contacto</h5>
            <Row className="mb-3">
              <Col>
                <label htmlFor="contact_name">
                  <strong>Nombre de Contacto *</strong>
                </label>
                <Field
                  type="text"
                  id="contact_name"
                  name="contact_name"
                  className="form-control"
                />
                <ErrorMessage
                  name="contact_name"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="contact_title">
                  <strong>Título de Contacto</strong>
                </label>
                <Field
                  type="text"
                  id="contact_title"
                  name="contact_title"
                  className="form-control"
                />
                <ErrorMessage
                  name="contact_title"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="contact_area_or_position">
                  <strong>Área o Posición</strong>
                </label>
                <Field
                  type="text"
                  id="contact_area_or_position"
                  name="contact_area_or_position"
                  className="form-control"
                />
                <ErrorMessage
                  name="contact_area_or_position"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="contact_cell_phone">
                  <strong>Celular de Contacto *</strong>
                </label>
                <Field
                  type="tel"
                  id="contact_cell_phone"
                  name="contact_cell_phone"
                  className="form-control"
                />
                <ErrorMessage
                  name="contact_cell_phone"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="contact_email">
                  <strong>Correo de Contacto *</strong>
                </label>
                <Field
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="form-control"
                />
                <ErrorMessage
                  name="contact_email"
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

export default FormularioClientes;
