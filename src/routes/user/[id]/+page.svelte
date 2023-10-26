<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;
	let editAuthorized = data.loginInfo?.editAuthorized ?? false;
	let editing = false;
	let waiting = false;
</script>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<form
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
	<h1 class:hide={editing}>{data.shownUser.displayName}</h1>
	{#if editAuthorized}
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
		<button type="submit" disabled={waiting} class:hide={!editing}>
			{waiting ? 'saving...' : 'save'}
		</button>
	{/if}
</form>
<h2>{data.shownUser.id}</h2>
{#each data.shownScores as score}
	<p>{score.score} {score.gameMode} {score.timeStart}</p>
{/each}

<style>
	.hide {
		display: none;
	}
</style>
