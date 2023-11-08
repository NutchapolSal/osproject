<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="backdrop">
	<div class="center">
		<h1>{$page.status}</h1>
		<p>{$page.error?.message}</p>
	</div>
</div>

<style>
	div.backdrop {
		backdrop-filter: blur(10px);
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center h1 {
		margin: 0px;
		font-size: 15vmin;
	}
	.center p {
		margin: 0px;
		font-size: 3vmin;
	}
</style>
