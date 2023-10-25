<h1>epic gamo</h1>
<script>
	let energyLevel = 100; // ระดับพลังงานเริ่มต้น
	let timerInterval = setInterval(updateTimer, 1);

	function stopTimer() {
		clearInterval(timerInterval);
	}

	function resetTimer() {
		clearInterval(timerInterval);
		energyLevel = 100;
	}

	function updateTimer() {
		if (energyLevel > 0.02) {
			energyLevel -= 0.02;
		} else {
			stopTimer();
		}

		// เปลี่ยนสีเมื่อ energyLevel ต่ำกว่าหรือเท่ากับ 40
		// if (energyLevel <= 90) {
		// 	const energyBar = document.querySelector('.energy-bar');
		// 	if (energyBar) {
		// 		if (energyLevel <= 90) {
		// 			energyBar.classList.add('.energy-bar.low');
		// 		}
		// 	}
		// 	if (energyLevel > 0) {
		// 		energyLevel -= 0.02;
		// 	} else {
		// 		stopTimer();
		// 	}
		// }
	}
</script>

<div class="energy-bar" style="width: {energyLevel}%">
	{energyLevel.toFixed(2)}
</div>

<style>
	.energy-bar {
		background-color: #ff5722; /* สีส้มเข้ม */
		color: #fff;
		text-align: center;
		font-size: 20px;
		padding: 10px;
		transition: width 0.5s; /* เพิ่มเอฟเฟกต์การเปลี่ยนรูปแบบ */
		box-shadow: 0 0 10px rgba(255, 87, 34, 0.7); /* เพิ่มเอฟเฟกต์เงา */
	}

	/* .energy-bar.low { */
		/* background-color: #711308; สีแดงเข้มเมื่อพลังงานน้อย */
	/* } */
</style>
