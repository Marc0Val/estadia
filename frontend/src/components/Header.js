import React from "react";
import BotonXLS from "./Buttons/BotonXLS";
import BotonPDF from "./Buttons/BotonPDF";

const Header = ({ botonAgregar }) => {
  return (
    <div className="d-flex flex-row-reverse">
      <div className="mx-2">
        <BotonXLS />
      </div>
      <div className="mx-2">
        <BotonPDF />
      </div>
      <div className="mx-2">{botonAgregar}</div>
    </div>
  );
};

export default Header;
