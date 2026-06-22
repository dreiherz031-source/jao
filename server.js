const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// save response
app.post("/submit", (req, res) => {
    const data = req.body;

    let responses = [];

    if (fs.existsSync("responses.json")) {
        responses = JSON.parse(fs.readFileSync("responses.json", "utf8"));
    }

    responses.push(data);

    fs.writeFileSync("responses.json", JSON.stringify(responses, null, 2));

    res.json({ message: "Saved successfully" });
});

// view responses
app.get("/responses", (req, res) => {
    if (!fs.existsSync("responses.json")) {
        return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync("responses.json", "utf8"));
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});