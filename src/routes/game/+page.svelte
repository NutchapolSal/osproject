<script lang="ts">
	import { seededSfc32 } from '$lib/rng';
	import { onMount } from 'svelte';
	import GameGrid from './GameGrid.svelte';
	import { GameModes, gameModeStore } from '../gameModes';
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { enhance } from '$app/forms';

	export let data;
	const gameSeed = data.gameSeed;

	const size = 3;
	const startRemainTime = 60000;
	const memoryMode = $gameModeStore == GameModes.Memory;
	const memoryModeTime = 3000;

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
	let gameStarted = false;
	let playerRotation = 0;
	let targetRotation = 0;
	let gridsCount = 1;
	let currentSpinSetupI = 0;
	let dateTimeStart: Date | null = null;
	let scoreSubmissionState = ScoreSubmissionState.NOT_SUBMITTED;
	let gridRand = seededSfc32(gameSeed);
	let spinRand = seededSfc32(gameSeed);
	for (let i = 0; i < 100; i++) {
		spinRand();
	}
	let blanked = true;
	let blankTimer = setTimeout(() => {}, 0);
	let emptyTargetCheck = setTimeout(() => {}, 0);

	function startNewGrid() {
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				playerGrid[y][x] = false;
				targetGrid[y][x] = gridRand() > 0.5;
			}
		}
		emptyTargetCheck = setTimeout(() => {
			runGridChecks();
		}, 600);
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

	$: score = (gridsCount - 1) * 10;

	function runGridChecks() {
		if (gameStarted && checkMatching()) {
			gridsCount++;
			increaseTime();
			startNewGrid();
			spinIt();
			if (memoryMode) {
				unblank();
			}
		}
	}

	$: {
		playerGrid;
		clearTimeout(emptyTargetCheck);
		runGridChecks();
	}

	let countdownNum = 0;
	let startTime: number = 0;
	let nowTime: number = 0;
	let deathTime: number = 0;
	$: remainTime = deathTime - nowTime;
	$: gameOver = remainTime < 0;
	$: timeBarFrac = remainTime / startRemainTime;

	function increaseTime() {
		deathTime += diffSetups[currentSpinSetupI].recovery;
	}

	function unblank() {
		blanked = false;
		clearTimeout(blankTimer);
		blankTimer = setTimeout(() => {
			blanked = true;
		}, memoryModeTime);
	}

	function startTheTime() {
		dateTimeStart = new Date();
		startTime = performance.now();
		nowTime = startTime;
		deathTime = startTime + startRemainTime;
		requestAnimationFrame(updateNowTime);
	}
	function updateNowTime() {
		nowTime = performance.now();
		if (!gameOver) requestAnimationFrame(updateNowTime);
	}
	function beginGame() {
		gameStarted = true;
		startNewGrid();
		spinIt();
		blanked = false;
		if (memoryMode) {
			unblank();
		}
		startTheTime();
	}

	onMount(() => {
		countdownNum = 3;
		const countdownInterval = setInterval(() => {
			countdownNum--;
			if (countdownNum <= 0) {
				beginGame();
				clearInterval(countdownInterval);
			}
		}, 1000);
	});
</script>

<div class="barcontainer">
	<div
		class="energy-bar"
		class:low={timeBarFrac <= 0.3 && gameStarted}
		style="width: {!gameStarted ? 100 : timeBarFrac * 100}%"
	/>
</div>
<div class="gamecontainer">
	<div class="game-content">
		<div>
			<p>target</p>
			<GameGrid
				bind:grid={targetGrid}
				rotation={targetRotation}
				noninteractive
				small
				--spinDuration={`${diffSetups[currentSpinSetupI].target?.duration ?? 0.5}s`}
				{blanked}
			/>
		</div>
	</div>

	<div class="game-content">
		<div>
			<GameGrid
				bind:grid={playerGrid}
				rotation={playerRotation}
				noninteractive={!gameStarted || gameOver}
				newGrid={gridsCount - 1}
				--spinDuration={`${diffSetups[currentSpinSetupI].player?.duration ?? 0.5}s`}
			/>
		</div>
	</div>
</div>

{#if 0 < countdownNum || gameOver}
	<div class="splash-screen" transition:fade={{ easing: cubicInOut }}>
		{#if !gameOver}
			<h1 class="content-center">{countdownNum}</h1>
		{:else}
			<div class="content-center">
				<p>game over</p>
				<p>
					score : {score}
					{#if gameOver && scoreSubmissionState == ScoreSubmissionState.NOT_SUBMITTED}
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
							<input type="hidden" name="score" value={score} />
							<input type="hidden" name="gameSeed" value={gameSeed} />
							<input type="hidden" name="gameMode" value={$gameModeStore} />
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
				</p>
				<div class="gameover-menu">
					<a href="#" on:click={() => location.reload()}>🎃 restart 🦇</a>
					<a href="./">🎃 back 🦇</a>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	div.gamecontainer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 2vmin;
		flex-direction: row-reverse;
		flex-wrap: wrap;
	}

	div.barcontainer {
		width: 70%;
		height: 4vmin;
		background-color: #d3d3d3;
		border-radius: 4vmin;
		margin-top: 6vmin;
		margin-bottom: 6vmin;
	}

	.energy-bar {
		height: 4vmin;
		background-color: var(--base-orange);
		box-shadow: 0 0 10px var(--base-black);
		border-radius: 4vmin;
		transition: width 0.1s, background-color 0.25s;
	}

	.game-content {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--base-orange);
		border: 2vmin solid var(--base-black);
		border-radius: 4vmin;
		box-shadow: 0px 0px 10px var(--base-black);
		padding: 2vmin;
	}

	p {
		font-family: myFirstFont;
		font-size: 7.5vmin;
		font-weight: 1000;
		color: var(--base-black);
		text-shadow: 0px 0px 10px var(--base-orange);
		text-align: center;
		margin-top: 0px;
		margin-bottom: 20px;
	}

	.energy-bar.low {
		background-color: #711308;
	}

	.splash-screen {
		height: 100vh;
		width: 100vw;
		font-size: 125px;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(10px);
		position: fixed;
		top: 0px;
		left: 0px;
	}

	.content-center {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: myFirstFont;
		gap: 16px;
	}

	.content-center p {
		display: flex;
		color: #090505;
		font-size: 50px;
		font-weight: 600;
		font-family: myFirstFont;
		border-radius: 980px;
		margin-top: 0%;
		margin-bottom: 0%;
		gap: 16px;
	}

	.gameover-menu {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5vmin;
	}

	.gameover-menu a,
	.content-center button {
		text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 6vmin;
		font-weight: 600;
		font-family: myFirstFont;
		padding-left: 3.4vmin;
		padding-right: 3.4vmin;
		padding-top: 1.2vmin;
		padding-bottom: 1.2vmin;
		border-radius: 980px;
		white-space: nowrap;
	}

	.content-center button {
		display: flex;
		width: 25vmin;
		height: 8vmin;
		font-size: 4vmin;
		text-align: center;
		justify-content: center;
		align-items: center;
	}
</style>
