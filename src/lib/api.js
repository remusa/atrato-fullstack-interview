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
