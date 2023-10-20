<script lang="ts">
	export let state: boolean;
	export let noninteractive: boolean = false;
	export let small: boolean = false;
	export let corner: boolean = false;
</script>

{#if !noninteractive}
	<button
		class="gamesquare"
		on:click={() => {
			if (!noninteractive) state = !state;
		}}
		class:stateOn={state}
		class:corner
		class:small
	/>
{:else}
	<div class="gamesquare" class:corner class:small class:stateOn={state} />
{/if}

<style>
	.gamesquare {
		width: 20vmin;
		height: 20vmin;
		border: #000000 1px solid;
	}
	div.gamesquare {
		display: inline-block;
	}
	.gamesquare.small {
		width: 10vmin;
		height: 10vmin;
	}
	.gamesquare.stateOn {
		background-color: black;
		color: white;
	}
	.gamesquare.corner {
		background: linear-gradient(to bottom right, #ffff00 20%, #ffff0000 20%);
	}
	.gamesquare.corner.stateOn {
		background: linear-gradient(to bottom right, #ffff00 20%, #ffff0000 20%), black;
	}
</style>
