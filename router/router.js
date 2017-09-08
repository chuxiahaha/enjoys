import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

import routes from "./../routes/routes.js";

var router = new VueRouter({
//	routes:routes
	routes
})
export default router;