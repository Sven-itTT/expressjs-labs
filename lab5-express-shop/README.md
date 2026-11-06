# Лабораторная работа № 5

**Тема:** Создание и использование middleware в Express.js

**Цель:** научиться создавать собственные middleware-функции, использовать
`req`, `res` и `next`, управлять областью действия middleware, изменять
объект запроса и останавливать или продолжать обработку запроса.

## Запуск

```bash
cd lab5-express-shop
npm install
npm start
```

<http://localhost:3000>

## Middleware проекта

| Файл | Назначение | Область действия |
|------|------------|------------------|
| `middleware/logger.js` | выводит дату, метод и URL каждого запроса | глобально |
| `middleware/requestTime.js` | добавляет `req.requestTime` | глобально |
| `express.json()` | разбирает JSON-тело | глобально, до маршрутов |
| `middleware/checkApiKey.js` | проверяет заголовок `x-api-key` | только `POST /api/products` |
| Router-level middleware | выводит `Product Router: ...` | только маршруты products |

## Проверка API-ключа

Без заголовка:

```powershell
Invoke-WebRequest -Method Post http://localhost:3000/api/products `
  -ContentType "application/json" -Body '{"name":"SSD 1TB"}'
```

Ожидается `403 Forbidden` и `{ "message": "Access denied" }`.

С правильным ключом:

```powershell
Invoke-RestMethod -Method Post http://localhost:3000/api/products `
  -Headers @{ "x-api-key" = "college-demo" } `
  -ContentType "application/json" `
  -Body '{"name":"SSD 1TB","price":45000,"category":"Components","inStock":true}'
```

Ожидается `201 Created` и созданный товар.

## Эксперименты и выводы

1. **Удаление `next()` из Router-level middleware.** Запрос
   `GET /api/products` «зависает»: middleware не вызвал `next()` и не
   отправил ответ, поэтому управление не перешло к конечному обработчику.
   Клиент ждёт до тайм-аута. После эксперимента `next()` возвращён.

2. **Порядок `express.json()`.** Если подключить Router раньше
   `express.json()`, тело POST-запроса не будет разобрано: `req.body`
   окажется `undefined`, и товар создастся без переданных полей.
   Поэтому `express.json()` всегда подключается до маршрутов.

3. **Порядок `logger` и `requestTime`.** Они выполняются сверху вниз:
   сначала logger выводит строку запроса, затем requestTime добавляет
   время. Конечный обработчик получает уже заполненный `req.requestTime`.

4. **Область действия.** Router-level middleware внутри
   `productRoutes.js` не срабатывает для `/api/categories` и
   `/api/orders`, потому что Router подключён только к `/api/products`.
