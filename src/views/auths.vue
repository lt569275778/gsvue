<template>
     <div id="auths">

	    <div class="auth_title2">
	    	<img src="/static/auths_title_bg.png" class="auth_title_img2" />
	    </div>
	    <ul class="autcon">
	    </ul>

  	</div>
</template>

<script>
  import qs from 'qs'

  export default {
	name: 'auths',
	data() {
        return {
            customerId:this.$route.query.identificationNumber,
            channelId: window.sessionStorage.channelId,
            identificationNumber:this.$route.query.identificationNumber,
            mobile:this.$route.query.mobile,
            name:this.$route.query.name
        }
     },
     mounted(){
     	if(this.identificationNumber==null || this.identificationNumber.trim()==''||this.mobile==null || this.mobile.trim()==''||
				       this.name==null || this.name.trim()==''){
			  	this.$router.push({path:'/page403',query:{message:'参数有空值'}});
		}
     	this.loadData();
     },
     methods: {
     	loadData() {
     		var param = qs.stringify({
	          customerId : this.customerId,
              channelId : this.channelId
		    })
     		this.$axios.post(this.$api.getProducts, param).then(res => {
     			var data = res.data;
     			if(data.code == 200){
     			  var s = "";
					for(var key in data.productInfo){
						s += "<li class='authli'>";
				    	s += "<a class='authli_a' data-url='"+ data.productInfo[key].productUrl + "'data-certificationId='" + data.productInfo[key].productId +"'data-verifyStatus='" + data.productInfo[key].verifyStatus + "'>";
				    	//s += "<img src='"+ this.$api.getImage + data.productInfo[key].img +"' class='auth_img' />";
				    	s += "<img src='"+ data.productInfo[key].img +"' class='auth_img' />";
				    	s += ""+ data.productInfo[key].productName +"";
				    	if(data.productInfo[key].verifyStatus == 1){
				    		s += "<img src='/static/auth_success.png' class='auth_success' />";
				    	}else{
				    		s += "<img src='/static/auth_success2.png' class='auth_success' />";
				    	}
				    	s += "</a>";
				    	s += "</li>";
					}
					s += "<li class='authli0'><a class='authBtn' href='"+ data.channelUrl +"'>返回</a></li>";
					$('.autcon').html(s);
					var _this = this;
					$('.authli_a').click(function (){
						  if($(this).attr('data-verifyStatus')=='3'){
	                	  	  _this.$toast({
	                	  	   	  	message:"正在认证中，请稍后...",
	                	  	   	  	duration:2000
	                	  	  });
	                	  	  return;
	                	  }
						  //判断是否申请过该产品
	                	  var param = qs.stringify({
	                	  	   customerId : _this.customerId,
							             channelId : _this.channelId,
							             certificationId:$(this).attr('data-certificationId'),
							             mobile:_this.mobile,
							             identificationNumber:_this.identificationNumber,
							             realName:_this.name
	                	  });
	                	  _this.$axios.post(_this.$api.saveBrowseLogs, param).then(res => {
	                	  	   var result = res.data.code;
	                	  	   var certificationId = $(this).attr('data-certificationId');
	                	  	   if(result==200){
	                	  	   	    //请求成都爬虫页面
							        var authParam = qs.stringify({
										customerId : _this.customerId,
										channelId : _this.channelId,
										certificationId:certificationId,
										identificationNumber:_this.identificationNumber,
										mobile:_this.mobile,
										realName:_this.name
									});
									_this.$axios.post(_this.$api.getLoginPage, authParam).then(res => {
										if(res.data.code == 200){
											window.location.href="certification?customerId=" + _this.customerId +"&channelId="+ _this.channelId  +"&identificationNumber="+_this.identificationNumber + "&mobile=" + _this.mobile + "&name=" +_this.name + "&certificationId=" + certificationId +"&productUrl="+encodeURIComponent(res.data.url);
											var storage=window.sessionStorage;
											storage.setItem("pageLength",window.history.length); 
									    }
									});
	                	  	   }else{
	                	  	   	  _this.$toast({
	                	  	   	  	message:res.data.message,
	                	  	   	  	duration:2000
	                	  	   	  })
	                	  	   }
	                	  });
					})
     			}
	        });
     	}
    }
  }
</script>

<style>
*{margin: 0;padding: 0; list-style:none; border:0px; font-size:14px; }
html{height: 100%;}
body{font-family:"微软雅黑","黑体",Arial, Helvetica, sans-serif;-webkit-overflow-scrolling:touch;overflow-scrolling:touch; background:#f3f3f3;}
a{color: #606060;text-decoration: none;}
a:hover{text-decoration: none;}
img{border:none 0;}
.auth_title2{width:90%; margin:25px auto 15px auto; border-radius:6px;}
.auth_title_img2{width:100%;}
.autcon{width:90%; margin:15px auto; border-radius:8px; overflow:hidden; }
.authli{width:100%; height:90px; margin-bottom:1px;}
.authli_a{background:#fff; display:inline-block; width:100%; height:90px; line-height:90px; color:#333333;position: relative; cursor:pointer; text-align:left;}
.auth_img{ width:50px; height:50px; border-radius:50px; vertical-align: middle; margin:0 15px 0 25px;}
.auth_success{position:absolute; right:5%;top:50%;width:22px; margin-top:-11px;}
.authBtn{display:inline-block; width:100%; height:40px; line-height:40px; text-align:center; border-radius:5px; background:#6ac3f6; margin-top:25px; color:#fff;}
</style>
