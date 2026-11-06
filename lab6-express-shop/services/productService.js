let products = [
  { id: 1, name: "Keyboard", price: 15000, category: "Accessories", inStock: true },
  { id: 2, name: "Mouse", price: 8000, category: "Accessories", inStock: true },
  { id: 3, name: "Monitor", price: 85000, category: "Monitors", inStock: false },
  { id: 4, name: "Laptop", price: 420000, category: "Computers", inStock: true },
  { id: 5, name: "Webcam", price: 22000, category: "Accessories", inStock: false }
];

let nextId = 6;

// Service не знает о req и res — работает только с обычными значениями.
export function getAllProducts() {
  return products;
}

export function findProductById(id) {
  return products.find((product) => product.id === id);
}

export function addProduct(data) {
  const product = {
    ...data,
    id: nextId
  };

  nextId += 1;
  products.push(product);

  return product;
}

export function updateProductById(id, changes) {
  const product = products.find((item) => item.id === id);

  if (!product) {
    return null;
  }

  Object.assign(product, changes);

  return product;
}

export function deleteProductById(id) {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedProduct] = products.splice(index, 1);

  return deletedProduct;
}

// Фильтрация также относится к бизнес-логике, поэтому находится в service.
export function filterProducts(filters = {}) {
  let result = [...products];
  const { category, inStock, minPrice, maxPrice } = filters;

  if (category !== undefined) {
    result = result.filter((product) => product.category === category);
  }

  if (inStock !== undefined) {
    const expected = inStock === "true";
    result = result.filter((product) => product.inStock === expected);
  }

  if (minPrice !== undefined && minPrice !== "") {
    const min = Number(minPrice);
    if (!Number.isNaN(min)) {
      result = result.filter((product) => product.price >= min);
    }
  }

  if (maxPrice !== undefined && maxPrice !== "") {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) {
      result = result.filter((product) => product.price <= max);
    }
  }

  return result;
}
