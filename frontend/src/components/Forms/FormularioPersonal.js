import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { createPersonalRequest } from "../../api/personal.api";
import { getRolesRequest } from "../../api/role.api";

const FormularioPersonal = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const cargarRoles = async () => {
      try {
        const response = await getRolesRequest();
        if (Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          console.error("Error al cargar los roles:", response.data);
        }
      } catch (error) {
        console.error("Error al cargar los roles:", error);
      }
    };
    cargarRoles();
  }, []);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name_: Yup.string().required("Este campo es obligatorio"),
    last_name: Yup.string().required("Este campo es obligatorio"),
    role_id: Yup.number()
      .required("Seleccione un rol")
      .integer("Debe ser un número entero"),
    title: Yup.string(),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Este campo es obligatorio"),
    cell_number: Yup.string().required("Este campo es obligatorio"),
    country: Yup.string().required("Este campo es obligatorio"),
    state_: Yup.string().required("Este campo es obligatorio"),
    city: Yup.string().required("Este campo es obligatorio"),
    phone: Yup.string(),
    address_: Yup.string().required("Este campo es obligatorio"),
    password_: Yup.string()
      .required("Este campo es obligatorio")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password_"), null], "Las contraseñas deben coincidir")
      .required("Este campo es obligatorio"),
  });

  return (
    <Formik
      initialValues={{
        name_: "",
        last_name: "",
        role_id: "",
        title: "",
        email: "",
        cell_number: "",
        country: "",
        state_: "",
        city: "",
        phone: "",
        address_: "",
        password_: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          // console.log("Datos a guardar:", values);
          await createPersonalRequest(values);
          Swal.fire({
            icon: "success",
            title: "Datos guardados",
            showConfirmButton: false,
            timer: 1500,
          });
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
        <Form className="container mt-4">
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
                name="name_"
                id="name_"
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
                name="last_name"
                id="last_name"
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
              <label htmlFor="role_id">
                <strong>Rol *</strong>
              </label>
              <Field
                as="select"
                name="role_id"
                id="role_id"
                className={`form-control ${errors.role_id ? "is-invalid" : ""}`}
              >
                <option value="">Seleccione un rol</option>
                {roles.map((rol) => (
                  <option key={rol.id_role} value={rol.id_role}>
                    {rol.name_role}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="role_id"
                component="div"
                className="invalid-feedback"
              />
            </Col>
            <Col>
              <label htmlFor="title">
                <strong>Título</strong>
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="form-control"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label htmlFor="email">
                <strong>Correo *</strong>
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </Col>
            <Col>
              <label htmlFor="cell_number">
                <strong>Celular *</strong>
              </label>
              <Field
                type="text"
                name="cell_number"
                id="cell_number"
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
          </Row>
          <Row className="mb-3">
            <Col>
              <label htmlFor="country">
                <strong>País *</strong>
              </label>
              <Field
                type="text"
                name="country"
                id="country"
                className={`form-control ${errors.country ? "is-invalid" : ""}`}
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
                name="state_"
                id="state_"
                className={`form-control ${errors.state_ ? "is-invalid" : ""}`}
              />
              <ErrorMessage
                name="state_"
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
                name="city"
                id="city"
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
              <label htmlFor="phone">
                <strong>Teléfono</strong>
              </label>
              <Field
                type="text"
                name="phone"
                id="phone"
                className="form-control"
              />
            </Col>
            <Col>
              <label htmlFor="address_">
                <strong>Dirección *</strong>
              </label>
              <Field
                as="textarea"
                name="address_"
                id="address_"
                rows={3}
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
          </Row>
          <Row className="mb-3">
            <Col>
              <label htmlFor="password_">
                <strong>Contraseña *</strong>
              </label>
              <Field
                type="password"
                name="password_"
                id="password_"
                className={`form-control ${
                  errors.password_ ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="password_"
                component="div"
                className="invalid-feedback"
              />
            </Col>
            <Col>
              <label htmlFor="confirmPassword">
                <strong>Confirmar Contraseña *</strong>
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </Row>
          <hr />
          <Button variant="success" type="submit" disabled={!isValid || !dirty}>
            <i className="fas fa-save"></i> Guardar
          </Button>
          <Button variant="danger" type="reset">
            <i className="fas fa-eraser"></i> Limpiar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioPersonal;
