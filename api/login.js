
const Base64 = require('js-base64').Base64

export default {
  initWebSocket() { //初始化weosocket
    const jsonuser = JSON.stringify(this.userInfo);
    const wsuri = "ws://115.29.202.70:8080/WebSocketLink/" + Base64.encode(jsonuser);
    this.websock = new WebSocket(wsuri);
    this.websock.onmessage = this.websocketonmessage;
    this.websock.onopen = this.websocketonopen;
    this.websock.onerror = this.websocketonerror;
    this.websock.onclose = this.websocketclose;
  }

}