require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")

const app = express();

// app.use(express.static("public"))
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

