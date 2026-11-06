import {
  getProducts,
  createProduct,
  getCategories,
  createCategory
} from "./api.js";

import {
  renderProducts,
  renderCategories,
  showProductMessage,
  showCategoryMessage
} from "./ui.js";

const productForm = document.querySelector("#product-form");
const categoryForm = document.querySelector("#category-form");

function activateTab(tabName) {
  for (const tab of document.querySelectorAll(".tab")) {
    tab.classList.toggle("is-active", tab.dataset.tab === tabName);
  }

  for (const panel of document.querySelectorAll(".panel")) {
    panel.classList.toggle("is-active", panel.id === `${tabName}-panel`);
  }

  if (tabName === "categories") {
    loadCategories();
  }
}

async function loadProducts() {
  try {
    const products = await getProducts();
    renderProducts(products);
  } catch (error) {
    showProductMessage(error.message, "error");
  }
}

async function loadCategories() {
  try {
    const categories = await getCategories();
    renderCategories(categories);
  } catch (error) {
    showCategoryMessage(error.message, "error");
  }
}

for (const tab of document.querySelectorAll(".tab")) {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
}

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(productForm);
  const product = {
    name: String(formData.get("name") ?? "").trim(),
    price: Number(formData.get("price")),
    category: String(formData.get("category") ?? "").trim(),
    inStock: formData.get("inStock") === "on"
  };

  if (
    !product.name ||
    !product.category ||
    !Number.isFinite(product.price) ||
    product.price <= 0
  ) {
    showProductMessage(
      "Заполните название, категорию и положительную цену",
      "error"
    );
    return;
  }

  try {
    await createProduct(product);
    productForm.reset();
    showProductMessage("Товар добавлен", "success");
    await loadProducts();
  } catch (error) {
    showProductMessage(error.message, "error");
  }
});

categoryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = document.querySelector("#category-name");
  const name = input.value.trim();

  if (!name) {
    showCategoryMessage("Введите название категории", "error");
    return;
  }

  try {
    await createCategory({ name });
    categoryForm.reset();
    showCategoryMessage("Категория добавлена", "success");
    await loadCategories();
  } catch (error) {
    showCategoryMessage(error.message, "error");
  }
});

loadProducts();
