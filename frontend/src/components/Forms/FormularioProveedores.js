import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useSuppliers } from "../../context/SuppliersContext";

// Esquema de validación
const validationSchema = Yup.object().shape({
  trade_name: Yup.string().required("Nombre Comercial es obligatorio"),
  business_type: Yup.string().required("Giro es obligatorio"),
  cell_number: Yup.string().required("Teléfono/Celular es obligatorio"),
  email: Yup.string().email("Correo inválido").required("Correo es requerido"),
  country: Yup.string().required("País es obligatorio"),
  state_: Yup.string().required("Estado es obligatorio"),
  address_: Yup.string(),
  city: Yup.string().required("Ciudad es obligatoria"),
  postal_code: Yup.string(),
  location_: Yup.string(),
  website: Yup.string(),
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

const FormularioProveedor = ({ id_supplier }) => {
  const { getSupplier, createSupplier, updateSupplier } = useSuppliers();

  const emptyValues = {
    trade_name: "",
    business_type: "Por Definir",
    cell_number: "",
    email: "",
    country: "",
    state_: "",
    address_: "",
    city: "",
    postal_code: "",
    location_: "",
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
  };

  const [initialValues, setInitialValues] = useState(emptyValues);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        if (id_supplier) {
          const supplierData = await getSupplier(id_supplier);
          if (supplierData) {
            setInitialValues(supplierData);
          }
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    fetchSupplierData();
  }, [id_supplier, getSupplier]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (id_supplier) {
            await updateSupplier(id_supplier, values);
            Swal.fire({
              icon: "success",
              title: "Proveedor actualizado",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            await createSupplier(values);
            Swal.fire({
              icon: "success",
              title: "Proveedor creado",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al guardar el proveedor",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }}
    >
      {({ errors, isValid, dirty, resetForm }) => (
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
                <label htmlFor="state_">
                  <strong>Estado *</strong>
                </label>
                <Field
                  type="text"
                  id="state_"
                  name="state_"
                  className={`form-control ${
                    errors.state_ ? "is-invalid" : ""
                  }`}
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
                <label htmlFor="address_">
                  <strong>Dirección</strong>
                </label>
                <Field
                  type="text"
                  id="address_"
                  name="address_"
                  className={`form-control ${
                    errors.address_ ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="address_"
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
                  id="location_"
                  name="location_"
                  className={`form-control ${
                    errors.location_ ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="location_"
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
                <Button
                  variant="danger"
                  type="reset"
                  className="ms-2"
                  onClick={() => resetForm({ values: emptyValues })}
                >
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
