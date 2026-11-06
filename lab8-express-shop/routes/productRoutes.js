import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { validateCreateProduct } from "../middleware/validateCreateProduct.js";
import { validateUpdateProduct } from "../middleware/validateUpdateProduct.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Product Router:", req.method, req.originalUrl);
  next();
});

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", validateCreateProduct, createProduct);
router.patch("/:id", validateUpdateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
