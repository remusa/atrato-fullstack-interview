const BACKEND_URL = "http://localhost:5000/v1";
const API_KEY = "abc123";
const { default: axios } = require("axios");

const HEADERS = {
	Authorization: `Bearer ${API_KEY}`,
};

export async function getUsers() {
	try {
		const response = await fetch(`${BACKEND_URL}/users`, {
			method: "GET",
			headers: HEADERS,
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function createUser(user) {
	const options = {
		method: "POST",
		url: `${BACKEND_URL}/users`,
		headers: HEADERS,
		data: {
			user,
		},
	};

	try {
		const { data } = await axios.request(options);
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteUser(userId) {
	try {
		const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
			method: "DELETE",
			headers: HEADERS,
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
