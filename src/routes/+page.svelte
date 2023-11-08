<script lang="ts">
	import { GameModes, gameModeStore } from './gameModes';
	import type { PageData } from './$types';

	export let data: PageData;
	let userSeed = '';
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
<a href={`./game${userSeed == '' ? '' : `?seed=${encodeURIComponent(userSeed)}`}`}>🎃 Start 🦇</a>
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
		position: relative;
	}
	.input-seed {
		width: 50px;
		height: 50px;
		border-style: none;
		padding: 10px;
		font-family: myFirstFont;
		font-size: 3vmin;
		letter-spacing: 2px;
		outline: none;
		border-radius: 25px;
		transition: all 0.5s ease-in-out;
		background-color: var(--base-black);
		padding-right: 40px;
		color: #fff;
	}
	.input-seed::placeholder {
		color: rgba(255, 255, 255, 0.5);
		font-size: 3vmin;
		letter-spacing: 2px;
		font-weight: 100;
	}
	.input-seed:focus {
		width: 42vmin;
		background-color: var(--base-black);
		transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
	}
	.btn-seed {
		width: 50px;
		height: 50px;
		border-style: none;
		font-size: 20px;
		font-weight: bold;
		outline: none;
		cursor: pointer;
		border-radius: 6vmin;
		position: absolute;
		right: 0px;
		color: #ffffff;
		background-color: transparent;
		pointer-events: painted;
	}
	.btn-seed:focus ~ .input-seed {
		display: flex;
		width: 42vmin;
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
