const { default: axios } = require("axios");

require("dotenv").config();

function getNewUserId() {
	const id = Math.floor(Math.random(0, 1) * 1000);
	return id;
}

const options = {
	method: "GET",
	url: process.env.CARD_API_URL,
	headers: { "X-Api-Key": process.env.CARD_API_KEY },
};

async function getCreditCard() {
	try {
		const { data } = await axios.request(options);
		return data;
	} catch (error) {
		console.error(error);
	}
}

exports.getNewUserId = getNewUserId;
exports.getCreditCard = getCreditCard;
