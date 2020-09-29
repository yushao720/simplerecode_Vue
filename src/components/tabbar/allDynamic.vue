<template>
  <div>
    <dynamic :dynamics="Dynamics.detail">
        
    </dynamic>
  </div>
</template>
<script>
import dynamic from "@/components/tabbar/dynamic";
import cookie from "js-cookie";
import service from "../../../utils/request";
export default {
  name: "allDynamic",
  data() {
    return {
      userInfo: {},
      Dynamics: [],
    };
  },
  components: {
    dynamic,
  },
  created() {
    this.showInfo();
    this.getDynamic();
  },
  methods: {
    
    showInfo() {
      var userStr = cookie.get("userInfo");
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
      }
    },
    getDynamic() {
      service
        .get(
          "/baseservice/simple-dynamic-details/findFriendsDetails/"+this.userInfo.uid)
        .then((response) => {
          this.Dynamics = response.data.data
          console.log(this.Dynamics);
          
        })
        .catch((error) => {
          // console.log(error);
        });


    },
    // getIsLike() {
    //   service
    //     .post("/baseservice/simpledynamicliked/check", this.user_id)
    //     .then((res) => {
    //       this.active = false;
    //       this.dynamicLiked = res.data.data.like
    //       window.location.href = "/dynamic";
    //     })
    //     .catch((error) => {
    //       this.$message.error("点赞失败");
    //       console.log(this.userInfo.uid);
    //     });
    // }
  },
};
</script>