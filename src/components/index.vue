<template>
  <div>
    <div class="top">
      <div class="userInfo" v-if="this.userInfo!=null" @click="toProfile()">
        <!-- <i class="el-icon-message-solid" style="font-size: 30px" @click="promptMessage(this.userInfo.uid)"></i> -->
        <span class="space"></span>
        <span>{{this.userInfo.unickname}}</span>
        <span class="space"></span>
        <img :src="this.userInfo.uavatar" />
      </div>
      <!-- <div v-else>
        <el-button type="primary" @click="toLogin">登录</el-button>
      </div>-->
    </div>

    <div>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">好友</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="toSaveFriend">好友添加</el-menu-item>
            <el-menu-item @click="toAgreeRequest">好友请求</el-menu-item>
            <el-menu-item
              @click="toChat(value.uid)"
              v-for="(value,key,index) in friends"
              :key="key"
            >{{value.unickname}}</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group> -->
          <!-- <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>-->
        </el-submenu>
        <el-menu-item index="2" @click="toDynamic">
          <i class="el-icon-menu"></i>
          <span slot="title">动态</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toPublish">
          <i class="el-icon-document"></i>
          <span slot="title">发布</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="toLogin">注销</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="container">
      <!-- <dynamics></dynamics> -->
    </div>
  </div>
</template>

<script>
import service from "../../utils/request";
import cookie from "js-cookie";
import dynamics from "@/components/tabbar/allDynamic";
const Base64 = require("js-base64").Base64;
export default {
  name: "index",
  data() {
    return {
      websock: null,
      messages: [],
      redata: {},
      input: "",
      friendId: "",

      isCollapse: true,
      token: "",
      userInfo: {
        uid: "",
        uavatar: "",
        utel: "",
        unickname: "",
      },
      friends: [],
    };
  },
  components: {
    dynamics,
  },
  created() {
    this.showInfo();
    this.allFriends();
    //this.initWebSocket();
  },

  destroyed() {
    //this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    // promptMessage(uid) {

    // },

    allFriends() {
      service
        .get("/baseservice/simplefriends/allFriends/" + this.userInfo.uid)
        .then((response) => {
          this.friends = response.data.data.friends;
          // console.log(this.friends);
        });
    },
    toChat(friendid) {
      //  this.$store.commit('getWebsock',this.websock)
      this.$router.push({ path: "/chat/" + friendid });
      //  location.reload();
    },

    toAgreeRequest() {
      this.$router.push("/agreeRequest");
    },
    toProfile() {
      this.$router.push("/profile");
    },
    toSaveFriend() {
      this.$router.push("/select");
    },
    toPublish() {
      this.$router.push("/publish");
    },
    toDynamic() {
      this.$router.push("/dynamic");
      // console.log(this.$route);
      // console.log(this.$router);
    },
    showInfo() {
      var userStr = cookie.get("userInfo");
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
      }
    },
    toLogin() {
      cookie.remove("userInfo");
      // console.log(cookie.get("userInfo"));
      window.location.href = "/";
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  
};
</script>
<style scoped>
.top {
  position: relative;
  height: 80px;
  line-height: 80px;
  top: -70px;
  float: right;
  padding: 10px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.userInfo {
  position: relative;
}
.userInfo > img {
  position: relative;
  top: 20px;
  margin: 0 10px;
  width: 50px;
  height: 50px;
  /* border: 1px solid red; */
  border-radius: 50%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  position: fixed;
  width: 80px;
}
.space {
  padding-right: 10px;
}
</style>