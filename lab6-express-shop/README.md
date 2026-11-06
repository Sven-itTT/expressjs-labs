# Лабораторная работа № 6

**Тема:** Разделение Express-приложения на routes, controllers и services

**Цель:** научиться разделять приложение по ответственности, выносить
HTTP-обработчики в controllers, бизнес-операции в services и сохранять
в routes только описание endpoints.

## Запуск

```bash
cd lab6-express-shop
npm install
npm start
```

<http://localhost:3000>

## Архитектура

```text
HTTP-запрос
   ↓
routes/productRoutes.js       — какой метод и URL
   ↓
controllers/productController.js — req, res, статусы
   ↓
services/productService.js    — данные и бизнес-логика
```

| Слой | Знает о `req`/`res` | Ответственность |
|------|---------------------|-----------------|
| routes | нет (только передаёт функции) | описание endpoints |
| controllers | да | чтение запроса, вызов service, HTTP-ответ |
| services | нет | хранение и обработка данных |

`productService.js` не содержит обращений к `req`, `res`, `req.body`,
`req.params`, `res.json()` и `res.status()`.

## Проверка

```powershell
Invoke-RestMethod http://localhost:3000/api/products
Invoke-RestMethod http://localhost:3000/api/products/1
Invoke-WebRequest http://localhost:3000/api/products/999   # 404

Invoke-RestMethod -Method Post http://localhost:3000/api/products `
  -ContentType "application/json" `
  -Body '{"name":"SSD 1TB","price":45000,"category":"Components","inStock":true}'

Invoke-RestMethod -Method Patch http://localhost:3000/api/products/1 `
  -ContentType "application/json" -Body '{"price":13500,"inStock":false}'

Invoke-RestMethod -Method Delete http://localhost:3000/api/products/2
```

## Примечание о middleware из ЛР 5

Файл `middleware/checkApiKey.js` сохранён в проекте. В ЛР 6 проверка
создания товара по ключу не требуется, поэтому middleware не подключён
к `POST /api/products` (иначе запросы из методички без заголовка
получали бы 403). Чтобы включить защиту, добавьте его в маршрут:

```js
router.post("/", checkApiKey, createProduct);
```
