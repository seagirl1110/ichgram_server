## Проверка работы API

### Примеры API маршрутов

- Регистрация пользователя: POST http://127.0.0.1:3333/auth/register
- Вход в личный кабинет: POST http://127.0.0.1:3333/auth/login

- Получение данных пользователя: GET http://127.0.0.1:3333/user/:userId
- Обновление данных пользователя: PUT http://127.0.0.1:3333/user/update

- Создание поста: POST http://127.0.0.1:3333/post/

- Поиск пользователей: GET http://127.0.0.1:3333/search/users?query=
- Поиск постов: GET http://127.0.0.1:3333/search/posts?query=

### Ожидаемые данные

#### Регистрация пользователя

```bash
{
  "full_name": "string",
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Вход в личный кабинет

```bash
{
  "login": "string", # В качестве значения логина может быть username или email
  "password": "string",
}
```

#### Обновление данных пользователя

```bash
{
  "bio"?: "string",
  "username"?: "string",
}
```

#### Создание поста

```bash
{
    "description": "string"
}
```
