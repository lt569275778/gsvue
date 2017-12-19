<template>
  <div id="auth">
    <ul class="auth_ul">
        <li class="auth_title">
            <img src="/static/auth_title_bg.png" class="auth_title_img" />
                   认证信息越多，您借款的<span class="auth_title_span">额度</span>就<span class="auth_title_span">越高</span>
        </li>
    </ul>
    <ul class="auth_con">
    </ul>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
	name: 'auth',
	data() {
        return {
            customerId: this.$route.query.identificationNumber,
            channelId:window.sessionStorage.channelId,
            identificationNumber:this.$route.query.identificationNumber,
            mobile:this.$route.query.mobile,
            name:this.$route.query.name
        }
     },
     mounted(){
     	if(this.identificationNumber==null || this.identificationNumber.trim()==''||
					  	 this.mobile==null || this.mobile.trim()==''||
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
     				      var length = data.productInfo.length>3 ? length = 3:length = data.productInfo.length;
	                for(var i=0;i<length;i++){
	                    s += "<li class='auth_li'>";
	                    s += "<a class='auth_lia' data-url='"+ data.productInfo[i].productUrl + "'data-certificationId='" + data.productInfo[i].productId +"'data-verifyStatus='" + data.productInfo[i].verifyStatus +"'>";
	                   // s += "<img src='"+ this.$api.getImage + data.productInfo[i].img +"' class='auth_lia_img' />";
	                    s += "<img src='"+ data.productInfo[i].img +"' class='auth_lia_img' />";
	                    s += ""+ data.productInfo[i].productName +"";
	                    if(data.productInfo[i].verifyStatus == 1){
	                        s += "<img src='/static/auth_success.png' class='auth_success' />";
	                    }
	                    s += "</a>";
	                    s += "</li>";
	                }
	                if(data.productInfo.length>3){
		                	s += "<li class='auth_li'>";
			                s += "<a class='auth_lia0'>";
			                s += "<img src='/static/auth_img00.png' class='auth_lia_img' />更多认证";
			                s += "</a>";
			                s += "</li>";
	                }
	                $(".auth_con").html(s);
	                var _this = this;
	                $('.auth_lia').click(function (){
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
	                	  	   	    //请求爬虫页面
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
																	    	   window.location.href="certification?customerId=" + _this.customerId +"&channelId="+ _this.channelId  +"&identificationNumber="+_this.identificationNumber + "&mobile=" + _this.mobile + "&name=" + _this.name + "&certificationId=" + certificationId +"&productUrl="+encodeURIComponent(res.data.url);
																	    	   var storage=window.sessionStorage;
																	    	   storage.setItem("pageLength",window.history.length); 
																	    	}
														    });
	                	  	   }else{
	                	  	   	  _this.$toast({
	                	  	   	  	message:res.data.message,
	                	  	   	  	duration:2000
	                	  	   	  });
	                	  	   }
	                	  });
	                })
	                $(".auth_lia0").click(function(){
	                	  //保存浏览记录
	                	  var param = qs.stringify({
	                	  	   customerId : _this.customerId,
							             channelId : _this.channelId,
							             certificationId:'ALL',
							             mobile:_this.mobile,
							             identificationNumber:_this.identificationNumber,
							             realName:_this.name
	                	  });
	                	  _this.$axios.post(_this.$api.saveBrowseLogs, param).then(res => {});
	                    window.parent.location.href="auths?customerId=" + _this.customerId +"&channelId="+ _this.channelId +"&identificationNumber="+_this.identificationNumber + "&mobile=" + _this.mobile + "&name=" +_this.name;
	                });
     			}
	      });
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
.auth_ul{width:90%; margin:15px auto 0 auto; border-radius:6px 6px 0 0; overflow:hidden;}
.auth_con{width:90%; margin:0px auto 15px auto; border-radius:0 0 6px 6px;overflow:hidden; background: #fff;}
.auth_title{width:90%; padding:0 5%; height:70px; line-height:70px; background:#fff; margin-bottom:1px; color:#333333;}
.auth_title_img{vertical-align: middle; width:50px; margin-right:5px;}
.auth_title_span{color:#ff6f34;}
.auth_li{width:25%; float:left; height:110px;background:#fff; }
.auth_lia{text-align:center; display:inline-block; width:100%; height:100%; color:#666666;position: relative;cursor: pointer;}
.auth_lia0{text-align:center; display:inline-block; width:100%; height:100%; color:#666666;position: relative;cursor: pointer;}
.auth_lia_img{display:block; height:50px; width:50px; border-radius:50px; margin:15px auto 10px auto;}
.auth_success{position: absolute; left:50%;top:10px;width:20px; margin-left:10px;}
</style>
