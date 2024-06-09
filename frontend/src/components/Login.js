import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaSignInAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import BotonModal from "./Buttons/BotonModal";
import FormularioPersonal from "./Forms/FormularioPersonal";

function Login() {
  // posible logica de inicio de sesion
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/home");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data,
      });
    }
  };
  return (
    <div className="login-container animated-drop">
      <div className="animated-drop">
        <img src={logo} alt="logo" />
      </div>
      <strong>Autenticarse para iniciar sesión</strong>
      <hr />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="mb-3">
          <input
            placeholder="Correo"
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Contraseña"
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn2"
          disabled={!email || !password}
          style={{
            hover: {
              backgroundColor: "blue",
            },
          }}
          title="Iniciar sesión"
        >
          {/* <FaSignInAlt /> */}
          Acceder
        </button>
      </form>
      <div className="links d-flex justify-content-between">
        <BotonModal
          icono="fas fa-key"
          contenidoModal={
            <div>
              <h1>Info solo de prueba</h1>
            </div>
          }
          titulo="Recuperar contraseña"
        />
        <BotonModal
          icono="fas fa-user-plus"
          contenidoModal={<FormularioPersonal />}
          titulo="Registro"
        />
      </div>
    </div>
  );
}

export default Login;
