<template>
	<div class="type">
		<header class="header" >
			<div class="kindHeader" v-show="isGo" v-model="isGo" @click="toHome()">首页</div>
			<div class="kindHeader" v-show="!isGo" v-model="isGo" @click="toKind()">首页</div>
			<div class="kindLogo">
				<p><img src="../image/4.png" /><span class="address" v-model="city">{{city}}</span><span class="iconfont triangle" @click="toCityList()">&#xe627;</span></p>
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
			   <div class="cityTable" v-for="listA in cateList">
				   	<div class="cityTitle">
				   		<h1>{{listA.name}}</h1>
				   	</div>
				   	<ul class="cateList">
				   		<li @click="toList(listB.id,listB.city_id)"  v-for="listB in listA.sub_category_list">
				   			<!--<router-link :to="{name:'list',params:{ID:listB.enjoy_url,cityID:listB.city_id}}">-->
				   			     {{listB.name}}
				   			<!--</router-link>-->
				   		</li>
				   		
				   	</ul>
			   </div>
		</div>
	</div>
</template>

<script>
	import MyAjax from "./../md/MyAjax.js";
	import "./../scss/home2.scss";
	import router from "./../router/router.js";
	
	export default {
		data(){
			return {
				dataList:[],
				arrList:"",
				shadowList:[],
				moreList:[],
				moreList2:[],
				moreList3:[],
				isGo:true,
				city:'北京',
				cateList:[],
				isOK:false,
				isShow:false,
				
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
			toCityList(){
				router.push({name:"city"})
			},
			toLogin(){
				router.push({name:'login'});
			},
			toList(id,cityID){
				router.push({name:"list"})
				console.log(id,cityID);
				var listID=localStorage.setItem('listID',id);
				var cityID=localStorage.setItem('cityID',cityID);
				
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
			//https://api.ricebook.com/4/tab/category_product_list.json?category_id=9&sort=1&from_id=0&city_id=140&page=0
			var that=this;
			that.city=localStorage.getItem('CityName')
			console.log(localStorage.getItem('index'));
			var index=localStorage.getItem('index');
			var arrCity=['https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTA0JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9ZmRmMDBkN2E1NzNkOTI2OTg1NWYxMzZhODExOTdmNDUmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTQwJmlzX25ld19sb2NhbD1mYWxzZSZtZDU9NjE5ZTk5N2IzYzQzYWE1NjE5NWRlM2U0YzFkZmZlOTkmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTQ0JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9MDRkYmM5NTI4YWM4YTdhNjc2NWNjOWM4NTI5NzAyZTUmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTg1JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9NGJjMjFiYmNjOWI1NTQ1MWE3YTExNGIxNzhiYTMwYzAmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MjE2JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9MzAzZTc0OWViY2YxYTgyMjMxNzA3ZDZhNjA1MzdjZGYmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MjM1JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9YmMxZTA1NjhkZDUxYzI2YTI3OTUxMzBlZWU4NzgwNDAmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MjYwJmlzX25ld19sb2NhbD1mYWxzZSZtZDU9MzA1MmU5NjQ0ZmVmZmFjMjNmMzIyMzhhYzk2Mzk1ODYmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9Mjk5JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9ZjczMjQ5MGYyODNhYTdjYTU1N2MxM2FjYTM1M2UzMmUmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MzQ3JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9MzhiNWMxNjExYzdkNTc1NjhiYTgyNzI4YzRhMTgwNDYmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MzYyJmlzX25ld19sb2NhbD1mYWxzZSZtZDU9NDc2ZDI5MjM5MjhmZTc4NDUxMzgwZTAzOWE5ZjlmMTgmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9Mzg4JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9N2U0M2RjYzdjYTQ1MmU0ZjZhM2ExNTUxYTExNDk2YzUmMjAxNzA4MjIxNjAw.json','https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9NDAxJmlzX25ld19sb2NhbD1mYWxzZSZtZDU9Njc0MTkyMThlZTRlYWY0OTQxODA1YzA0MWZmMTdhMGUmMjAxNzA4MjIxNjAw.json'];
			var url=arrCity[index];
			console.log(url);
			MyAjax.vueJson(url,function(data){
				that.cateList=data;
				var arr=[];
				console.log(that.cateList);
			},function(err){
				console.log(err);
			});
			
				
		}
	}
</script>

<style >

</style>