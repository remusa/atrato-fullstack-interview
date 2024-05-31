import * as React from "react";
import * as api from "../lib/api";

// TODO: format date
const formatter = new Intl.DateTimeFormat("es-MX", {
	dateStyle: "long",
});

export function Users() {
	const [users, setUsers] = React.useState([]);
	console.log("🚀 ~ Users ~ users:", users);

	// const [user, setUser] = React.useState({});

	React.useEffect(() => {
		api
			.getUsers()
			.then((res) => {
				setUsers(res.data);
			})
			.catch((e) => {
				console.log("🚀 ~ React.useEffect ~ e:", e);
			})
			.finally(() => {});
	}, []);

	// async function createUser() {
	// 	api
	// 		.createUser(user)
	// 		.then((res) => {
	// 			console.log("user created");
	// 		})
	// 		.catch((e) => {
	// 			console.error(`Error creating user: ${e}`);
	// 		});
	// }

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
					</li>
				);
			})}

			{/* <form>
				<div>
					<input type="text" value={user} />
				</div>
			</form> */}
		</ul>
	);
}
