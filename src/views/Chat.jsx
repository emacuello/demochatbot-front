import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import BubbleChat from './BubbleChat';

const socket = io('/chat', {
	auth: {
		token: localStorage.getItem('token'),
		name: localStorage.getItem('name'),
	},
});

const Chat = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [userStatus, setUserStatus] = useState('');

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const meMessage = {
			id: 'Me',
			message,
		};
		setMessages([...messages, meMessage]);
		socket.emit('mensaje', message);
		setMessage('');
	};
	socket.on('connect', () => {
		setUserStatus('Conectado');
		console.log('conectado');
	});
	socket.on('disconnect', () => {
		setUserStatus('Desconectado');
		console.log('desconectado');
	});
	useEffect(() => {
		socket.on('mensaje', recibeMenssage);
		return () => socket.off('mensaje', recibeMenssage);
	}, []);

	const recibeMenssage = (data) => setMessages((state) => [...state, data]);

	return (
		<div>
			{userStatus === 'Desconectado' ? (
				<div
					className="p-4 mb-4 text-m  rounded-lg   text-red-700 "
					role="alert"
				>
					<span className="font-bold">{userStatus}</span>
				</div>
			) : (
				<div
					className="p-4 mb-4 text-m  rounded-lg  text-green-400"
					role="alert"
				>
					<span className="font-bold">{userStatus}</span>
				</div>
			)}
			<div className="h-screen  text-white flex items-center justify-center">
				<form
					onSubmit={handleSubmit}
					className=" p-10 object-bottom rounded-2xl"
				>
					<h1 className="text-3xl text-center font-bold">Chat</h1>
					<input
						type="text"
						value={message}
						onChange={handleChange}
						className="border-2 border-zinc-500 p-2 w-full text-black"
					/>
					{messages.map((m, i) => (
						<BubbleChat
							key={i}
							message={m.message}
							name={m.id}
							id={i}
						></BubbleChat>
					))}
				</form>
			</div>
		</div>
	);
};

export default Chat;
