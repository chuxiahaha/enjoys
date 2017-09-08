<template>
		
	<div class="type">
		<header class="userheader">
			<div class="userImg">
				<img src="./../image/03.png" />
				<p>ENJOY_65EG7JTW</p>
			</div>
		</header>
		<div id="content">
			<div class="myPayCode"><span class="code">Code 消费码</span><span class="nextPage"><router-link to="/order">></router-link></span> </div>
			<div class="giftCard">
				<p><span class="cardLeft">我的购物券</span><span class="cardRight"><router-link to="/user/coupon">></router-link></span></p>
				<p><span class="cardLeft">地址管理</span><span class="cardRight"> <router-link to="/user/address">></router-link></span></p>
			</div>
		</div>
	</div>

</template>

<script>
	import MyAjax from "./../md/MyAjax.js";
	import "./../scss/user.scss";
	export default {
		data(){
			return {
				
			}
		},
		mounted(){
			var url="https://api.ricebook.com/2/user/info.json";
			MyAjax.vueJson(url,function(data){
				console.log(data);
			},function(err){
				console.log(err);
			})
		}
	}
</script>

<style>
</style>