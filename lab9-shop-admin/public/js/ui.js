function setMessage(element, text, type) {
  element.textContent = text;
  element.className = "message";

  if (text && type) {
    element.classList.add(`message--${type}`);
  }
}

export function renderProducts(products) {
  const tbody = document.querySelector("#products");
  tbody.replaceChildren();

  if (products.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = "Товаров пока нет";
    row.append(cell);
    tbody.append(row);
    return;
  }

  for (const product of products) {
    const row = document.createElement("tr");
    const values = [
      product.id,
      product.name,
      `${Number(product.price).toLocaleString("ru-RU")} ₸`,
      product.category
    ];

    for (const value of values) {
      const cell = document.createElement("td");
      cell.textContent = String(value);
      row.append(cell);
    }

    const stockCell = document.createElement("td");
    stockCell.textContent = product.inStock ? "Да" : "Нет";
    stockCell.className = product.inStock ? "in-stock" : "out-of-stock";
    row.append(stockCell);

    tbody.append(row);
  }
}

export function renderCategories(categories) {
  const list = document.querySelector("#categories");
  list.replaceChildren();

  if (categories.length === 0) {
    const item = document.createElement("li");
    item.className = "empty";
    item.textContent = "Категорий пока нет";
    list.append(item);
    return;
  }

  for (const category of categories) {
    const item = document.createElement("li");

    const name = document.createElement("span");
    name.textContent = category.name;

    const id = document.createElement("span");
    id.className = "category-id";
    id.textContent = `#${category.id}`;

    item.append(name, id);
    list.append(item);
  }
}

export function showProductMessage(text, type = "success") {
  setMessage(
    document.querySelector("#product-message"),
    text,
    type
  );
}

export function showCategoryMessage(text, type = "success") {
  setMessage(
    document.querySelector("#category-message"),
    text,
    type
  );
}
