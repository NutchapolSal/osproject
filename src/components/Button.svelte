<script lang="ts">
	export let text: string;
</script>

<button
	style:background-color="blue"
	style:color="white"
	style:padding="16px"
	style:border-radius="4px"
	style:cursor="pointer"
>
	{text}
</button>

<style>
	button {
		font-size: 16px;
		font-weight: 600;
		font-family: 'Roboto', sans-serif;
	}
	button:hover {
		background-color: #15ff00;
	}
</style>
