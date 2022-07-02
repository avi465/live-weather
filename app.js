// require
require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
const app = express();

// use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

// server listening port
app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
})

// variables
let lat = "";
let long = "";
let myStatus = "";
let weatherData = [];
let weatherData1 = [];

// Get Requests
app.get("/", function (req, res) {
    if (lat == "" && long == "") {
        const urlLocal = "https://api.openweathermap.org/data/2.5/onecall?lat=28.7041&lon=77.1025&exclude=hourly,minutely,alerts&units=metric&appid=" + process.env.API_KEY;
        // OpenMeatherMap Api Call
        https.get(urlLocal, function (response) {
            response.on("data", function (data) {
                const object = JSON.parse(data);
                const icond = object.current.weather[0].icon;
                const iconn = icond.replace("d", "n");
                const imgUrl = "http://openweathermap.org/img/wn/";
                myStatus = "Delhi"
                weatherData[0] = object.current.weather[0].description;
                weatherData[1] = Math.round(object.current.temp);
                weatherData[2] = imgUrl + iconn + "@2x.png";
                for (let i = 0, j = 0; i < 5; i++, j = j + 4) {
                    if (i == 0) {
                        weatherData1[j] = "Today";
                    } else {
                        weatherData1[j] = new Date(object.daily[i].dt * 1000).toLocaleDateString("en-us", { weekday: "short" });
                    }
                    weatherData1[j + 1] = imgUrl + object.daily[i].weather[0].icon.replace("d", "n") + "@2x.png";
                    weatherData1[j + 2] = Math.round(object.daily[i].temp.max);
                    weatherData1[j + 3] = Math.round(object.daily[i].temp.min);
                }
                res.render("index", {
                    myStatus: myStatus,
                    currentDescription: weatherData[0],
                    currentTemp: weatherData[1],
                    currentIcon: weatherData[2],
                    weather: weatherData1
                })
            })
        })
    } else {
        // OpenMeatherMap Api Call
        let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely,alerts" + "&appid=" + process.env.API_KEY + "&units=metric";
        https.get(url, function (response) {
            response.on("data", function (data) {
                const object = JSON.parse(data);
                const icond = object.current.weather[0].icon;
                const iconn = icond.replace("d", "n");
                const imgUrl = "http://openweathermap.org/img/wn/";
                myStatus = "Local Weather"
                weatherData[0] = object.current.weather[0].description;
                weatherData[1] = Math.round(object.current.temp);
                weatherData[2] = imgUrl + iconn + "@2x.png";
                for (let i = 0, j = 0; i < 5; i++, j = j + 4) {
                    if (i == 0) {
                        weatherData1[j] = "Today";
                    } else {
                        weatherData1[j] = new Date(object.daily[i].dt * 1000).toLocaleDateString("en-us", { weekday: "short" });
                    }
                    weatherData1[j + 1] = imgUrl + object.daily[i].weather[0].icon.replace("d", "n") + "@2x.png";
                    weatherData1[j + 2] = Math.round(object.daily[i].temp.max);
                    weatherData1[j + 3] = Math.round(object.daily[i].temp.min);
                }
                res.render("index", {
                    myStatus: myStatus,
                    currentDescription: weatherData[0],
                    currentTemp: weatherData[1],
                    currentIcon: weatherData[2],
                    weather: weatherData1
                })
            })
        })
    }

})

// Post Request
app.post("/", function (req, res) {
    // Post request from public/js/index.js
    lat = req.body.lat;
    long = req.body.long;
})