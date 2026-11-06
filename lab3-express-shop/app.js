import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware для чтения JSON из тела запроса (должен стоять до маршрутов)
app.use(express.json());

let products = [
  { id: 1, name: "Keyboard", price: 15000, category: "Accessories", inStock: true },
  { id: 2, name: "Mouse", price: 8000, category: "Accessories", inStock: true },
  { id: 3, name: "Monitor", price: 85000, category: "Monitors", inStock: false },
  { id: 4, name: "Laptop", price: 420000, category: "Computers", inStock: true },
  { id: 5, name: "Webcam", price: 22000, category: "Accessories", inStock: false }
];

const categories = ["Computers", "Accessories", "Monitors"];
const orders = [];

function nextProductId() {
  return products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
}

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
// Товары: фильтрация через query-параметры
// GET /api/products?category=Accessories&inStock=true&minPrice=10000&maxPrice=50000
// ---------------------------------------------------------------------------
app.get("/api/products", (req, res) => {
  let result = [...products];
  const { category, inStock, minPrice, maxPrice } = req.query;

  if (category !== undefined) {
    result = result.filter((product) => product.category === category);
  }

  if (inStock !== undefined) {
    const expected = inStock === "true";
    result = result.filter((product) => product.inStock === expected);
  }

  if (minPrice !== undefined && minPrice !== "") {
    const min = Number(minPrice);
    if (!Number.isNaN(min)) {
      result = result.filter((product) => product.price >= min);
    }
  }

  if (maxPrice !== undefined && maxPrice !== "") {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) {
      result = result.filter((product) => product.price <= max);
    }
  }

  res.json(result);
});

// Получение одного товара по динамическому параметру
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// Демонстрация одновременной работы params, query и body
app.patch("/api/products/:id/settings", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({
    id,
    notify: req.query.notify === "true",
    changes: req.body
  });
});

// Создание товара: тело запроса приходит в req.body
app.post("/api/products", (req, res) => {
  const newProduct = {
    ...req.body,
    id: nextProductId()
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Частичное изменение товара
app.patch("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);
  res.json(product);
});

// Удаление товара по идентификатору
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const [deletedProduct] = products.splice(index, 1);
  res.json(deletedProduct);
});

// ---------------------------------------------------------------------------
// Категории и заказы (из предыдущих лабораторных работ)
// ---------------------------------------------------------------------------
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.post("/api/categories", (req, res) => {
  res.status(201).json({ message: "POST route: category creation" });
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  res.status(201).json({ message: "POST route: order creation" });
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
