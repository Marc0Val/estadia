const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "microtest",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conexión a la base de datos MySQL establecida.");
});
// ruta para insertar un nuevo registro en la tabla personal
app.post("/personal", (req, res) => {
  const nombre = req.body.nombre;
  const apellidos = req.body.apellidos;
  const direccion = req.body.direccion;
  const notificar = req.body.notificar;
  const contrasena = req.body.contrasena;

  const sql =
    "INSERT INTO personal (nombre, apellidos, direccion, notificar, contrasena) VALUES (?,?,?,?,?)";
  db.query(
    sql,
    [nombre, apellidos, direccion, notificar, contrasena],
    (err, result) => {
      if (err) throw err;
      res.send("Registro insertado");
    }
  );
});

// ruta para obtener todos los registros de la tabla personal
app.get("/personal", (req, res) => {
  const sql = "SELECT * FROM personal";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//ruta para obetner todos los registros de la tabla clientes
app.get("/clientes", (req, res) => {
  const sql = "SELECT * FROM clientes";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// ruta para obtener los registros de la tabla categoria
app.get("/categoria", (req, res) => {
  const sql = "SELECT * FROM categoria";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
