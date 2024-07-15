import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioProducto from "../components/Forms/FormularioProductos";
import Header from "../components/Header";
import { getProductsProviderRequest } from "../api/products.api";
import BotonPDF from "../components/Buttons/BotonPDF";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const columnNames = [
    "id_product",
    "unit",
    "name_",
    "sale_price",
    "initial_stock",
    "supplier_name",
  ];

  useEffect(() => {
    async function cargarProductos() {
      const response = await getProductsProviderRequest();
      if (Array.isArray(response.data)) {
        // Asegúrate de que response.data sea un arreglo
        setProducts(response.data);
      } else {
        console.log("La respuesta no es un arreglo", response.data);
        setProducts([]);
      }
      console.log(response);
    }
    cargarProductos();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-boxes"></i> Productos
      </p>
      <hr />
      <Header
        contenido={
          <BotonPDF
            pageTitle={"Productos"}
            columns={{
              unit: "Unidad",
              name_: "Nombre",
              sale_price: "Precio",
              initial_stock: "Stock",
              supplier_name: "Proveedor",
            }}
            data={products}
          />
        }
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Producto"
            icono="fas fa-plus"
            contenidoModal={<FormularioProducto />}
            titulo="Agregar Nuevo Producto"
          />
        }
      />
      <TablaInfo
        columns={columnNames}
        data={products}
        totalRecords={products.length}
        fetchElemento={getProductsProviderRequest}
        hiddenColumns={["id_product"]}
        customColumnNames={{
          unit: "Unidad",
          name_: "Nombre",
          sale_price: "Precio",
          initial_stock: "Stock",
          supplier_name: "Proveedor",
        }}
      />
    </div>
  );
};

export default ProductsPage;
