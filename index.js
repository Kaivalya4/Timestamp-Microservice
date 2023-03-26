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
    //console.log(datestr);
    let bool = 0;
    for (let i of datestr) {
        if (!(i >= "0" && i <= "9")) {
            bool = 1;
            break;
        }
    }
    if (bool) {
        const date = new Date(datestr);
        if (isNaN(date) || !date) {
            res.json({
                error: "Invalid Date",
            });
        } else {
            res.json({
                unix: date.getTime(),
                utc: date.toUTCString(),
            });
        }
    } else {
        const date = new Date(Number(datestr) * 1000);
        if (isNaN(date) || !date) {
            res.json({
                error: "Invalid Date",
            });
        } else {
            res.json({
                unix: date.getTime(),
                utc: date.toUTCString(),
            });
        }
    }
});

app.listen(PORT, () => {
    console.log("Server start at : " + PORT);
});
