import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { createSupplierRequest } from "../../api/suppliers.api";

// Esquema de validación
const validationSchema = Yup.object().shape({
  trade_name: Yup.string().required("Nombre Comercial es obligatorio"),
  business_type: Yup.string().required("Giro es obligatorio"),
  cell_number: Yup.string().required("Teléfono/Celular es obligatorio"),
  email: Yup.string().email("Correo inválido"),
  country: Yup.string().required("País es obligatorio"),
  state: Yup.string().required("Estado es obligatorio"),
  address: Yup.string(),
  city: Yup.string().required("Ciudad es obligatoria"),
  postal_code: Yup.string(),
  location: Yup.string(),
  website: Yup.string().url("URL inválida"),
  bank_accounts: Yup.string(),
  billing_name: Yup.string(),
  billing_number: Yup.string(),
  billing_address: Yup.string(),
  notes: Yup.string(),
  contact_name: Yup.string().required("Nombre de Contacto es obligatorio"),
  contact_title: Yup.string(),
  contact_area_or_position: Yup.string(),
  contact_cell_phone: Yup.string().required(
    "Celular de Contacto es obligatorio"
  ),
  contact_email: Yup.string()
    .email("Correo de Contacto inválido")
    .required("Correo de Contacto es obligatorio"),
});

const FormularioProveedor = () => {
  return (
    <Formik
      initialValues={{
        trade_name: "",
        business_type: "Por Definir",
        cell_number: "",
        email: "",
        country: "",
        state: "",
        address: "",
        city: "",
        postal_code: "",
        location: "",
        website: "",
        bank_accounts: "",
        billing_name: "",
        billing_number: "",
        billing_address: "",
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
          // ordenar los valores antes de enviarlos
          const orderedData = {
            trade_name: values.trade_name,
            business_type: values.business_type,
            cell_number: values.cell_number,
            email: values.email,
            country: values.country,
            state_: values.state,
            address_: values.address,
            city: values.city,
            postal_code: values.postal_code,
            location_: values.location,
            website: values.website,
            bank_accounts: values.bank_accounts,
            billing_name: values.billing_name,
            billing_number: values.billing_number,
            billing_address: values.billing_address,
            notes: values.notes,
            contact_name: values.contact_name,
            contact_title: values.contact_title,
            contact_area_or_position: values.contact_area_or_position,
            contact_cell_phone: values.contact_cell_phone,
            contact_email: values.contact_email,
          };
          console.log(orderedData);

          await createSupplierRequest(orderedData);
          Swal.fire({
            icon: "success",
            title: "Proveedor creado",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al crear el proveedor",
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
                <label htmlFor="trade_name">
                  <strong>Nombre Comercial *</strong>
                </label>
                <Field
                  type="text"
                  id="trade_name"
                  name="trade_name"
                  className={`form-control ${
                    errors.trade_name ? "is-invalid" : ""
                  }`}
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
                  className={`form-control ${
                    errors.business_type ? "is-invalid" : ""
                  }`}
                >
                  <option>Comercial</option>
                  <option>Equipo Medico</option>
                  <option>Industrial</option>
                  <option>Por Definir</option>
                  <option>Restaurantero</option>
                  <option>Servicios</option>
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
                <label htmlFor="cell_number">
                  <strong>Teléfono/Celular *</strong>
                </label>
                <Field
                  type="tel"
                  id="cell_number"
                  name="cell_number"
                  className={`form-control ${
                    errors.cell_number ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="cell_number"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="email">
                  <strong>Correo</strong>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
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
                <label htmlFor="country">
                  <strong>País *</strong>
                </label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  className={`form-control ${
                    errors.country ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="state">
                  <strong>Estado *</strong>
                </label>
                <Field
                  type="text"
                  id="state"
                  name="state"
                  className={`form-control ${errors.state ? "is-invalid" : ""}`}
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="address">
                  <strong>Dirección</strong>
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="city">
                  <strong>Ciudad *</strong>
                </label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  className={`form-control ${errors.city ? "is-invalid" : ""}`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="postal_code">
                  <strong>Código Postal</strong>
                </label>
                <Field
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  className={`form-control ${
                    errors.postal_code ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="postal_code"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="location">
                  <strong>Ubicación</strong>
                </label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  className={`form-control ${
                    errors.location ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="website">
                  <strong>Página/Portal Web</strong>
                </label>
                <Field
                  type="text"
                  id="website"
                  name="website"
                  className={`form-control ${
                    errors.website ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="website"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="bank_accounts">
                  <strong>Cuentas Bancarias</strong>
                </label>
                <Field
                  type="text"
                  id="bank_accounts"
                  name="bank_accounts"
                  className={`form-control ${
                    errors.bank_accounts ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="bank_accounts"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="billing_name">
                  <strong>Nombre de Facturación</strong>
                </label>
                <Field
                  type="text"
                  id="billing_name"
                  name="billing_name"
                  className={`form-control ${
                    errors.billing_name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="billing_name"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="billing_number">
                  <strong>RFC de Facturación</strong>
                </label>
                <Field
                  type="text"
                  id="billing_number"
                  name="billing_number"
                  className={`form-control ${
                    errors.billing_number ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="billing_number"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="billing_address">
                  <strong>Dirección de Facturación</strong>
                </label>
                <Field
                  type="text"
                  id="billing_address"
                  name="billing_address"
                  className={`form-control ${
                    errors.billing_address ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="billing_address"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="notes">
                  <strong>Notas</strong>
                </label>
                <Field
                  as="textarea"
                  id="notes"
                  name="notes"
                  className={`form-control ${errors.notes ? "is-invalid" : ""}`}
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
                  className={`form-control ${
                    errors.contact_name ? "is-invalid" : ""
                  }`}
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
                  className={`form-control ${
                    errors.contact_title ? "is-invalid" : ""
                  }`}
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
                  className={`form-control ${
                    errors.contact_area_or_position ? "is-invalid" : ""
                  }`}
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
                  className={`form-control ${
                    errors.contact_cell_phone ? "is-invalid" : ""
                  }`}
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
                  className={`form-control ${
                    errors.contact_email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="contact_email"
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

export default FormularioProveedor;
