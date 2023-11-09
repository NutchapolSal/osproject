<script lang="ts">
	import CandyIcon from '$lib/images/candyIcon.png';
	import Github from '$lib/images/github-mark-white.svg';
	import GameSquare from '../game/GameSquare.svelte';

	export let data;
	let squareState = true;
	let switchCount = -1;
	let rotation = 20;
	$: {
		squareState;
		switchCount++;
		if (10 <= switchCount && switchCount % 10 == 0) {
			rotation += 360;
		}
	}
</script>

<svelte:head>
	<title>About - Candy Rotator</title>
	<meta property="og:title" content="About" />
	<meta property="og:description" content="information about this game" />
	<meta property="og:url" content={data.url.href} />
	<meta property="og:image" content={CandyIcon} />
	<meta property="og:site_name" content="Candy Rotator" />
	<meta data-react-helmet="true" name="theme-color" content="#E6862E" />
</svelte:head>

<div class="header-widget">
	<h1>About</h1>
</div>

<div class="about-me-widget">
	<div class="about-me-widget-header">
		<div class="spinny" style:rotate={`${rotation}deg`}>
			<div class="wiggly">
				<GameSquare bind:state={squareState} corner={true} medium={true} />
			</div>
		</div>
		<div style="display: flex; flex-direction: column;">
			<h1>{switchCount < 100 ? 'Candy Rotator' : 'Stop It'}</h1>
			<a
				href="https://github.com/NutchapolSal/osproject"
				target="_blank"
				style="display: flex; flex-direction: row; align-items: center; gap: 1vmin;"
				><img src={Github} alt="github mark" style="width: 5vmin; height: auto;" /> github repository</a
			>
		</div>
	</div>
	<p>
		โครงงานนี้เป็นส่วนหนึ่งของรายวิชาระบบปฏิบัติการ (Operating System)
		ซึ่งเป็นวิชาบังคับในหลักสูตรวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์
		สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง เพื่อศึกษาเกี่ยวกับการใช้ docker ในการสร้าง
		service
	</p>
	<p style="text-indent: 0;">จัดทำโดย</p>
	<ul>
		<li>65050005 นายกชมน บุญจันทร์</li>
		<li>65050056 นายกันตพัฒน์ สุวรรณเหมย</li>
		<li>65050075 นายกิตติพิชญ์ มุกดาสนิท</li>
		<li>65050251 นายณัชพล สลาเวศม์</li>
		<li>65050335 นายเตชสิทธ์ จันทร</li>
		<li>65050416 นายธีรธัช ใคร่ครวญ</li>
	</ul>
</div>

<style>
	.header-widget h1 {
		width: 100%;
		display: flex;
		font-family: Krasip, sans-serif;
		font-size: 22vmin;
		margin-top: 0%;
		margin-bottom: 0%;
		color: var(--base-orange);
		text-align: center;
		line-height: 1;
		text-shadow: 0px 0px 10px var(--base-black);
	}

	p,
	ul {
		text-indent: 10vmin;
		font-size: 5.5vmin;
		font-family: Krasip, sans-serif;
		color: white;
		display: flex;
		flex-direction: column;
		margin-block-end: 0;
	}

	ul {
		text-indent: 0;
		margin: 0;
	}

	.about-me-widget {
		display: flex;
		flex-direction: column;
		border-radius: 3.5vmin;
		background: var(--base-black);
		padding: 7vmin;
		width: 80%;
		height: 100%;
	}

	.about-me-widget h1,
	.about-me-widget-header a {
		font-size: 10vmin;
		font-family: Krasip, sans-serif;
		margin: 0;
		color: var(--base-orange);
	}

	.about-me-widget-header {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 6.5vmin;
	}

	.about-me-widget-header a {
		width: fit-content;
		font-size: 5vmin;
		text-decoration: none;
		color: white;
	}
	.about-me-widget-header a:hover {
		color: var(--base-orange);
	}

	@keyframes wiggle {
		0% {
			rotate: 10deg;
		}
		50% {
			rotate: -10deg;
		}
		100% {
			rotate: 10deg;
		}
	}

	div.spinny {
		transition: rotate var(--spinDuration, 1s) cubic-bezier(0.33, 1, 0.68, 1);
	}
	div.wiggly {
		animation: 6s wiggle infinite both cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}
</style>
