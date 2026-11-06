import {
  getAllProducts,
  addProduct
} from "../services/productService.js";

export function getProducts(req, res) {
  res.json(getAllProducts());
}

export function createProduct(req, res) {
  const { name, price, category, inStock } = req.body ?? {};

  const isValid =
    typeof name === "string" && name.trim() &&
    typeof price === "number" && price > 0 &&
    typeof category === "string" && category.trim() &&
    typeof inStock === "boolean";

  if (!isValid) {
    return res.status(400).json({
      message: "Некорректные данные товара"
    });
  }

  const product = addProduct({
    name: name.trim(),
    price,
    category: category.trim(),
    inStock
  });

  res.status(201).json(product);
}
