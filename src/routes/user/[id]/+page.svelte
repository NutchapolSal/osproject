<script lang="ts">
	import { enhance } from '$app/forms';

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
	<span style:font-size="6vw">👤</span>
	<div style:flex-direction="column" style:flex-grow="1">
		<div style:justify-content="space-between" style:align-items="center">
			<h1 class:hide={editing}>{data.shownUser.displayName}</h1>
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
	<p class="text">history</p>
	<table>
		{#each data.shownScores as score}
			<tr>
				<td>
					{score.score}
				</td>
				<td>
					{score.gameMode}
				</td>
				<td>
					{score.timeStart.toISOString()}
				</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	.hide {
		display: none;
	}

	form {
		display: flex;
		gap: 1vw;
		align-items: center;
	}

	h1 {
		display: inline;
		margin: 0;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1vw;
	}
	.header div {
		display: flex;
	}

	.header h1,
	.header input {
		color: var(--base-orange);
		font-family: myFirstFont;
		font-size: 6vw;
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
		font-size: 2.2vw;
	}

	button {
		text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 3vw;
		font-weight: 600;
		font-family: myFirstFont;
		padding-left: 3vw;
		padding-right: 3vw;
		padding-top: 0.5vw;
		padding-bottom: 0.5vw;
		border-radius: 980px;
		white-space: nowrap;
	}

	.profile-menu {
		border-radius: 3vw;
		background: var(--base-black);
		padding: 2.5vw;
		width: 70vw;
		height: 100%;
	}

	.profile-menu td {
		text-align: center;
		color: white;
	}

	.text {
		font-family: myFirstFont;
		color: #ffffff;
		font-size: 6vw;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 3vw;
		margin: 0;
	}

	table {
		width: 100%;
	}
</style>
