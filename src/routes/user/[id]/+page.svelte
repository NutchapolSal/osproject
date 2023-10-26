<script lang="ts">
	export let data;
</script>

<h1>{data.shownUser.displayName}</h1>
<h2>{data.shownUser.id}</h2>
{#each data.shownScores as score}
	<p>{score.score} {score.gameMode} {score.timeStart}</p>
{/each}
