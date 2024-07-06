import React, { useState } from "react";

function Formulario() {
	const [image, setImage] = useState();

	const handleFile = (event) => {
		setImage(event.target.files[0]);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/image', {
				method: 'POST',
				body: image,
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json();
			console.log(data)
			if (data.success) {
				console.log('todo salio bien')
				window.location.href = '/resultado'
			}

		} catch (ex) {
			console.log('Error en el fetch', ex)
		}
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1>Ingresar una imagen</h1>
				<input
					type="file"
					name="image"
					onChange={handleFile}
				/>
				<button>Enviar Imagen</button>
			</form>
		</>
	)

}
export default Formulario;