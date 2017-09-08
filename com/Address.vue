<template>
	<div class="type">
		<div id="addressContent">
			<div class="imgAddr" v-show="isHide">
				<img src="./../image/04.png" />
				<p>你还未添加过任何地址</p>
			</div>
			<div class="addressMsg" v-show="!isSee">
				<input type="text" ref="name" placeholder="收货人姓名" />
				<input type="text" ref="phone" placeholder="手机号" />
				<input type="email" ref="email" placeholder="邮箱（选填）" />
				<!--<p><input type="select"  /><input type="select"  /><input type="select"  /></p>-->
				<input type="text" ref="detailAddr" placeholder="详细地址"/>
				<input class="checkAddr" type="checkbox" checked="" />设为默认地址
				<p><input class="saveBtn" type="button" @click="savaData()" value="保存并返回"/><input @click=backAddr() type="button" class="backBtn" value="返回"/></p>
			</div>
			<div class="addrFooter" @click="addAddress()" v-show="isShow" >
				<p>+新地址</p>
			</div>
			<ul class="addressCon" v-model="isLook">
				<li>
					<p class="namePhone"><span class="name">{{name}}</span><span class="phone">{{phone}}</span></p>
					<p class="adrdet">{{addrDetail}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import "./../scss/address.scss";
	import Toast from "./../md/Toast.js";
	export default {
		data(){
			return {
				isHide:true,
				isShow:true,
				isSee:true,
				name:"",
				phone:"",
				email:"",
				addrDetail:"",
				isLook:false
			}
		},
		methods:{
			addAddress(){
				var that=this;
				that.isHide=false;
				that.isSee=false;
				that.isLook=false;
				
			},
			savaData(){
				var that=this;
				var name=that.$refs.name.value;
			    var phoneNum=that.$refs.phone.value;
			    var email=that.$refs.email.value;
			    var addrDetail=that.$refs.detailAddr.value;
			    if((name=="" || phoneNum=="") || addrDetail==""){
			    	Toast.makeText('参数不全',2000);
			    }else{
			    	localStorage.setItem('name',name);
			    	localStorage.setItem('phoneNum',phoneNum);
			    	localStorage.setItem('addrDetail',addrDetail);
			    	//history.go(-1);
			    	var haveAddr=1;
			    	localStorage.setItem('haveAddr',haveAddr);
			    	console.log(haveAddr);
			    	that.isSee=true;
			    	that.isHide=false;
			    	that.$refs.name.value="";
			    	that.$refs.phone.value="";
			    	email=that.$refs.email.value="";
			    	addrDetail=that.$refs.detailAddr.value="";
			    }
			    that.name=localStorage.getItem('name');
			    that.phone=localStorage.getItem('phoneNum');
			    that.email=localStorage.getItem('email');
			    that.addrDetail=localStorage.getItem('addrDetail');
			    that.isLook=true;
			    
			},
			backAddr(){
				history.go(-1);
			}
		},
		mounted(){
			
		}
	}
</script>

<style>
	
</style>