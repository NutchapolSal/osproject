<script lang="ts" context="module">
	let stophold = false;
	let holdingpaint = false;
</script>

<script lang="ts">
	export let state: boolean;
	export let noninteractive: boolean = false;
	export let small: boolean = false;
	export let corner: boolean = false;
	export let stopPointerHold: number = 0;
	export let blanked: boolean = false;
	$: {
		stopPointerHold;
		stophold = true;
	}
	let buttonThis: HTMLButtonElement;
</script>

{#if !noninteractive}
	<button
		bind:this={buttonThis}
		class="gamesquare"
		on:pointermove={(e) => {
			if (e.buttons === 1) {
				if (!stophold) {
					state = holdingpaint;
				}
			} else {
				stophold = false;
			}
		}}
		on:pointerdown={(e) => {
			buttonThis.releasePointerCapture(e.pointerId);
			holdingpaint = !state;
			state = holdingpaint;
			stophold = false;
		}}
		class:stateOn={state}
		class:corner
		class:small
		class:blanked
	/>
{:else}
	<div class="gamesquare" class:corner class:small class:stateOn={state} class:blanked />
{/if}

<style>
	button {
		background-color: transparent;
		border: none;
	}

	.gamesquare {
		width: 20vmin;
		height: 20vmin;
		background-image: url('$lib/images/candy.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		filter: grayscale(100%) drop-shadow(0px 0px 5px var(--base-black));
		touch-action: none;
		border-radius: 15px;
	}
	div.gamesquare {
		display: inline-block;
	}
	.gamesquare.small {
		width: 10vmin;
		height: 10vmin;
	}
	.gamesquare.stateOn {
		filter: grayscale(0%) drop-shadow(0px 0px 5px var(--base-black));
	}
	.gamesquare.corner {
		background: linear-gradient(to bottom right, #ffff00 20%, #ffff0000 20%),
			url('$lib/images/candy-grey.png');
		filter: grayscale(0%) drop-shadow(0px 0px 5px var(--base-black));
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	.gamesquare.corner.stateOn {
		background: linear-gradient(to bottom right, #ffff00 20%, #ffff0000 20%),
			url('$lib/images/candy.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	.gamesquare.blanked,
	.gamesquare.blanked.corner {
		background: url('$lib/images/candy-grey.png');
		filter: grayscale(0%) brightness(1.8) drop-shadow(0px 0px 5px var(--base-black));
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
