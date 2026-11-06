import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "public");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// REST API
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Статические файлы административной панели
app.use(express.static(PUBLIC_DIR));

// 404 для неизвестных API-маршрутов
app.use((req, res) => {
  res.status(404).json({
    message: "Not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
