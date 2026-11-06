import express from "express";

import logger from "./middleware/logger.js";
import requestTime from "./middleware/requestTime.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(requestTime);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Internet Shop API");
});

app.get("/about", (req, res) => {
  res.send("Учебный REST API интернет-магазина компьютерной техники");
});

app.get("/api", (req, res) => {
  res.json({
    name: "Internet Shop API",
    version: "1.0",
    resources: ["/api/products", "/api/categories", "/api/orders"]
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    requestTime: req.requestTime
  });
});

app.get("/api/shop", (req, res) => {
  res.json({
    name: "Tech Store",
    description: "Учебный интернет-магазин компьютерной техники",
    currency: "KZT"
  });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
