import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioProducto from "../components/Forms/FormularioProductos";
import Header from "../components/Header";

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const columnNames = [
    "idCodigo",
    "Unidad",
    "Nombre",
    "Precio",
    "Stock",
    "Proveedor",
  ];
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          Unidad: "Unidad 1",
          Nombre: "Producto 1",
          Precio: "10.00",
          Stock: "100",
          Proveedor: "Proveedor 1",
        },
        {
          idCodigo: 2,
          Unidad: "Unidad 2",
          Nombre: "Producto 2",
          Precio: "20.00",
          Stock: "200",
          Proveedor: "Proveedor 2",
        },
        {
          idCodigo: 3,
          Unidad: "Unidad 3",
          Nombre: "Producto 3",
          Precio: "30.00",
          Stock: "300",
          Proveedor: "Proveedor 3",
        },
        {
          idCodigo: 4,
          Unidad: "Unidad 4",
          Nombre: "Producto 4",
          Precio: "40.00",
          Stock: "400",
          Proveedor: "Proveedor 4",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-boxes"></i> Productos
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Producto"
            icono="fas fa-plus"
            contenidoModal={<FormularioProducto />}
            titulo="Agregar Nuevo Producto"
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default ProductsPage;
