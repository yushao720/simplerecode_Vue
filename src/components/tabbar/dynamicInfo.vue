<template>
  <div class="dynamicInfo">
    <article class="content" v-html="detail.dynamicContent"></article>
  </div>
</template>
<script>
import cookie from "js-cookie";
import service from "../../../utils/request";
export default {
  name: "dynamicInfo",
  data() {
    return {
      detailId: "",
      detail: {},
    };
  },
  created() {
    this.getDetailInfo();
  },
  methods: {
    getDetailInfo() {
      this.detailId = this.$route.params.id;
      service
        .get("/baseservice/simple-dynamic-details/detailInfo/" + this.detailId)
        .then((res) => {
          this.detail = res.data.data.detail;
          console.log("获取ID为" + this.detailId + "的动态信息成功");
        })
        .catch((error) => {
          console.log("获取ID为" + this.detailId + "的动态信息失败");
        });
    },
  },
};
</script>
<style scoped>
.dynamicInfo {
  width: 800px;
  margin: 0 auto;
}
.content {
  border: 0 black solid;
  padding-top: 12%;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: pre-line;
}
</style>