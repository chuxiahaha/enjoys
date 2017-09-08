<template>
	<div class="type">
		<!--<header class="header" >
			<div class="detailHeader">分类</div>
			<div class="detailLogo">
				<p><img src="../image/4.png" /><span class="address">上海</span><span class="iconfont triangle">&#xe627;</span></p>
			</div>
			<div class="detailSearch">
				<P><span class="iconfont ">&#xe63c;</span><span class="iconfont star">&#xe651;</span></P>
			</div>
		</header>-->
		<div id="detailcontent">
			<header class="header" >
				<div class="detailHeader" v-show="isGo" v-model="isGo" @click="toHome()">首页</div>
			    <div class="detailHeader" v-show="!isGo" v-model="isGo" @click="toKind()">首页</div>
				<div class="detailLogo">
					<p><img src="../image/4.png" /><span class="address">{{msg}}</span><span class="iconfont triangle">&#xe627;</span></p>
				</div>
				<div class="detailSearch">
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
			
			<div class="swiper-container" id="bannerBox" >
				<div class="swiper-wrapper" id="bannerShow">
					<div class="swiper-slide" v-for="imgItem in imgList">
						<img v-bind:src="imgItem.img_url" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<div class="proMsg">
				<p class="proTitle">{{goodsBasic.name}}-<span>{{goodsBasic.spec}}</span></p>
				<p class="proDescirbe">{{goodsBasic.description}}</p>
				<p ><span class="red">{{goodsBasic.price/100}}元/{{goodsBasic.show_entity_name}}</span><b class="originPrice">￥{{goodsBasic.origin_price/100}}</b>|<b>随时退</b></p>
			</div>
			<div class="empty"></div>
			<div class="detailInfo">
				<h1>商品详情</h1>
				<ul class="goodsInfo">
					<li v-for="module in modulesList">
						<span class="left">{{module.key}}</span><span class="right">{{module.value}}</span>
					</li>
				</ul>
				<ul class="goodsInfo2">
					<li v-for="module2 in modulesList2">
						<span class="left2">{{module2.key}}</span><span class="right2">{{module2.value}}</span>
					</li>
				</ul>
			</div>
			<div class="highLights">
				<h1>亮点</h1>
				<ul class="introduceImg">
					<li v-for="light in lightsList">
						<img :src="light.img_url" />
						<h2>{{light.title}}</h2>
						<p>{{light.content}}</p>
					</li>
				</ul>
			</div>
			<div class="empty"></div>
			<div class="useTips">
				<h1>使用提示</h1>
				<ul class="useInfo">
					<li v-for="tip in tipsList" >{{tip.text}}</li>
					<li class="control" @click="toBlock()">更多补充说明<i class="iconfont">&#xe60c;</i></li>
				</ul>
			</div>
			<div class="empty"></div>
			<div class="guessLove">
				<h1>猜你喜欢</h1>
				<ul class="loveList">
					<li v-for="item in lovesList"  @click="toDetail($event)">
						<img :src="item.product_image_url" :goodsID="item.enjoy_url" />
						<p class="loveTitle">{{item.product_name}}</p>
						<p class="lovePrice">{{item.price/100}}/<span>{{item.show_entity_name}}</span></p>
					</li>
				</ul>
			</div>
		</div>
	</div>
			
		
		
		
	
</template>

<script>
	import MyAjax from "./../md/MyAjax.js";
	import router from "./../router/router.js";
	import "./../scss/detail.scss";
	import "./../jslib/swiper/css/swiper-3.4.1.min.css";
	export default {
		data(){
			return {
				goodsID:"",
				goodsList:[],
				imgList:[],
				modulesList:[],
				modulesList2:[],
				goodsBasic:"",
				lightsList:[],
				tipsList:[],
				isBlock:true,
				lovesList:[],
				goodsID:"",
				isOK:false,
				isShow:false,
				isGo:true,
				msg:"北京",
				proName:""
				
			}
		},
		methods:{
			toBlock(){
				var that=this;
				//that.isBlock=true;
				$('useInfo').find('li').css({display:'block'});
				$('control').css({display:'none'});
			},
			toDetail(event){
				var str=event.target.getAttribute("goodsID");
				var goodsID=str.split("//")[1];
				localStorage.setItem('goodsID',goodsID);
				console.log(goodsID);
				router.replace({ name:'detail', params:{goodsID: goodsID.split('?')[1]}})
				//var url="https://api.ricebook.com/product/info/product_detail.json?product_"+goodsID;
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
		},
		mounted(){
			var that=this;
			that.msg=localStorage.getItem('CityName')
			console.log(that.$route.params.goodsID);
			localStorage.setItem('goodsID',that.$route.params.goodsID)
			var goodsID=localStorage.getItem('goodsID');
			console.log(goodsID.split("?")[1]);
			
			
			var url="https://api.ricebook.com/product/info/product_detail.json?product_"+goodsID.split("?")[1];
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.goodsList=data;
				that.imgList=that.goodsList.basic.product_images;
				console.log(that.goodsList)
				that.goodsBasic=that.goodsList.basic;
				var num=localStorage.setItem('num',1);
				var proName=localStorage.setItem('proName',that.goodsBasic.name);
				var proPrice=localStorage.setItem('proPrice',that.goodsBasic.price/100);
				var imgUrl=localStorage.setItem('imgUrl',that.imgList[0].img_url);
				console.log(imgUrl);
				console.log(proName);
				console.log(proPrice);
				that.modulesList=that.goodsList.modules[0].data.attributes;
				that.modulesList2=that.goodsList.modules[0].data.menu_attributes;
				that.lightsList=that.goodsList.modules[1].data.lights;
				that.tipsList=that.goodsList.modules[2].data.contents;
				that.lovesList=that.goodsList.modules[3].data.recommend;
				console.log(that.lovesList);
			},function(err){
				console.log(err);
			});
				var swiper=new Swiper(".swiper-container",{
				pagination:".swiper-pagination",
				autoplay:"3000",
				loop:true,
				observer:true,
				autoplayDisableOnInteraction:false
			})
				
			
		}
	}
</script>

<style>
</style>