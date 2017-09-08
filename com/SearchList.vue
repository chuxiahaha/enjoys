<template>
	<div class="type">
		<header class="header" >
			<div class="kindHeader" v-show="isGo" v-model="isGo" @click="toHome()">首页</div>
			<div class="kindHeader" v-show="!isGo" v-model="isGo" @click="toKind()">首页</div>
			<div class="kindLogo">
				<p><img src="../image/4.png" /><span class="address" v-model="city">{{city}}</span><span class="iconfont triangle">&#xe627;</span></p>
			</div>
			<div class="kindSearch">
				<P><span class="iconfont " @click="toLogin()">&#xe63c;</span><span class="iconfont star">&#xe651;</span></P>
			</div>
		</header>
		<div id="content">
			<ul class="searchBanner">
				<li @click="toRedirect()" class="activeName">本地服务</li>
				<li @click="toSearchList()">全国送</li>
			</ul>
			<div class="searchMsg"><p>根据你的关键词<span>{{keyword}}</span>为你推荐一下商品</p></div>
			
			<ul class="ProLists">
				<li v-for="proitem in proLists" >
					<router-link :to="{name:'detail',params:{goodsID:proitem.enjoy_url}}">
						<div class="imgDiv">
							<img :src="proitem.product_image" />
						</div>
						<div class="textDiv">
							<p>{{proitem.name}}</p>
							<p class="listRed"><span class='nowpri'>{{proitem.price/100}}元</span>/<span class="nowpri">{{proitem.entity_name}}</span><span class="originPri">￥{{proitem.original_price/100}}</span></p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
    import MyAjax from "./../md/MyAjax.js";
	import "./../scss/searchlist.scss";
	import router from "./../router/router.js";
	export default {
		data(){
			return {
				isGo:true,
				city:'北京',
				optionsList:[],
				isExpand:false,
				proLists:[],
				optionMsg:"智能选择",
				keyword:"",
				activeColor:false
			}
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
			
			toLogin(){
				router.push({name:'login'});
			},
			toExpand(){
				var that=this;
				that.isExpand=true;
			},
			golist(sortID,sortName){
				var that=this;
				console.log(sortID,sortName);
				that.optionMsg=sortName;
				localStorage.setItem('sortID',sortID);
				router.push({name:'list',params:{sortID:sortID}})
			},
			toRedirect(){
				var that=this;
				var cityID=localStorage.getItem('cityID');
				that.keyword=that.$route.params.keyword;
				var keyword=that.keyword;
			     var url="https://api.ricebook.com/3/enjoy_product/search.json?city_id="+cityID+"&keyword="+keyword+"&page=0";
				 MyAjax.vueJson(url,function(data){
					console.log(data);
					that.proLists=data.products;
				},function(err){
					console.log(err);
				})
			},
			toSearchList(){
				var that=this;
				that.keyword=that.$route.params.keyword;
				var keyword=that.keyword;
				console.log(keyword);
				var url="https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword="+keyword+"=0";
				MyAjax.vueJson(url,function(data){
					console.log(data);
					that.proLists=data.products;
				},function(err){
					console.log(err);
				})
			}
			
		},
		
		mounted(){
			var that=this;
			that.city=localStorage.getItem('CityName');
			that.keyword=that.$route.params.keyword;
			var keyword=that.keyword;
			var listID=localStorage.getItem('listID');
			var cityID=localStorage.getItem('cityID');
			var sortID=localStorage.getItem('sortID');
			console.log(listID,cityID,sortID);
			
			var url="https://api.ricebook.com/4/tab/sub_category.json?category_id="+listID+"&city_id="+cityID+"&from_id=0";
			MyAjax.vueJson(url,function(data){
				//console.log(data);
				that.optionsList=data.sort;
				console.log(that.optionsList);
			},function(err){
				console.log(err);
			});
			listID=Math.ceil(listID)+1;
			console.log(listID);
			var url="https://api.ricebook.com/3/enjoy_product/search.json?city_id="+cityID+"&keyword="+keyword+"&page=0";
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.proLists=data.products;
			},function(err){
				console.log(err);
			});
			$('.searchBanner').find('li').on('tap',function(){
				$(this).addClass('activeName');
				$(this).siblings().removeClass('activeName');

			})
		}
	}
</script>

<style>
</style>