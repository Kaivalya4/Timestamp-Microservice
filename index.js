const express = require("express");

const app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/api", (req, res) => {
    const array = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const array1 = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const date = new Date();
    res.json({
        unix: Number(date.getTime()),
        utc: String(
            array[parseInt(date.getUTCDay())] +
                ", " +
                date.getDate() +
                " " +
                array1[parseInt(date.getMonth())] +
                " " +
                date.getFullYear() +
                " " +
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds() +
                " " +
                "GMT"
        ),
    });
});

app.get("/api/:date", (req, res) => {
    const datestr = req.params.date;
    console.log(datestr);
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
        const date = new Date(Number(datestr));
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
