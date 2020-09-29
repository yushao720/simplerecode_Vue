<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="ID" prop="uid">
        <el-input v-model="ruleForm.uid" minlength="6" maxlength="10" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="utel">
        <el-input v-model="ruleForm.utel"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upassword">
        <el-input type="password" v-model="ruleForm.upassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="unickname">
        <el-input v-model.number="ruleForm.unickname"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input placeholder="暂未开启验证码功能" v-model="ruleForm.code" :disabled="true"></el-input>
      </el-form-item>
      <el-upload
  class="avatar-uploader"
  action="http://localhost:8080/eduoss/fileoss/uploadOssFile"
  :show-file-list="true"
  :auto-upload="true"
  :limit=1
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import service from "../../utils/request";
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.upassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imageUrl:"",
      url:"",
      dynamicImages: [],
      ruleForm: {
        upassword: "",
        checkPass: "",
        unickname: "",
        uid: "",
        utel: "",
        code: "",
        uavatar:"",
      },
      rules: {
        upassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // unickname: [{ validator: checkUnickname, trigger: "blur" }],
      },
    };
  },
  methods: {
    upload() {



      // //当上传图片功能完善时，将点击上传el-button中的plain属性删除

      // const h = this.$createElement;

      // this.$notify({
      //   title: "提示",
      //   message: h(
      //     "i",
      //     { style: "color: teal" },
      //     "上传图片功能暂未开启，敬请期待"
      //   ),
      // });
    },
    submitForm(ruleForm) {
      if (ruleForm.uid == "") {
        this.$message.error("ID为空");
      } else {
        if (ruleForm.unickname=="") {
          this.$message.error("昵称为空");
        } else {
          service
            .post("/baseservice/simpleuserinfo/register", ruleForm)
            .then((res) => {
                this.$message.success("注册成功")
                this.$router.push("/")
            })
            .catch((error) => {
                this.$message.error("注册失败")
            });
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.ruleForm.uavatar = res.data.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
};
</script>
<style scoped>
.register {
  padding-top: 200px;
  width: 400px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>