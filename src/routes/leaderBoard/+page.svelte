<script lang="ts">
	export let data;

	let players = data.scores;
	const sortedPlayers = players;

	function getPlayerRank(player: (typeof players)[number]) {
		return sortedPlayers.findIndex((p) => p === player) + 1;
	}
</script>

<div class="header">
	<h1>🎃 Leaderboard 🎃</h1>
</div>

<div class="podium">
	<div class="podium-player second-place">
		<div class="bar">
			{#if players.length >= 2}
				<div
					class="truncate"
					style="display: block; width: 175px; color:white; -webkit-text-stroke: 0.1px black;"
				>
					{sortedPlayers[1].displayName}
				</div>
				<div>🥈</div>
			{/if}
		</div>
		{#if players.length >= 2}
			<div style="align-self: flex-end; color:white; -webkit-text-stroke: 0.1px black;">
				{sortedPlayers[1].score} points
			</div>
		{/if}
	</div>
	<div class="podium-player first-place">
		<div class="bar">
			{#if players.length >= 1}
				<div
					class="truncate"
					style="display: block; width: 175px; color:white; -webkit-text-stroke: 0.1px black;"
				>
					{sortedPlayers[0].displayName}
				</div>
				<div>🥇</div>
			{/if}
		</div>
		{#if players.length >= 1}
			<div
				style="height: 100%; align-self: flex-end; color:white; -webkit-text-stroke: 0.1px black;"
			>
				{sortedPlayers[0].score} points
			</div>
		{/if}
	</div>
	<div class="podium-player third-place">
		<div class="bar">
			{#if players.length >= 3}
				<div
					class="truncate"
					style="display: block; width: 175px; color:white; -webkit-text-stroke: 0.1px black;"
				>
					{sortedPlayers[2].displayName}
				</div>
				<div>🥉</div>
			{/if}
		</div>
		{#if players.length >= 3}
			<div style="align-self: flex-end; color:white; -webkit-text-stroke: 0.1px black;">
				{sortedPlayers[2].score} points
			</div>
		{/if}
	</div>
</div>

<div class="boardcontainer">
	<ul class="ranking">
		{#each sortedPlayers.slice(3) as player}
			<li>{getPlayerRank(player)}</li>
		{/each}
	</ul>
	<ul class="player">
		{#each sortedPlayers.slice(3) as player}
			<li>
				<div class="truncate">{player.displayName}</div>
				: {player.score} points
			</li>
		{/each}
	</ul>
</div>

<style>
	.header h1 {
		width: 100%;
		display: flex;
		font-family: myFirstFont;
		font-size: 80px;
		margin-top: 10%;
		margin-bottom: 0%;
		color: var(--base-black);
		text-align: center;
		line-height: 1;
		text-shadow: 0px 0px 10px var(--base-black);
	}

	.podium {
		font-family: myFirstFont;
		display: flex;
		width: 600px;
		padding-top: 100px;
		height: 100px;
		margin: 40px;
	}

	.podium-player {
		font-size: 5vmin;
		flex: 1;
		padding: 10px;
		text-align: center;
	}

	.first-place {
		flex: 1;
		align-self: flex-end;
		font-weight: bold;
		color: #333;
		margin: 20 20 20 20;
		height: 200%;
	}
	.first-place .bar {
		border: 3px solid var(--base-black);
		border-radius: 10px;
		background: gold;
		height: 100%;
	}
	.second-place {
		flex: 1;
		align-self: flex-end;
		font-weight: bold;
		color: #333;
		height: 150%;
	}
	.second-place .bar {
		border: 3px solid var(--base-black);
		border-radius: 10px;
		background: silver;
		height: 100%;
	}

	.third-place {
		flex: 1;
		align-self: flex-end;
		font-weight: bold;
		color: #333;
		height: 125%;
	}
	.third-place .bar {
		border: 3px solid var(--base-black);
		border-radius: 10px;
		background: #cd7f32;
		height: 100%;
	}

	div.boardcontainer {
		margin: auto;
		display: flex;
		align-items: center;
	}
	.boardcontainer li {
		list-style-type: none;
		font-family: myFirstFont;
		font-size: 40px;
		font-weight: 1000;
		color: var(--base-black);
		text-shadow: 0px 0px 10px var(--base-orange);
		text-align: center;
		margin-top: 0px;
		margin-bottom: 10px;
	}
	ul.ranking {
		padding-inline-start: 0px;
	}
	ul.ranking li {
		width: 150%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--base-orange);
		border: 10px solid var(--base-black);
		border-radius: 25px;
		box-shadow: 0px 0px 10px var(--base-black);
	}
	ul.player {
		padding-inline-start: 50px;
	}
	ul.player li {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--base-orange);
		border: 10px solid var(--base-black);
		border-radius: 25px;
		box-shadow: 0px 0px 10px var(--base-black);
		margin-left: 20px;
		margin-right: 20px;
	}
	ul.player li div {
		display: block;
		width: 250px;
	}
	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
