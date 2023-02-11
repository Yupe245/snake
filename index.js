const express = require("express");
const parser = require("body-parser");
const path = require("path");

const config = require("./src/config");
const app = express();

// <-> Middlewares <-> \\
app.use(parser.json());
app.use(express.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.use("/public", express.static(path.join(__dirname, "./src/public")));

(require("morgan"))("dev");
// <-> Middlewares <-> \\

app.get("/snake", async(req, res) => res.render("snake"));

app.listen(config.port, () => console.log("server started"));