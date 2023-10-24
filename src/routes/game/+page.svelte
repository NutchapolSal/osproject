<script lang="ts">
	import GameSquare from './GameSquare.svelte';
	import { seededSfc32 } from '$lib/rng';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import GameGrid from './GameGrid.svelte';

	export let data;
	const gameSeed = data.gameSeed;

	const size = 3;
	const harderSpinThreshold = 30;

	let playerGrid: boolean[][] = new Array(size).fill(false).map(() => new Array(size).fill(false));
	let targetGrid: boolean[][] = new Array(size).fill(false).map(() => new Array(size).fill(false));
	let playerRotation = 0;
	let targetRotation = 0;
	let gridsCount = 1;
	let stopPointerHold = 0;
	let gridRand = seededSfc32(gameSeed);
	let spinRand = seededSfc32(gameSeed);
	for (let i = 0; i < 100; i++) {
		spinRand();
	}

	/**
	 * example with delay = 5, period = 8, begin = 0.5, increment = 0.2
	 * ```
	 * score          5    10   15   20   25
	 *        <--0----'----'----'----'----'>
	 * delay  -------]
	 * period         [------][------][---->
	 * return 0      ]|[0.5  ][0.7   ][0.9 >
	 *                1
	 * ```
	 * @param score
	 * @param delay
	 * @param period
	 * @param increment
	 */
	function getProbabilty(
		score: number,
		delay: number,
		period: number,
		begin: number,
		increment: number
	) {
		if (score === delay) return 1;
		if (score < delay) return 0;
		return Math.floor((score - delay + period) * (1 / period)) * increment + begin;
	}

	/**
	 * @param frac 0-1
	 * @param min inclusive
	 * @param max inclusive
	 */
	function getInt(frac: number, min: number, max: number) {
		return Math.floor(frac * (max - min + 1)) + min;
	}

	function startNewGrid() {
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				playerGrid[y][x] = false;
				targetGrid[y][x] = gridRand() > 0.5;
			}
		}
	}

	function spinIt() {
		const tempA = spinRand();
		const tempB = spinRand();
		const tempC = spinRand();
		const tempD = spinRand();
		if (tempA < getProbabilty(gridsCount, 5, 5, 0.5, 0.056)) {
			const tempE = harderSpinThreshold <= gridsCount ? getInt(tempB, -2, 4) : getInt(tempB, 0, 2);
			playerRotation += tempE <= 0 ? tempE - 1 : tempE;
		}
		if (tempC < getProbabilty(gridsCount, 15, 3, 0.4, 0.05)) {
			const tempE = harderSpinThreshold <= gridsCount ? getInt(tempD, -2, 4) : getInt(tempD, 0, 2);
			targetRotation += tempE <= 0 ? tempE - 1 : tempE;
		}
	}

	function checkMatching() {
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				if (playerGrid[y][x] !== targetGrid[y][x]) return false;
			}
		}
		return true;
	}

	function devcheat() {
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				playerGrid[y][x] = targetGrid[y][x];
			}
		}
	}

	startNewGrid();
	spinIt();
	$: {
		playerGrid;
		if (checkMatching()) {
			gridsCount++;
			increaseTime();
			startNewGrid();
			stopPointerHold++;
			spinIt();
		}
	}

	let countdownNum = 0;
	let startTime: number = 0;
	let nowTime: number = 0;
	let deathTime: number = 0;
	$: remainTime = deathTime - nowTime;
	$: gameOver = remainTime < 0;

	function increaseTime() {
		deathTime += 2000;
	}

	function startTheTime() {
		startTime = performance.now();
		nowTime = startTime;
		deathTime = startTime + 10000;
		requestAnimationFrame(updateNowTime);
	}
	function updateNowTime() {
		nowTime = performance.now();
		if (!gameOver) requestAnimationFrame(updateNowTime);
	}

	onMount(() => {
		countdownNum = 3;
		const countdownInterval = setInterval(() => {
			countdownNum--;
			if (countdownNum <= 0) {
				startTheTime();
				clearInterval(countdownInterval);
			}
		}, 1000);
	});
</script>

<h1>epic gamo</h1>
<h2>{countdownNum}</h2>
<h2>{Math.floor(remainTime)}</h2>
<div class="gamecontainer">
	<div>
		<GameGrid
			bind:grid={playerGrid}
			rotation={playerRotation}
			noninteractive={countdownNum != 0 || gameOver}
			{stopPointerHold}
		/>
	</div>

	<div>
		<div>
			<p>target</p>
			<GameGrid bind:grid={targetGrid} rotation={targetRotation} noninteractive small />
		</div>
	</div>
</div>

<p>
	gameseed: <code>{gameSeed}</code>
</p>

<p>grid no. {gridsCount}</p>

<button on:click={devcheat}>dev cheat</button>

<style>
	div.gamecontainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
