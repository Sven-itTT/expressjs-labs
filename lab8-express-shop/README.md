# Лабораторная работа № 8

**Тема:** Валидация входных данных и обработка ошибок

**Цель:** добавить в Internet Shop API проверку данных для создания
и изменения товара, передачу ошибок через `next(error)` и
централизованный middleware обработки ошибок.

## Запуск

```bash
cd lab8-express-shop
npm install
npm start
```

<http://localhost:3000>

## Структура

```text
lab8-express-shop/
├── controllers/
│   ├── categoryController.js
│   └── productController.js
├── errors/
│   └── AppError.js
├── middleware/
│   ├── errorHandler.js
│   ├── notFound.js
│   ├── validateCreateProduct.js
│   └── validateUpdateProduct.js
├── routes/
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── services/
│   ├── categoryService.js
│   └── productService.js
├── validators/
│   └── productValidator.js
├── app.js
└── package.json
```

## Проверка валидации

Корректный POST — `201 Created`:

```powershell
Invoke-RestMethod -Method Post http://localhost:3000/api/products `
  -ContentType "application/json" `
  -Body '{"name":"SSD 2TB","price":65000,"category":"Components","inStock":true}'
```

Без `name` — `400 Bad Request`:

```powershell
Invoke-WebRequest -Method Post http://localhost:3000/api/products `
  -ContentType "application/json" `
  -Body '{"price":65000,"category":"Components","inStock":true}'
```

Несколько ошибок сразу:

```powershell
Invoke-WebRequest -Method Post http://localhost:3000/api/products `
  -ContentType "application/json" `
  -Body '{"name":"","price":-100,"category":123,"inStock":"yes"}'
```

Ожидается массив `errors` из четырёх сообщений, товар не добавляется.

PATCH с отрицательной ценой — `400`, цена не меняется:

```powershell
Invoke-WebRequest -Method Patch http://localhost:3000/api/products/1 `
  -ContentType "application/json" -Body '{"price":-9000}'
```

## Обработка ошибок

| Ситуация | Ответ |
|----------|-------|
| товар не найден | `404`, `{ "message": "Product not found" }` |
| неизвестный маршрут | `404`, `{ "message": "Route GET /api/unknown not found" }` |
| ошибка валидации | `400`, `{ "message": "Validation failed", "errors": [...] }` |
| внутренняя ошибка | `500`, `{ "message": "Internal server error" }` |

Ошибки 404 из controllers передаются через `next(new AppError(...))`.
`errorHandler` имеет сигнатуру из четырёх параметров `(err, req, res, next)`
и подключён последним.

## Проверка 500

Временно добавьте в `routes/productRoutes.js`:

```js
router.get("/test/error", (req, res, next) => {
  try {
    throw new Error("Test server error");
  } catch (error) {
    next(error);
  }
});
```

Запрос `GET /api/products/test/error` вернёт `500` и
`{ "message": "Internal server error" }` — технические подробности
клиенту не раскрываются. После проверки маршрут удалите.
