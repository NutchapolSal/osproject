<script lang="ts">
	import { onMount } from "svelte";
	import GameGrid from "../game/GameGrid.svelte";

	const grid = [
		[false, false, false], 
		[false, false, false], 
		[false, false, false], 
	]

	let rotation = 0

	onMount(() => {
		const rotateTimer = setTimeout(() => {
			rotation += Math.random() < 0.5 ? 1 : -1
		}, 5000)

		return () => {
			clearInterval(rotateTimer)
		}
	})
</script>
<div class="widget-header">
	<h1>How To Play</h1>
</div>

<div class="how-to-play-menu">
	<p1>เกมจะมีโจทย์เป้าหมาย (target) ซึ่งเป็น pattern ที่เราจะต้องกดตาม</p1>
	<p1>โดยเกมจะมีสัญลักษ์สีเหลืองที่มุมซ้ายบน เพื่อเป็นจุดสังเกตให้กดตาม</p1>
	<p1>ทุกครั้งที่ผ่านหลอดเวลาจะเพิ่มขึ้น เกมจะจบเมื่อเวลาหมด</p1>
	
</div>
<GameGrid {grid} {rotation}/>

<style>
	.how-to-play-menu {
		border-radius: 25px;
		background: var(--base-black);
		padding: 20px;
		width: 80%;
		height: 100%;
	}

	p1 {
		margin-bottom: 2px;
		font-size: 40px;
		color: white;
		font-family: myFirstFont;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	.widget-header h1 {
		width: 100%;
		display: flex;
		font-family: myFirstFont;
		font-size: 150px;
		margin-top: 0%;
		margin-bottom: 0%;
		color: var(--base-orange);
		text-align: center;
		line-height: 1;
		text-shadow: 0px 0px 10px var(--base-black);
	}
	
</style>
