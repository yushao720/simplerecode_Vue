<template>
  <div>
    <div class="body" v-for="(value, index) in dynamics">
      <div class="one">
        <!-- <textarea name="" id="" cols="30" rows="10">{{value.dynamicContent}}</textarea> -->
        <div class="header">
          <img :src="value.uavatar" alt />
          <span class="name">{{ value.unickname }}</span>
          <div class="icon" v-if="path != '/profile'">
            <i
              class="el-icon-star-off"
              title="点赞"
              v-if="!value.isLike"
              @click="change(value.dynamicId, value.likenum, index)"
            ></i>
            <i v-else class="el-icon-star-on"
            title="你已点赞"></i>
            <i>{{ value.likenum }}</i>
            <i title="转发" @click="forword()" class="el-icon-position"></i>
            <i>{{ value.forwardnum }}</i>
          </div>
        </div>
        <article @click="toDynamic(value.dynamicId)" class="content" style="text-align:left" v-html="value.dynamicContent"></article>
        <div class="footer">
          <el-input
            placeholder="暂未开启评论功能"
            v-model="comment"
            :disabled="true"
          ></el-input>
          <!-- <div>
            <i v-if="active" class="el-icon-star-off"></i>
            <i v-else class="el-icon-star-on"></i>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cookie from "js-cookie";
import service from "../../../utils/request";
export default {
  name: "dynamic",
  data() {
    return {
      dynamicLiked:{},
      user_id: {
        uid: "",
        uavatar: "",
        unickname: "",
        dynamicId: 0,
      },
      userInfo: {},
      comment: "",
      current: -1,
      path: "",
    };
  },
  props: {
    dynamics: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  created() {
    this.showInfo();
  },
  methods: {
    getUser_id(value) {
      this.user_id.uid = this.userInfo.uid;
      this.user_id.uavatar = this.userInfo.uavatar;
      this.user_id.unickname = this.userInfo.unickname;
      this.user_id.dynamicId = value;
    },
    showInfo() {
      this.path = this.$route.path;
      var userStr = cookie.get("userInfo");
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
      }
    },
    async change(id, likenum, index) {
      this.getUser_id(id);
      this.current = index;
      //axios-get请求
      this.$http
        .get(
          "/baseservice/simpledynamicliked/clickLike/" +
            this.userInfo.uid +
            "/" +
            this.user_id.dynamicId
        )
        .then((res) => {
          console.log("成功");
          this.dynamicLiked = res.data.data.like;
          console.log(this.dynamicLiked);
          location.reload();
        }) 
        .catch((err) => {
          this.$message.error("点赞失败");
        });
    },
    forword() {
      //转发方法
      console.log(this.dynamics);
    },
    toDynamic(id) {
      this.$router.push({ path: "/dynamic/" + id });
      location.reload()
    }
  },
};
</script>
<style scoped>
.body {
  width: 800px;
  margin: 0 auto;
}
.one {
  width: 800px;
  /* height: 400px; */
  height: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.header {
  height: 80px;
}
.header > img {
  /* position: relative; */
  /* top: 20px;
  margin: 0 10px; */
  float: left;
  width: 50px;
  height: 50px;
  /* border: 1px solid; */
  border-radius: 50%;
  margin: 10px;
}
.name {
  font-size: 20px;
  margin-top: 22px;
  margin-left: 10px;
  float: left;
}
.icon {
  font-size: 30px;
  float: right;
  margin: 15px;
}
.content {
  overflow: hidden;
  width: 600px;
  /* height: 250px; */
  height: auto; 
  margin: 0 auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: pre-line;
  min-height: 250px;
  max-height: 500px;
}
.footer {
  width: 600px;
  /* float: left; */
  margin-left: 100px;
  margin-top: 15px;
  padding-bottom: 15px;
  /* margin-top: 350px; */
}
.staroff {
  src: url("../../img/dianzan.png");
}
</style>