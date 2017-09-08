<template>
	<ul>
		<li ><router-link to="/kind"><i class="iconfont">&#xe6b6;</i></router-link></li>
		<li ><router-link to="/home"><i class="iconfont">&#xe631;</i></router-link></li>
		<li ><router-link to="/share"><i class="iconfont">&#xe662;</i></router-link></li>
		<li ><router-link to="/user"><i class="iconfont">&#xe64c;</i></router-link></li>
	</ul>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
.router-link-exact-active.router-link-active{
		color:#f66;
	}
	.iconfont{
		font-size:26px;
		font-style:normal;
		
	}
</style>