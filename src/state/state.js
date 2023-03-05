import { atom } from 'recoil';

export const authState = atom({
	key: 'textState', // unique ID (with respect to other atoms/selectors)
	default: '', // default value (aka initial value)
});

export const boardIdState = atom({
	key: 'boardIdState',
	default: '',
});
