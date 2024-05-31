const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();

const data = require("../data/data.json");
const PORT = 5000;

let users = data;

app.listen(5000, () => {
	console.log(`Server started on port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello from backend");
});
