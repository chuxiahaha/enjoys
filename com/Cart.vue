<template>
	<div id="cartContent">
		<ul class="MyCartPro">
			<li class="prolist" v-for="(item,index) in cartPros">
				<div class="cartCheck">
	    		    <input type="checkbox" @click=check(index) :checked="money[index].s" /> 
				</div>
				<div class="cartLeft">
					<img :src="item.img"/>
				</div>
				<div class="cartRight">
					<p>{{item.name}}</p>
					<p><span class="cartproPric">￥{{item.price}}</span></p>
					<p class="ProNum"><span class="numJian" @click="numJJ(item.id,item.num)">-</span><span v-model="num" class="num">{{item.num}}</span><span @click="numSub(item.id,item.num)" class="numSub">+</span><input @click="deleteData(item.id)" type="button" value="删除"/></p>
				</div>
			</li>
	    </ul>
	    <div class="emptyCart" v-show="!isShow">
	    	<div class="emptyImg">
	    		<img src="../image/04.png"/>
	    		<p>购物车空空如也<router-link to="/kind">去逛逛</router-link></p>
	    	</div>
	    </div>
	    <div class="cartfooter" v-show="isShow">
	    	<div class="checkCart">
	    		<p><input type="checkbox" @click="checkedAll()" v-model="checkAll"/>全选</p>    	
	    	</div>
	    	<div class="subPrice">
	    		合计：<span >{{totalMoney}}元</span>
	    	</div>
	    	<div class="toOrder" @click="toOrder()">
	    		去结算
	    	</div>
	    </div>
	</div>
	
</template>

<script>
	import router from "./../router/router.js";
	import MyAjax from "./../md/MyAjax.js";
	import cart from "./../md/cart.js";
	import "./../scss/cart.scss";
	export default {
		data(){
			return {
				cartPros:"",
				num:'1',
				isShow:true,
				Num:0,
				money : [],
				totalMoney:0,
				checkAll : false
			}
		},
		mounted(){
			var that=this;
			var goodsID=localStorage.getItem('goodsID');
			var productlist=cart.getproductlist();//取出购物车商品  
	        console.log(productlist)
	        that.cartPros=productlist;
	        
	        for(var i in that.cartPros){
				var num = that.cartPros[i].num;
				var price = that.cartPros[i].price;
				that.money[i] = {
					s:"",
					m:num*price
				}
			}
	        
			console.log(goodsID);
		},
		methods:{
			countMoney(){
				this.totalMoney = 0;
				for(let i=0; i < this.money.length; i++){
					if(this.money[i].s){
						this.totalMoney += this.money[i].m;
						console.log(this.totalMoney)
					}
				}
			},
			
			check(index){
					var num = 0;
				if(this.money[index].s == ""){
					this.money[index].s = 'checked';
				}else{
					this.money[index].s = ""
				}
				for(let i = 0; i < this.money.length; i++){
					if(this.money[i].s){
						num++
					}
				}
				this.countMoney();
				console.log(num,this.money.length)
				if(num==this.money.length){
					console.log("true")
					this.checkAll = 'checked';
				}else{
					this.checkAll = "";
				}
				this.countMoney();
			},
			checkedAll(){
				if(this.checkAll){
					this.checkAll = "";
				}else{
					this.checkAll = "checked";
				}
				for(let i = 0; i < this.money.length; i++){
					this.money[i].s = this.checkAll;
				}
				this.countMoney();
			},
			deleteData(id){
				var that=this;
				cart.deleteproduct(id);
			},
			numSub(id,num){
				var that=this;
				num++;
				console.log(num);
				cart.updateproductnum(id,num);
			},
			numJJ(id,num){
				if(num >0){
					num--;
				console.log(num);
			}
				cart.updateproductnum(id,num);
			},
			toOrder(){
				router.push({name:"order"});
			}
		}
	}
</script>

<style>
</style>