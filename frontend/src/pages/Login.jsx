import React, { useState } from 'react'
import './login.css'
function Login() {
	const [value, setValue] = useState({
		username: '',
		password: '',
	})

	const handleChange = (event) => {
		setValue({
			...value,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const response = await fetch('http://localhost:3000', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(value)
			})
			const data = await response.json();
			console.log(data)
			if (data.success) {
				console.log('todo salio bien')
				window.location.href = '/formulario'
			}
		} catch (ex) {
			console.log('Error en el fetch', ex)
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='titulo'>
					<h1>Login</h1>
				</div>
				<div className='inputs'>
					<input
						type='text'
						placeholder='username'
						name='username'
						onChange={(e) => handleChange(e)}
						required
					/>
					<input
						type='password'
						placeholder='password'
						name='password'
						onChange={(e) => handleChange(e)}
						required
					/>
				</div>
				<button
					type='submit'>
					Ingresar
				</button>

			</form>
		</>
	)
}

export default Login;