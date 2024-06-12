import express from "express";
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import suppliersRoutes from "./routes/suppliers.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";
import productsRoutes from "./routes/products.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import servicesOrdersRoutes from "./routes/services_orders.routes.js";
import quotesRoutes from "./routes/quotes.routes.js";
import purchaseOrdersRoutes from "./routes/purchase_orders.routes.js";
import clientAssetsRoutes from "./routes/client_assets.routes.js";

const app = express();

app.use(express.json());

// Add all the routes
app.use(indexRoutes);
app.use(usersRoutes);
app.use(clientsRoutes);
app.use(categoriesRoutes);
app.use(suppliersRoutes);
app.use(contactsRoutes);
app.use(productsRoutes);
app.use(servicesRoutes);
app.use(servicesOrdersRoutes);
app.use(quotesRoutes);
app.use(purchaseOrdersRoutes);
app.use(clientAssetsRoutes);

app.listen(PORT);
console.log("Server is running on port", PORT);
