// const express = require('express');
// const mysql = require('mysql');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'login'
// });

// db.connect(err => {
//   if (err) throw err;
//   console.log('Conexión a la base de datos MySQL establecida.');
// });

// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const sql = 'INSERT INTO usuario (username, password) VALUES (?, ?)';
//   db.query(sql, [username, hashedPassword], (err, result) => {
//     if (err) throw err;
//     res.send('Usuario registrado');
//   });
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const sql = 'SELECT * FROM usuario WHERE username = ?';
//   db.query(sql, [username], (err, results) => {
//     if (err) throw err;
//     if (results.length > 0) {
//       const user = results[0];
//       if (bcrypt.compareSync(password, user.password)) {
//         res.send('Login exitoso');
//       } else {
//         res.status(401).send('Contraseña incorrecta');
//       }
//     } else {
//       res.status(404).send('Usuario no encontrado');
//     }
//   });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
