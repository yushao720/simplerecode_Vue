<template>
  <div>
  <el-button type="primary" @click="toLogin">主要按钮</el-button>
  </div>
</template>

<script>
import ElementUi from "element-ui"

export default {
  name: "helloworld",
  data () {
   return {}
  },
   methods:{
     toLogin() {
       window.location.href="/login"
     }
   }
}

</script>