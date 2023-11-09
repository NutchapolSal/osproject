<script lang="ts">
	import CandyIcon from '$lib/images/candyIcon.png';
	import PodiumBar from './PodiumBar.svelte';

	export let data;

	let players = data.scores;
	const sortedPlayers = players;

	function getPlayerRank(player: (typeof players)[number]) {
		return sortedPlayers.findIndex((p) => p === player) + 1;
	}
</script>

<svelte:head>
	<title>{data.gameMode} Mode Leaderboard - Candy Rotator</title>
	<meta property="og:title" content="{data.gameMode} Mode Leaderboard" />
	<meta property="og:description" content="get to the top!" />
	<meta property="og:url" content={data.url.href} />
	<meta property="og:image" content={CandyIcon} />
	<meta property="og:site_name" content="Candy Rotator" />
	<meta data-react-helmet="true" name="theme-color" content="#E6862E" />
</svelte:head>

<div class="header">
	<h1>🎃 Leaderboard 🎃</h1>
	<h2>{data.gameMode}</h2>
</div>

<div class="podium">
	<PodiumBar player={sortedPlayers[1]} position={2} />
	<PodiumBar player={sortedPlayers[0]} position={1} />
	<PodiumBar player={sortedPlayers[2]} position={3} />
</div>

<div class="boardcontainer">
	{#each sortedPlayers.slice(3) as player, i}
		<div class="ranking">
			{i + 4}
		</div>
		<div class="player">
			<a href="/user/{player.userId}">{player.displayName}</a>
			<div class="points">: {player.score} points</div>
		</div>
	{/each}
</div>

<style>
	div.header {
		width: 70vmin;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: Krasip, sans-serif;
		color: var(--base-black);
		text-align: center;
		text-shadow: 0px 0px 10px var(--base-black);
		line-height: 1;
	}

	.header h1 {
		font-size: 12vmin;
		margin-top: 4vmin;
		margin-bottom: 2vmin;
		text-wrap: nowrap;
	}

	.header h2 {
		font-size: 6vmin;
		margin-top: 0;
		margin-bottom: 0;
	}

	.podium {
		font-family: Krasip, sans-serif;
		display: flex;
		height: 15vmin;
		padding-top: 15vmin;
		margin-top: 5vmin;
		margin-bottom: 0;
		align-items: center;
		justify-content: center;
	}

	.boardcontainer {
		width: 90vmin;
		display: grid;
		margin: 0;
		text-align: center;
		grid-template-columns: 0.3fr 1fr 0.78fr;
		gap: 1.5vmin 2vmin;
	}

	.boardcontainer .ranking {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.boardcontainer .player {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 2 / 4;
	}

	.boardcontainer .ranking,
	.boardcontainer .player {
		color: var(--base-black);
		font-family: Krasip, sans-serif;
		font-size: 6vmin;
		font-weight: 1000;
		text-shadow: 0px 0px 10px var(--base-orange);
		background-color: var(--base-orange);
		border: 1.5vmin solid var(--base-black);
		border-radius: 3.75vmin;
		box-shadow: 0px 0px 10px var(--base-black);
	}

	a {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-decoration: none;
		color: #fff;
		font-weight: 600;
		font-family: Krasip, sans-serif;
		-webkit-text-stroke: 0.1px black;
		padding-left: 3vmin;
	}

	a:hover {
		color: var(--base-black);
	}

	.points {
		justify-self: start;
	}
</style>
