import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "../store"
import {
  Button,
  Message,
} from 'element-ui';
import Chat from 'jwchat';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import store from './store'

// 安装 ElementUI（ui）
Vue.use(ElementUI)
/* 在 0.2.041 之前的版本需要引入 css */
// import 'jwchat/lib/JwChat.css';
Vue.use(Chat)
Vue.use(mavonEditor)
Vue.use(Button);
Vue.prototype.$message = Message;

axios.defaults.baseURL = "http://localhost:8080/";
//将axios这个对象添加到Vue的原型对象中，在使用的时候就只需要使用this.对象名就可以了
Vue.prototype.$http = axios
let Base64 = require('js-base64').Base64
Vue.config.productionTip = false
// Vue.prototype.$qs = qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  Base64
})
