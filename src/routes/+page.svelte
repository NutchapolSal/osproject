<script>
	import Button from '../components/Button.svelte';
	import settingImage from '$lib/images/settings.png';
	import speakerUmage from '$lib/images/speaker-filled-audio-tool.png';
</script>

<img src={settingImage} alt="settings" width="50px" height="50px" />
<img src={speakerUmage} alt="settings" width="50px" height="50px" />
<div>
	<a href="./game">Start</a>
	<!-- <a href="./game">Game mode</a> -->
	<a href="./help">How to play</a>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		/* height: 100vh; */
		padding-top: 45vh;
	}

	a {
		text-decoration: none;
		color: rgb(255, 0, 0);
		font-size: 16px;
		font-weight: 600;
		font-family: 'Roboto', sans-serif;
		background-color: black;
	}

	a:hover {
		background-color: #15ff00;
	}

	img {
		margin-right: 10px;
	}
</style>
