## Проверка работы API

### Примеры API маршрутов

- Регистрация пользователя: POST http://127.0.0.1:3333/auth/register
- Вход в личный кабинет: POST http://127.0.0.1:3333/auth/login

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
