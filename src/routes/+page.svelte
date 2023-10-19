<script>
	import settingImage from '$lib/images/settings.png';
	import speakerUmage from '$lib/images/speaker-filled-audio-tool.png';
</script>

<p>
	<img src={settingImage} alt="settings" width="50px" height="50px" />
	<img src={speakerUmage} alt="settings" width="50px" height="50px" />
</p>

<div>
	<h1>เกมไรวะเนี่ยยยยยยยยยยยย</h1>
	<a href="./game">&#127875;Start&#128375;</a>
	<a href="./help">How to play&#128302;</a>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 24px;
		padding-top: 20vh;
	}

	a {
		text-decoration: none;
		color: #fff;
		background: #2e2c29;
		font-size: 40px;
		font-weight: 600;
		font-family: 'Roboto', sans-serif;
		padding-left: 24px;
		padding-right: 24px;
		padding-top: 18px;
		padding-bottom: 12px;
		border-radius: 980px;
	}

	a:hover {
		background-color: #e6862e;
	}

	img {
		margin-right: 10px;
	}
</style>
