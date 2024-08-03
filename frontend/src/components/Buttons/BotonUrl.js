import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BotonUrl = ({ nombreBoton, icono, url }) => {
  const navigate = useNavigate();

  // Función manejadora del clic en el botón.
  // Redirige a la URL especificada en la prop `url`.

  const handleClick = () => {
    navigate(url);
  };

  return (
    <Button variant="info" onClick={handleClick}>
      <i className={icono}></i> {nombreBoton}
    </Button>
  );
};

export default BotonUrl;
