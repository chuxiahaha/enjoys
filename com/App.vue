<template>
	<div class="container">
		<div class="type">
			<router-view></router-view>
		</div>
		<footer class="footer">
			<router-view name="footer"></router-view>
		</footer>
		<div id="toast"></div>
	</div>
</template>

<script>
	import MainFooter from "./MainFooter.vue";
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		components:{
			"v-footer":MainFooter
		}
		
	}
</script>

