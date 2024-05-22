
import React from "react";
import BotonXLS from "./Buttons/BotonXLS";
import BotonPDF from "./Buttons/BotonPDF";

const Header = ({ botonAgregar }) => {
  return (
    <div className="d-flex flex-row-reverse">
      <div>
        <BotonXLS />
        <BotonPDF />
      </div>
      <div>{botonAgregar}</div>
    </div>
  );
};

export default Header;
