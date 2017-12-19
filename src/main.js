// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import api from './api/api-config'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible/flexible.js'
axios.defaults.withCredentials = true
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api

// router.beforeEach((to,from,next)=>{
// 	  var storage=window.sessionStorage;
// 	  if(storage.token!=null && (to.query.token==null || to.query.token==storage.token)){
// 	  	  next();
// 	  }else{
//         if(to.path=='/page403'){
//         	 next();
//         }else{
// 			  	      var token = to.query.token!=null?to.query.token:' ';
// 			  	  	  axios.post(api.checkToken, token).then(res => {
// 					  	  	  storage.clear();
// 					  	  	  var data = res.data;
// 					  	  	  if(data.code=='1'){
// 					  	  	  	  storage.setItem("token",token);
// 					  	  	  	  storage.setItem("channelId",data.data.id);
// 					  	  	  	  next();
// 					  	  	  }else{
// 					  	  	  	  next({
// 								  	  	 	 path:'/page403',
// 								  	  	 	 query:{message:'没有权限'}
// 								  	  	});
// 					  	  	  }
// 			  	      });
			  	  
//         }
// 	  }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
