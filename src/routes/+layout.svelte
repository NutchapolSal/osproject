<div class="containner">
	<slot />
</div>

<style>
	@font-face {
		font-family: myFirstFont;
		src: url('$lib/fonts/MN KRASIP.ttf');
	}

	:global(body) {
		--base-black: #2e2c29;
		--base-orange: #e6862e;
		background-image: url('$lib/images/bg.svg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
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
</style>
