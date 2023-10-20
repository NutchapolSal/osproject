<script lang="ts">
	import GameSquare from './GameSquare.svelte';

	let playerGrid: boolean[][] = new Array(3).fill(false).map(() => new Array(3).fill(false));
	let targetGrid: boolean[][] = new Array(3).fill(false).map(() => new Array(3).fill(false));
	let rotVal = 0;
	let lastRandded: number | null = null;

	function spinIt() {
		lastRandded = Math.floor(Math.random() * 8) - 3;
		rotVal += lastRandded;
	}
	setInterval(spinIt, 1000);
</script>

<h1>epic gamo</h1>
<div class="gamecontainer">
	<div>
		<div class="spinny" style:rotate={`${0.25 * rotVal}turn`}>
			{#each playerGrid as row, y}
				<div>
					{#each row as state, x}
						<GameSquare bind:state corner={x === 0 && y === 0} />
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div>
		<div>
			<p>target</p>
			<div class="spinny" style:rotate="0 turn">
				{#each targetGrid as row, y}
					<div class="rowcontainer">
						{#each row as state, x}
							<GameSquare {state} corner={x === 0 && y === 0} noninteractive small />
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	div.gamecontainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	div.spinny {
		display: inline-block;
		transition: rotate 0.5s cubic-bezier(0.33, 1, 0.68, 1);
	}
	div.rowcontainer {
		margin: 0;
	}
</style>
