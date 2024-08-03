import React, { useCallback, useState, useEffect } from "react";
import BotonEditarModal from "./Buttons/BotonEditarModal";
import BotonUrl from "./Buttons/BotonUrl";
import FormularioClientes from "../components/Forms/FormularioClientes";
import FormularioCategorias from "../components/Forms/FormularioCategorias";
import FormularioRoles from "../components/Forms/FormularioRoles";
import FormularioPersonal from "./Forms/FormularioPersonal";
import FormularioContactos from "./Forms/FormularioContactos";
import FormularioProveedores from "./Forms/FormularioProveedores";
import FormularioServicio from "./Forms/FormularioServicios";
import FormularioProductos from "./Forms/FormularioProductos";
import FormularioActivoCliente from "./Forms/FormularioActivoCliente";

const TablaInfo = ({
  columns,
  data,
  totalRecords,
  hiddenColumns = [],
  customColumnNames = {},
  formType,
  rowsPerPage = 15,
  specialPages = false,
  baseUrl = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(
    columns.find((col) => !hiddenColumns.includes(col))
  );
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [selectedFilter]: value,
    }));
    setFilterValue(value);
  };

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

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="table-responsive">
      <div className="filter-bar">
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
        <input
          type="text"
          value={filterValue}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder={`Filtrar por ${
            customColumnNames[selectedFilter] || selectedFilter
          }`}
        />
      </div>
      <table className="table align-middle table-hover">
        <thead>
          <tr>
            {totalRecords > 0 ? (
              <th colSpan={columns.length + 1} className="text-center">
                Total de registros: {totalRecords}
              </th>
            ) : (
              <th colSpan={columns.length + 1}></th>
            )}
          </tr>
          <tr>
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
          {totalRecords > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {columns.map((columnName, colIndex) =>
                  hiddenColumns.includes(columnName) ? null : (
                    <td key={colIndex}>{row[columnName]}</td>
                  )
                )}
                <td>
                  {specialPages ? (
                    <BotonUrl
                      nombreBoton="Editar"
                      icono="bi bi-pencil"
                      url={`${baseUrl}/${obtenerIdParaFormulario(
                        formType,
                        row
                      )}`}
                    />
                  ) : (
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
                  )}
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
