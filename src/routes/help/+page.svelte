<script>
    import wbackImage from '$lib/images/wback.png';
</script>
<a href="./" class="menu-icon">
    <img src={wbackImage} alt="settings" width="45px" height="45px" />
</a>
<div class="widget-header">
	<h1>How To Play</h1>
</div>
<div class="paragraph">
    <p1> เกมจะแบ่งเป็น 2 ส่วน คือส่วน pattern ที่ให้เรากดตาม(ด้านขวา) และส่วนที่เราจะกดตาม pattern(ด้านซ้าย)</p1>
    <p1> โดยเกมจะมีสัญลักษ์สีเหลืองที่มุมซ้ายบน เพื่อเป็นจุดสังเกตให้กดตาม</p1>
    <p1>เมื่อเวลาผ่านไป ในส่วนของกระดานของเราที่ต้องกดตามนั้นจะมีการหมุน เพื่อเพิ่มความยากให้กับเกม</p1>
    <p1>คะแนนจะคิดจากจำนวนกระดานที่เคลีย ยิ่งเคลียมากคะแนนก็จะมากขึ้นเรื่อย</p1>
    <p1>5.</p1>
</div>
<style>
	.widget-header h1 {
		width: 100%;
		display: flex;
		font-family: myFirstFont;
		font-size: 150px;
		margin-top: 0%;
		margin-bottom: 0%;
		color: var(--base-orange);
		text-align: center;
		line-height: 1;
		text-shadow: 0px 0px 10px var(--base-black);
	}

    .menu-icon {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 97%;
		gap: 100px;
        /* background: none;
		border: 1px; */
		cursor: pointer;
	}
    
    .paragraph {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
		padding-top: 0%;
	}
    
    p1{
        text-decoration: none;
		color: #fff;
		background: var(--base-black);
		font-size: 33px;
		font-weight: 600;
		font-family: myFirstFont;
		padding: 10px;
		border-radius: 980px;
    }

    


    
	
</style>
