<template>
	<div class="type">
		<div class="myCouPon">
			<p><span class="CouLeft">福利中心</span><span class="CouRight">天天领券，优惠不停</span></p>
		</div>
		<div class="inputCode">
			<input type="text" class="inputContent"  placeholder="请输入礼券卡号"/><input class="couBtn" type="button" value="兑换"/>			<p><span class="useAble"><b>0</b>张可用礼券</span><span class="useSay">使用说明</span></p>
			<div class="couText">
				<p>能用的礼券就这些了~</p>
			</div>
		</div>
	</div>
</template>

<script>
	import "./../scss/coupon.scss";
	export default {
		data(){
			return {
				
			}
		}
	}
</script>

<style>
</style>