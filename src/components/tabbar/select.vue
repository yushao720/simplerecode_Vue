<template>
  <div>
    <div class="select">
      <div class="selectFriend">
        <el-input style="width:400px" placeholder="请输入好友电话号码" v-model="utel" clearable></el-input>
        <el-button type="success" @click="selectFriend(utel,userInfo.uid)">查询好友</el-button>
        <div class="showFriend" v-show="isSelect">
          <!-- <el-avatar :size="70" :src="this.friendInfo.uavatar"></el-avatar> -->
          <img :src="this.friendInfo.uavatar" alt="">
          <span>{{this.friendInfo.unickname}}</span>
          <i
            v-if="!this.isAdd"
            class="el-icon-circle-plus-outline"
            title="添加"
            @click="addFriend(utel,userInfo.uid)"
          ></i>
          <i v-else title="你已添加他为好友" class="el-icon-circle-check"></i>
        </div>
      </div>
      <div class="selectDynamic"></div>
    </div>
  </div>
</template>
<script>
import service from "../../../utils/request";
import cookie from "js-cookie";
export default {
  name: "component_name",
  data() {
    return {
      squareUrl: "",
      name: "",
      isSelect: false,
      userInfo: {},
      isAdd: false,
      utel: "",
      friendInfo: {}
    };
  },
  created() {
    this.showInfo();
  },
  methods: {
    showInfo() {
      var userStr = cookie.get("userInfo");
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
      }
    },
    selectFriend(utel, uid) {
        console.log(utel,uid);
      service
        .post("/baseservice/simplefriends/check",{utel,uid})
        .then((res) => {
          this.isAdd = res.data.data.isAdd;
          console.log(this.isAdd);
          this.friendInfo = res.data.data.friend
          this.isSelect = true;
        })
        .catch((error) => {
          this.$message.error("查无此人");
        });
    },
    addFriend(utel, uid) {
      service
        .post("/baseservice/simplefriends/saveFriend", { utel, uid })
        .then((res) => {
          this.$message.success("添加成功");
          this.$router.push("/dynamic")
        })
        .catch((error) => {
          this.$message.error("添加失败");
        });
    },
  },
};
</script>
<style scoped>
.select {
  width: 800px;
  margin: 0 auto;
}
.selectFriend {
  width: 600px;
  margin: 0 auto;
  float: left;
}
.showFriend {
  width: 500px;
  margin: 50px auto;
  /* border: 1px solid red; */
  background-color: skyblue;
}
.showFriend > * {
  float: left;
}
.showFriend>img {
  margin: 10px 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.showFriend > span {
  font-size: 30px;
  padding-top: 18px;
  padding-left: 20px;
}
.showFriend > i {
  font-size: 30px;
  padding-top: 18px;
  padding-left: 20px;
  float: right;
}
</style>