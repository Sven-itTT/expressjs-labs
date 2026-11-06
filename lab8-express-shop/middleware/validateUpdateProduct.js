export function validateUpdateProduct(req, res, next) {
  const { name, price, category, inStock } = req.body ?? {};

  const errors = [];

  if (
    name !== undefined &&
    (typeof name !== "string" || !name.trim())
  ) {
    errors.push("name must be non-empty string");
  }

  if (
    price !== undefined &&
    (typeof price !== "number" || price <= 0)
  ) {
    errors.push("price must be greater than 0");
  }

  if (
    category !== undefined &&
    (typeof category !== "string" || !category.trim())
  ) {
    errors.push("category must be non-empty string");
  }

  if (inStock !== undefined && typeof inStock !== "boolean") {
    errors.push("inStock must be boolean");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }

  next();
}
