import {
  getAllCategories,
  createCategory
} from "../services/categoryService.js";

export function getAll(req, res) {
  res.json(getAllCategories());
}

export function create(req, res) {
  const name = typeof req.body?.name === "string"
    ? req.body.name.trim()
    : "";

  if (!name) {
    return res.status(400).json({
      message: "Введите название категории"
    });
  }

  const category = createCategory({ name });

  res.status(201).json(category);
}
