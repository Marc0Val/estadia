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
          />
        }
      />
      <TablaInfo
        rows={data.length}
        columns={columnNames}
        data={data}
        totalRecords={data.length}
      />
    </div>
  );
};

export default ProductsPage;
