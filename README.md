## Проверка работы API

### Примеры API маршрутов

#### /auth

- Регистрация пользователя: POST http://127.0.0.1:3333/auth/register
- Вход в личный кабинет: POST http://127.0.0.1:3333/auth/login

#### /user

- Получение данных пользователя: GET http://127.0.0.1:3333/user/:userId
- Обновление данных пользователя: PUT http://127.0.0.1:3333/user/update

#### /post

- Создание поста: POST http://127.0.0.1:3333/post/
- Получение поста: GET http://127.0.0.1:3333/post/:postId
- Обновление поста: PUT http://127.0.0.1:3333/post/:postId
- Удаление поста: DELETE http://127.0.0.1:3333/post/:postId

#### /comment

- Создание комментария: POST http://127.0.0.1:3333/comment/:postId
- Удаление комментария: DELETE http://127.0.0.1:3333/comment/:commentId

#### /like

- Лайк поста: POST http://127.0.0.1:3333/like/:postId/like
- Удаление лайка поста: POST http://127.0.0.1:3333/like/:postId/unlike

#### /search

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
  "username"?: "string",
  "bio"?: "string",
  "website?": "string"
}
```

#### Создание поста

```bash
{
    "description": "string"
}
```

#### Обновление поста

```bash
{
    "description"?: "string"
    "images"?: "string"[]
}
```

#### Создание комментария

```bash
{
    "text": "string"
}
```
