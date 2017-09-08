<template>
	<ul>
		<li @click="Cart()"><i class="iconfont textSize">&#xe639;</i></li>
		<li class="toCart" @click="toCart()">加入购物车</li>
		<li class="toOrder" @click=toOrder()>立即购买</li>
	</ul>
</template>

<script>
	import Toast from "./../md/Toast.js";
	import cart from "./../md/cart.js";
	import router from "./../router/router.js";
	export default {
		data(){
			return {
				arrPros:[]
				
			}
		},
		methods:{
			Cart(){
				var isLogin=localStorage.getItem('isLogin');
				console.log(isLogin);
				if(isLogin=='1'){
					router.push({name:'cart'})
				}else{
					router.push({name:'login'})
				}
			},

			toCart(){
				var that=this;
				var isLogin=localStorage.getItem('isLogin');
				console.log(isLogin);
				if(isLogin=='0'){
					router.push({name:'login'})
				}else{
					var userID=localStorage.getItem('userID');
					var goodsID=localStorage.getItem('goodsID');
					var proName=localStorage.getItem('proName');
					var proPrice=localStorage.getItem('proPrice');
					var imgUrl=localStorage.getItem('imgUrl');
					console.log(imgUrl)
					var num=localStorage.getItem('num');
					var product ={  
					    'id': goodsID,        //属性名用引号括起来，属性间由逗号隔开  
					    'name': proName,  
					    'num':1,  
					    'price':proPrice ,
					    'img':imgUrl
					}
					var orderdetail={  
			        username:userID,  
			        phone:"",  
			        address:"",  
			        zipcode:"",  
			        totalNumber:num,  
			        totalAmount:num*proPrice      
		          }
			    //商品加入到购物车  
					cart.addproduct(product);  
//					var productlist=cart.getproductlist();//取出购物车商品  
//					console.log(productlist)
					localStorage.setItem('goodsID',goodsID);
					console.log(goodsID);
					Toast.makeText('加入购物车成功',2000);
				}
			},
			toOrder(){
				var isLogin=localStorage.getItem('isLogin');
				console.log(isLogin);
				if(isLogin=='1'){
					router.push({name:'order'})
				}else{
					router.push({name:'login'})
				}
			}
		},
		mounted(){
			
			
		}
		
	}
</script>

<style scoped="scoped">
	
</style>