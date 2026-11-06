import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// Router-level middleware из ЛР 5
router.use((req, res, next) => {
  console.log("Product Router:", req.method, req.originalUrl);
  next();
});

// В routes остаётся только описание endpoints
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
