let categories = [
  { id: 1, name: "Computers" },
  { id: 2, name: "Accessories" },
  { id: 3, name: "Monitors" }
];

let nextId = 4;

export function getAllCategories() {
  return categories;
}

export function findCategoryById(id) {
  return categories.find((category) => category.id === id);
}

export function addCategory(data) {
  const category = {
    ...data,
    id: nextId
  };

  nextId += 1;
  categories.push(category);

  return category;
}

export function updateCategoryById(id, changes) {
  const category = categories.find((item) => item.id === id);

  if (!category) {
    return null;
  }

  Object.assign(category, changes);

  return category;
}

export function deleteCategoryById(id) {
  const index = categories.findIndex((category) => category.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedCategory] = categories.splice(index, 1);

  return deletedCategory;
}
