import { useState } from 'react';
import register from '../helpers/register';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [user, setUser] = useState(register);
	const navigate = useNavigate();
	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:3000/auth/register',
				user
			);
			if (response.data) {
				navigate('/login');
			} else {
				throw new Error('Error al crear el usuario');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="h-screen bg-zinc-800 text-black">
			<form
				onSubmit={handleSubmit}
				className="bg-zinc-900 p-10 flex flex-col rounded-2xl absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4"
			>
				<input
					type="text"
					className="rounded-md mb-5"
					placeholder="Nombre"
					name="name"
					onChange={handleChange}
				/>
				<input
					type="text"
					className="rounded-md mb-5"
					placeholder="Email"
					name="email"
					onChange={handleChange}
				/>
				<input
					type="password"
					className="mb-5 rounded-md"
					placeholder="Password"
					name="password"
					onChange={handleChange}
				/>
				<input
					type="password"
					className="mb-5 rounded-md"
					placeholder="Confirmar Password"
					name="confirmPassword"
					onChange={handleChange}
				/>
				<input
					type="date"
					className="mb-5 rounded-md"
					placeholder="Fecha de Nacimiento"
					name="birthdate"
					onChange={handleChange}
				/>
				<button className="bg-red-950 p-2 rounded-md">
					Registrarse
				</button>
			</form>
		</div>
	);
};

export default Register;
