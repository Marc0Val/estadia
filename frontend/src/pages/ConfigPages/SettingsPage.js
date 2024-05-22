import React, { useEffect, useState } from "react";
import FormularioSettings from "../../components/Forms/FormularioSettings";

const SettingsPage = () => {
  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-cogs"></i> Configuraciones
      </p>
      <hr />
      <FormularioSettings />
    </div>
  );
};

export default SettingsPage;
