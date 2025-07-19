# Telegram Backend для кафе-заказов

## Как использовать

1. Зайди на [https://deta.space](https://deta.space) и зарегистрируйся (если ещё нет аккаунта)
2. Установи [Deta Space CLI](https://deta.space/docs/en/introduction/cli)
3. Зали: `deta new --node` и следуй инструкциям
4. Скопируй содержимое этого проекта в репозиторий, который Deta создал
5. Замени токен и chat_id в `server.js`
6. Запусти 🚀

## Маршрут

- `POST /send-order` — принимает заказ:

```
{
  "name": "Василий",
  "items": [
    { "title": "Пиво", "quantity": 3, "price": 600 },
    { "title": "Шашлык", "quantity": 2, "price": 1500 }
  ]
}
```