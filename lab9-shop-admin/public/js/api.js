async function request(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(
      data?.message || `Ошибка запроса (${response.status})`
    );
  }

  return data;
}

export function getProducts() {
  return request("/api/products");
}

export function createProduct(product) {
  return request("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });
}

export function getCategories() {
  return request("/api/categories");
}

export function createCategory(category) {
  return request("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(category)
  });
}
