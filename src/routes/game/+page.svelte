<script lang="ts">
	import GameSquare from './GameSquare.svelte';
	import { seededSfc32 } from '$lib/rng';
	import type { PageData } from './$types';

	export let data;
	const gameSeed = data.gameSeed;

	const size = 3;
	const harderSpinThreshold = 30;

	let playerGrid: boolean[][] = new Array(size).fill(false).map(() => new Array(size).fill(false));
	let targetGrid: boolean[][] = new Array(size).fill(false).map(() => new Array(size).fill(false));
	let playerRotation = 0;
	let targetRotation = 0;
	let gridsCount = 1;
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
			startNewGrid();
			spinIt();
		}
	}
</script>

<h1>epic gamo</h1>
<div class="gamecontainer">
	<div>
		<div class="spinny" style:rotate={`${0.25 * playerRotation}turn`}>
			{#each playerGrid as row, y}
				<div>
					{#each row as state, x}
						<GameSquare bind:state corner={x === 0 && y === 0} />
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div>
		<div>
			<p>target</p>
			<div class="spinny" style:rotate={`${0.25 * targetRotation}turn`}>
				{#each targetGrid as row, y}
					<div class="rowcontainer">
						{#each row as state, x}
							<GameSquare {state} corner={x === 0 && y === 0} noninteractive small />
						{/each}
					</div>
				{/each}
			</div>
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
	div.spinny {
		display: inline-block;
		transition: rotate 0.5s cubic-bezier(0.33, 1, 0.68, 1);
	}
	div.rowcontainer {
		margin: 0;
	}
</style>
