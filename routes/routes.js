
import Home from "./../com/Home.vue";
import Home2 from "./../com/Home2.vue";
import Kind from "./../com/Kind.vue";
import User from "./../com/User.vue";
import Share from "./../com/Share.vue";
import MainFooter from "./../com/MainFooter.vue";

import Detail from "./../com/Detail.vue";
import Login from "./../com/Login.vue";
import DetailFooter from "./../com/DetailFooter.vue";
import Order from "./../com/Order.vue";
import Cart from "./../com/Cart.vue";
import City from "./../com/City.vue";
import List from "./../com/List.vue";
import SearchList from "./../com/SearchList.vue";
import Address from "./../com/Address.vue";
import CouPon from "./../com/CouPon.vue";
const routes = [
	{path:"/",redirect:"/kind"},
	{path:"/home",components:{
	  	default:Home,
	  	footer:MainFooter
	    }},
	{path:"/kind",components:{
	  	default:Kind,
	  	footer:MainFooter
	    }},
	{path:"/user",components:{
	  	default:User,
	  	footer:MainFooter
	    }},
	{path:"/user/address",component:Address},
	{path:"/user/coupon",component:CouPon},
	{path:"/share",components:{
	  	default:Share,
	  	footer:MainFooter
	    }},
	{path:"/detail/:goodsID",name:"detail",components:{
		default:Detail,
		footer:DetailFooter
	}},
	
	{path:"/login",name:"login",component:Login},
	{path:"/order",name:"order",component:Order},
	{path:"/cart",name:"cart",component:Cart},
	{path:"/city",name:"city",component:City},
	{path:"/home2",name:"home2",components:{
		default:Home2,
		footer:MainFooter
	}},
	{path:"/home2/:index",name:"home2",components:{
		default:Home2,
		footer:MainFooter
	}},
	{path:"/list/",name:"list",component:List},
	{path:"/list/:sortID",name:"list",component:List},
	{path:"/searchlist/:keyword",name:"searchlist",component:SearchList},
	{path:"/searchlist/:keyword",name:"searchlist",component:SearchList},
		
	
	
	
	
];


export default routes;