import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './views/Chat';
import Login from './views/Login';
import Register from './views/Register';
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<h1>Hello world</h1>}></Route>
				<Route path="/chat" element={<Chat />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
			</Routes>
		</>
	);
}

export default App;
