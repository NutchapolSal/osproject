<script>
	import settingImage from '$lib/images/settings.png';
	import speakerImageOn from '$lib/images/sound-on.png';
	import speakerImageOff from '$lib/images/sound-off.png';

	const gameMode = ['Normal', 'Memory'];
	let selected = gameMode[0];

	let showSpeakerImage = true;
	let imageSource = speakerImageOn;
	function toggleImage() {
		showSpeakerImage = !showSpeakerImage;
		imageSource = showSpeakerImage ? speakerImageOn : speakerImageOff;
	}
</script>

<div class="containner">
	<div class="buttom-icon">
		<img src={settingImage} alt="settings" width="50px" height="50px" />
		<button on:click={toggleImage} class="clickable-image">
			<img src={imageSource} alt="settings" width="50px" height="50px" />
		</button>
	</div>

	<h1>Candy Rotator</h1>
	<a href="./game">🎃 Start 🦇</a>
	<div class="button-group">
		{#each gameMode as mode}
			<button
				aria-current={selected === mode}
				aria-label={mode}
				on:click={() => (selected = mode)}
				class="button-mode">{mode}</button
			>
		{/each}
	</div>
	<a href="./help">How to play🧟‍♂️</a>
</div>

<style>
	@font-face {
		font-family: myFirstFont;
		src: url('$lib/fonts/MN KRASIP.ttf');
	}

	h1 {
		font-family: myFirstFont;
		font-size: 150px;
		margin-top: 0%;
		margin-bottom: 0%;
		color: var(--base-orange);
		text-shadow: 0px 0px 10px var(--base-black);
	}

	.containner {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		padding-top: 0%;
	}

	.buttom-icon {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 10px;
	}

	.button-group {
		flex-direction: row;
		gap: 16px;
	}

	a {
		text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 40px;
		font-weight: 600;
		font-family: 'Roboto', sans-serif;
		padding-left: 24px;
		padding-right: 24px;
		padding-top: 16px;
		padding-bottom: 16px;
		border-radius: 980px;
	}

	a:hover {
		background-color: var(--base-orange);
	}

	.button-mode {
		border-radius: 980px;
		font-family: 'Roboto', sans-serif;
		font-size: 40px;
		font-weight: 600;
		background: var(--base-black);
		color: #fff;
		transform: translate(-2px, -2px);
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
		transition: all 0.1s;
		padding-left: 24px;
		padding-right: 24px;
		padding-top: 16px;
		padding-bottom: 16px;
	}

	button[aria-current='true'] {
		transform: none;
		filter: none;

		/* box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2); */
		box-shadow: inset var(--base-orange) 0px 0px 10px 2px;
		border: var(--base-orange) 2px solid;
	}

	.clickable-image {
		background: none;
		border: none;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.clickable-image:hover {
		transform: scale(1.1);
	}
</style>
