import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Container, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTaskRequest } from "../../api/tasks.api";
import { getClientsRequest } from "../../api/clients.api";
import { getPersonalRequest2 } from "../../api/personal.api";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Este campo es requerido"),
  client_id: Yup.number().required("Este campo es requerido"),
  description_: Yup.string().required("Este campo es requerido"),
  date_: Yup.date().required("Este campo es requerido"),
  start_time: Yup.string().required("Este campo es requerido"),
  end_time: Yup.string().required("Este campo es requerido"),
  assigned_to: Yup.number().required("Este campo es requerido"),
  status_: Yup.string().required("Este campo es requerido"),
});

const initialValues = {
  title: "",
  client_id: "",
  description_: "",
  date_: new Date(),
  start_time: "",
  end_time: "",
  assigned_to: "",
  status_: "Pendiente",
};

const FormularioTareas = () => {
  const [clients, setClients] = React.useState([]);
  const [personal, setPersonal] = React.useState([]);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const response = await getClientsRequest();
        if (Array.isArray(response.data)) {
          setClients(response.data);
        } else {
          // console.log("Error al cargar los clientes", response.data);
        }
      } catch (error) {
        // console.log("Error al cargar los clientes", error);
      }
    };
    cargarClientes();
  }, []);

  useEffect(() => {
    const cargarPersonal = async () => {
      try {
        const response = await getPersonalRequest2();
        if (Array.isArray(response.data)) {
          setPersonal(response.data);
        } else {
          // console.log("Error al cargar el personal", response.data);
        }
      } catch (error) {
        // console.log("Error al cargar el personal", error);
      }
    };
    cargarPersonal();
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      // console.log(values);
      await createTaskRequest(values);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar la tarea",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, isValid, dirty, resetForm, setFieldValue, values }) => (
        <Container className="mt-4">
          <Form>
            <p className="text-muted">
              Complete el formulario | (*) Campos obligatorios
            </p>
            <hr />
            <Row className="mb-3">
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
                <label htmlFor="client_id">
                  <strong>Cliente *</strong>
                </label>
                <Field
                  as="select"
                  id="client_id"
                  name="client_id"
                  className={`form-control ${
                    errors.client_id ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Seleccione un cliente</option>
                  {clients.map((client) => (
                    <option key={client.id_client} value={client.id_client}>
                      {client.trade_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="client_id"
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
                  rows={3}
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
                <label htmlFor="date_">
                  <strong>Fecha *</strong>
                </label>
                <DatePicker
                  id="date_"
                  name="date_"
                  selected={values.date_}
                  className={`form-control ${errors.date_ ? "is-invalid" : ""}`}
                  onChange={(date) => setFieldValue("date_", date)}
                />
                <ErrorMessage
                  name="date_"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>

              <Col>
                <label htmlFor="start_time">
                  <strong>Hora de Inicio *</strong>
                </label>
                <Field
                  type="time"
                  id="start_time"
                  name="start_time"
                  className={`form-control ${
                    errors.start_time ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="start_time"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="end_time">
                  <strong>Hora de Fin *</strong>
                </label>
                <Field
                  type="time"
                  id="end_time"
                  name="end_time"
                  className={`form-control ${
                    errors.end_time ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="end_time"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="assigned_to">
                  <strong>Asignado a *</strong>
                </label>
                <Field
                  as="select"
                  id="assigned_to"
                  name="assigned_to"
                  className={`form-control ${
                    errors.assigned_to ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Seleccione una persona</option>
                  {personal.map((persona) => (
                    <option
                      key={persona.id_personal}
                      value={persona.id_personal}
                    >
                      {persona.name_}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="assigned_to"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="status_">
                  <strong>Estado *</strong>
                </label>
                <Field
                  as="select"
                  id="status_"
                  name="status_"
                  className={`form-control ${
                    errors.status_ ? "is-invalid" : ""
                  }`}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Proceso">Proceso</option>
                  <option value="Terminada">Terminada</option>
                </Field>
                <ErrorMessage
                  name="status_"
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
              variant="danger"
              type="reset"
              className="ms-2"
              onClick={() => resetForm({ values: initialValues })}
            >
              <i className="fas fa-eraser"></i> Limpiar
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormularioTareas;
