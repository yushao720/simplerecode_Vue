<template>
  <div id="app">
    <div v-if="$route.path!='/'">
      <div v-if="$route.path!='/index'">
        <div v-if="$route.path!='/register'">
          <index></index>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import index from "./components/index";
import dynamic from "./components/tabbar/allDynamic";
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
    index,
  },
  created() {
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
