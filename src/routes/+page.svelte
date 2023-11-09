<script lang="ts">
	import { GameModes, gameModeStore } from './gameModes';
	import type { PageData } from './$types';

	export let data: PageData;
	let showSeedBox = false;
	let userSeed = '';
	function getSearchParamsString(userSeed: string, gameMode: GameModes) {
		const params = new URLSearchParams();
		if (userSeed != '') {
			params.set('seed', userSeed);
		}
		if (gameMode != GameModes.Normal) {
			params.set('mode', gameMode);
		}
		if (0 == params.size) {
			return '';
		}
		return `?${params.toString()}`;
	}
</script>

<div class="menu-user">
	{#if data.loginInfo}
		<a href="./user/{data.loginInfo.userId}">{data.loginInfo.displayName}</a>
	{:else}
		<a href="./login/google">Login with Google</a>
	{/if}
</div>
<div class="widget-header">
	<h1>Candy Rotator</h1>
</div>
<a href={`./game${getSearchParamsString(userSeed, $gameModeStore)}`}>🎃 Start 🦇</a>
<div class="menu-group">
	{#each Object.values(GameModes) as mode}
		<button
			aria-current={$gameModeStore == mode}
			aria-label={mode}
			on:click={() => ($gameModeStore = mode)}
			class="menu-mode">{mode}</button
		>
	{/each}
</div>
<div class="seed-box">
	<button class="btn-seed" type="button">
		{#if userSeed == ''}
			🌱
		{:else}
			🌳
		{/if}
	</button>
	<input
		class="input-seed"
		type="text"
		name="gameSeed"
		placeholder="Enter seed..."
		bind:value={userSeed}
		autocomplete="off"
	/>
</div>
<a href="./leaderBoard/{$gameModeStore}">🧛Leaderboard</a>
<a href="./help">How to play🧟</a>

<style>
	.widget-header h1 {
		width: 100%;
		display: flex;
		font-family: myFirstFont;
		font-size: 21vmin;
		margin: 0;
		color: var(--base-orange);
		text-align: center;
		line-height: 1;
		text-shadow: 0px 0px 10px var(--base-black);
	}

	.menu-user {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 10px;
	}

	.menu-user a {
		font-size: 3.5vmin;
		margin-left: auto;
	}

	.menu-group {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16px;
	}

	.menu-mode {
		font-family: myFirstFont;
		font-size: 7.2vmin;
		font-weight: 600;
		background: var(--base-black);
		color: #fff;
		transform: translate(-2px, -2px);
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
		transition: all 0.1s;
		padding-left: 3.4vmin;
		padding-right: 3.4vmin;
		padding-top: 1.2vmin;
		padding-bottom: 1.2vmin;
		border-radius: 6vmin;
	}

	* {
		box-sizing: border-box;
	}
	.seed-box {
		width: fit-content;
		height: fit-content;
		display: flex;
		flex-direction: row-reverse;
		border-radius: 5vmin;
		background-color: var(--base-black);
		transition: background-color 500ms cubic-bezier(0.33, 1, 0.68, 1);
	}
	.input-seed {
		width: 0px;
		height: 10vmin;
		border-style: none;
		padding: 0px;
		font-family: myFirstFont;
		font-size: 5vmin;
		outline: none;
		transition: all 0.5s ease-in-out, padding-left 500ms cubic-bezier(0.5, 0, 0.75, 0);
		background-color: transparent;
		padding-right: 0px;
		color: #fff;
	}
	.input-seed::placeholder {
		color: rgba(255, 255, 255, 0.5);
		font-size: 5vmin;
		font-weight: 100;
	}
	.btn-seed:focus ~ .input-seed,
	input[type='text']:focus,
	input[type='text']:not(:placeholder-shown) {
		width: 42vmin;
		padding-left: 4vmin;
		transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
	}
	.btn-seed {
		width: 10vmin;
		height: 10vmin;
		border-style: none;
		font-size: 4vmin;
		font-weight: bold;
		outline: none;
		cursor: pointer;
		border-radius: 6vmin;
		right: 0px;
		color: #ffffff;
		background-color: transparent;
		pointer-events: painted;
	}
	.seed-box:has(.btn-seed:focus),
	.seed-box:has(.input-seed:focus) {
		background-color: var(--base-orange);
		transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
	}

	a {
		text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 7.2vmin;
		font-weight: 600;
		font-family: myFirstFont;
		padding-left: 3.4vmin;
		padding-right: 3.4vmin;
		padding-top: 1.2vmin;
		padding-bottom: 1.2vmin;
		border-radius: 6vmin;
	}

	a:hover {
		background-color: var(--base-orange);
	}

	button[aria-current='true'] {
		transform: none;
		filter: none;
		box-shadow: inset var(--base-orange) 0px 0px 10px 2px;
		border: var(--base-orange) 2px solid;
	}
</style>
