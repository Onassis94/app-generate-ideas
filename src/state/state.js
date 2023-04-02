import { atom } from 'recoil';

export const authState = atom({
	key: 'authState',
	default: '',
});

export const boardIdState = atom({
	key: 'boardIdState',
	default: '',
});

export const gptAuth = atom({
	key: 'gptAuthState',
	default: '',
});
