<script lang="ts">
	import { GameModes, gameModeStore } from './gameModes';
	import type { PageData } from './$types';
	import CandyIcon from '$lib/images/candyIcon.png';

	export let data: PageData;
	let showExtraSettings = false;
	let userSeed = '';
	$: extraSettingsUsed = userSeed != '';
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

<svelte:head>
	<title>Candy Rotator</title>
	<meta property="og:title" content="Candy Rotator" />
	<meta property="og:description" content="a game about candies and rotation" />
	<meta property="og:url" content={data.url.href} />
	<meta property="og:image" content={CandyIcon} />
	<meta data-react-helmet="true" name="theme-color" content="#E6862E" />
</svelte:head>

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
	<button
		type="button"
		on:click={() => {
			if (!extraSettingsUsed) {
				showExtraSettings = !showExtraSettings;
			}
		}}
		disabled={userSeed != ''}
		class="extra-settings-toggle"
		>{#if !showExtraSettings}◀&#xFE0F
		{:else}
			{#if !extraSettingsUsed}🔽&#xFE0F {:else} ⚠&#xFE0F {/if}
		{/if}
	</button>
</div>
<div class="extra-settings" class:hidden={!showExtraSettings}>
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
</div>

<a href="./leaderBoard/{$gameModeStore}">🧛Leaderboard</a>
<a href="./help">How to play🧟</a>

<style>
	.widget-header h1 {
		width: 100%;
		display: flex;
		font-family: Krasip, sans-serif;
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
		gap: 1vmin;
	}

	.menu-mode {
		font-family: Krasip, sans-serif;
		font-size: 7.2vmin;
		font-weight: 600;
		background: var(--base-black);
		color: #fff;
		transform: translate(-2px, -2px);
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
		transition-duration: background-color 0.1s, border-color 0.1s;
		padding: 1.2vmin 3.4vmin;
		border-radius: 10vmin;
	}

	button:hover:not(:disabled) {
		background-color: var(--base-orange);
		border-color: var(--base-orange);
		cursor: pointer;
	}
	button[aria-current='true'] {
		transform: none;
		filter: none;
		box-shadow: inset var(--base-orange) 0px 0px 10px 2px;
		border: var(--base-orange) 2px solid;
	}
	button[aria-current='true']:hover {
		background-color: var(--base-black);
		cursor: default;
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
		font-family: Krasip, sans-serif;
		font-size: 5vmin;
		outline: none;
		transition-property: width, padding-left;
		transition-duration: 500ms;
		transition-timing-function: ease-in-out, cubic-bezier(0.5, 0, 0.75, 0);
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
	.input-seed:focus,
	.btn-seed:hover ~ .input-seed,
	.input-seed:hover,
	.input-seed:not(:placeholder-shown) {
		width: 42vmin;
		padding-left: 4vmin;
		transition-property: width, padding-left;
		transition-duration: 500ms;
		transition-timing-function: cubic-bezier(0, 0.11, 0.35, 2);
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
	.seed-box:has(.btn-seed:hover),
	.seed-box:has(.input-seed:focus),
	.seed-box:has(.input-seed:hover) {
		background-color: var(--base-orange);
		transition: background-color 500ms cubic-bezier(0, 0.11, 0.35, 2);
	}

	.extra-settings-toggle {
		font-size: 5vmin;
		padding: 1vmin;
		background: var(--base-black);
		border-radius: 10vmin;
		transition: color 0.2s;
		cursor: pointer;
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
	}
	.extra-settings-toggle:disabled {
		cursor: default;
	}
	.extra-settings {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		max-height: 10vmin;
		overflow: hidden;
		transition-property: max-height, margin-bottom, margin-top, visibility;
		transition-duration: 300ms;
		transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		gap: 1vmin;
	}
	.extra-settings.hidden {
		visibility: hidden;
		max-height: 0px;
		margin: -0.75vmin 0;
	}

	a {
		text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 7.2vmin;
		font-weight: 600;
		font-family: Krasip, sans-serif;
		padding: 1.2vmin 3.4vmin;
		border-radius: 10vmin;
	}

	a:hover {
		background-color: var(--base-orange);
	}
</style>
