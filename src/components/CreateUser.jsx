import * as React from "react";
import { USER_STATUS } from "../App";
import { createUser } from "../lib/api";
import { createMockUser } from "../lib/utils";

export function CreateUser({ fetchUsers }) {
	const [loading, setLoading] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [name, setName] = React.useState("");
	const [middleName, setMiddleName] = React.useState("");
	const [fLastName, setFLastName] = React.useState("");
	const [sLastName, setSLastName] = React.useState("");
	const [birthday, setBirthday] = React.useState("");
	const [status, setStatus] = React.useState(USER_STATUS.EN_PROCESO.value);
	const [assignedAnalyst, setAssignedAnalyst] = React.useState("David");

	async function handleSubmit() {
		setLoading(true);
		const user = {
			email,
			phone,
			name,
			middleName,
			fLastName,
			sLastName,
			birthday,
			status,
			assignedAnalyst,
		};
		const data = await createUser(user).finally(() => {
			setLoading(false);
		});
		if (!data) {
			return;
		}
		fetchUsers();
		clean();
	}

	function handleMock() {
		const mock = createMockUser();
		setEmail(mock.email);
		setPhone(mock.phone);
		setName(mock.name);
		setMiddleName(mock.middleName);
		setFLastName(mock.fLastName);
		setSLastName(mock.sLastName);
		setBirthday(new Date(mock.birthday));
		setStatus(USER_STATUS.EN_PROCESO.value);
		setAssignedAnalyst(mock.assignedAnalyst);
	}

	function clean() {
		setEmail("");
		setPhone("");
		setName("");
		setMiddleName("");
		setFLastName("");
		setSLastName("");
		setBirthday("");
		setStatus(USER_STATUS.PENDIENTE.value);
		setAssignedAnalyst("David");
	}

	if (loading) {
		return <div>Creating user...</div>;
	}

	return (
		<div className="user-create-form">
			{/* TODO: create input factory */}
			<label>
				Email:
				<input
					id="email"
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					disabled={loading}
				/>
			</label>

			<label>
				Phone:
				<input
					id="phone"
					value={phone}
					type="tel"
					onChange={(e) => setPhone(e.target.value)}
					disabled={loading}
				/>
			</label>

			<label>
				Name:
				<input
					id="name"
					value={name}
					type="text"
					onChange={(e) => setName(e.target.value)}
					disabled={loading}
				/>
			</label>

			<label>
				Middle Name:
				<input
					id="middleName"
					value={middleName}
					type="text"
					onChange={(e) => setMiddleName(e.target.value)}
					disabled={loading}
				/>
			</label>

			<label>
				First Last Name:
				<input
					id="fLastName"
					value={fLastName}
					type="text"
					onChange={(e) => setFLastName(e.target.value)}
					disabled={loading}
				/>
			</label>

			<label>
				Second Last Name:
				<input
					id="sLastName"
					value={sLastName}
					type="text"
					onChange={(e) => setSLastName(e.target.value)}
					disabled={loading}
				/>
			</label>

			<label>
				Birthday:
				<input
					id="birthday"
					value={birthday}
					type="date"
					onChange={(e) => setBirthday(e.target.value)}
					disabled={loading}
				/>
			</label>

			<label>
				Status:
				<label>
					<input
						type="radio"
						name="status"
						checked={status === USER_STATUS.PENDIENTE.value}
						onChange={() => setStatus(USER_STATUS.PENDIENTE.value)}
						disabled={loading}
					/>
					{USER_STATUS.PENDIENTE.label}
				</label>
				<label>
					<input
						type="radio"
						name="status"
						checked={status === USER_STATUS.EN_PROCESO.value}
						onChange={() => setStatus(USER_STATUS.EN_PROCESO.value)}
						disabled={loading}
					/>
					{USER_STATUS.EN_PROCESO.label}
				</label>
				<label>
					<input
						type="radio"
						name="status"
						checked={status === USER_STATUS.COMPLETADO.value}
						onChange={() => setStatus(USER_STATUS.COMPLETADO.value)}
						disabled={loading}
					/>
					{USER_STATUS.COMPLETADO.label}
				</label>
			</label>

			<label>
				Assigned Analyst:
				<input
					id="assignedAnalyst"
					value={assignedAnalyst}
					type="text"
					onChange={(e) => setAssignedAnalyst(e.target.value)}
					disabled={loading}
					defaultValue={assignedAnalyst}
				/>
			</label>

			<button type="button" onClick={handleSubmit}>
				Create user
			</button>

			<hr />

			<button type="button" onClick={handleMock}>
				Mock user
			</button>
		</div>
	);
}
