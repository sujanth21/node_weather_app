const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../views/partials"));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather", name: "Sujanth S" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Sujanth S" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sujanth S",
    message: "How can we help you?",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address to find the weather forecast.",
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({
          error: err,
        });
      }

      res.send({
        address: req.query.address,
        forecast: forecastData,
        location: location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Sujanth S",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
    name: "Sujanth S",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
