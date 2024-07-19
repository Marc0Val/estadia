import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useContacts } from "../../context/ContactsContext";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  name_: Yup.string().required("Este campo es obligatorio"),
  last_name: Yup.string().required("Este campo es obligatorio"),
  position: Yup.string().required("Este campo es obligatorio"),
  title: Yup.string().required("Este campo es obligatorio"),
  cell_number: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^[0-9]{10}$/, "Debe ser un número de 10 dígitos"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Este campo es obligatorio"),
});

const FormularioContacto = ({ id_contact }) => {
  const { getContact, createContact, updateContact } = useContacts();

  const emptyValues = {
    name_: "",
    last_name: "",
    position: "",
    title: "",
    type_: "",
    cell_number: "",
    phone_number: "",
    email: "",
    street: "",
    number_: "",
    neighborhood: "",
    country: "",
    state_: "",
    city: "",
    postal_code: "",
  };

  const [initialValues, setInitialValues] = useState(emptyValues);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        if (id_contact) {
          const contactData = await getContact(id_contact);
          if (contactData) {
            setInitialValues(contactData);
          }
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, [id_contact, getContact]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (id_contact) {
            await updateContact(id_contact, values);
            Swal.fire({
              icon: "success",
              title: "Contacto actualizado",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            await createContact(values);
            Swal.fire({
              icon: "success",
              title: "Contacto creado",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al guardar los datos",
            showConfirmButton: false,
            timer: 1500,
          });
          console.error("Error al guardar los datos", error);
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
                <label htmlFor="last_name">
                  <strong>Apellido *</strong>
                </label>
                <Field
                  type="text"
                  id="last_name"
                  name="last_name"
                  className={`form-control ${
                    errors.last_name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="position">
                  <strong>Cargo *</strong>
                </label>
                <Field
                  type="text"
                  id="position"
                  name="position"
                  className={`form-control ${
                    errors.position ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="position"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="title">
                  <strong>Título *</strong>
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="type_">
                  <strong>Tipo</strong>
                </label>
                <Field
                  type="text"
                  id="type_"
                  name="type_"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="cell_number">
                  <strong>Celular *</strong>
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
                <label htmlFor="phone_number">
                  <strong>Teléfono</strong>
                </label>
                <Field
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  className="form-control"
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
                <label htmlFor="street">
                  <strong>Calle</strong>
                </label>
                <Field
                  type="text"
                  id="street"
                  name="street"
                  className="form-control"
                />
              </Col>
              <Col>
                <label htmlFor="number_">
                  <strong>Número</strong>
                </label>
                <Field
                  type="text"
                  id="number_"
                  name="number_"
                  className="form-control"
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
              </Col>
              <Col>
                <label htmlFor="country">
                  <strong>País</strong>
                </label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="state_">
                  <strong>Estado</strong>
                </label>
                <Field
                  type="text"
                  id="state_"
                  name="state_"
                  className="form-control"
                />
              </Col>
              <Col>
                <label htmlFor="city">
                  <strong>Ciudad</strong>
                </label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
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
              </Col>
            </Row>
            <hr />
            <Button
              variant="success"
              type="submit"
              disabled={!isValid || !dirty}
            >
              {id_contact ? "Actualizar Contacto" : "Registrar Contacto"}
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

export default FormularioContacto;
