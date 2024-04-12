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
	<input type="text" name="score" />
	<input type="text" name="gameSeed" value={data.gameSeed} />
	<input type="text" name="gameMode" value={data.gameMode} />
	<input type="text" name="timeStart" value={data.timeStart} />
	<input type="text" name="gameDuration" />
	<input type="text" name="gameVersion" value={'asd'} />
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
