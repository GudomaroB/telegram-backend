const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
app.use(bodyParser.json());

// 🔐 ВСТАВЬ СВОЙ ТОКЕН И CHAT_ID СЮДА
const BOT_TOKEN = "8147321742:AAH_N68NqQQ6PzanKdJ-W-KJlUGX7s9oOKE";
const CHAT_ID = "7032556278";

app.post("/send-order", async (req, res) => {
  const { name, items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid order format" });
  }

  let message = `🛒 Новый заказ\n👤 Клиент: ${name}\n`;
  items.forEach((item) => {
    message += `• ${item.title} ×${item.quantity}\n`;
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  message += `💰 Итого: ${total} ₸`;

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }
    );

    const result = await tgResponse.json();
    res.status(200).json({ ok: true, telegram: result });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/", (_, res) => {
  res.send("✅ Telegram backend is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
