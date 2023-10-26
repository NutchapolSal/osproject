<script lang="ts">

	import settingImage from '$lib/images/profileimg.png';

	let profileData = {
		name: 'Diamond',
		profileImage: settingImage,
		email: 'ddddddd@email.com',
		score: 'dddd'
	};
</script>


<div class="profile">
	<img src={profileData.profileImage} alt="Profile Image" width="150px" height="150px" class="avater"/>
	<h1>{profileData.name}</h1>
	<!-- <p>Score: {profileData.score}</p> -->
	<!-- <p>Email: {profileData.email}</p> -->
	<!-- <p>Ranking: 1</p> -->
</div>
<div class="how-to-play-menu">
	<p class="text">history</p>

</div>
<div>
	<a href="./">Blsck🧟</a>
</div>



<style>
	.how-to-play-menu {
		border-radius: 25px;
		background: var(--base-black);
		padding: 20px;
		width: 80%;
		height: 100%;
	}
	a {
		text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 50px;
		font-weight: 600;
		font-family: myFirstFont;
		padding-left: 24px;
		padding-right: 24px;
		padding-top: 16px;
		padding-bottom: 16px;
		border-radius: 980px;
	}

	a:hover {
		background-color: var(--base-orange);
	}

	.profile {
		font-family: myFirstFont;
		color: #CE0606;
		font-size: 30px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 10px;
	}

	.text {
		font-family: myFirstFont;
		color: #ffffff;
		font-size: 30px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 10px;
	}

	.avater{
		vertical-align:  middle;
		width: 150px;
		height:  150px;
		border-radius: 50%;
	}
</style>
