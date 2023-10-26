<script>
	
</script>


<div class="header">
	<h1>🎃 Leaderboard 🎃</h1>
</div>
<!-- <div class="top-player">
	<div class="rank1">

	</div>
	<div class="rank2">

	</div>
	<div class="rank3">

	</div>
</div> -->
<div class="boardcontainer">
	<ul class="ranking">
		<li>1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
		<li>5</li>
	</ul>
	<ul class="player">
		<li>player1 999</li>
		<li>player2 999</li>
		<li>player3 999</li>
		<li>player4 999</li>
		<li>player5 999</li>
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
		/* width: 50%; */
		display: flex;
		/* justify-content: space-around; */
		align-items: center;
		/* gap: 5%; */
	}
	.boardcontainer li {
		list-style-type: none;
		font-family: myFirstFont;
		font-size: 50px;
		font-weight: 1000;
		color: var(--base-black);
		text-shadow: 0px 0px 10px var(--base-orange);
		text-align: center;
		margin-top: 0px;
		margin-bottom: 10px;
	}
	ul.ranking {
		padding-inline-start: 0px;
		/* width: 100%; */
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