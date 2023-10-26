import { writable } from "svelte/store";

const gameModes = [
    { name: "Normal", active: true },
    { name: "Memory", active: false }
];

const gameModeStore = writable(gameModes);

export { gameModeStore };
