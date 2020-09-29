<template>
  <div>
    <div class="user">
      <div class="profile">
        <el-col :span="10">
          <el-card shadow="hover">ID:{{userInfo.uid}}</el-card>
          <el-card shadow="hover">昵称:{{userInfo.unickname}}</el-card>
        </el-col>

        <el-col :span="10">
          <el-card shadow="hover">电话:{{userInfo.utel}}</el-card>
          <el-card shadow="hover">创建时间:{{userInfo.createtime}}</el-card>
        </el-col>
      </div>
      <div class="details">
        <dynamic :dynamics="details"></dynamic>
      </div>
    </div>
  </div>
</template>
<script>
import dynamic from "@/components/tabbar/dynamic";
import cookie from "js-cookie";
import service from "../../../utils/request";
export default {
  name: "profile",
  data() {
    return {
      userInfo: {},
      details: [],
    };
  },
  components: {
      dynamic
  },
  created() {
    this.showInfo();
    this.showDetails();
  },
  methods: {
    showInfo() {
      var userStr = cookie.get("userInfo");
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
      }
      console.log(this.userInfo);
    },
    showDetails() {
      service
        .get(
          "/baseservice/simple-dynamic-details/loginUserInfoDetail/" +
            this.userInfo.uid
        )
        .then((res) => {
          this.details = res.data.data.details;
          console.log(this.details);
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scoped>
.user {
  width: 1000px;
  margin: 0 auto;
}
 .profile > * {
     margin-left: 90px;
  /* margin-top: 130px; */
  /* margin-left: 60px; */
  width: 370px;
  /* height: 400px; */
  height: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 40px;
  

}

.details {
    padding-top: 220px;
    /* margin-top: 200px; */
}
</style>