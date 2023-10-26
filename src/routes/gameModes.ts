import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export enum GameModes {
	Normal = 'Normal',
	Memory = 'Memory'
}

function getDefault(): GameModes {
	if (browser && typeof localStorage !== 'undefined') {
		const stored = localStorage.getItem('gameMode');
		if (Object.values(GameModes).includes(stored as GameModes)) {
			return stored as GameModes;
		}
		return GameModes.Normal;
	}
	return GameModes.Normal;
}

export const gameModeStore = writable(getDefault());

if (browser && typeof localStorage !== 'undefined') {
	gameModeStore.subscribe((value) => {
		localStorage.setItem('gameMode', value);
	});
}
