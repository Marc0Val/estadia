import React from "react";
import Swal from "sweetalert2";

const BotonXLS = () => {
  const handleClick = () => {
    Swal.fire({
      icon: "success",
      title: "XLS generado",
      text: "El XLS se ha generado correctamente",
    });
  };

  return (
    <button
      className="btn btn-secondary"
      onClick={handleClick}
      title="Generar XLS"
    >
      <i className="fas fa-file-excel"></i>
    </button>
  );
};

export default BotonXLS;
