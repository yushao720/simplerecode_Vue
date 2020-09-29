<template>
  <div id="box">
    <img
      style="width: 250px; height: 250px"
      src="https://edu-ghost2020.oss-cn-beijing.aliyuncs.com/ayu/logo.png"
      alt
    />
    <el-input v-model="loginUser.utel" placeholder="请输入手机号"></el-input>
    <el-input placeholder="请输入密码" v-model="loginUser.upassword" show-password></el-input>
    <div style="margin-top:20px"></div>
    <el-button type="primary" @click="submitLogin" round>登录</el-button>
    <el-button type="primary" @click="submitRegister" round>注册</el-button>
  </div>
</template>
<style scoped>
#box {
  width: 250px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
<script>
import cookie from "js-cookie";
import axios from "axios";
import service from "../../utils/request";
import router from "../router";

export default {
  name: "login",
  data() {
    return {
      loginUser: {
        utel: "",
        upassword: "",
      },
      userInfo: {},
      message: "",
    };
  },
  methods: {
    //注册的方法
    submitRegister() {
      this.$router.push("/register");
    },
    //登录的方法
    submitLogin() {
      if (this.loginUser.utel == "" && this.loginUser.upassword == "") {
        this.$message.error("请输入值");
      } else {
        service
          .post("/baseservice/simpleuserinfo/userLogin", this.loginUser)
          .then((res) => {
            // console.log(res.data.data.token);
            cookie.set("token", res.data.data.token, {
              domain: "localhost",
              // domain: "115.29.202.70",
            });

            service
              .get("/baseservice/simpleuserinfo/getUserInfo")
              .then((response) => {
                // console.log(response.data.data.userInfo);
                this.userInfo = response.data.data.userInfo;
                cookie.set("userInfo", this.userInfo, { 
                  domain: "localhost" 
                  // domain: "115.29.202.70",
                  });
                this.$router.push("/dynamic");
                
              });

            // service
            //   .get("/baseservice/simpleuserinfo/getUserInfo")
            //   .then((res) => {
            //     this.userInfo = res.data.data.userInfo;
            //     //将用户信息放到cookie中
            //     cookie.set("userInfo", this.userInfo, {
            //       domain: "localhost",
            //     });
            //     this.$message.success("登录成功");
            //     // window.location.href = "/";
            //     // this.$router.push("/")
            //   });
          })
          .catch((err) => {
            // console.log(err.data.message);
            this.$message.error("登录失败");
          });
      }
    },
  },
};
</script>