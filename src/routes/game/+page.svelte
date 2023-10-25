<script lang="ts">
	import GameSquare from './GameSquare.svelte';
	import { seededSfc32 } from '$lib/rng';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import GameGrid from './GameGrid.svelte';
	import { enhance } from '$app/forms';

	export let data;
	const gameSeed = data.gameSeed;

	const size = 3;

	enum SpinRange {
		NINETIES = 1,
		ONEEIGHTIES = 2,
		TWOSEVENTIES = 3,
		THREESIXITES = 4,
		CRAZY = 8
	}
	interface GridDifficulty {
		chance: number;
		range: SpinRange;
		duration: number;
	}

	type GridDifficultySetup = {
		grid: number;
		recovery: number;
		player: GridDifficulty | null;
		target: GridDifficulty | null;
	}[];

	const diffSetups: GridDifficultySetup = [
		{ grid: 0, recovery: 1500, player: null, target: null },
		{
			grid: 6,
			recovery: 1500,
			player: { chance: 1, range: SpinRange.NINETIES, duration: 0.5 },
			target: null
		},
		{ grid: 7, recovery: 1500, player: null, target: null },
		{
			grid: 10,
			recovery: 1500,
			player: { chance: 0.3, range: SpinRange.NINETIES, duration: 0.5 },
			target: null
		},
		{
			grid: 16,
			recovery: 1500,
			player: { chance: 0.3, range: SpinRange.NINETIES, duration: 0.5 },
			target: { chance: 1, range: SpinRange.NINETIES, duration: 0.5 }
		},
		{
			grid: 17,
			recovery: 1500,
			player: { chance: 0.3, range: SpinRange.NINETIES, duration: 0.5 },
			target: null
		},
		{
			grid: 20,
			recovery: 1000,
			player: { chance: 0.4, range: SpinRange.ONEEIGHTIES, duration: 0.5 },
			target: { chance: 0.4, range: SpinRange.NINETIES, duration: 0.5 }
		},
		{
			grid: 30,
			recovery: 1000,
			player: { chance: 0.4, range: SpinRange.TWOSEVENTIES, duration: 0.5 },
			target: { chance: 0.4, range: SpinRange.ONEEIGHTIES, duration: 0.5 }
		},
		{
			grid: 40,
			recovery: 1000,
			player: { chance: 0.5, range: SpinRange.THREESIXITES, duration: 0.5 },
			target: { chance: 0.5, range: SpinRange.TWOSEVENTIES, duration: 0.5 }
		},
		{
			grid: 50,
			recovery: 800,
			player: { chance: 0.5, range: SpinRange.THREESIXITES, duration: 0.4 },
			target: { chance: 0.5, range: SpinRange.THREESIXITES, duration: 0.4 }
		},
		{
			grid: 60,
			recovery: 800,
			player: { chance: 0.5, range: SpinRange.THREESIXITES, duration: 0.35 },
			target: { chance: 0.5, range: SpinRange.THREESIXITES, duration: 0.35 }
		},
		{
			grid: 70,
			recovery: 800,
			player: { chance: 0.6, range: SpinRange.CRAZY, duration: 0.35 },
			target: { chance: 0.6, range: SpinRange.CRAZY, duration: 0.35 }
		},
		{
			grid: 80,
			recovery: 800,
			player: { chance: 0.75, range: SpinRange.CRAZY, duration: 0.45 },
			target: { chance: 0.75, range: SpinRange.CRAZY, duration: 0.45 }
		},
		{
			grid: 90,
			recovery: 800,
			player: { chance: 0.75, range: SpinRange.CRAZY, duration: 0.6 },
			target: { chance: 0.75, range: SpinRange.CRAZY, duration: 0.6 }
		},
		{
			grid: 100,
			recovery: 600,
			player: { chance: 0.75, range: SpinRange.CRAZY, duration: 0.75 },
			target: { chance: 0.75, range: SpinRange.CRAZY, duration: 0.75 }
		},
		{
			grid: 101,
			recovery: 600,
			player: { chance: 1, range: SpinRange.NINETIES, duration: 5 },
			target: { chance: 1, range: SpinRange.NINETIES, duration: 5 }
		}
	];

	diffSetups.sort((a, b) => a.grid - b.grid);

	enum ScoreSubmissionState {
		NOT_SUBMITTED,
		SUBMITTING,
		FAILED,
		SUBMITTED
	}

	let playerGrid: boolean[][] = new Array(size).fill(false).map(() => new Array(size).fill(false));
	let targetGrid: boolean[][] = new Array(size).fill(false).map(() => new Array(size).fill(false));
	let playerRotation = 0;
	let targetRotation = 0;
	let gridsCount = 1;
	let stopPointerHold = 0;
	let currentSpinSetupI = 0;
	let dateTimeStart: Date | null = null;
	let scoreSubmissionState = ScoreSubmissionState.NOT_SUBMITTED;
	let gridRand = seededSfc32(gameSeed);
	let spinRand = seededSfc32(gameSeed);
	for (let i = 0; i < 100; i++) {
		spinRand();
	}

	function startNewGrid() {
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				playerGrid[y][x] = false;
				targetGrid[y][x] = gridRand() > 0.5;
			}
		}
	}

	/**
	 * @returns an int with an absolute value between absmin and absmax (inclusive),
	 * with a possibility of being negative
	 */
	function getRandomInt(absmin: number, random: number, absmax: number) {
		return Math.floor((random % 0.5) * 2 * (absmax - absmin) + absmin) * (random < 0.5 ? 1 : -1);
	}

	function spinIt() {
		while (
			currentSpinSetupI != diffSetups.length - 1 &&
			diffSetups[currentSpinSetupI + 1].grid <= gridsCount
		) {
			currentSpinSetupI++;
		}
		const currSetup = diffSetups[currentSpinSetupI];
		const tempA = spinRand();
		const tempB = spinRand();
		const tempC = spinRand();
		const tempD = spinRand();
		if (currSetup.player != null) {
			if (tempA < currSetup.player.chance) {
				playerRotation += getRandomInt(1, tempB, currSetup.player.range.valueOf());
			}
		}
		if (currSetup.target != null) {
			if (tempC < currSetup.target.chance) {
				targetRotation += getRandomInt(1, tempD, currSetup.target.range.valueOf());
			}
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

	async function devcheat() {
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
		deathTime += diffSetups[currentSpinSetupI].recovery;
	}

	function startTheTime() {
		dateTimeStart = new Date();
		startTime = performance.now();
		nowTime = startTime;
		deathTime = startTime + 60000;
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
			--spinDuration={`${diffSetups[currentSpinSetupI].player?.duration ?? 0.5}s`}
		/>
	</div>

	<div>
		<div>
			<p>target</p>
			<GameGrid
				bind:grid={targetGrid}
				rotation={targetRotation}
				noninteractive
				small
				--spinDuration={`${diffSetups[currentSpinSetupI].target?.duration ?? 0.5}s`}
			/>
		</div>
	</div>
</div>

<button on:click={devcheat}>dev cheat</button>

<p>
	gameseed: <code>{gameSeed}</code>
	<br />
	<code>{currentSpinSetupI}</code>
	<br />
	<code>{JSON.stringify(diffSetups[currentSpinSetupI])}</code>
</p>

<p>grid no. {gridsCount}</p>

{#if gameOver && scoreSubmissionState == ScoreSubmissionState.NOT_SUBMITTED}
	<p>game over</p>
	<form
		method="POST"
		use:enhance={() => {
			scoreSubmissionState = ScoreSubmissionState.SUBMITTING;
			return async ({ update }) => {
				await update();
				scoreSubmissionState = ScoreSubmissionState.SUBMITTED;
			};
		}}
	>
		<input type="hidden" name="score" value={gridsCount - 1} />
		<input type="hidden" name="gameSeed" value={gameSeed} />
		<input type="hidden" name="gameMode" value={'normal'} />
		<input type="hidden" name="timeStart" value={dateTimeStart?.toISOString()} />
		<input type="hidden" name="gameDuration" value={deathTime - startTime} />
		<input type="hidden" name="gameVersion" value={'asd'} />
		<button>submit score</button>
	</form>
{/if}

{#if scoreSubmissionState == ScoreSubmissionState.SUBMITTING}
	<p>💫</p>
{/if}

{#if scoreSubmissionState == ScoreSubmissionState.FAILED}
	<p>💢</p>
{/if}

{#if scoreSubmissionState == ScoreSubmissionState.SUBMITTED}
	<p>✅</p>
{/if}

<style>
	div.gamecontainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
