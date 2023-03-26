const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/api", (req, res) => {
    const date = new Date();
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
    });
});

app.get("/api/:date", (req, res) => {
    const datestr = req.params.date;
    if (datestr.includes("/") || datestr.includes("-")) {
        const date = new Date(datestr);
        if (!date) {
            res.json({ error: "Invalid Date" });
        } else {
            res.json({
                unix: Number(date.getTime()),
                utc: String(date.toUTCString()),
            });
        }
    }
    let date = new Date(Number(datestr) * 1000);
    if (isNaN(date)) {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: Number(date.getTime()),
            utc: String(date.toUTCString()),
        });
    }
});

app.listen(PORT, () => {
    console.log("Server start at : " + PORT);
});
