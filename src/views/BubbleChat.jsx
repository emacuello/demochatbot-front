import { useState } from 'react';

const BubbleChat = ({ message, name, id }) => {
	const bg = () => {
		if (name === 'Me') {
			return 'bg-amber-500 text-blue-950';
		} else {
			return 'bg-fuchsia-950 text-white ml-auto';
		}
	};

	return (
		<div className="flex items-start gap-2.5">
			<div
				className={`my-3 table rounded-md p-2 border border-gray-700 rounded-e-xl rounded-es-xl ${bg()}`}
				key={id}
			>
				<div className="flex items-center space-x-2 rtl:space-x-reverse">
					<span className="text-sm font-semibold ">{name}</span>
					<span className="text-sm font-normal ">
						{new Date().toTimeString().split(' ')[0]}
					</span>
				</div>
				<p className="text-sm font-normal py-2.5 ">{message}</p>
				<span className="text-sm font-normal ">Delivered</span>
			</div>
		</div>
	);
};

export default BubbleChat;
