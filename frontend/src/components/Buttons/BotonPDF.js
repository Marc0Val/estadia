import React from "react";
import Swal from "sweetalert2";

const BotonPDF = () => {
  const handleClick = () => {
    Swal.fire({
      icon: "success",
      title: "PDF generado",
      text: "El PDF se ha generado correctamente",
    });
  };

  return (
    <button
      className="btn btn-secondary"
      onClick={handleClick}
      title="Generar PDF"
    >
      <i className="fas fa-file-pdf"></i>
    </button>
  );
};

export default BotonPDF;
