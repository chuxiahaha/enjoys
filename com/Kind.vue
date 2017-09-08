<template>
	<div class="type">
		<header class="header" >
			<div class="kindHeader" v-show="isGo" v-model="isGo" @click="toHome()">分类</div>
			<div class="kindHeader" v-show="!isGo" v-model="isGo" @click="toKind()">首页</div>
			<div class="kindLogo">
				<p><img src="../image/4.png" /><span class="address" @click="toCity()">{{msg}}</span><span class="iconfont triangle">&#xe627;</span></p>
			</div>
			<div class="kindSearch">
				<p><span class="iconfont" @click="toLoginOrElse()">&#xe63c;</span><span class="iconfont star" @click="showSearch()">&#xe651;</span></p>
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
		<div id="content" class="content">
			<div class="groupSection" v-for="item in tabList">
				<div class="descTitle">
					<h1>{{item.group_section.title}}</h1>
					<p>{{item.group_section.desc}}</p>
				</div>
				<ul class="tabs" >
					<li v-for="tab in item.tabs" @click="toDeatil(tab.enjoy_url)">
						<img v-bind:src="tab.url" />
						<p class="tabsTitle">{{tab.title}}</p>
						<p class="tabDecs">{{tab.desc}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
</template>

<script>
	import MyAjax from "./../md/MyAjax.js";
	import "./../scss/kind.scss";
	import $ from './../jquery-1.11.0.js';
	import router from "./../router/router.js";
	export default {
		data(){
			return {
				tabList:[],
				num:0,
				isRequest:false,
				scrollWatch:true,
				isGo:true,
				isOK:false,
				isShow:false,
				keyword:"",
				msg:'北京'
			}
		},
		watch:{
			
		},
		methods:{
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
			toDeatil(enjoy_url){
				console.log(enjoy_url);
				var str=enjoy_url;
				var goodsID=str.split("//")[1];
				localStorage.setItem('goodsID',goodsID);
				console.log(goodsID);
				router.push({ name:'detail', params:{goodsID: goodsID}})
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
			}
		},
		mounted(){
			   console.log(this.num);
			   var that=this;
			   that.msg=localStorage.getItem('CityName');
			   var cityID=localStorage.getItem('cityID');
			   console.log(cityID);
				var url="https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id="+cityID+"&page="+this.num;
				MyAjax.vueJson(url,function(data){
					console.log(data);
					that.tabList=data;
				},function(err){
					console.log(err);
				});
				
				
				$(window).scrollTop(0);
				$(window).on('scroll',(evt)=>{
					if(that.scrollWatch){
						var evt=event || window.event;
						var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
						console.log(scrollTop);
					}
				})
	},
	destroyed(){
		this.scrollWwatch=false;
	}
}
</script>

