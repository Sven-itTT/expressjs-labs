let products = [
  { id: 1, name: "Keyboard", price: 15000, category: "Accessories", inStock: true },
  { id: 2, name: "Mouse", price: 8000, category: "Accessories", inStock: true }
];

let nextId = 3;

export function getAllProducts() {
  return products;
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
