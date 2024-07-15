import React from "react";

const Header = ({ botonAgregar, contenido }) => {
  return (
    <div className="d-flex flex-row-reverse">
      <div className="mx-2">{contenido}</div>
      <div className="mx-2">{botonAgregar}</div>
    </div>
  );
};

export default Header;
