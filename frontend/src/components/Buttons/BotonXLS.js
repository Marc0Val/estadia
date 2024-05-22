// crear un componente que renderice un boton al hacer click genere un xls con la informacion de la tabla
// el xls debe contener la informacion de la tabla
// el boton recibira las propiedades de "a que tabla se le genera el xls"
// como estetica, el boton tiene que ser un boton de color gris con el icono de XLS
// el boton debe tener un tooltip que diga "Generar XLS"
// por el momento solo crear el boton con la estetica dicha, no es necesario que genere el xls sino una alerta swal

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
