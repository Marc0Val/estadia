import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioProducto from "../components/Forms/FormularioProductos";
import Header from "../components/Header";
import { useProducts } from "../context/ProductsContext";
import BotonPDF from "../components/Buttons/BotonPDF";

const ProductsPage = () => {
  const { productsProvider, getProductsProvider } = useProducts();

  const columnNames = [
    "id_product",
    "unit",
    "name_",
    "sale_price",
    "initial_stock",
    "supplier_name",
  ];

  useEffect(() => {
    getProductsProvider();
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
            data={productsProvider}
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
        data={productsProvider}
        totalRecords={productsProvider.length}
        hiddenColumns={["id_product"]}
        customColumnNames={{
          unit: "Unidad",
          name_: "Nombre",
          sale_price: "Precio",
          initial_stock: "Stock",
          supplier_name: "Proveedor",
        }}
        formType="products"
      />
    </div>
  );
};

export default ProductsPage;
