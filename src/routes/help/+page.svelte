<script lang="ts">
	import { onMount } from 'svelte';
	import CandyIcon from '$lib/images/candyIcon.png';
	import GameGrid from '../game/GameGrid.svelte';

	export let data;

	const grid = [
		[false, false, false],
		[false, false, false],
		[false, false, false]
	];

	let rotation = 0;

	onMount(() => {
		const rotateTimer = setInterval(() => {
			rotation += Math.random() < 0.5 ? 1 : -1;
		}, 5000);

		return () => {
			clearInterval(rotateTimer);
		};
	});
</script>

<svelte:head>
	<title>Help - Candy Rotator</title>
	<meta property="og:title" content="Help" />
	<meta property="og:description" content="how to play this game" />
	<meta property="og:url" content={data.url.href} />
	<meta property="og:image" content={CandyIcon} />
	<meta property="og:site_name" content="Candy Rotator" />
	<meta data-react-helmet="true" name="theme-color" content="#E6862E" />
</svelte:head>

<div class="widget-header">
	<h1>How To Play</h1>
</div>

<div class="how-to-play-menu">
	<GameGrid {grid} {rotation} />
	<p>
		เกมจะมีโจทย์เป้าหมาย (target) ซึ่งเป็น pattern ที่เราจะต้องกดตาม
		โดยเกมจะมีสัญลักษ์สีเหลืองที่มุมซ้ายบนเพื่อเป็นจุดสังเกตให้ทำตามได้ง่ายขึ้น ทุกครั้งที่เล่นผ่าน
		1 ด่านหลอดเวลาจะเพิ่มขึ้นเล็กน้อย เกมจะจบลงเมื่อเวลาหมด
	</p>
</div>

<style>
	.how-to-play-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 3.5vmin;
		background: var(--base-black);
		padding: 7vmin;
		width: 75%;
		height: 100%;
	}

	p {
		font-size: 5.5vmin;
		font-family: Krasip, sans-serif;
		text-align: center;
		color: white;
		display: flex;
		flex-direction: column;
		margin-block-end: 0;
	}
	.widget-header h1 {
		width: 100%;
		display: flex;
		font-family: Krasip, sans-serif;
		font-size: 22vmin;
		margin-top: 0%;
		margin-bottom: 0%;
		color: var(--base-orange);
		text-align: center;
		line-height: 1;
		text-shadow: 0px 0px 10px var(--base-black);
	}
</style>
