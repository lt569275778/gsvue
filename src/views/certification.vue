<template>
    <div id="certification" class="cert_div">
        <iframe :src="productUrl" class="cert_iframe" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>
    </div>
</template>

<script>
	import qs from 'qs'
	
	export default {
	  name: 'certification',
	  data () {
	    return {
            customerId:this.$route.query.customerId,
            channelId: this.$route.query.channelId,
            identificationNumber:this.$route.query.identificationNumber,
            mobile:this.$route.query.mobile,
            name:this.$route.query.name,
            certificationId:this.$route.query.certificationId,
            productUrl:this.$route.query.productUrl
        }
	  },
	  mounted(){
     	this.loadIframe();
     	window.addEventListener('message',function(e){
			var mes = e.data;
			if(e.source!=window.parent){
				var param = qs.stringify({
					serialNo:mes.serial_no,
					verifyStatus:'3',
	                customerId : this.customerId,
					channelId : this.channelId,
					certificationId:this.certificationId,
					mobile:this.mobile,
					identificationNumber:this.identificationNumber,
					realName:this.name
	            });
	            this.$axios.post(this.$api.saveUserApply, param).then(res => {});
				if(mes.crawling_status =="login" || mes.crawling_status =="done" ){
					//this.$router.replace("/paysuccess");
					this.$router.push({path:'/paysuccess'});
				}
			}
		}.bind(this),false);
      },
      methods: {
      	loadIframe(){
      	}
      }
	}
</script>

<style scoped="scoped">
.cert_div{width: 100%;height: 100%;position: fixed;}
.cert_iframe{width: 100%;height: 100%;}
</style>