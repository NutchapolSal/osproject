<script lang="ts">
	import { applyAction, enhance } from '$app/forms';

	export let data;

	enum ScoreSubmissionState {
		NOT_SUBMITTED,
		SUBMITTING,
		FAILED,
		SUBMITTED
	}
	let scoreSubmissionState = ScoreSubmissionState.NOT_SUBMITTED;
</script>

<form
	method="POST"
	action="/game"
	use:enhance={() => {
		scoreSubmissionState = ScoreSubmissionState.SUBMITTING;
		return async ({ result }) => {
			if (result.type == 'failure') {
				await applyAction(result);
				scoreSubmissionState = ScoreSubmissionState.FAILED;
			} else {
				scoreSubmissionState = ScoreSubmissionState.SUBMITTED;
			}
		};
	}}
>
	<label>
		score
		<input type="text" name="score" />
	</label>
	<label>
		gameSeed
		<input type="text" name="gameSeed" value={data.gameSeed} />
	</label>
	<label>
		gameMode
		<input type="text" name="gameMode" value={data.gameMode} />
	</label>
	<label>
		timeStart
		<input type="text" name="timeStart" value={data.timeStart} />
	</label>
	<label>
		gameDuration
		<input type="text" name="gameDuration" />
	</label>
	<label>
		gameVersion
		<input type="text" name="gameVersion" value={'asd'} />
	</label>
	<button>submit score</button>
</form>

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
	form {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
