import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import BotonModal from "./Buttons/BotonModal";
import FormularioPersonalLogin from "./Forms/FormularioPersonalLogin";
import FormularioRecoverContraseña from "./Forms/FormularioRecoverContraseña";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("ye");
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  // Refs para los campos del formulario
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password_ = passwordRef.current.value;

    try {
      await login(email, password_);
      Swal.fire({
        icon: "success",
        title: "Login exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data : error.message,
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
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Contraseña"
            type="password"
            className="form-control"
            id="password"
            ref={passwordRef}
          />
        </div>
        <button
          type="submit"
          className="btn2"
          style={{
            hover: {
              backgroundColor: "blue",
            },
          }}
          title="Iniciar sesión"
        >
          Acceder
        </button>
      </form>
      <div className="links d-flex justify-content-between">
        <BotonModal
          icono="fas fa-key"
          contenidoModal={<FormularioRecoverContraseña />}
          titulo="Recuperar contraseña"
        />
        <BotonModal
          icono="fas fa-user-plus"
          contenidoModal={<FormularioPersonalLogin />}
          titulo="Registro"
        />
      </div>
    </div>
  );
}

export default Login;
