import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import TablaInfo from "../components/TablaInfo";
import BotonModal from "../components/Buttons/BotonModal";
import FormularioPersonal from "../components/Forms/FormularioPersonal";
import Header from "../components/Header";

const PersonalPage = () => {
  const [data, setData] = useState([]);
  const columnNames = ["idCodigo", "Nombre", "Celular", "Rol", "Estado"];
  // informacion de prueba
  useEffect(() => {
    const fetchData = async () => {
      setData([
        {
          idCodigo: 1,
          Nombre: "Juan Perez",
          Celular: "1234567890",
          Rol: "Administrador",
          Estado: "Activo",
        },
        {
          idCodigo: 2,
          Nombre: "Maria Lopez",
          Celular: "0987654321",
          Rol: "Cajero",
          Estado: "Activo",
        },
        {
          idCodigo: 3,
          Nombre: "Pedro Ramirez",
          Celular: "6789012345",
          Rol: "Cajero",
          Estado: "Inactivo",
        },
        {
          idCodigo: 4,
          Nombre: "Ana Rodriguez",
          Celular: "5432167890",
          Rol: "Administrador",
          Estado: "Activo",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="contenedor container-fluid">
      <p className="subtitulo">
        <i className="fas fa-users"></i> Personal
      </p>
      <hr />
      <Header
        botonAgregar={
          <BotonModal
            nombreBoton="Nuevo Personal"
            icono="fas fa-plus"
            contenidoModal={<FormularioPersonal />}
          />
        }
      />
      <TablaInfo columns={columnNames} data={data} totalRecords={data.length} />
    </div>
  );
};

export default PersonalPage;

// ignora, es solo logica no implementada de la pagina de personal en la que se actualizan los datos cada 5 segundos
// peeeeero hace peticiones de forma que puede volver lento el servidor

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import TablaInfo from "../components/TablaInfo";

// const PersonalPage = () => {
//   const [data, setData] = useState([]);
//   const columnNames = ["idCodigo", "Nombre", "celular", "rol", "estado"];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await axios.get("http://localhost:3001/personal");
//         setData(result.data);
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'No se pudieron cargar los datos del personal',
//         });
//       }
//     };

//     fetchData();

//     // Actualizar los datos cada 5 segundos
//     const intervalId = setInterval(fetchData, 5000);

//     // Limpiar el intervalo cuando el componente se desmonte
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="contenedor container-fluid">
//       <p className="subtitulo">
//         <i className="fas fa-users"></i> Personal
//       </p>
//       <hr />
//       <TablaInfo
//         rows={data}
//         columns={columnNames.length}
//         columnNames={columnNames}
//         totalRecords={data.length}
//       />
//     </div>
//   );
// };

// export default PersonalPage;
