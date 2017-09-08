<template>
<div id="loginType">
	<div class="loginLogo">
		<img src="./../image/7.png"/>
	</div>
	<div class="loginMsg">
		<input class="username" type="text"  ref="username" name="username" placeholder="手机号" />
		<input class="pwd" type="text" name="password" ref="password" placeholder="短信验证码" /><input class="code" ref="order" @click="getOrder()"  placeholder="获取短信验证码"  type="text" name="order" />
		<input type="button" class="btn" @click="goLogin()" value="登录"/>
	</div>
	<div class="loginText">
		<P>未注册的账户登陆后自动创建账户</P>
		<p>登录即表示同意<a href="">用户协议</a></p>
	</div>
</div>
</template>

<script>
	import "./../scss/login.scss";
	import MyAjax from "./../md/MyAjax.js";
	import Toast from "./../md/Toast.js";
	import router from "./../router/router.js";
	export default {
		data(){
			return {

			}
		},
		methods:{
            getOrder(){
            	var str = "0123456789ABCDEF";
				var code = "";
				for(var i = 0; i < 4; i++){
					var randNum = Math.floor(Math.random()*str.length);
					code += str[randNum];
				}
				console.log(code);
				this.$refs.order.value=code;
            },
			goLogin(){
				var that=this;
				var userID=that.$refs.username.value;
				var password=that.$refs.password.value;
				console.log(that.$refs.order.value);
			     //console.log(userID);
			     if(userID =="" || password ==""){
			     	Toast.makeText('信息不完整',2000);
			     	
			     }
//			     else if(password !=that.$refs.order.value){
//			            
//			     		Toast.makeText('验证码不正确',2000)
//			     	
//			     }
			     else{
			     	var url ="http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password;
			     	MyAjax.vueJson(url,function(data){
			     		console.log(data);
			     		if(data=='0'){
			     			Toast.makeText('用户名重名',2000);
			     		}else if(data=="2"){
			     			Toast.makeText('数据错误',2000);
			     		}else{
			     			localStorage.setItem('isLogin','1')
			                localStorage.setItem('userID',userID);
			     			Toast.makeText('登录成功',2000);
			     			router.push({name:"kind"});
			     		}
			     	},function(err){
			     		console.log(err);
			     	})
			     }
			    
			}
		},
		mounted(){
			var that=this;
			
		}
	}
</script>

<style >
	
</style>