// crear un componente que renderice un boton al hacer click genere un pdf con la informacion de la tabla
// el pdf debe contener la informacion de la tabla
// el boton recibira las propiedades de "a que tabla se le genera el pdf"
// como estetica, el boton tiene que ser un boton de color gris con el icono de pdf
// el boton debe tener un tooltip que diga "Generar PDF"
// por el momento solo crear el boton con la estetica dicha, no es necesario que genere el pdf sino una alerta swal

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
