<script>
	let players = [
    { name: 'Player 1', score: 10 },
    { name: 'Player 2', score: 50 },
    { name: 'Player 3', score: 80 },
    { name: 'Player 4', score: 30 },
    { name: 'Player 5', score: 60 }
  ];

  const sortedPlayers = players.slice().sort((a, b) => b.score - a.score);

  $: topPlayers = players.slice(0, 3);

  function getPlayerRank(player) {
    return sortedPlayers.findIndex(p => p === player) + 1;
  }
</script>


<div class="header">
	<h1>🎃 Leaderboard 🎃</h1>
</div>
<div class="boardcontainer">
	<ul class="ranking">
		{#each sortedPlayers as player (player.name)}
			<li>{getPlayerRank(player)}</li>
		{/each}
	</ul>
	<ul class="player">
		{#each sortedPlayers as player (player.name)}
			<li>{player.name} : {player.score} points</li>
		{/each}
	</ul>
</div>

<style>
	.header h1 {
		width: 100%;
		display: flex;
		font-family: myFirstFont;
		font-size: 80px;
		margin-top: 20%;
		margin-bottom: 0%;
		color: var(--base-orange);
		text-align: center;
		line-height: 1;
		text-shadow: 0px 0px 10px var(--base-black);
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
</style>