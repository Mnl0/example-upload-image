import React, { useState } from "react";
import "./test-form.css";

function Formulario() {
	const [image, setImage] = useState();
	const [fileName, setFileName] = useState('Ningun Archivo Seleccionado');

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
					'Content-Type': image.type
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
			<div className="container-form">
				<form onSubmit={handleSubmit}>
					<img src="/logo-power-star.png"
						alt="Logo de Power Start"
					/>
					<h2>Ingresa una imagen</h2>
					<label
						htmlFor="image"
						className="label-image"
					>Selecciona una imagen
					</label>
					<input
						id="image"
						type="file"
						name="image"
						onChange={handleFile}
					/>
					<span className="file-name"
					>{fileName}</span>
					<button
						className="button-submit"
					>Subir Imagen</button>
				</form>
			</div>
		</>
	)
}
export default Formulario;