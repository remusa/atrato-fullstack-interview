import * as React from "react";
import { createUser } from "../lib/api";

export function CreateUser({ fetchUsers }) {
	const [user, setUser] = React.useState({});
	const [name, setName] = React.useState("");

	function handleChange(e) {
		const data = {};
		setUser((prevUser) => {
			return { ...prevUser, ...data };
		});
	}

	async function handleSubmit() {
		await createUser(user);
		fetchUsers();
	}

	return (
		<form>
			<label>
				Name:
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<button type="submit" onClick={handleSubmit}>
				Create user
			</button>
		</form>
	);
}
