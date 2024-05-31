import * as React from "react";
import "./App.css";
import { Users } from "./components/Users";

/*
- [ ]  Crear interfaz para visualizar información de clientes.
- [ ]  Poder agregar, eliminar y acutalizar nuevos usuarios.
- [ ]  Nuestro frontend se conecta con el backend.
- [ ]  Hacer conexión con el API de tarjetas.
- [ ]  Se tiene buen manejo de errores y pantallas de carga.
*/

const USER_STATUS = Object.freeze({
	PENDIENTE: { status: "PENDIENTE" },
	EN_PROCESO: { status: "EN_PROCESO" },
	COMPLETADO: { stauts: "COMPLETADO" },
});

function App() {
	// get one user
	// post user
	// delete user

	// users component

	// user component

	return (
		<div className="App">
			<Users />
		</div>
	);
}

export default App;
