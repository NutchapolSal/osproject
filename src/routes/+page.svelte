<script lang="ts">
	import { GameModes, gameModeStore } from './gameModes';
	import type { PageData } from './$types';

	export let data: PageData;

	let showSeedBox = false;
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
	<button
		type="button"
		on:click|self={() => {
			showSeedBox = !showSeedBox;
			if (!showSeedBox) {
				userSeed = '';
			}
		}}
	>
		{#if userSeed == ''}
			🌱
		{:else}
			🌳
		{/if}
	</button>
</div>

<input
	type="text"
	name="gameSeed"
	placeholder="Game Seed..."
	bind:value={userSeed}
	autocomplete="off"
	class:hidden={!showSeedBox}
/>

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
		gap: 16px;
	}

	.menu-mode {
		border-radius: 980px;
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
		border-radius: 980px;
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

	input[type='text'] {
		width: 25vmin;
		padding: 0.1vmin 3vmin 0.1vmin 3vmin;
		border: var(--base-black) 0.6vmin solid;
		font-family: myFirstFont;
		font-size: 5.5vmin;
		border-radius: 7.8vmin;
		transition: 0.35s all cubic-bezier(0.33, 1, 0.68, 1);
		background-color: transparent;
		filter: brightness(170%);
		height: 6vmin;
		opacity: 100%;
	}

	input[type='text'].hidden {
		height: 0px;
		padding: 0px;
		border: var(--base-black) 0px solid;
		opacity: 20%;
	}

	input[type='text']:focus,
	input[type='text']:not(:placeholder-shown) {
		width: 40vmin;
		background-color: white;
		filter: brightness(100%);
	}
</style>
