import { pool } from "../db.js";

//* Get all quotes
export const getQuotes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM quotes");

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Get a quote by ID
export const getQuote = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM quotes WHERE id_quote = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // Convertir 'products' a un objeto si es una cadena
    const quote = result[0];
    if (quote.products && typeof quote.products === "string") {
      try {
        quote.products = JSON.parse(quote.products);
      } catch (error) {
        console.error("Error al parsear products:", error);
        quote.products = []; // O manejar de otra manera si el JSON no es válido
      }
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Create a new quote
export const createQuote = async (req, res) => {
  try {
    const {
      client_id,
      contact_name,
      validity,
      files,
      notes,
      total,
      subtotal,
      totalIva,
      products,
    } = req.body;

    console.log("Datos recibidos:", req.body);

    if (
      !client_id ||
      !contact_name ||
      !validity ||
      !notes ||
      !total ||
      !subtotal ||
      !totalIva ||
      !products
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si 'products' debe ser convertido a JSON para la base de datos
    const productsJson = JSON.stringify(products);

    // Verificar si 'files' también debe ser manejado (por ejemplo, puede ser una cadena)
    const filesValue = files || null;

    const [result] = await pool.query(
      "INSERT INTO quotes (client_id,contact_name,validity,files,notes,total,subtotal,totalIva,products) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        client_id,
        contact_name,
        validity,
        filesValue,
        notes,
        total,
        subtotal,
        totalIva,
        productsJson,
      ]
    );

    console.log("Resultado de la inserción:", result);

    res.status(201).json({
      message: "Cotización creada exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error en la creación de cotización:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

//* Update a quote
export const updateQuote = async (req, res) => {
  try {
    // Copiar el cuerpo de la solicitud para modificarlo
    const dataToUpdate = { ...req.body };

    // Eliminar los campos si están presentes, ya que pertenecen al objeto products
    delete dataToUpdate.quantity;
    delete dataToUpdate.product_id;
    delete dataToUpdate.price;
    delete dataToUpdate.discount;
    delete dataToUpdate.iva;

    // Verificar y convertir 'products' a JSON string si es un objeto
    if (dataToUpdate.products && typeof dataToUpdate.products === "object") {
      dataToUpdate.products = JSON.stringify(dataToUpdate.products);
    } else if (dataToUpdate.products === null) {
      dataToUpdate.products = null; // O mantener como una cadena vacía si es el caso
    }

    // Ejecutar la consulta de actualización
    const [result] = await pool.query(
      "UPDATE quotes SET ? WHERE id_quote = ?",
      [dataToUpdate, req.params.id]
    );

    // Enviar una respuesta exitosa
    res.json({
      message: "Cotizacion actualizada exitosamente",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//* Delete a quote
export const deleteQuote = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM quotes WHERE id_quote = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Quote not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
