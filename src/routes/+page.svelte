<script lang="ts">
	import { GameModes, gameModeStore } from './gameModes';
	import type { PageData } from './$types';
	import CandyIcon from '$lib/images/candyIcon.png';
	import AboutIcon from '$lib/images/info.svg';

	export let data: PageData;
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
	<a class="about-icon" href="./about">
		<img src={AboutIcon} alt="about" width="50px" height="50px" />
	</a>
	{#if data.loginInfo}
		<a href="./user/{data.loginInfo.userId}">{data.loginInfo.displayName}</a>
	{:else}
		<a href="./login/google">Login with Google</a>
	{/if}
</div>
<div class="widget-header">
	<h1>Candy Rotator</h1>
</div>
<a href="./game">🎃 Start 🦇</a>
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
<a href="./leaderBoard/{$gameModeStore}">🧛Leaderboard</a>
<a href="./help">How to play🧟</a>

<style>
	.widget-header h1 {
		width: 100%;
		display: flex;
		font-family: myFirstFont;
		font-size: 22vmin;
		margin-top: 0%;
		margin-bottom: 0%;
		color: var(--base-orange);
		text-align: center;
		line-height: 1;
		text-shadow: 0px 0px 10px var(--base-black);
	}

	.menu-user {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		gap: 10px;
	}

	.menu-user a {
		font-size: 3.5vmin;
	}

	.menu-user img {
		width: 6.5vmin;
		height: 6.5vmin;
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

	.menu-mode:hover {
		background-color: var(--base-orange);
	}

	button[aria-current='true'] {
		transform: none;
		filter: none;
		box-shadow: inset var(--base-orange) 0px 0px 10px 2px;
		border: var(--base-orange) 2px solid;
	}
	button[aria-current='true']:hover {
		background-color: var(--base-black);
	}

	.about-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 7vmin;
		height: 7vmin;
		padding: 0;
		transition: all 0.3s;
	}
	.about-icon img {
		width: 75%;
		height: 75%;
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
</style>
