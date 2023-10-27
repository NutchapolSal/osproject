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

<div style:display="flex">
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
			class:small
			class:blanked
		/>
	{:else}
		<div class="gamesquare" class:small class:stateOn={state} class:blanked />
	{/if}
	{#if corner}
		<div class="cornercase" class:small class:blanked />
	{/if}
</div>

<style>
	button {
		background-color: transparent;
		border: none;
	}

	.gamesquare,
	.cornercase {
		width: 20vmin;
		height: 20vmin;
		border-radius: 2.5vmin;
	}
	.gamesquare.small,
	.cornercase.small {
		width: 10vmin;
		height: 10vmin;
		border-radius: 1.25vmin;
	}

	.gamesquare {
		background-image: url('$lib/images/candy.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		filter: grayscale(100%) brightness(1) drop-shadow(0px 0px 5px var(--base-black));
		touch-action: none;
		transition: filter 0.05s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	div.gamesquare {
		display: inline-block;
	}
	.gamesquare.stateOn {
		filter: grayscale(0%) brightness(1) drop-shadow(0px 0px 5px var(--base-black));
	}
	.cornercase {
		position: absolute;
		top: 0px;
		left: 0px;
		background: linear-gradient(135deg, #ffff00 20%, transparent 20%);
		mix-blend-mode: overlay;
		pointer-events: none;
		transition: width 0.1s cubic-bezier(0.215, 0.61, 0.355, 1),
			height 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.gamesquare.blanked {
		filter: grayscale(100%) brightness(1.8) drop-shadow(0px 0px 5px var(--base-black));
		transition: filter 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.cornercase.blanked {
		width: 0px;
		height: 0px;
		transition: width 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
			height 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
</style>
