<script lang="ts">
	let time = 4;

	$: time > 0 &&
		setTimeout(() => {
			time--;
		}, 1000);

	// setInterval(() => {
	// 	tick--;
	// }, 1000);

	// const tick = () => {
	// let e = document.querySelector('.couter');
	// let timer = setInterval(() => {
	// 	e.innerHTML = `<span>${time}</span>`;
	// 	time--;
	// 	if (time == 0) {
	// 		clearInterval(timer);
	// 		e.innerHTML = `<span>Let's GO!</span>`;
	// 		window.location.href = './game';
	// 	}
	// }, 1000);
	// };
	// tick();
</script>

<div>
	<span class="counter">{time}</span>
</div>

<style>
	/* :global(body) {
		background-color: #0d1229;
		color: #0084f6;
		text-align: center;
		font-size: 50px;
		font-family: 'Roboto', sans-serif;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		transition: background-color 0.3s;
	} */
	.counter {
		display: inline-block;
		vertical-align: middle;
		opacity: 0;
		animation: anime 1s ease-in-out 1s forwards;
		/* line-height: 1em; */
		/* transition: transform 0.3s; */
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
