<template>
	<div class="type">
		<header class="header" >
			<div class="kindHeader" v-show="isGo" v-model="isGo" @click="toHome()">首页</div>
			<div class="kindHeader" v-show="!isGo" v-model="isGo"  @click="toKind()">首页</div>
			<div class="kindLogo">
				<p><img src="../image/4.png" /><span class="address" v-model="msg">{{msg}}</span><span class="iconfont  triangle">&#xe627;</span></p>
			</div>
			<div class="kindSearch">
				<P><span class="iconfont " @click="toLoginOrElse()">&#xe63c;</span><span class="iconfont star" @click="showSearch()">&#xe651;</span></P>
				<div class="searchShow" v-show="isShow">
					<div class="searchContent"><input ref="searchContent" type="text" placeholder="搜索本地精选/快递到家"><span @click="toSearchList()">搜索</span></div>
				</div>
				<ul class="kindDiv" v-show="isOK">
					<li><router-link to="/order">我的订单</router-link></li>
					<li><router-link to="/share">我的礼券</router-link></li>
					<li @click="exitLogin()">退出</li>
				</ul>
			</div>
		</header>
		<div id="content">
			<div class="cityContent">
				<p>本地服务开通城市</p>
				<ul class="cityName">
					<li v-model="msg" v-for="(city,index) in arrList" @click="toList(index,city)" >{{city}}</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import router from "./../router/router.js";
	import "./../scss/city.scss";
	export default {
		data(){
			return {
				isGo:true,
				arrList:[],
				msg:'北京',
				isOK:false,
				isShow:false,
				
			}
		},
		methods:{
			toList(index,city){
				var that=this;
				that.msg=city;
				console.log(index,city);
				localStorage.setItem('CityName',city);
				console.log(city);
				localStorage.setItem("index",index);
				router.push({name:"home2",params:{index:index}});
				switch (index){
					case "0":
					console.log(index);
				}
			},
			toHome(){
				var that=this;
				that.isGo=false;
				router.push({name:"home2"})
			},
			toKind(){
				var that=this;
				that.isGo=true;
				router.push({name:"kind"})
			},
			toLogin(){
				router.push({name:'login'});
			},
			exitLogin(){
				var that=this;
				 localStorage.setItem('isLogin','0')
				 that.isOK=false;
				 that.isShow=false;
			},
			showSearch(){
				var that=this;
				that.isShow=true;
				that.isOK=false;
			},
			toSearchList(){
				var that=this;
				var searchInput=that.$refs.searchContent.value;
				
				if(searchInput!=""){
					
					router.push({name:'searchlist',params:{keyword:searchInput}});
				}
				
			},
			toCity(){
				router.push({name:'city'});
			},
			toLoginOrElse(){
				var that=this;
				var isLogin=localStorage.getItem('isLogin');
				console.log(isLogin);
				if(isLogin=='1'){
					that.isOK=true;
				}else{
					that.isOK=false;
					router.push({name:'login'});
					
				}
				
			},
		},
		mounted(){
			var that=this;
			that.msg=localStorage.getItem('CityName')
			that.arrList=["上海","北京","南京","天津","广州","成都","杭州","深圳","苏州","西安","重庆","长沙"];
			
		}
	}
</script>

<style>
	
</style>