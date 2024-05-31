const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { getNewUserId, getCreditCard } = require("./utils");

require("dotenv").config();

const data = require("../data/data.json");
const PORT = 5000;

let users = data;

app.listen(5000, () => {
	console.log(`Server started on port ${PORT}`);
});

app.use(
	cors({
		origin: "http://localhost:3000",
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	}),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello from backend");
});

app.use((req, res, next) => {
	const authToken = req.headers.authorization?.split("Bearer")?.at(1).trim();
	if (!authToken) {
		return res.status(403).json({ error: "Not authorized" });
	}
	if (authToken !== process.env.API_KEY) {
		return res.status(403).json({ error: "Invalid authorization token" });
	}
	next();
});

app.get("/v1/users", (req, res) => {
	res.status(200).json({ data: users, total: users.length });
});

app.post("/v1/users", async (req, res) => {
	const data = req.body;
	const { user } = data;
	const id = getNewUserId();
	const creditCardData = await getCreditCard();
	const newUser = { id, ...user, cardInfo: creditCardData };
	users = users.concat(newUser);
	res.status(201).json({
		message: "User created",
	});
});

app.delete("/v1/users/:id", (req, res) => {
	const { id } = req.params;
	users = users.filter((user) => {
		return Number.parseInt(user.id) !== Number.parseInt(id);
	});
	res.status(200).json({ message: `User with id: ${id} succesfully deleted` });
});
