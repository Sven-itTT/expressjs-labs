// Данные хранятся в памяти процесса и сбрасываются после перезапуска сервера.
let categories = [];
let nextId = 1;

export function getAllCategories() {
  return categories;
}

export function createCategory(data) {
  const category = {
    id: nextId,
    name: data.name
  };

  nextId += 1;
  categories.push(category);

  return category;
}
