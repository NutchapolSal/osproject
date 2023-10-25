<script lang="ts">
	let time = 4;

	$: time > 0 &&
		setTimeout(() => {
			time--;
		}, 1000);

</script>

<div>
	<span class="counter">{time}</span>
</div>

<style>
	.counter {
		display: inline-block;
		vertical-align: middle;
		opacity: 0;
		animation: anime 1s ease-in-out 1s forwards;
	}

	@keyframes anime {
		0% {
			opacity: 0;
			filter: blur(10px);
			transform: scale(1.5);
		}
		50% {
			filter: blur(0px);
		}
		100% {
			opacity: 1;
			transform: scale(0.5);
		}
	}
</style>
