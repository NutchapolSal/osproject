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
>
	<h1 class:hide={editing}>Name : {data.shownUser.displayName}</h1>
	{#if isSelf}
		<button type="button" on:click={() => (editing = true)} class:hide={editing}> edit </button>
		<input
			type="text"
			name="displayName"
			value={data.shownUser.displayName}
			required
			minlength="3"
			autocomplete="off"
			class:hide={!editing}
			disabled={waiting}
		/>
		<button type="submit" disabled={waiting} class:hide={!editing} formaction="?/editName">
			{waiting ? 'saving...' : 'save'}
		</button>
		<button type="submit" formaction="?/logout">log out</button>
	{/if}
</form>
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
		gap: 1vmin;
		align-items: center;
	}

	h1 {
		display: inline;
		font-family: myFirstFont;
		color: var(--base-orange);
		font-size: 10vmin;
		-webkit-text-stroke: var(--base-black) 0.1px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 2vmin;
		margin: 0;
	}

	.content-center button {
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
		border-radius: 25px;
		background: var(--base-black);
		padding: 20px;
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
</style>
