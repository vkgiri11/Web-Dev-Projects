const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", function (req, res) {
    const city = req.body.cityName;
    const apiKey = "7e757e4daee16b697b16ed6b34db2d2a";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units + " ";

    get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const iconID = weatherData.weather[0].icon;

            const iconID_URL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";

            //!In any get method....there can be only one res.send
            // res.send("<h1>The temperature in Durgapur is " + temp + " degree Celsius.</h1>");

            //? But we can have multiple res.write
            res.write("<h1>The temperature in " + city + " is " + temp + " degree Celsius.</h1>");
            res.write("<p>The weather is currently " + description + ".</p>");
            res.write("<img src=" + iconID_URL + ">");

            //! WRITING IS MANDATORY....otherwise the browser will keep reloading
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Sever Started");
});
