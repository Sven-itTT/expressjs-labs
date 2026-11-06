# Лабораторная работа № 4

**Тема:** Разделение маршрутов Express-приложения с помощью `Router`

**Цель:** научиться использовать `express.Router()`, выносить маршруты
в отдельные модули, экспортировать и импортировать Router, подключать
маршрутизаторы через `app.use()` и организовывать структуру проекта
по ресурсам.

## Запуск

```bash
cd lab4-express-shop
npm install
npm start
```

<http://localhost:3000>

## Структура

```text
lab4-express-shop/
├── routes/
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   └── orderRoutes.js
├── app.js
├── package.json
└── package-lock.json
```

## Как формируется полный URL

```js
app.use("/api/products", productRoutes);
router.get("/");      // GET /api/products
router.get("/:id");   // GET /api/products/:id
router.patch("/:id"); // PATCH /api/products/:id
```

Префикс задаётся один раз в `app.use()`, а внутри Router используются
только локальные пути `/` и `/:id`.

## Проверка

| Метод | URL | Ожидание |
|-------|-----|----------|
| GET | `/api/products` | массив товаров |
| GET | `/api/products/1` | товар с id = 1 |
| POST | `/api/products` | 201, созданный товар |
| PATCH | `/api/products/1` | изменённый товар |
| DELETE | `/api/products/1` | удалённый товар |
| GET | `/api/categories` | массив категорий |
| POST | `/api/categories` | 201, сообщение |
| GET | `/api/orders` | `[]` |
| GET | `/api/orders/1` | 404 |
| POST | `/api/orders` | 201, сообщение |
| PATCH | `/api/orders/1` | 404 |

`app.js` больше не содержит маршрутов товаров, категорий и заказов —
только общие маршруты, middleware и подключение Router-ов.
