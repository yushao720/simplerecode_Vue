<template>
  <div class="chat1">
    <JwChat-index
      :taleList="messages"
      :config="config"
      scrollType="scroll"
      @enter="websocketsend"
      v-model="input"
      :toolConfig="tool"
    ></JwChat-index>
  </div>
  <!-- <div class="allchat">
    <div class="chat" ref="allchat">
      <div v-for="item in this.messages">
        <div v-if="!(item.senderUId!=friendId && item.senderUId!=userInfo.uid)">
          <span>{{item.senderUId}}:</span>
          <span>{{item.message}}</span>
        </div> 
      </div>
    </div>
    <div class="sendMessage">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button
        class="btnsend"
        type="success"
        icon="el-icon-check"
        circle
        @click="websocketsend()"
      ></el-button>
    </div>
  </div>-->
</template>

<script>
import cookie from "js-cookie";
import service from "../../../utils/request";
import login from "../../../api/login";
const Base64 = require("js-base64").Base64;
export default {
  name: "chat",
  data() {
    return {
      websock: null,
      messages: [],
      redata: {},
      userInfo: {},
      input: "",
      friendId: "",
      lastOne: "",
      friend: {},
      config: {
        img: "",
        name: "",
        // dept: "",//名字下方显示，到时候可以显示签名
        // historyConfig: { tip: "查看更多",callback: this.bindLoadHistory },
      },
      tool: {
        show: ["file", "history", "img"],
        callback: this.toolEvent,
        showEmoji: true,
      },
    };
  },
  created() {
    this.showInfo();
    // this.websock = this.$store.state.websock;
    // console.log("chat ........   ", this.websock);
    this.initWebSocket();
  },
  mounted() {},
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const jsonuser = JSON.stringify(this.userInfo);
      const wsuri =
        "ws://localhost:8080/WebSocketLink/" + Base64.encode(jsonuser);
      // const wsuri = "ws://115.29.202.70:8123/WebSocketLink/" + Base64.encode(jsonuser);
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      console.log("onopen");
    },
    websocketonerror() {
      //连接建立失败重连
      console.log("onerror");
      // this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      this.redata = JSON.parse(e.data);
      console.log(this.redata);
      this.redata.mine = false;
      this.messages.push(this.redata);

      console.log(this.messages);
    },
    websocketsend() {
      const inp = this.input;
      const na = this.userInfo.unickname;
      if (inp == this.lastOne) {
        this.$message.warning("你刚刚已经输入过此语句");
        return;
      }
      if (!inp) {
        this.$message.warning("输入消息再发送，你个傻逼");
        return;
      }
      //数据发送
      var msg = {
        senderUId: this.userInfo.uid,
        toUId: this.friendId,
        // message: this.input,
        date: "", //此处使用时间
        text: { text: inp },
        mine: true,
        name: this.userInfo.unickname,
        img: this.userInfo.uavatar,
      };
      this.lastOne = inp;
      this.messages.push(msg);
      // this.input = "";
      // msg.mine = false;
      this.websock.send(JSON.stringify(msg));
      // this.$refs.allchat.scrollTop = this.$refs.allchat.scrollHeight;
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接");
    },
    showInfo() {
      var userStr = cookie.get("userInfo");
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
      }
      this.friendId = this.$route.params.id;
      //通过friendId查询信息
      service
        .post("/baseservice/simpleuserinfo/all/" + this.friendId, {})
        .then((res) => {
          this.friend = res.data.data.userinfo;
          console.log(this.friend);
          this.config.img = this.friend.uavatar;
          this.config.name = this.friend.unickname;
        });
      this.showMessages(this.userInfo.uid, this.friendId);
    },
    showMessages(uid, friendId) {
      service
        .post("/baseservice/simple-message/selectAllMessage", { uid, friendId })
        .then((res) => {
          const mes = res.data.data.messages;
          // console.log(mes);
          mes.forEach((item, i) => {
            // console.log(mes[i]);
            if (item.messageFromuid == this.userInfo.uid) {
              var message1 = {
                senderUId: item.messageFromuid,
                toUId: item.messageTouid,
                date: item.messageTime,
                text: { text: item.messageContent },
                mine: true,
                name: this.userInfo.unickname,
                img: this.userInfo.uavatar,
              };
              // console.log(message1);
            } else {
              var message1 = {
                senderUId: item.messageFromuid,
                toUId: item.messageTouid,
                date: item.messageTime,
                text: { text: item.messageContent },
                mine: false,
                name: this.friend.unickname,
                img: this.friend.uavatar,
              };
              // console.log(message1);
            }

            this.messages.push(message1);
          });
        })
        .catch((error) => {
          this.$message.error("读取消息失败");
        });
    },
    toolEvent(type, content) {
      const h = this.$createElement;

      this.$notify({
        title: "提示",
        message: h(
          "i",
          { style: "color: teal" },
          "上传文件和图片功能暂未开启，敬请期待"
        ),
      });
    },
    bindLoadHistory() {},
  },
  watch: {
    $route(to, from) {
      console.log(to.params.id);
      location.reload();
    },
  },
};
</script>
<style scoped>
.chat1 {
  width: 100%;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat {
  width: 800px;
  height: 800px;
  border: red solid 1px;
  max-height: 600px;
  overflow: auto;
  position: relative;
  padding-bottom: 80px;
}
.sendMessage {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.btnsend {
  position: absolute;
  right: 0;
  top: 0;
}
.allchat {
  position: relative;
  width: 800px;
  margin: 0 auto;
}
</style>