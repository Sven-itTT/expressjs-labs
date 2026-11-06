# Лабораторная работа № 1

**Тема:** Создание первого серверного приложения на Express.js

**Цель:** научиться создавать Node.js-проект, устанавливать Express.js,
запускать HTTP-сервер, создавать GET-маршруты и возвращать клиенту
текстовые и JSON-ответы.

## Запуск

```bash
cd lab1-express-shop
npm install
npm start
```

Сервер по умолчанию запускается на порту 3000:
<http://localhost:3000>

Для автоматического перезапуска при изменении кода:

```bash
npm run dev
```

## Маршруты

| Метод | URL | Ответ |
|-------|-----|-------|
| GET | `/` | `Internet Shop API` (текст) |
| GET | `/about` | Описание учебного магазина (текст) |
| GET | `/api/status` | `{ "status": "ok", "message": "Server is running" }` |
| GET | `/api/shop` | Информация о магазине (JSON) |
| GET | `/api/products` | Массив из 5 товаров |
| GET | `/api/categories` | Массив из 3 категорий |

## Проверка

Откройте в браузере:

- <http://localhost:3000/>
- <http://localhost:3000/about>
- <http://localhost:3000/api/status>
- <http://localhost:3000/api/shop>
- <http://localhost:3000/api/products>
- <http://localhost:3000/api/categories>

## Структура

```text
lab1-express-shop/
├── app.js
├── package.json
└── package-lock.json
```

`node_modules` создаётся командой `npm install`.

## Примечание

Порт можно переопределить переменной окружения `PORT`:
`PORT=4000 npm start` (PowerShell: `$env:PORT=4000; npm start`).
По умолчанию используется 3000.
