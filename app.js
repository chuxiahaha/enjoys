import Vue from "vue";

import VueResource from "vue-resource";


Vue.use(VueResource);

import "./scss/main.scss";

import App from "./com/App.vue";

import router from "./router/router.js";

new Vue({
	el:"#app",
	router:router,
	data:{
		
	},
	components:{Swiper},
	methods:{
		
				
	},
	components:{
		"v-app":App,
		
	},
	computed:{
		
	},
	watch:{
		
	},
	mounted(){
		
	}
})
