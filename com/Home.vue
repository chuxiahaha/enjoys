<template>
	<div class="type">
		<header class="header" >
			<div class="kindHeader" v-show="isGo" v-model="isGo" @click="toHome()">分类</div>
			<div class="kindHeader" v-show="!isGo" v-model="isGo" @click="toKind()">首页</div>
			<div class="kindLogo">
				<p><img src="../image/4.png" /><span class="address">{{msg}}</span><span class="iconfont triangle" @click="toCityList()">&#xe627;</span></p>
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
			    <div class="recommend">
			    	<div class="recommendTitle" ><h1>{{arrList.data.group_section.title}}</h1><!--<p class="page"><span v-model="imgNum" class="picNum">{{imgNum}}</span>/<span class="sum">{{arrList.data.tabs.length}}</span></p>--></div>
			    	<p class="recommendText">{{arrList.data.group_section.desc}}</p>
			    </div>
				
				<div class="swiper-container imgBox" id="imgBox">
					<div class="swiper-wrapper imgShow" >
						<div class="swiper-slide slide" v-model="imgNum" @tap="num(index)" v-for="(img,index) in arrList.data.tabs">
								<img v-bind:src="img.url"/>
								<p class="red">{{img.tag}}</p>
								<h1>{{img.title}}</h1>
								<p>{{img.desc}}</p>
						</div>
					</div>
					<div class="paginations" id="pageList"></div>
		        </div>
		        <div class="swiper-container homeShadow" >
		        	<div class="swiper-wrapper homeWraper" >
					  <div class="swiper-slide homeslide" v-for="(sList,index) in shadowList">
							<img src="../image/1.png" >
							<div class="shadowTitle">
								<p>{{sList.title}}</p>
								<p class="Stext">{{sList.desc}}</p>
							</div>
					  </div>
					</div>
				</div>
				<div class="moreList">
					<div class="moreTitle" ><h1>{{moreList.group_section.title}}</h1><p class="moreLook">查看更多</p></div>
			    	<p class="moreText">{{moreList.group_section.desc}}</p>
				</div>
				<ul class="morePro">
					<li v-for="more in moreList.tabs"  @click="toDetail($event)">
						<img :goodsID="more.enjoy_url" v-bind:src="more.url" />
					</li>
				</ul>
				<div class="moreList">
					<div class="moreTitle" ><h1>{{moreList2.group_section.title}}</h1><p class="moreLook">查看更多</p></div>
			    	<p class="moreText">{{moreList2.group_section.desc}}</p>
				</div>
				<ul class="morePro">
					<li v-for="more in moreList2.tabs"  @hover="toDetail($event)">
						<img :goodsID="more.enjoy_url" v-bind:src="more.url" />
					</li>
				</ul>
				<div class="moreList">
					<div class="moreTitle" ><h1>{{moreList3.group_section.title}}</h1><p class="moreLook">查看更多</p></div>
			    	<p class="moreText">{{moreList3.group_section.desc}}</p>
				</div>
				<ul class="morePro">
					<li v-for="more in moreList3.tabs"  @click="toDetail($event)">
						<img :goodsID="more.enjoy_url" v-bind:src="more.url" />
					</li>
				</ul>
		</div>
	</div>
</template>

<script>
//	import  "./../jslib/swiper/css/swiper-3.4.1.min.css";
//	import Swiper from "./../jslib/swiper/js/swiper-3.4.1.min.js";
	import MyAjax from "./../md/MyAjax.js";
	import "./../scss/home.scss";
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
				isOK:false,
				isShow:false,
				imgNum:'1',
				msg:"北京"
				
			}
		},
		methods:{
			toHome(){
				var that=this;
				that.isGo=false;
				router.push({name:"home2"})
			},
			toCityList(){
				router.push({name:"city"})
			},
			toKind(){
				var that=this;
				that.isGo=true;
				router.push({name:"kind"})
			},
			toDetail(event){
				
				console.log(event.target.getAttribute("goodsID"));
				var str=event.target.getAttribute("goodsID");
				var goodsID=str.split("//")[1];
				localStorage.setItem('goodsID',goodsID);
				console.log(goodsID);
				router.push({ name:'detail', params:{goodsID: goodsID}})
				
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
			num(index){
				var that=this;
				that.imgNum=index+1;
				console.log(index)
			}
		},
		mounted(){
			var that=this;
			that.msg=localStorage.getItem('CityName')
			var url="https://api.ricebook.com/hub/home/v1/web/explore.json?city_id=140";
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.dataList=data;
				that.arrList=that.dataList[0];
				that.shadowList=that.dataList[1].data.tabs;
				//console.log(that.shadowList);
				that.moreList=that.dataList[2].data;
				that.moreList2=that.dataList[3].data;
				that.moreList3=that.dataList[4].data;
				console.log(that.moreList);
			},function(err){
				console.log(err);
			});
				var swiper=new Swiper("#imgBox .swiper-container",{
					pagination:"#imgBox .swiper-pagination",
					//autoplay:"3000",
					//loop:true,
					pagination: '.paginations',
        		    paginationType:'fraction',
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					
				})
				$('.slide').on('tap',function(){
					$(this).index
				})
			
			
		}
	}
</script>

<style scoped >

.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    text-align: right;
    bottom: 100px;
    position: absolute;
    z-index: 3;
    top:0px; 
    width: 90%;
}
</style>