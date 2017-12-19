<template>
     <div id="paysuccess">
     	<div class="pay">
     		<img src="/static/pay_success_img.png" class="pay_img" />
     	</div>
	    <p class="pay_p1">认证完成</p>
	    <p class="pay_p2">认证完成，你可以继续进行认证哦！</p>
	    <a @click="goBack()" class="pay_btn">继续认证</a>

  	</div>
</template>

<script>
  import qs from 'qs'
  
  export default {
	name: 'paysuccess',
	methods: {
      	goBack(){
      		var len =(window.history.length-window.sessionStorage.pageLength)*(-1);
      		window.history.go(len);
      	}
   }
  }
</script>

<style>
*{margin: 0;padding: 0; list-style:none; border:0px}
html{height: 100%;}
body{font-family:"微软雅黑","黑体",Arial, Helvetica, sans-serif;font-size:14px;-webkit-overflow-scrolling:touch;overflow-scrolling:touch; background:#f3f3f3;}
a{color: #606060;text-decoration: none;}
a:hover{text-decoration: none;}
img{border:none 0;}
.pay{width:80px; height:80px; margin:55px auto 25px auto;}
.pay_img{width:80px; height:80px; border-radius:80px;}
.pay_success{width:22px; height:22px;}
.pay_p1{color:#000000; font-size:16px;font-family:"微软雅黑";}
.pay_p2{color:#7f7f7f; font-size:14px;font-family:"微软雅黑"; margin:20px 0 30px 0;}
.pay_btn{display: inline-block;width: 90%;height: 40px;line-height: 40px;text-align: center;border-radius: 5px;background: #6ac3f6;margin-top: 25px;color: #fff;font-family:"微软雅黑";}
</style>