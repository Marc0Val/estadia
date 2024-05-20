import React, { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/BotonModal";

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
      <BotonModal
        nombreBoton="Agregar producto"
        icono="fas fa-plus"
        contenidoModal={
          <form>
            {/* nombre */}
            <div className="form-group">
              <label htmlFor="nombre">
                <strong>Nombre*</strong>
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
              />
            </div>
            {/* categoria */}
            <div className="form-group">
              <label htmlFor="categoria">
                <strong>Categoría*</strong>
              </label>
              <select
                required
                className="form-control"
                id="categoria"
                placeholder="Categoría"
              >
                <option value="1">Categoria de las creadas</option>
              </select>
            </div>
            {/* Unidad seleccionable: por definir, conjunto, cubeta, gramo, galon, Kilogramo, kit, Metro cuadrado, Metro Cubico, Metro, Onza, Pieza, Rolo, Servicio, Tramo  */}
            <div className="form-group">
              <label htmlFor="unidad">
                <strong>Unidad*</strong>
              </label>
              <select
                required
                className="form-control"
                id="unidad"
                placeholder="Unidad"
              >
                <option value="conjunto">Conjunto</option>
                <option value="cubeta">Cubeta</option>
                <option value="gramo">Gramo</option>
                <option value="galon">Galon</option>
                <option value="kilogramo">Kilogramo</option>
                <option value="kit">Kit</option>
                <option value="metro cuadrado">Metro cuadrado</option>
                <option value="metro cubico">Metro cubico</option>
                <option value="metro">Metro</option>
                <option value="onza">Onza</option>
                <option value="pieza">Pieza</option>
                <option value="rollo">Rollo</option>
                <option value="servicio">Servicio</option>
                <option value="tramo">Tramo</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">
                <strong>Descripción*</strong>
              </label>
              <textarea
                required
                className="form-control"
                id="descripcion"
                placeholder="Descripción"
              ></textarea>
            </div>
            {/* precio de venta obligatorio */}
            <div className="form-group">
              <label htmlFor="precioVenta">
                <strong>Precio de venta*</strong>
              </label>
              <input
                required
                type="number"
                className="form-control"
                id="precioVenta"
                placeholder="Precio de venta"
              />
            </div>
            {/* modelo (opcional) */}
            <div className="form-group">
              <label htmlFor="modelo">
                <strong>Modelo</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="modelo"
                placeholder="Modelo"
              />
            </div>
            {/* codigo de fabrica (opcional) */}
            <div className="form-group">
              <label htmlFor="codigoFabrica">
                <strong>Código de fabrica</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="codigoFabrica"
                placeholder="Código de fabrica"
              />
            </div>
            {/* proveedor seleccionable (opcional) */}
            <div className="form-group">
              <label htmlFor="proveedor">
                <strong>Proveedor</strong>
              </label>
              <select
                className="form-control"
                id="proveedor"
                placeholder="Proveedor"
              >
                <option value="x">Por definir</option>
              </select>
            </div>
            {/* fabricante/marca opcional */}
            <div className="form-group">
              <label htmlFor="fabricante">
                <strong>Fabricante</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="fabricante"
                placeholder="Fabricante"
              />
            </div>
            {/* punto de pedido obligatorio numerico minimo 1*/}
            <div className="form-group">
              <label htmlFor="puntoPedido">
                <strong>Punto de pedido*</strong>
              </label>
              <input
                required
                type="number"
                className="form-control"
                id="puntoPedido"
                placeholder="Punto de pedido"
              />
            </div>
            {/* stock inicial obligatorio numerico */}
            <div className="form-group">
              <label htmlFor="stockInicial">
                <strong>Stock inicial*</strong>
              </label>
              <input
                required
                type="number"
                className="form-control"
                id="stockInicial"
                placeholder="Stock inicial"
              />
            </div>
            {/* stock  minimo obligatorio numerico */}
            <div className="form-group">
              <label htmlFor="stockMinimo">
                <strong>Stock mínimo*</strong>
              </label>
              <input
                required
                type="number"
                className="form-control"
                id="stockMinimo"
                placeholder="Stock mínimo"
              />
            </div>
            <hr />
            <div className="container-fluid">
              <div className="form-group">
                <label htmlFor="imagen">
                  <strong>Imagen</strong>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imagen"
                  placeholder="Imagen"
                />
              </div>
              <div className="form-group">
                <label htmlFor="documento">
                  <strong>Documento informativo</strong>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="documento"
                  placeholder="Documento informativo"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
              <button type="reset" className="btn btn-secondary mr-2">
                <i className="fas fa-eraser"></i>
              </button>
            </div>
          </form>
        }
      />
      <hr />

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
