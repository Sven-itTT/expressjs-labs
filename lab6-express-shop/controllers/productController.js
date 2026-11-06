import {
  filterProducts,
  findProductById,
  addProduct,
  updateProductById,
  deleteProductById
} from "../services/productService.js";

// Controller принимает HTTP-запрос, вызывает service и отправляет ответ.
export function getProducts(req, res) {
  const products = filterProducts(req.query);

  res.json(products);
}

export function getProductById(req, res) {
  const id = Number(req.params.id);
  const product = findProductById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
}

export function createProduct(req, res) {
  const product = addProduct(req.body ?? {});

  res.status(201).json(product);
}

export function updateProduct(req, res) {
  const id = Number(req.params.id);
  const product = updateProductById(id, req.body ?? {});

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
}

export function deleteProduct(req, res) {
  const id = Number(req.params.id);
  const product = deleteProductById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
}
