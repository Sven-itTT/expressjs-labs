# Лабораторная работа № 7

**Тема:** Разработка REST API и CRUD-операций

**Цель:** разработать полноценный REST API для ресурса `products`,
реализовать Create, Read, Update и Delete с использованием архитектуры
`routes → controllers → services` и проверить полный CRUD-цикл.

## Запуск

```bash
cd lab7-express-shop
npm install
npm start
```

<http://localhost:3000>

## REST API товаров

| Метод | URL | Успешный статус | Назначение |
|-------|-----|-----------------|------------|
| GET | `/api/products` | 200 | список товаров |
| GET | `/api/products/:id` | 200 / 404 | один товар |
| POST | `/api/products` | 201 | создание |
| PATCH | `/api/products/:id` | 200 / 404 | частичное изменение |
| DELETE | `/api/products/:id` | 200 / 404 | удаление |

Дополнительно реализован полный CRUD для категорий:

| Метод | URL |
|-------|-----|
| GET | `/api/categories` |
| GET | `/api/categories/:id` |
| POST | `/api/categories` |
| PATCH | `/api/categories/:id` |
| DELETE | `/api/categories/:id` |

## Полный CRUD-цикл (PowerShell)

```powershell
# 1. Create — запомните id из ответа
$new = Invoke-RestMethod -Method Post http://localhost:3000/api/products `
  -ContentType "application/json" `
  -Body '{"name":"SSD 1TB","price":45000,"category":"Components","inStock":true}'
$new

# 2. Read
Invoke-RestMethod "http://localhost:3000/api/products/$($new.id)"

# 3. Update — изменяются только переданные поля
Invoke-RestMethod -Method Patch "http://localhost:3000/api/products/$($new.id)" `
  -ContentType "application/json" -Body '{"price":42000,"inStock":false}'

# 4. Read после изменения
Invoke-RestMethod "http://localhost:3000/api/products/$($new.id)"

# 5. Delete
Invoke-RestMethod -Method Delete "http://localhost:3000/api/products/$($new.id)"

# 6. Read после удаления — ожидается 404
Invoke-WebRequest "http://localhost:3000/api/products/$($new.id)"
```

## Архитектура

```text
routes/productRoutes.js
        ↓
controllers/productController.js  (req, res, HTTP-статусы)
        ↓
services/productService.js        (данные, без req/res)
```

`productService.js` не использует `req`, `res`, `req.body`, `req.params`,
`res.json()` и `res.status()`.
