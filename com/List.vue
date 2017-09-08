<template>
	<div class="type">
		<header class="header" >
			<div class="kindHeader" v-show="isGo" v-model="isGo" @click="toHome()">首页</div>
			<div class="kindHeader" v-show="!isGo" v-model="isGo" @click="toKind()">首页</div>
			<div class="kindLogo">
				<p><img src="../image/4.png" /><span class="address" v-model="city">{{city}}</span><span class="iconfont triangle">&#xe627;</span></p>
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
			<div class="listBan">
				<div class="listAll">全部</div>
				<div class="listSort">
					<p><span @click="toExpand()" v-model="optionMsg">{{optionMsg}}</span><span class="iconfont listIcon">&#xe627;</span></p>
				</div>
			</div>
			<ul class="sortOption" v-show="isExpand">
				<li v-for="(optItem,index) in optionsList"  @click="golist(optItem.sort_id,optItem.sort_name)"  >
			    <router-link v-model="optionMsg" :to="{name:'list',params:{sortID:optItem.sort_id}}">{{optItem.sort_name}}</router-link>	
				</li>
			</ul>
			<ul class="ProLists">
				<li v-for="proitem in proLists" @click="toDetail(proitem.enjoy_url)" >
						<div class="imgDiv">
							<img :src="proitem.product_image" />
						</div>
						<div class="textDiv">
							<p>{{proitem.name}}</p>
							<p class="listRed"><span class='nowpri'>{{proitem.price/100}}元</span>/<span class="nowpri">{{proitem.entity_name}}</span><span class="originPri">￥{{proitem.original_price/100}}</span></p>
						</div>
					
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	//
    import MyAjax from "./../md/MyAjax.js";
	import "./../scss/list.scss";
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
				isOK:false,
				isShow:false,
				route:""
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
				if(that.isExpand==true){
					that.isExpand=false;
				}else{
					that.isExpand=true;
				}
				
			},
			golist(sortID,sortName){
				var that=this;
				console.log(sortID,sortName);
				that.optionMsg=sortName;
				localStorage.setItem('sortID',sortID);
				router.push({name:'list',params:{sortID:sortID}})
			},
			toDetail(goodsID){
				localStorage.setItem('goodsID',goodsID);
				router.push({name:"detail",params:{goodsID: goodsID}});
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
		},
		watch:{
			'$route':function(newRoute,oldRoute){
				console.log(newRoute);
				//var sortID=newRoute.params.sortID;
				var that=this;
				
			}
		},
		mounted(){
			var that=this;
			that.city=localStorage.getItem('CityName');
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
			var url="https://api.ricebook.com/4/tab/category_product_list.json?category_id="+listID+"&sort="+sortID+"&from_id=0&city_id="+cityID+"&page=0";
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.proLists=data;
			},function(err){
				console.log(err);
			})
		}
	}
</script>

<style>
</style>