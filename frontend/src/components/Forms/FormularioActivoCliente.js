import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useClientAssets } from "../../context/ClientsAssetsContext";
import { useProducts } from "../../context/ProductsContext";
import { useClients } from "../../context/ClientsContext";

// Esquema de validación
const validationSchema = Yup.object().shape({
  product_id: Yup.number().required("Este campo es obligatorio"),
  client_id: Yup.number(),
  name_: Yup.string().required("Este campo es obligatorio"),
  description_: Yup.string().required("Este campo es obligatorio"),
  serial_: Yup.number(),
  inventory_number: Yup.number(),
});

const FormularioActivoCliente = ({ id_client_asset }) => {
  const { createClientAsset, updateClientAsset, getClientAsset } =
    useClientAssets();
  const { products } = useProducts();
  const { clients } = useClients();

  const emptyValues = {
    product_id: "",
    client_id: "",
    name_: "",
    description_: "",
    serial_: "",
    inventory_number: "",
  };

  const [initialValues, setInitialValues] = useState(emptyValues);

  useEffect(() => {
    const fetchClientAssetData = async () => {
      if (id_client_asset) {
        try {
          const assetData = await getClientAsset(id_client_asset);
          if (assetData) {
            setInitialValues(assetData);
          }
        } catch (error) {
          console.error("Error fetching client asset data:", error);
        }
      }
    };

    fetchClientAssetData();
  }, [id_client_asset, getClientAsset]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (id_client_asset) {
            await updateClientAsset(id_client_asset, values);
            Swal.fire({
              icon: "success",
              title: "Activo actualizado",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            await createClientAsset(values);
            Swal.fire({
              icon: "success",
              title: "Activo creado",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          resetForm();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al guardar el activo",
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
                <label htmlFor="product_id">
                  <strong>Producto *</strong>
                </label>
                <Field
                  as="select"
                  id="product_id"
                  name="product_id"
                  className={`form-control ${
                    errors.product_id ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Seleccione un producto</option>
                  {products.map((product) => (
                    <option key={product.id_product} value={product.id_product}>
                      {product.name_}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="product_id"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="client_id">
                  <strong>Cliente</strong>
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
                <label htmlFor="name_">
                  <strong>Nombre *</strong>
                </label>
                <Field
                  type="text"
                  id="name_"
                  name="name_"
                  className="form-control"
                />
                <ErrorMessage
                  name="name_"
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
                  id="description_"
                  name="description_"
                  className="form-control"
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
                <label htmlFor="serial_">
                  <strong>Serie</strong>
                </label>
                <Field
                  type="text"
                  id="serial_"
                  name="serial_"
                  className="form-control"
                />
                <ErrorMessage
                  name="serial_"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <label htmlFor="inventory_number">
                  <strong>Nro Inventario</strong>
                </label>
                <Field
                  type="text"
                  id="inventory_number"
                  name="inventory_number"
                  className="form-control"
                />
                <ErrorMessage
                  name="inventory_number"
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
              onClick={() => resetForm({ values: emptyValues })}
            >
              <i className="fas fa-eraser"></i> Limpiar
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormularioActivoCliente;
