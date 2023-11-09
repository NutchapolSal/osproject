<script lang="ts">
	import { enhance } from '$app/forms';
	import { relativeTimeFromDates } from '$lib/relativeTimeCalculator.js';
	import CandyIcon from '$lib/images/candyIcon.png';

	export let data;
	export let form;
	let isSelf = data.loginInfo?.isSelf ?? false;
	let editing = false;
	$: {
		if (form?.error != null) {
			editing = true;
		}
	}
	let waiting = false;
	let inputBox: HTMLInputElement;
</script>

<svelte:head>
	<title>{data.shownUser.displayName} on Candy Rotator</title>
	<meta property="og:title" content={data.shownUser.displayName} />
	<meta property="og:description" content="a player" />
	<meta property="og:url" content={data.url.href} />
	<meta property="og:image" content={CandyIcon} />
	<meta property="og:site_name" content="Candy Rotator" />
	<meta data-react-helmet="true" name="theme-color" content="#E6862E" />
</svelte:head>

<div class="profile-menu header">
	<span style:font-size="6vmin">👤</span>
	<div style:flex-direction="column" style:flex-grow="1">
		<div style:justify-content="space-between" style:align-items="center">
			<h1 class:hide={editing} style:flex-grow="1">{data.shownUser.displayName}</h1>
			{#if isSelf}
				<form
					class="content-center"
					method="POST"
					use:enhance={({ formData, cancel }) => {
						const displayname = formData.get('displayName');
						if (typeof displayname == 'string') {
							const trimmed = displayname.trim();
							inputBox.value = trimmed;
							if (data.shownUser.displayName == trimmed) {
								cancel();
								editing = false;
								return;
							}
							if (trimmed.length < 3) {
								cancel();
								form = {
									error: 'Display name must be at least 3 characters long',
									formName: trimmed
								};
								return;
							}
						}
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
						value={form?.formName ?? data.shownUser.displayName}
						required
						minlength="3"
						autocomplete="off"
						placeholder="Display Name"
						disabled={!editing || waiting}
						class:hide={!editing}
						style:flex-grow="1"
						style:width="0px"
						bind:this={inputBox}
					/>
					<button type="submit" disabled={waiting} class:hide={!editing} formaction="?/editName">
						{waiting ? 'saving...' : 'save'}
					</button>

					<button
						type="button"
						disabled={waiting}
						class:hide={!editing}
						on:click={() => {
							editing = false;
							form = null;
						}}
					>
						cancel
					</button>
				</form>
				<button type="button" on:click={() => (editing = true)} class:hide={editing}>edit</button>
			{/if}
		</div>
		{#if form?.error}
			<p class="error">⚠&#xFE0F {form.error}</p>
		{/if}
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
		font-family: Krasip, sans-serif;
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
		user-select: all;
	}

	.header p.error {
		margin: 0;
		color: rgb(255, 235, 144);
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-size: 2.2vmin;
	}

	button {
		text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 3vmin;
		font-weight: 600;
		font-family: Krasip, sans-serif;
		padding-left: 3vmin;
		padding-right: 3vmin;
		padding-top: 0.5vmin;
		padding-bottom: 0.5vmin;
		border-radius: 980px;
		white-space: nowrap;
	}

	button:hover {
		background-color: var(--base-orange);
		border-color: var(--base-orange);
		cursor: pointer;
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
		font-family: Krasip, sans-serif;
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
