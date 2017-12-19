<template>
<div class="dialog">
    <span class="iimg"></span>
    <div style="border:5px solid #f3f3f3;"></div>
    <div class="loginPage">
       <!-- <el-form>
                <el-input type="text" id="user" v-model="formName.user" placeholder="信用卡所在账单邮箱"></el-input>
                <el-input type="password" id="password" v-model="formName.password" placeholder="请输入密码"></el-input>
          <p>{{formName.passwordError}}</p>       
            <el-button type="primary" @click="submitForm('formName')"  id="done">安全登录</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form>     -->    
        <div style="width:100%">
<span>账单邮箱</span>
<input type="text"  placeholder="信用卡所在账单邮箱" @blur="inputBlur('user',formName.user)" v-model="formName.user" id="user" class="email">
        </div>
  <span>邮箱密码</span>
  <input type="text"  placeholder="请输入密码" @blur="inputBlur('password',formName.password)" v-model="formName.password" id="password" class="pw">
 <div class="padd">
    <el-button type="primary" @click="submitForm('formName')" id="done" v-bind:disabled="formName.beDisabled">安全登录</el-button> 
       </div> 
    </div> 
   
</div>

</template>
<style scoped>
.padd {
  width: 100%;
  background-color: #f3f3f3;
  height: 425px;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.bt {
  height: 100%;
  background-color: #f3f3f3;
}
.iimg {
  display: block;
  width: 151px;
  height: 139px;
  background: url("../../static/hometitle.png") no-repeat center center;
  margin: 0 auto;
}
.email {
  width: 314px;
  height: 50px;
  border: none;
  background-color: #fff;
  border-bottom: 1px solid #f3f3f3;
  padding-left: 15px;
  box-sizing: border-box;
}
.pw {
  width: 314px;
  height: 50px;
  border: none;
  background-color: #fff;
  padding-left: 15px;
  box-sizing: border-box;
}

#done {
  width: 300px;
  height: 44px;
  color: #fff;
  background-color: #508cee;
  border-radius: 10px;
  margin-top: 50px;
  border: none;
}
/* .loginPage {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -175px;
  width: 350px;
  min-height: 300px;
  padding: 30px 20px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #fff;
 } 
/* .loginPage p{
        color: red;
        text-align: left;
    } */
</style>
<script>
import Axios from "axios";
export default {
  name: "home",
  data() {
    return {
      formName: {
        //表单中的参数
        user: "",
        userError: "",
        password: "",
        passwordError: "",
        beDisabled: true
      },
      beShow: false //传值给父组件
    };
  },
  /*props:[
                'fromParent'
        ],*/
  methods: {
    resetForm: function() {
      this.formName.user = "";
      this.formName.userError = "";
      this.formName.password = "";
      this.formName.passwordError = "";
    },
    submitForm: function(formName) {
      //与父组件通信传值
      //this.$emit('showState', [this.beShow,this.formName.user])
      //提交user password
      var user = this.formName.user,
        password = this.formName.password;
      console.log(user, password);
      // Axios.get('../../src/php/login.php?user='+user+'&password='+password)
      //      .then(function(res){
      //         console.log(res)

      //      })
      //      .catch(function(){

      //      })
    },
    inputBlur: function(errorItem, inputContent) {
      if (errorItem === "user") {
        if (inputContent === "") {
          // this.formName.userError = "用户名不能为空";
          alert("用户名不能为空")
        } else {
          this.formName.userError = "";
        }
      } else if (errorItem === "password") {
        if (inputContent === "") {
          // this.formName.passwordError = "密码不能为空";
          alert("密码不能为空")
        } else {
          this.formName.passwordError = "";
        }
      }
      //     //对于按钮的状态进行修改
      if (this.formName.user != "" && this.formName.password != "") {
        this.formName.beDisabled = false;
      } else {
        this.formName.beDisabled = true;
      }
    }
  }
};
</script>