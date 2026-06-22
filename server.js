const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

/* ========================= SAVE RESPONSE ========================= */
app.post("/submit", (req, res) => {
    const data = req.body;

    let responses = [];

    if (fs.existsSync("responses.json")) {
        responses = JSON.parse(fs.readFileSync("responses.json", "utf8"));
    }

    responses.push(data);

    fs.writeFileSync("responses.json", JSON.stringify(responses, null, 2));

    console.log("📩 New Response:", data);

    res.json({ message: "Saved successfully 💌" });
});

/* ========================= VIEW RESPONSES ========================= */
app.get("/responses", (req, res) => {
    if (!fs.existsSync("responses.json")) {
        return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync("responses.json", "utf8"));
    res.json(data);
});

/* ========================= START SERVER ========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});