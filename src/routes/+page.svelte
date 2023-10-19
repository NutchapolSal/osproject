<script>
	import settingImage from '$lib/images/image-2_0.png';
	import speakerUmageop from '$lib/images/image-3_0.png';
	import speakerUmagecs from '$lib/images/image_0.png';
  
	let showSpeakerImage = true; 
	let imageSource = speakerUmageop; 
	function toggleImage() {
	  showSpeakerImage = !showSpeakerImage;
	  imageSource = showSpeakerImage ? speakerUmageop : speakerUmagecs;
	}
  </script>
  
  <p>
	<img src={settingImage} alt="settings" width="50px" height="50px" />
	<img src={imageSource} alt="settings" width="50px" height="50px" on:click={toggleImage} class="clickable-image" />
  </p>
  
  <div>
	<h1>Candy Rotater</h1>
	<a href="./game">🎃 Start 🦇</a>
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

	div {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  gap: 24px;
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
	  padding-top: 18px;
	  padding-bottom: 12px;
	  border-radius: 980px;
	}
  
	a:hover {
	  background-color: var(--base-orange);
	}
  
	img {
		margin-top: 0%;
		margin-bottom: 0%;
		margin-right: 10px;
	}
  
	.clickable-image {
	  cursor: pointer;
	  transition: transform 0.3s ease;
	}
  
	.clickable-image:hover {
	  transform: scale(1.1);
	}
  </style>
  
