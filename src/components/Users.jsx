import * as React from "react";
import * as api from "../lib/api";
import { CreateUser } from "./CreateUser";

const formatter = new Intl.DateTimeFormat("es-MX", {
	dateStyle: "long",
});

export function Users() {
	const [users, setUsers] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const fetchUsers = React.useCallback(() => {
		setLoading(true);
		api
			.getUsers()
			.then((res) => {
				setUsers(res.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	React.useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!users) {
		return <div>No users found</div>;
	}

	return (
		<>
			<button type="button" onClick={fetchUsers}>
				Refresh users
			</button>

			<ul className="users-list">
				{users.map((user) => {
					return (
						<li key={user.id} className="user-card">
							<p>{user.name}</p>
							<p>{user.id}</p>
							{user.birthday ? (
								<p>{formatter.format(new Date(user.birthday))}</p>
							) : null}
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
		</>
	);
}
