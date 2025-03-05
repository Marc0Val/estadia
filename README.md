# Chat en tiempo real

Un chat en tiempo real construido con React, Node.js, Express y Socket.io.

## Requisitos:

Para comenzar con el proyecto, tienes que asegurarte que Node.js esté instalado, ya que utilizaremos "npm" o "yarn" en nuestra linea de comandos. Puedes derscargarlo desde la página oficial de Node.js: [Click aquí para ir](https://nodejs.org/en/download)

## Especifiaciones generales:

Aquí están algunas de las dependencias que utilizaremos para este proyecto

### Para el Backend:

1. bcrypt (^5.1.1) → Cifrado de contraseñas.
2. cors (^2.8.5) → Habilita CORS en Express.
3. dotenv (16.4.7) → Manejo de variables de entorno.
4. express (4.21.2) → Framework para el backend.
5. jsonwebtoken (^9.0.2) → Generación y verificación de JWT.
6. mongodb (6.14.1) → Cliente oficial para MongoDB.
7. mongoose (^8.12.0) → ODM para MongoDB con validación de datos.
8. morgan (1.10.0) → Middleware para registrar peticiones HTTP.
9. socket.io (4.8.1) → Comunicación en tiempo real con WebSockets.

## Instalación:

### Generamos el proyecto en nuestro equipo clonando el repositorio.

#### Clonar el repositorio con:

`git clone https://github.com/takashimonn/chat.git`

#### Luego entramos a la carpeta del proyecto con:

`cd chat`

### Instalamos las dependencias.

#### Instalamos las dependencias para el backend con:

`npm install`

#### Instalamos las dependencias para el frontend con:

`cd client` ---> `npm install`
