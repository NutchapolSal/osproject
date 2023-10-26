import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export enum GameModes {
	Normal = 'Normal',
	Memory = 'Memory'
}

export function reverseMapGameModes(v: string) {
	switch (v) {
		case 'Normal':
			return GameModes.Normal;
		case 'Memory':
			return GameModes.Memory;
		default:
			return null;
	}
}

function getDefault(): GameModes {
	if (browser && typeof localStorage !== 'undefined') {
		const stored = localStorage.getItem('gameMode');
		if (stored == null) return GameModes.Normal;
		return reverseMapGameModes(stored) ?? GameModes.Normal;
	}
	return GameModes.Normal;
}

export const gameModeStore = writable(getDefault());

if (browser && typeof localStorage !== 'undefined') {
	gameModeStore.subscribe((value) => {
		localStorage.setItem('gameMode', value);
	});
}
