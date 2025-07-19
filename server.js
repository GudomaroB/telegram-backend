// index.js
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

// ✅ Разрешаем запросы с любых frontend-источников
app.use(cors());

app.use(bodyParser.json());

const BOT_TOKEN = "8147321742:AAH_N68NqQQ6PzanKdJ-W-KJlUGX7s9oOKE";
const CHAT_ID = "7032556278";

app.post("/send-order", async (req, res) => {
  const { name, phone, cart } = req.body;

  if (!cart || !Array.isArray(cart)) {
    return res.status(400).json({ error: "Invalid cart format" });
  }

  let message = `🛒 Новый заказ\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n`;

  cart.forEach((item) => {
    message += `• ${item.title} ×${item.quantity}\n`;
  });

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML"
        })
      }
    );

    const tgJson = await tgRes.json();

    if (!tgJson.ok) {
      throw new Error(tgJson.description || "Telegram error");
    }

    res.status(200).json({ ok: true, telegram: tgJson });
  } catch (err) {
    console.error("❌ Ошибка Telegram:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (_, res) => {
  res.send("✅ Telegram backend is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
