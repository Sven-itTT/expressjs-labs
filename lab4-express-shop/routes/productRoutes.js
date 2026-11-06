import express from "express";

const router = express.Router();

let products = [
  { id: 1, name: "Keyboard", price: 15000, category: "Accessories", inStock: true },
  { id: 2, name: "Mouse", price: 8000, category: "Accessories", inStock: true },
  { id: 3, name: "Monitor", price: 85000, category: "Monitors", inStock: false },
  { id: 4, name: "Laptop", price: 420000, category: "Computers", inStock: true },
  { id: 5, name: "Webcam", price: 22000, category: "Accessories", inStock: false }
];

let nextId = 6;

function nextProductId() {
  return products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
}

function getProducts(req, res) {
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
}

function getProductById(req, res) {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
}

function createProduct(req, res) {
  const newProduct = {
    ...(req.body ?? {}),
    id: nextId
  };

  nextId += 1;
  products.push(newProduct);

  res.status(201).json(newProduct);
}

function updateProduct(req, res) {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);
  res.json(product);
}

function deleteProduct(req, res) {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const [deletedProduct] = products.splice(index, 1);
  res.json(deletedProduct);
}

function updateProductSettings(req, res) {
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
}

// Внутри Router используются только локальные пути.
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id/settings", updateProductSettings);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
