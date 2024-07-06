import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useCategories } from "../../context/CategoriesContext";

// Esquema de validación
const validationSchema = Yup.object().shape({
  name_: Yup.string().required("Este campo es obligatorio"),
});

const FormularioCategorias = ({ id_categoria }) => {
  const { getCategory, createCategory, updateCategory } = useCategories();
  const [initialValues, setInitialValues] = useState({
    name_: "",
  });

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        if (id_categoria) {
          const categoryData = await getCategory(id_categoria);

          if (categoryData) {
            setInitialValues(categoryData);
          }
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [id_categoria, getCategory]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (id_categoria) {
            await updateCategory(id_categoria, values);
            Swal.fire({
              icon: "success",
              title: "Categoría actualizada",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            await createCategory(values);
            Swal.fire({
              icon: "success",
              title: "Categoría creada",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al guardar la categoría",
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
