const BACKEND_URL = "http://localhost:5000/v1";
const API_KEY = "abc123";

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
	try {
		const response = await fetch(`${BACKEND_URL}/users`, {
			method: "POST",
			headers: HEADERS,
			body: { user },
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (e) {
		console.error(`Error creating user: ${e.message}`);
	}
}

export async function deleteUser(userId) {
	try {
		const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
			method: "DELETE",
			headers: HEADERS,
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
}
