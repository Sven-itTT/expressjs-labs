# Лабораторная работа № 9

**Тема:** Интеграция REST API с frontend. Учебная административная
панель: GET и POST для категорий на Express.js

**Цель:** связать frontend с Express REST API через `fetch()`, получать
JSON через GET, отправлять данные через POST и обновлять DOM без
перезагрузки страницы.

## Запуск

```bash
cd lab9-shop-admin
npm install
npm start
```

Откройте <http://localhost:3000>.

Вкладка «Товары» показывает товары `Keyboard` (15000) и `Mouse` (8000)
и позволяет добавить третий. Вкладка «Категории» изначально пуста:
отображается заглушка «Категорий пока нет».

## REST API

| Метод | URL | Результат |
|-------|-----|-----------|
| GET | `/api/products` | `200 OK`, массив товаров |
| POST | `/api/products` | `201 Created`, созданный товар |
| GET | `/api/categories` | `200 OK`, массив категорий |
| POST | `/api/categories` | `201 Created`, созданная категория |
| POST | `/api/categories` (пустое имя) | `400 Bad Request`, `{"message":"Введите название категории"}` |

Модель категории содержит только `id` и `name`:

```json
{ "id": 1, "name": "Accessories" }
```

## Проверка backend (PowerShell)

```powershell
Invoke-RestMethod http://localhost:3000/api/categories

Invoke-RestMethod -Method Post http://localhost:3000/api/categories `
  -ContentType "application/json" -Body '{"name":"Accessories"}'

Invoke-RestMethod http://localhost:3000/api/categories

# Отрицательный тест: 400, запись не создаётся
try {
  Invoke-WebRequest -Method Post http://localhost:3000/api/categories `
    -ContentType "application/json" -Body '{"name":""}'
} catch {
  $_.Exception.Response.StatusCode.value__
}
```

## Схема взаимодействия

```text
HTML-форма
   ↓ submit + event.preventDefault()
public/js/app.js
   ↓
public/js/api.js  →  fetch()  →  Express Router
                                      ↓
                                Controller (req, res)
                                      ↓
                                Service (массив в памяти)
                                      ↓
                                JSON-ответ
   ↓
public/js/ui.js  →  обновление DOM
```

## Почему категории исчезают после перезапуска сервера

Категории хранятся в обычном массиве JavaScript внутри
`services/categoryService.js`. Этот массив существует только в памяти
процесса Node.js. При перезапуске процесс создаётся заново, массив
инициализируется пустым, поэтому созданные записи пропадают. База данных
в этой работе не используется. Пока сервер работает, данные сохраняются,
в том числе после перезагрузки страницы браузера.

## Реализовано

- `services/categoryService.js` — независимый массив и счётчик `nextId`;
- `controllers/categoryController.js` — GET, POST, проверка имени, 400;
- `routes/categoryRoutes.js` — только `GET /` и `POST /`;
- подключение в `app.js` через `app.use("/api/categories", ...)`;
- форма, список и сообщения в `public/index.html`;
- функции `getCategories()` / `createCategory()` в `api.js`;
- `renderCategories()` и сообщения в `ui.js`;
- загрузка при открытии вкладки и обработка submit в `app.js`;
- товары и их добавление продолжают работать.

PATCH, PUT, DELETE и кнопки редактирования/удаления не добавлялись.
