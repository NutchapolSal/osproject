<script lang="ts">
	import GameSquare from './GameSquare.svelte';
	export let grid: boolean[][];
	export let rotation: number = 0;
	export let noninteractive: boolean = false;
	export let stopPointerHold: number = 0;
	export let small: boolean = false;
	export let blanked: boolean = false;
</script>

<div class="spinny" style:rotate={`${0.25 * rotation}turn`}>
	{#each grid as row, y}
		<div class="theflex">
			{#each row as state, x}
				<GameSquare
					bind:state
					corner={x === 0 && y === 0}
					{noninteractive}
					{stopPointerHold}
					{small}
					{blanked}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	div.spinny {
		display: inline-block;
		transition: rotate var(--spinDuration, 0.5s) cubic-bezier(0.33, 1, 0.68, 1);
	}
	div.theflex {
		display: flex;
	}
</style>
