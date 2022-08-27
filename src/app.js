const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

/* Setting the views directory to the views folder. */
app.set("views", path.join(__dirname, "views"));
/* Setting the default layout to main.hbs and the extension to .hbs. */
app.engine(
  ".hbs",
  exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);
/* Setting the view engine to .hbs. */
app.set('view engine', '.hbs')

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/index"));
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
