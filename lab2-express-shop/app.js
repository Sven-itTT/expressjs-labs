import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const products = [
  { id: 1, name: "Keyboard", price: 15000, category: "Accessories", inStock: true },
  { id: 2, name: "Mouse", price: 8000, category: "Accessories", inStock: true },
  { id: 3, name: "Monitor", price: 85000, category: "Monitors", inStock: false },
  { id: 4, name: "Laptop", price: 420000, category: "Computers", inStock: true },
  { id: 5, name: "Webcam", price: 22000, category: "Accessories", inStock: false }
];

const categories = ["Computers", "Accessories", "Monitors"];
const orders = [];

// Именованный обработчик: функцию можно переиспользовать и тестировать отдельно.
function getProducts(req, res) {
  res.json(products);
}

app.get("/", (req, res) => {
  res.send("Internet Shop API");
});

app.get("/about", (req, res) => {
  res.send("Учебный REST API интернет-магазина компьютерной техники");
});

// Информация об API и его ресурсах
app.get("/api", (req, res) => {
  res.json({
    name: "Internet Shop API",
    version: "1.0",
    resources: ["/api/products", "/api/categories", "/api/orders"]
  });
});

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.get("/api/shop", (req, res) => {
  res.json({
    name: "Tech Store",
    description: "Учебный интернет-магазин компьютерной техники",
    currency: "KZT"
  });
});

// ---------------------------------------------------------------------------
// Один и тот же URL /api/products, разные HTTP-методы
// ---------------------------------------------------------------------------
app.get("/api/products", getProducts);

app.post("/api/products", (req, res) => {
  res.status(201).json({ message: "POST route: product creation" });
});

app.put("/api/products", (req, res) => {
  res.json({ message: "PUT route: full product replacement" });
});

app.patch("/api/products", (req, res) => {
  res.json({ message: "PATCH route: partial product update" });
});

app.delete("/api/products", (req, res) => {
  res.json({ message: "DELETE route: product deletion" });
});

// ---------------------------------------------------------------------------
// Категории
// ---------------------------------------------------------------------------
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.post("/api/categories", (req, res) => {
  res.status(201).json({ message: "POST route: category creation" });
});

// ---------------------------------------------------------------------------
// Заказы
// ---------------------------------------------------------------------------
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  res.status(201).json({ message: "POST route: order creation" });
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
