<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.classList.add('started');
	});
</script>

<div class="background" />

<div class="container">
	<slot />
</div>

<style>
	@font-face {
		font-family: Krasip;
		src: url('$lib/fonts/MN KRASIP.ttf');
	}

	.background {
		z-index: -999;
		background-image: url('$lib/images/bg.svg');
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	:global(body) {
		--base-black: #2e2c29;
		--base-orange: #e6862e;
	}

	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.5vmin;
		padding-top: 0%;
	}
</style>
