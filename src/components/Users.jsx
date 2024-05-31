import * as React from "react";
import * as api from "../lib/api";
import { CreateUser } from "./CreateUser";

// TODO: format date
const formatter = new Intl.DateTimeFormat("es-MX", {
	dateStyle: "long",
});

export function Users() {
	const [users, setUsers] = React.useState([]);

	function fetchUsers() {
		api
			.getUsers()
			.then((res) => {
				setUsers(res.data);
			})
			.catch((e) => {
				console.log("🚀 ~ React.useEffect ~ e:", e);
			})
			.finally(() => {});
	}

	React.useEffect(() => {
		fetchUsers();
	}, []);

	function createUser() {
		api
			.createUser(user)
			.then((res) => {
				console.log("user created");
			})
			.catch((e) => {
				console.error(`Error creating user: ${e}`);
			});
	}

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	if (!users) {
		return <div>No users found</div>;
	}

	return (
		<ul className="users-list">
			{users.map((user) => {
				return (
					<li key={user.id} className="user-card">
						<p>{user.name}</p>
						<p>{user.id}</p>
						<p>{formatter.format(new Date(user.birthday))}</p>
						<p>{user.phone}</p>
						<p>{user.assignedAnalyst}</p>
						<button
							type="button"
							onClick={async () => {
								await api.deleteUser(user.id);
								fetchUsers();
							}}
						>
							Delete user
						</button>
					</li>
				);
			})}

			<CreateUser fetchUsers={fetchUsers} />
		</ul>
	);
}
