import express from "express";
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import suppliersRoutes from "./routes/suppliers.routes.js";

const app = express();

app.use(express.json());

//TODO Agregar todas las rutas restantes
app.use(indexRoutes);
app.use(usersRoutes);
app.use(clientsRoutes);
app.use(categoriesRoutes);
app.use(suppliersRoutes);

app.listen(PORT);
console.log("Server is running on port", PORT);
