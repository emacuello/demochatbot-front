import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../helpers/login';
const Login = () => {
	const [user, setUser] = useState(login);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(user);
			const response = await axios.post(
				'http://localhost:3000/auth/login',
				user
			);
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('name', response.data.name);
				navigate('/chat');
			} else {
				throw new Error('Invalid credentials');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="h-screen bg-zinc-800 text-white">
			<form
				onSubmit={handleSubmit}
				className=" p-7 flex flex-col bg-zinc-900 absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 rounded-2xl"
			>
				<h1 className="text-xl text-center font-bold">Login</h1>
				<input
					type="text"
					value={user.email}
					onChange={(e) =>
						setUser({ ...user, email: e.target.value })
					}
					className="mt-2 border-zinc-950 p-2 text-black font-semibold bg-slate-500 rounded-xl"
					placeholder="Email"
				/>
				<input
					type="password"
					value={user.password}
					onChange={(e) =>
						setUser({ ...user, password: e.target.value })
					}
					className=" flex mt-2 border-zinc-950 p-2 text-black font-semibold bg-slate-500 rounded-xl"
					placeholder="Password"
				/>
				<button
					type="submit"
					className="mt-2 border-zinc-950 p-2 text-black font-semibold bg-red-950 rounded-xl"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
