<template>
	<div style="margin-top: 30px;">
		{{message}}
	</div>
</template>

<script>
	export default {
	   name: 'page403',
	   data() {
         return {
           	message:this.$route.query.message!=null?this.$route.query.message:"没有权限！"
         }
       }
	}
</script>

<style>
</style>