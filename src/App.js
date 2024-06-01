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

export const USER_STATUS = Object.freeze({
	PENDIENTE: { value: "PENDIENTE", label: "Pendiente" },
	EN_PROCESO: { value: "EN_PROCESO", label: "En Proceso" },
	COMPLETADO: { value: "COMPLETADO", label: "Completado" },
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
