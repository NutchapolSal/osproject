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
	<h2>{data.gameMode}</h2>
</div>

<div class="podium">
	<div class="podium-player second-place">
		<div class="podium-bar">
			{#if players.length >= 2}
				<div class="truncate">
					<a href="../user/{sortedPlayers[1].userId}">
						{sortedPlayers[1].displayName}
					</a><br />🥈
				</div>
			{/if}
		</div>
		{#if players.length >= 2}
			<div class="podium-score">
				{sortedPlayers[1].score} points
			</div>
		{/if}
	</div>
	<div class="podium-player first-place">
		<div class="podium-bar">
			{#if players.length >= 1}
				<div class="truncate">
					<a href="../user/{sortedPlayers[0].userId}">
						{sortedPlayers[0].displayName}
					</a><br />🥇
				</div>
			{/if}
		</div>
		{#if players.length >= 1}
			<div class="podium-score">
				{sortedPlayers[0].score} points
			</div>
		{/if}
	</div>
	<div class="podium-player third-place">
		<div class="podium-bar">
			{#if players.length >= 3}
				<div class="truncate">
					<a href="../user/{sortedPlayers[2].userId}">
						{sortedPlayers[2].displayName}
					</a><br />🥉
				</div>
			{/if}
		</div>
		{#if players.length >= 3}
			<div class="podium-score">
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
				<div class="truncate"><a href="../user/{player.userId}">{player.displayName}</a></div>
				: {player.score} points
			</li>
		{/each}
	</ul>
</div>

<style>
	div.header {
		width: 70%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: myFirstFont;
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
		font-family: myFirstFont;
		display: flex;
		height: 15vmin;
		padding-top: 15vmin;
		margin-top: 5vmin;
		margin-bottom: 0;
		align-items: center;
		justify-content: center;
	}

	.podium-player {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		align-self: flex-end;
		font-size: 5vmin;
		font-weight: bold;
		text-align: center;
		padding: 1.5vmin;
	}

	.podium-bar {
		display: flex;
		width: 28vmin;
		height: 100%;
		border: 0.5vmin solid var(--base-black);
		border-radius: 1.5vmin;
	}

	.podium-score {
		color: white;
		-webkit-text-stroke: 0.1px black;
	}

	.first-place {
		height: 200%;
	}

	.first-place .podium-bar {
		background: gold;
	}

	.second-place {
		height: 150%;
	}

	.second-place .podium-bar {
		background: silver;
	}

	.third-place {
		height: 125%;
	}

	.third-place .podium-bar {
		background: #cd7f32;
	}

	.boardcontainer {
		width: 70%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 0;
		text-align: center;
	}

	.boardcontainer li {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--base-black);
		font-family: myFirstFont;
		font-size: 6vmin;
		font-weight: 1000;
		text-shadow: 0px 0px 10px var(--base-orange);
		text-wrap: nowrap;
		margin-top: 0px;
		margin-bottom: 1.5vmin;
		background-color: var(--base-orange);
		border: 1.5vmin solid var(--base-black);
		border-radius: 3.75vmin;
		box-shadow: 0px 0px 10px var(--base-black);
	}

	.boardcontainer ul {
		margin: 0;
		padding-inline-start: 0px;
	}

	ul.ranking li {
		width: 8vmin;
		height: 8vmin;
	}

	ul.player {
		padding-inline-start: 7.5vmin;
	}

	ul.player li {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		height: 8vmin;
		margin-left: 0;
		margin-right: 0;
	}

	ul.player li div {
		width: 40vmin;
		margin-left: 10px;
	}

	.truncate {
		width: 38vmin;
		color: white;
		font-weight: 1000;
		-webkit-text-stroke: 0.1px black;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.truncate a {
		text-decoration: none;
		color: #fff;
		font-weight: 600;
		font-family: myFirstFont;
		-webkit-text-stroke: 0.1px black;
	}

	.truncate a:hover {
		color: var(--base-black);
	}
</style>
