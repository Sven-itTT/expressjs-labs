import { validateProductData } from "../validators/productValidator.js";

export function validateCreateProduct(req, res, next) {
  const errors = validateProductData(req.body ?? {});

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }

  next();
}
