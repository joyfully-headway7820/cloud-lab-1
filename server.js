const express = require("express");
const os = require("node:os");

const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 3000;
let services = [
    { id: 1, name: "Хранение файлов", category: "storage" },
    { id: 2, name: "Виртуальная машина", category: "compute" },
    { id: 3, name: "Среда разработки", category: "development" }
];

app.get("/", (req, res) => {
    res.send(`
    <html lang="ru"><meta charset="utf-8">
    <title>Cloud Lab</title>
    <h1>Моё приложение в GitHub Codespaces</h1>
    <p>Приложение запущено на удалённом сервере.</p>
    <a href="/api/status">Состояние сервера</a><br>
    <a href="/api/services">Список сервисов</a>
  `);
});

app.get("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = services.find(s => s.id === id);
  if (!item) {
    return res.status(404).json({ error: "Сервис не найден" });
  }
  res.json(item);
});

app.get("/api/status", (req, res) => {
    res.json({
        app: process.env.APP_NAME || "Cloud Lab",
        status: "ok",
        time: new Date().toISOString(),
        hostname: os.hostname()
    });
});

app.get('/api/hello', (req, res) => {
    if (req.query
        .name) {
        const name = req.query.name;
        res.json({
            greeting: `hello, ${name}`
        })
    }
    else {
        res.json({
            greeting: "hello"
        })
    }
})

app.get("/api/services", (req, res) => {
    res.json(services);
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server: http://localhost:${port}`);
});
