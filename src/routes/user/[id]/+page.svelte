<script lang="ts">
	import { enhance } from '$app/forms';
	import { relativeTimeFromDates } from '$lib/relativeTimeCalculator.js';

	export let data;
	export let form;
	let isSelf = data.loginInfo?.isSelf ?? false;
	let editing = false;
	let waiting = false;
</script>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}
<div class="profile-menu header">
	<span style:font-size="6vmin">👤</span>
	<div style:flex-direction="column" style:flex-grow="1">
		<div style:justify-content="space-between" style:align-items="center">
			<h1 class:hide={editing} style:flex-grow="1">{data.shownUser.displayName}</h1>
			{#if isSelf}
				<form
					class="content-center"
					method="POST"
					use:enhance={() => {
						waiting = true;

						return async ({ update }) => {
							await update();
							editing = false;
							waiting = false;
						};
					}}
					style:flex-grow="1"
					class:hide={!editing}
				>
					<input
						type="text"
						name="displayName"
						value={data.shownUser.displayName}
						required
						minlength="3"
						autocomplete="off"
						placeholder="Display Name"
						disabled={!editing || waiting}
						class:hide={!editing}
						style:flex-grow="1"
						style:width="0px"
					/>
					<button type="submit" disabled={waiting} class:hide={!editing} formaction="?/editName">
						{waiting ? 'saving...' : 'save'}
					</button>

					<button
						type="button"
						disabled={waiting}
						class:hide={!editing}
						on:click={() => (editing = false)}
					>
						cancel
					</button>
				</form>
				<button type="button" on:click={() => (editing = true)} class:hide={editing}>edit</button>
			{/if}
		</div>
		<div style:justify-content="space-between" style:align-items="flex-start">
			<code>{data.shownUser.id}</code>
			{#if isSelf}
				<form method="POST">
					<button type="submit" formaction="?/logout">log out</button>
				</form>
			{/if}
		</div>
	</div>
</div>

<div class="profile-menu">
	<p class="text">Recent</p>
	<table>
		{#each data.shownScores.recents as score}
			<tr>
				<td>
					{score.score}
				</td>
				<td>
					{score.gameMode}
				</td>
				<td>
					{relativeTimeFromDates(score.timeStart)}
				</td>
			</tr>
		{/each}
	</table>
</div>

{#each data.shownScores.highscores as table}
	<div class="profile-menu">
		<p class="text">Highscore: {table.mode}</p>
		<table>
			{#each table.scores as score}
				<tr>
					<td>
						{score.score}
					</td>
					<td>
						{score.gameMode}
					</td>
					<td>
						{relativeTimeFromDates(score.timeStart)}
					</td>
				</tr>
			{/each}
		</table>
	</div>
{/each}

<style>
	.hide {
		display: none;
	}

	form {
		display: flex;
		gap: 1vmin;
		align-items: center;
	}

	h1 {
		display: inline;
		margin: 0;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: 0;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1vmin;
	}
	.header div {
		display: flex;
	}

	.header h1,
	.header input {
		color: var(--base-orange);
		font-family: myFirstFont;
		font-size: 6vmin;
	}

	.header input {
		background-color: #ffffff44;
		border: none;
	}

	.header input:disabled {
		color: var(--base-black);
	}

	.header code {
		color: #ccc;
		font-size: 2.2vmin;
	}

	button {
		text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 3vmin;
		font-weight: 600;
		font-family: myFirstFont;
		padding-left: 3vmin;
		padding-right: 3vmin;
		padding-top: 0.5vmin;
		padding-bottom: 0.5vmin;
		border-radius: 980px;
		white-space: nowrap;
	}

	.profile-menu {
		border-radius: 3vmin;
		background: var(--base-black);
		padding: 2.5vmin;
		width: 70vmin;
		height: 100%;
	}

	.profile-menu td {
		text-align: center;
		color: white;
	}

	.text {
		font-family: myFirstFont;
		color: #ffffff;
		font-size: 6vmin;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 3vmin;
		margin: 0;
	}

	table {
		width: 100%;
	}

	td {
		font-size: 2vmin;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
</style>
