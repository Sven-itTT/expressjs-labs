import {
  getAllCategories,
  findCategoryById,
  addCategory,
  updateCategoryById,
  deleteCategoryById
} from "../services/categoryService.js";

export function getCategories(req, res) {
  res.json(getAllCategories());
}

export function getCategoryById(req, res) {
  const id = Number(req.params.id);
  const category = findCategoryById(id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found"
    });
  }

  res.json(category);
}

export function createCategory(req, res) {
  const category = addCategory(req.body ?? {});

  res.status(201).json(category);
}

export function updateCategory(req, res) {
  const id = Number(req.params.id);
  const category = updateCategoryById(id, req.body ?? {});

  if (!category) {
    return res.status(404).json({
      message: "Category not found"
    });
  }

  res.json(category);
}

export function deleteCategory(req, res) {
  const id = Number(req.params.id);
  const category = deleteCategoryById(id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found"
    });
  }

  res.json(category);
}
