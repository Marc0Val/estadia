import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useRoles } from "../../context/RolesContext";

// Esquema de validación
const validationSchema = Yup.object().shape({
  name_role: Yup.string().required("Este campo es obligatorio"),
});

const FormularioRoles = ({ id_rol }) => {
  const { getRole, createRole, updateRole } = useRoles();
  const [initialValues, setInitialValues] = useState({
    name_role: "",
  });
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelRequest = false;

    const fetchRoleData = async () => {
      try {
        if (id_rol) {
          const roleData = await getRole(id_rol);
          if (!cancelRequest && isMountedRef.current) {
            setInitialValues(roleData);
          }
        }
      } catch (error) {
        console.error("Error fetching role data:", error);
      }
    };

    fetchRoleData();

    return () => {
      cancelRequest = true;
    };
  }, [id_rol, getRole]);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      if (id_rol) {
        await updateRole(id_rol, values);
        Swal.fire({
          icon: "success",
          title: "Rol actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await createRole(values);
        Swal.fire({
          icon: "success",
          title: "Rol creado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar el rol",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
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
            <Button
              variant="secondary"
              type="button"
              onClick={() => resetForm({ values: initialValues })}
              className="ms-2"
            >
              <i className="fas fa-eraser"></i> Limpiar
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormularioRoles;
