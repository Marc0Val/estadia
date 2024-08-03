import React, { useCallback, useState, useEffect } from "react";
// Importación de los componentes de formulario
import BotonEditarModal from "./Buttons/BotonEditarModal";
import FormularioClientes from "../components/Forms/FormularioClientes";
import FormularioCategorias from "../components/Forms/FormularioCategorias";
import FormularioRoles from "../components/Forms/FormularioRoles";
import FormularioPersonal from "./Forms/FormularioPersonal";
import FormularioContactos from "./Forms/FormularioContactos";
import FormularioProveedores from "./Forms/FormularioProveedores";
import FormularioServicio from "./Forms/FormularioServicios";
import FormularioProductos from "./Forms/FormularioProductos";
import FormularioActivoCliente from "./Forms/FormularioActivoCliente";

// Componente TablaInfo para mostrar y gestionar una tabla de información
const TablaInfo = ({
  columns, // Columnas de la tabla
  data, // Datos a mostrar en la tabla
  totalRecords, // Número total de registros
  hiddenColumns = [], // Columnas ocultas
  customColumnNames = {}, // Nombres personalizados de las columnas
  formType, // Tipo de formulario para edición
  rowsPerPage = 15, // Filas por página
}) => {
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [filteredData, setFilteredData] = useState(data); // Datos filtrados
  const [filters, setFilters] = useState({}); // Filtros aplicados
  const [selectedFilter, setSelectedFilter] = useState(
    columns.find((col) => !hiddenColumns.includes(col)) // Filtro seleccionado
  );
  const [filterValue, setFilterValue] = useState(""); // Valor del filtro

  // Actualiza los datos filtrados cuando los datos cambian
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Función para obtener el ID para el formulario según el tipo de formulario
  const obtenerIdParaFormulario = useCallback(
    (formType, row) => {
      switch (formType) {
        case "clients":
          return row.id_client;
        case "categories":
          return row.id_category;
        case "roles":
          return row.id_role;
        case "personal":
          return row.id_personal;
        case "contacts":
          return row.id_contact;
        case "suppliers":
          return row.id_supplier;
        case "services":
          return row.id_service;
        case "products":
          return row.id_product;
        case "clients_assets":
          return row.id_client_asset;
        default:
          return null;
      }
    },
    [formType]
  );

  // Función para obtener el componente de formulario según el tipo de formulario e ID
  const obtenerComponenteFormulario = useCallback((formType, id) => {
    switch (formType) {
      case "clients":
        return <FormularioClientes id_cliente={id} />;
      case "categories":
        return <FormularioCategorias id_categoria={id} />;
      case "roles":
        return <FormularioRoles id_rol={id} />;
      case "personal":
        return <FormularioPersonal id_personal={id} />;
      case "contacts":
        return <FormularioContactos id_contact={id} />;
      case "suppliers":
        return <FormularioProveedores id_supplier={id} />;
      case "services":
        return <FormularioServicio id_service={id} />;
      case "products":
        return <FormularioProductos id_product={id} />;
      case "clients_assets":
        return <FormularioActivoCliente id_client_asset={id} />;
      default:
        return null;
    }
  }, []);

  // Maneja el cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Maneja el cambio de valor del filtro
  const handleFilterChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [selectedFilter]: value,
    }));
    setFilterValue(value);
  };

  // Filtra los datos según los filtros aplicados
  useEffect(() => {
    let filtered = data;
    Object.keys(filters).forEach((column) => {
      if (filters[column]) {
        filtered = filtered.filter((row) =>
          row[column]
            .toString()
            .toLowerCase()
            .includes(filters[column].toLowerCase())
        );
      }
    });
    setFilteredData(filtered);
  }, [filters, data]);

  // Datos paginados para la tabla
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Total de páginas
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="table-responsive">
      <div className="filter-bar">
        {/* Selector de filtros */}
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {columns.map(
            (column) =>
              !hiddenColumns.includes(column) && (
                <option key={column} value={column}>
                  {customColumnNames[column] || column}
                </option>
              )
          )}
        </select>
        {/* Input de valor del filtro */}
        <input
          type="text"
          value={filterValue}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder={`Filtrar por ${
            customColumnNames[selectedFilter] || selectedFilter
          }`}
        />
      </div>
      {/* Tabla de datos */}
      <table className="table align-middle table-hover">
        <thead>
          <tr>
            {/* Cabecera con el total de registros */}
            {totalRecords > 0 ? (
              <th colSpan={columns.length + 1} className="text-center">
                Total de registros: {totalRecords}
              </th>
            ) : (
              <th colSpan={columns.length + 1}></th>
            )}
          </tr>
          <tr>
            {/* Cabecera de columnas */}
            {columns.map((columnName, index) =>
              hiddenColumns.includes(columnName) ? null : (
                <th key={index}>
                  {customColumnNames[columnName] || columnName}
                </th>
              )
            )}
            <th className="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de datos */}
          {totalRecords > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {columns.map((columnName, colIndex) =>
                  hiddenColumns.includes(columnName) ? null : (
                    <td key={colIndex}>{row[columnName]}</td>
                  )
                )}
                <td>
                  {/* Botón para editar con el modal correspondiente */}
                  <BotonEditarModal
                    nombreBoton="Editar"
                    icono="bi bi-pencil"
                    contenidoModal={() =>
                      obtenerComponenteFormulario(
                        formType,
                        obtenerIdParaFormulario(formType, row)
                      )
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                <strong>Ningún dato disponible en esta tabla</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TablaInfo;
