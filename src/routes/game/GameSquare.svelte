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
	/>
{:else}
	<div class="gamesquare" class:corner class:small class:stateOn={state} />
{/if}

<style>
	.gamesquare {
		width: 20vmin;
		height: 20vmin;
		border: #000000 1px solid;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		touch-action: none;
		border-radius: 25px;
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
