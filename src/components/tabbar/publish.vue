<template>
  <div class="publish">
    <!-- <div class="publish">
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="dynamicContent"
        maxlength="800"
        show-word-limit
      ></el-input>
      <div style="margin: 20px 0;"></div>
      <el-upload
        class="upload-demo"
        action
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="dynamicImages"
        list-type="picture"
        :disabled="true"
      >
        <el-button plain size="big" type="primary" @click="upload()">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <el-button type="success" @click="saveDetail(dynamicContent,dynamicImages,userInfo)" round>发布</el-button> -->

    <mavon-editor
      :toolbars="toolbars"
      @imgAdd="handleEditorImgAdd"
      @imgDel="handleEditorImgDel"
      style="height: 600px"
      v-model="value"
      @change="change"
      ref="md"
      @save="save"
    ></mavon-editor>
    <!-- 
        toolbars   指定工具栏
        imgAdd  指定图片上传调用的方法，改方法主要讲图片上传后台，并且返回地址
        imgDel  删除图片的方法，该方法主要调用后台删除图片
        change  监听markdown输入，可以实时保存等等
        ref=md   指定一个用来应用markdown的，可以是任意字符串
       -->
  </div>
</template>

<script>
import cookie from "js-cookie";
import service from "../../../utils/request";
export default {
  name: "publish",
  data() {
    return {
      value:"",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        // imagelink: true, // 图片链接
        code: false, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      dynamicContent: "",
      dynamicImages: [],
      userInfo: {},
      detail: {
        dynamicContent: "",
        uid: "",
      },
    };
  },
  created() {
    this.showInfo();
  },
  methods: {
    save(value, render) {
      console.log("this is render" + render);
      console.log("this is value" + value);

      if(render==""||render==null) {
        this.$message.warning("输入为空");
        return ;
      }

      if(value==""||value==null) {
        this.$message.warning("输入为空");
        return ;
      }

      this.detail.dynamicContent = render;
      this.detail.uid = this.userInfo.uid;
      this.detail.uavatar = this.userInfo.uavatar;
      this.detail.unickname = this.userInfo.unickname;
      console.log(this.detail);
      service
        .post("/baseservice/simple-dynamic-details/saveDetail", this.detail)
        .then((res) => {
          console.log("保存动态成功");
          this.$router.push("/dynamic");
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //监听markdown变化
    change(value, render) {
      // this.html = render;
      // this.blogInfo.blogMdContent = value;
      // this.blogInfo.blogContent = render;
    },
    //上传图片接口pos 表示第几个图片
    handleEditorImgAdd(pos, $file) {
      // var formdata = new FormData();
      // formdata.append('file' , $file);
      //  this.$axios
      // .post("http://localhost:8000/blogs/image/upload/", formdata)
      // .then(res => {
      //   var url = res.data.data;
      //    this.$refs.md.$img2Url(pos, url);  //这里就是引用ref = md 然后调用$img2Url方法即可替换地址
      // });
    },
    handleEditorImgDel() {
      // console.log('handleEditorImgDel');    //我这里没做什么操作，后续我要写上接口，从七牛云CDN删除相应的图片
    },
    saveDetail(dynamicContent, dynamicImages, userInfo) {
      // console.log(dynamicContent, dynamicImages);
      this.detail.dynamicContent = dynamicContent;
      dynamicImages.forEach((element) => {
        this.detail.dynamicImages = this.detail.dynamicImages + element;
      });
      this.detail.uid = userInfo.uid;
      this.detail.uavatar = userInfo.uavatar;
      this.detail.unickname = userInfo.unickname;
      console.log(this.detail);
      service
        .post("/baseservice/simple-dynamic-details/saveDetail", this.detail)
        .then((res) => {
          this.$router.push("/dynamic");
        })
        .catch((res) => {});
    },
    showInfo() {
      var userStr = cookie.get("userInfo");
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
      }
      // console.log(this.userInfo);
    },
  },
};
</script>
<style scoped>
.publish {
  width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 30px;
  /* margin-top: 300px; */
}

</style>
