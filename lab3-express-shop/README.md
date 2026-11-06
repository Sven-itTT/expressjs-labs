# Лабораторная работа № 3

**Тема:** Параметры маршрутов, query-параметры и тело запроса

**Цель:** научиться получать данные HTTP-запроса через `req.params`,
`req.query` и `req.body`, создавать динамические маршруты, фильтровать
данные и принимать JSON для создания и изменения ресурсов.

## Запуск

```bash
cd lab3-express-shop
npm install
npm start
```

<http://localhost:3000>

## Обязательные проверки

| Запрос | Ожидаемый результат |
|--------|---------------------|
| `GET /api/products` | весь массив (5 товаров) |
| `GET /api/products/3` | товар с `id = 3` |
| `GET /api/products/999` | `404`, `{ "message": "Product not found" }` |
| `GET /api/products?category=Accessories` | только Accessories |
| `GET /api/products?inStock=true` | только товары в наличии |
| `GET /api/products?category=Accessories&inStock=true` | оба фильтра сразу |
| `GET /api/products?minPrice=10000&maxPrice=50000` | цена от 10000 до 50000 |
| `POST /api/products` | `201`, созданный товар |
| `PATCH /api/products/3` | изменённый товар |
| `DELETE /api/products/2` | удалённый товар |
| `PATCH /api/products/4/settings?notify=true` | `{ id, notify, changes }` |

## Примеры запросов (PowerShell)

```powershell
# Создание товара
$body = '{"name":"Headphones","price":35000,"category":"Accessories","inStock":true}'
Invoke-RestMethod -Method Post http://localhost:3000/api/products `
  -ContentType "application/json" -Body $body

# Частичное изменение
Invoke-RestMethod -Method Patch http://localhost:3000/api/products/3 `
  -ContentType "application/json" -Body '{"price":79000,"inStock":true}'

# Удаление
Invoke-RestMethod -Method Delete http://localhost:3000/api/products/2

# Демонстрация params + query + body
Invoke-RestMethod -Method Patch `
  "http://localhost:3000/api/products/4/settings?notify=true" `
  -ContentType "application/json" -Body '{"price":399000}'
```

## Как это устроено

- `Number(req.params.id)` — значение динамического сегмента приходит строкой.
- `req.query.inStock === "true"` — query-параметры всегда строки.
- Фильтры применяются последовательно к одному массиву `result`.
- `express.json()` обязан быть подключён до маршрутов, читающих `req.body`.
- `nextProductId()` защищает от повторного использования id после удаления.
