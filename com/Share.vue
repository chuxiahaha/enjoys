<template>
	<div class="type">
		<div class="shadow" v-show="isHide">
			<div class="dianji" @click="showCon()">点击右上角</div>
		</div>
		<header class="shareheader" v-show="isShow">
			<img src="./../image/02.jpg" />
		</header>
		<div id="content">
			<div class="shareMsg">
				<p>邀请好友加入ENJOY，给他发放价值50元礼券。好友完成首单消费后，你亦可获得价值50元礼券</p>
			</div>
			<div class="shareBtn">
				<input type="button" @click="shadow()" value="即刻邀请"/>
			</div>
			<div class="shareResult">
				<p>已成功邀请<span>0</span>位好友  | 获得<span>0</span>元礼券</p>
			</div>
			<div class="shareKind">
				<p><span>1</span><span>5</span><span>25</span><span>50</span></p>
			</div>
			<ul class="shareDescribe">
				<li>
					<span class="liLeft">5人</span><span class="liRight">额外奖励 100元</span>
				</li>
				<li>
					<span class="liLeft">10人</span><span class="liRight">额外奖励 100元</span>
				</li>
				<li>
					<span class="liLeft">25人</span><span class="liRight">额外奖励 700元</span>
				</li>
				<li>
					<span class="liLeft">50人</span><span class="liRight">额外奖励 2000元</span>
				</li>
			</ul>
		</div>
		
	</div>
	
</template>

<script>
	 import MyAjax from "./../md/MyAjax.js";
	import "./../scss/share.scss";
	//import router from "./../router/router.js";
	export default {
		data(){
			return {
				isHide:false,
				isShow:true
			}
		},
		methods:{
			shadow(){
				this.isHide=true;
				this.isShow=false;
			},
			showCon(){
				this.isHide=false;
				this.isShow=true;
			}
		},
		mounted(){
			var that=this;
			var url="https://api.ricebook.com/meereen/v1/invitation_code/detail.json";
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