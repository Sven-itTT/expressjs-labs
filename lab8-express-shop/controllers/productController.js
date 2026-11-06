import { AppError } from "../errors/AppError.js";
import {
  filterProducts,
  findProductById,
  addProduct,
  updateProductById,
  deleteProductById
} from "../services/productService.js";

export function getProducts(req, res) {
  res.json(filterProducts(req.query));
}

export function getProductById(req, res, next) {
  const id = Number(req.params.id);
  const product = findProductById(id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.json(product);
}

export function createProduct(req, res) {
  const product = addProduct(req.body);

  res.status(201).json(product);
}

export function updateProduct(req, res, next) {
  const id = Number(req.params.id);
  const product = updateProductById(id, req.body);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.json(product);
}

export function deleteProduct(req, res, next) {
  const id = Number(req.params.id);
  const product = deleteProductById(id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.json(product);
}
