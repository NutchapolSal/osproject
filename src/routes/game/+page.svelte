<script lang="ts">
	import GameSquare from './GameSquare.svelte';
	import { seededSfc32 } from '$lib/rng';
	import type { PageData } from './$types';

	export let data;
	const gameSeed = data.gameSeed;

	const size = 3;

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
		if (tempA < 0.5) {
			playerRotation += Math.floor(tempB * 3) - 1;
		}
		if (tempC < 0.25) {
			targetRotation += Math.floor(tempD * 3) - 1;
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
