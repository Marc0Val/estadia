// pagina que solo se puede acceder si el usuario esta logueado
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ProtectedPage() {
  return (
    <div>
      <Sidebar/>
      <h1>Página protegida</h1>
      <p>Esta página solo se puede ver si estás logueado.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default ProtectedPage;
