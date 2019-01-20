const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

// partials
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

// middlewares
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} : ${req.method} ${req.url}`;

  console.log("log ->>>", log);

  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("unable to log error on log file");
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

// helpers
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("sreamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  //   res.send({
  //     name: "test"
  //   });
  res.render("home.hbs", {
    pageTitle: "Home page",
    welcomeMessage: "Welcome handlebars"
  });
});

app.get("/about", (req, res) => {
  //   res.send("<h1>About</h1>");
  res.render("about.hbs", {
    pageTitle: "About page"
  });
});

app.listen(3000, () => {
  console.log("app listen on 3000");
});