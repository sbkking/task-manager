# Task Manager App

## 📌 Описание
Task Manager — это веб-приложение на **Node.js, Express, MongoDB и EJS**, которое позволяет пользователям **создавать, редактировать, удалять и просматривать задачи**. Также реализована **аутентификация и авторизация** через JWT.

---

## 🚀 Установка и Запуск

### 1️⃣ Склонировать репозиторий
```sh
git clone https://github.com/sbkking/task-manager.git
cd task-manager
```

### 2️⃣ Установить зависимости
```sh
npm install
```

### 3️⃣ Настроить переменные окружения
Создай файл `.env` в корневой папке и добавь:
```ini
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.mongodb.net/yourDatabase?retryWrites=true&w=majority
JWT_SECRET=yourSecretKey
PORT=3000
```
🔹 **Замени `yourUsername`, `yourPassword` и `yourDatabase` на свои данные.**
🔹 Если пароль содержит `@`, `#`, `$`, закодируй его в URL-формат.

### 4️⃣ Запустить сервер
```sh
npm start
```
или с автообновлением (nodemon):
```sh
npx nodemon app.js
```

### 5️⃣ Открыть в браузере
Перейди по адресу:  
👉 `http://localhost:3000`

---

## 📌 Функционал
✅ Регистрация и вход пользователей (JWT + bcrypt)  
✅ Создание, редактирование и удаление задач  
✅ Фильтрация и сортировка задач по статусу и дате  
✅ Роли: **admin** (видит все задачи) и **user** (видит только свои)  
✅ Защита CSRF-токенами и куки  
✅ EJS-шаблоны для динамических страниц  

---

## 📌 API Маршруты

### **Аутентификация**
| Метод | Маршрут      | Описание |
|--------|------------|----------|
| `GET`  | `/login`   | Форма входа |
| `POST` | `/login`   | Аутентификация пользователя |
| `GET`  | `/register` | Форма регистрации |
| `POST` | `/register` | Создание пользователя |
| `GET`  | `/logout`  | Выход из системы |

### **Управление задачами**
| Метод  | Маршрут              | Описание |
|--------|----------------------|----------|
| `GET`  | `/tasks`             | Просмотр списка задач |
| `GET`  | `/tasks/create`      | Форма создания задачи |
| `POST` | `/tasks/create`      | Добавить новую задачу |
| `PUT`  | `/tasks/update/:id`  | Обновить задачу |
| `POST` | `/tasks/delete/:id`  | Удалить задачу |

---

## 📌 Используемые технологии
- **Node.js + Express** — серверная часть
- **MongoDB + Mongoose** — база данных
- **EJS** — шаблоны для отображения
- **bcrypt.js** — хеширование паролей
- **jsonwebtoken** — авторизация через JWT
- **method-override** — для поддержки `PUT` и `DELETE` в формах
- **csurf** — защита от CSRF-атак

---

## 📌 Возможные ошибки и решения
**1️⃣ `MongoDB Connection Error: Could not connect to any servers...`**  
✔ Проверь `MONGO_URI` в `.env`, добавь свой IP в `MongoDB Atlas > Network Access`

**2️⃣ `Cannot POST /tasks/update/:id`**  
✔ Убедись, что в `app.js` подключен `method-override`:
```js
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
```

**3️⃣ `Invalid CSRF Token`**  
✔ Добавь CSRF-токен в `app.js`:
```js
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';
  next();
});
```

---

