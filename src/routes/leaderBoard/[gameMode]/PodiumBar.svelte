<script lang="ts">
	export let player: {
		score: number;
		gameMode: string;
		timeStart: Date;
		userId: string;
		displayName: string;
	} | null;
	export let position: number;

	const emojis = ['🥇', '🥈', '🥉'];
</script>

<div
	class="podium-player first-place"
	class:first-place={position == 1}
	class:second-place={position == 2}
	class:third-place={position == 3}
>
	<div class="podium-bar">
		{#if player != null}
			<a href="/user/{player.userId}">
				{player.displayName}
			</a>

			{emojis[position - 1]}
		{/if}
	</div>
	<div class="podium-score">
		{#if player != null}
			{player.score} points
		{:else}
			<br />
		{/if}
	</div>
</div>

<style>
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
		flex-direction: column;
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

	a {
		display: block;
		text-decoration: none;
		color: #fff;
		font-weight: 600;
		font-family: Krasip, sans-serif;
		-webkit-text-stroke: 0.1px black;
		text-overflow: ellipsis;
		overflow: hidden;
		margin: 0 1.5vmin;
	}

	a:hover {
		color: var(--base-black);
	}
</style>
