<template>
  <div>
    <div class="agreeRequest">
      <div class="showNoAgreeFriend" v-for="friend in this.friendInfo">
        <div class="show1">
          <img :src="friend.uavatar" alt />
          <div class="info">
            <div>ID:{{friend.uid}}</div>
            <span>昵称:{{friend.unickname}}</span>
          </div>
        </div>
        <div class="show2">
          <el-button
            @click="AgreeFriend(userInfo.uid,friend.uid)"
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-button @click="disAgreeFriend(userInfo.uid,friend.uid)" type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "../../../utils/request";
import cookie from "js-cookie";
export default {
  name: "agreeRequest",
  data() {
    return {
      friendInfo: [],
      userInfo: {},
    };
  },
  created() {
    this.showInfo();
    this.getNoAgreeUserInfo();
  },
  methods: {
    AgreeFriend(uid, friendId) {
      service
        .post("/baseservice/simplefriends/AgreeFriend", {
          uid,
          friendId,
        })
        .then((res) => {
          // this.$router.push("/agreeRequest");
          
          // location.reload()
          this.$router.go(0)
          this.$message.success("添加成功");
        })
        .catch((error) => {
          this.$message.success("添加失败");
        });
    },
    disAgreeFriend(uid, friendId) {
      service
        .post("/baseservice/simplefriends/disAgreeFriend", {
          uid,
          friendId,
        })
        .then((res) => {
          // this.$router.push("/agreeRequest");
          this.$message.success("拒绝成功");
          location.reload()
        })
        .catch((error) => {
          this.$message.error("拒绝失败")
        });
    },
    getNoAgreeUserInfo() {
      service
        .get("/baseservice/simplefriends//selectNoAgree/" + this.userInfo.uid)
        .then((res) => {
          this.friendInfo = res.data.data.friends;
        })
        .catch((error) => {});
    },
    showInfo() {
      var userStr = cookie.get("userInfo");
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
      }
    },
  },
};
</script>
<style scoped>
.agreeRequest {
  width: 800px;
  margin: 0 auto;
}

.showNoAgreeFriend {
  width: 500px;
  height: 70px;
  border: 1px solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  margin: 0 auto;
  margin-bottom: 10px;
}
.showNoAgreeFriend img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 10px;
}
/* .show1 span {
  font-size: 30px;
  margin-bottom: 20px;
  margin-left: 10px;
  
} */
.info {
  display: inline-block;
  font-size: 20px;
  margin-left: 20px;
}
.show1 i {
}
.show1 {
  float: left;
}
.show2 {
  float: right;
  margin-top: 18px;
}
</style>