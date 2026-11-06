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

// Главная страница API
app.get("/", (req, res) => {
  res.send("Internet Shop API");
});

// Описание учебного проекта
app.get("/about", (req, res) => {
  res.send("Учебный REST API интернет-магазина компьютерной техники");
});

// Состояние сервера
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running"
  });
});

// Информация о магазине
app.get("/api/shop", (req, res) => {
  res.json({
    name: "Tech Store",
    description: "Учебный интернет-магазин компьютерной техники",
    currency: "KZT"
  });
});

// Каталог товаров
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Категории товаров
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
