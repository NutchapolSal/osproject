<script lang="ts">
	import GameSquare from './GameSquare.svelte';
	import { seededSfc32 } from '$lib/rng';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import GameGrid from './GameGrid.svelte';

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

	console.log(diffSetups);

	let playerGrid: boolean[][] = new Array(size).fill(false).map(() => new Array(size).fill(false));
	let targetGrid: boolean[][] = new Array(size).fill(false).map(() => new Array(size).fill(false));
	let playerRotation = 0;
	let targetRotation = 0;
	let gridsCount = 1;
	let stopPointerHold = 0;
	let currentSpinSetupI = 0;
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

		let energyLevel = 100; // ระดับพลังงานเริ่มต้น
	let timerInterval = setInterval(updateTimer, 1);

	function stopTimer() {
		clearInterval(timerInterval);
	}

	function resetTimer() {
		clearInterval(timerInterval);
		energyLevel = 100;
	}

	function updateTimer() {
		if (energyLevel > 0.02) {
			energyLevel -= 0.02;
		} else {
			stopTimer();
		}

		// เปลี่ยนสีเมื่อ energyLevel ต่ำกว่าหรือเท่ากับ 40
		// if (energyLevel <= 90) {
		// 	const energyBar = document.querySelector('.energy-bar');
		// 	if (energyBar) {
		// 		if (energyLevel <= 90) {
		// 			energyBar.classList.add('.energy-bar.low');
		// 		}
		// 	}
		// 	if (energyLevel > 0) {
		// 		energyLevel -= 0.02;
		// 	} else {
		// 		stopTimer();
		// 	}
		// }
	}

</script>

<!-- <h1>epic gamo</h1> -->
<h2>{countdownNum}</h2>
<h2>{Math.floor(remainTime)}</h2>
<div class="gamecontainer">
<div class="energy-bar" style="width: {energyLevel}%">
	{energyLevel.toFixed(2)}
</div>
	<div class="game-content">
		<div>
			<GameGrid
				bind:grid={playerGrid}
				rotation={playerRotation}
				noninteractive={countdownNum != 0 || gameOver}
				{stopPointerHold}
				--spinDuration={`${diffSetups[currentSpinSetupI].player?.duration ?? 0.5}s`}
			/>
		</div>
	</div>

	<div class="game-target">
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

<style>
	div.gamecontainer {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-around;
		gap: 100px;
	}

	.game-content {
		width: 105%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--base-orange);
		border: 10px solid var(--base-black);
		border-radius: 25px;
		box-shadow: 0px 0px 10px var(--base-black);
	}

	.game-target {
		width: 105%;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--base-orange);
		border: 10px solid var(--base-black);
		border-radius: 25px;
		box-shadow: 0px 0px 10px var(--base-black);
	}

	p {
		font-family: myFirstFont;
		font-size: 50px;
		font-weight: 1000;
		color: var(--base-black);
		text-shadow: 0px 0px 10px var(--base-orange);
		text-align: center;
		margin-top: 0px;
		margin-bottom: 20px;
	}

	.energy-bar {
		background-color: #ff5722; /* สีส้มเข้ม */
		color: #fff;
		text-align: center;
		font-size: 20px;
		padding: 10px;
		transition: width 0.5s; /* เพิ่มเอฟเฟกต์การเปลี่ยนรูปแบบ */
		box-shadow: 0 0 10px rgba(255, 87, 34, 0.7); /* เพิ่มเอฟเฟกต์เงา */
	}

	/* .energy-bar.low { */
		/* background-color: #711308; สีแดงเข้มเมื่อพลังงานน้อย */
	/* } */
</style>
