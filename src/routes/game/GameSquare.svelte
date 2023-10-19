<script lang="ts">
	export let state: boolean;
</script>

<button on:click={() => (state = !state)} class:stateOn={state}>
	{state ? 'y' : 'n'}
</button>

<style>
	button {
		width: 20vmin;
		height: 20vmin;
	}
	button.stateOn {
		background-color: black;
	}
</style>
