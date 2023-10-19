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
<div class="spinny" style:rotate={`${0.25 * rotVal}turn`}>
	{#each playerGrid as row}
		<div>
			{#each row as state}
				<GameSquare bind:state />
			{/each}
		</div>
	{/each}
</div>

{#each playerGrid as row}
	<div>
		{#each row as state}
			{state ? '✅' : '❌'}
		{/each}
	</div>
{/each}
<p>{lastRandded}</p>

<style>
	div.spinny {
		display: inline-block;
		transition: rotate 0.5s cubic-bezier(0.33, 1, 0.68, 1);
	}
</style>
