import { create } from 'zustand';

export const useStore = create((set) => ({
	user: null,
	localUser: () => {
		const user = localStorage.getItem('user');
		if (user) {
			set({ user: JSON.parse(user) });
		}
	},
}));
