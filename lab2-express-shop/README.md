# Лабораторная работа № 2

**Тема:** Маршрутизация и HTTP-методы в Express.js

**Цель:** научиться создавать маршруты Express для разных HTTP-методов,
понимать связь между HTTP-методом, URL и обработчиком, проверять REST API
HTTP-клиентом.

## Запуск

```bash
cd lab2-express-shop
npm install
npm start
```

<http://localhost:3000>

## Итоговый набор маршрутов

| Метод | URL | Назначение |
|-------|-----|------------|
| GET | `/` | Главная информация |
| GET | `/api` | Информация об API |
| GET | `/api/products` | Получение товаров |
| POST | `/api/products` | Маршрут создания товара (201) |
| PUT | `/api/products` | Полная замена товара |
| PATCH | `/api/products` | Частичное изменение товара |
| DELETE | `/api/products` | Удаление товара |
| GET | `/api/categories` | Получение категорий |
| POST | `/api/categories` | Создание категории (201) |
| GET | `/api/orders` | Получение заказов |
| POST | `/api/orders` | Создание заказа (201) |

Дополнительно сохранены маршруты ЛР 1: `/about`, `/api/status`, `/api/shop`.

## Проверка через PowerShell

```powershell
Invoke-RestMethod http://localhost:3000/api/products
Invoke-WebRequest -Method Post http://localhost:3000/api/products
Invoke-WebRequest -Method Put http://localhost:3000/api/products
Invoke-WebRequest -Method Patch http://localhost:3000/api/products
Invoke-WebRequest -Method Delete http://localhost:3000/api/products
```

`Invoke-WebRequest` покажет HTTP-статус, `Invoke-RestMethod` — JSON-ответ.

## Именованный обработчик

```js
function getProducts(req, res) {
  res.json(products);
}

app.get("/api/products", getProducts);
```

Разница с inline-вариантом:

```js
app.get("/api/products", (req, res) => {
  res.json(products);
});
```

- `getProducts` — отдельная именованная функция: её можно переиспользовать,
  импортировать, тестировать и удобнее отлаживать (в стеке видно имя).
- Стрелочная функция создаётся на месте и доступна только в этой строке.
- Поведение HTTP-запроса одинаковое: Express получает функцию-обработчик
  `(req, res)` и вызывает её при совпадении метода и URL.

## Проверка несовпадения методов

`DELETE /api/orders` не объявлен — Express вернёт `404 Not Found`.
Наличие POST-маршрута не означает наличие DELETE для того же URL.
