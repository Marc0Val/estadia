# Chat en tiempo real

Un chat en tiempo real construido con React, Node.js, Express y Socket.io.

## Requisitos:

Para comenzar con el proyecto, tienes que asegurarte que Node.js esté instalado, ya que utilizaremos "npm" o "yarn" en nuestra linea de comandos. Puedes derscargarlo desde la página oficial de Node.js: [Click aquí para ir](https://nodejs.org/en/download)

## Especifiaciones generales:

### Dependencias.

Aquí están algunas de las dependencias que utilizaremos para este proyecto

#### Backend:

- bcrypt (^5.1.1) → Cifrado de contraseñas.
- cors (^2.8.5) → Habilita CORS en Express.
- dotenv (16.4.7) → Manejo de variables de entorno.
- express (4.21.2) → Framework para el backend.
- jsonwebtoken (^9.0.2) → Generación y verificación de JWT.
- mongodb (6.14.1) → Cliente oficial para MongoDB.
- mongoose (^8.12.0) → ODM para MongoDB con validación de datos.
- morgan (1.10.0) → Middleware para registrar peticiones HTTP.
- socket.io (4.8.1) → Comunicación en tiempo real con WebSockets.

#### Frontend:

- React (^19.0.0) → Biblioteca para construir interfaces de usuario.
- React DOM (^19.0.0) → Conecta React con el DOM.
- React Router DOM (^6.30.0) → Enrutamiento para aplicaciones React.
- Axios (^1.8.1) → Cliente HTTP para realizar peticiones a la API.
- Socket.io Client (^4.8.1) → Comunicación en tiempo real con WebSockets.
- React Scripts (^5.0.1) → Scripts y configuración para proyectos React.
- Web Vitals (^2.1.4) → Métricas de rendimiento para aplicaciones web.

#### Testing:

- @testing-library/dom (^10.4.0) → Utilidades para probar el DOM.
- @testing-library/jest-dom (^6.6.3) → Extensiones para pruebas con Jest.
- @testing-library/react (^16.2.0) → Pruebas de componentes React.
- @testing-library/user-event (^13.5.0) → Simulación de interacciones del usuario en pruebas.

### Tecnologías.

Aquí veremos las tecnologías utilizadas en este proyecto:

#### Frontend

## Instalación:

### Generamos el proyecto en nuestro equipo clonando el repositorio.

#### Clonamos el repositorio con:

- `git clone https://github.com/takashimonn/chat.git`

#### Luego entramos a la carpeta del proyecto con:

- `cd chat`

### Instalación de dependencias.

#### Instalamos las dependencias para el backend con:

- `npm install`

#### Instalamos las dependencias para el frontend con:

- `cd client` ---> `npm install`
