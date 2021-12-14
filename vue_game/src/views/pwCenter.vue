<template>
  <div class="detail">
    <cpNav />
    <bjImage>
      <img src="../assets/img/public/3.jpeg" alt />
    </bjImage>

    <div class="container clearfix">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户资料" name="ModifyUserInfo"></el-tab-pane>
        <el-tab-pane label="主玩游戏" name="zhuwanganme"></el-tab-pane>
        <el-tab-pane label="添加报单" name="addbaodan"></el-tab-pane>
      </el-tabs>
    </div>
    <quickBtn />
    <foot />
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import foot from "../components/foot";
import { mapGetters, mapMutations } from "vuex";
import {
  getUserById,
  updateUserInfo,
  sendCodeByEmail,
  updateEmail,
} from "../common/api/user";
import axios from "axios";
import { config } from "../common/config";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot, bjImage },
  name: "modifyUserInfo",
  data() {
    return {
      activeName: "pwCenter",
      userImg: "",
      userName: "",
      userSex: "",
      birthDate: "",
      date: "",
      info: "",
      headImg: "",
      flag: false,
      userIntro: "",
      userEmail: "",
      userTel: "",
      userAudio: "",
      userServer: "",
      userVoice: "",
      codeflag: false,
      form: {
        userEmail: "",
        userCode: "",
      },
      dialogFormVisible: false,
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userData", "userInfo"]),
  },
  created() {},
  mounted() {
    this.gotUserInfo();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/SET_USER_INFO",
    }),
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    bindemail() {
      this.form.userEmail = this.userEmail;
      this.dialogFormVisible = true;
    },
    async sendEmail() {
      if (this.codeflag) return;
      if (this.form.userEmail === "") {
        this.$Message.warning("请输入邮箱");
        return;
      }
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      ); //正则表达式
      if (!reg.test(this.form.userEmail)) {
        //正则验证不通过，格式不对
        this.$Message.warning("邮箱格式不正确，请检查！");
        return;
      }
      let res = await sendCodeByEmail({
        email: this.form.userEmail,
        Id: this.userData.Id,
      });
      if (res.success) {
        this.$Message.warning("发送成功！");
        this.codeflag = true;
      } else {
        this.$Message.warning(res.data);
      }
    },
    uploadVoice(event) {
      let file = event.target.files[0];
      let that = this;
      if (file.size / 1024 > 5024) {
        this.$Message.error("请选择小于5M的音频");
        return;
      }
      if (file) {
        this.flag = true;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.toupload(file).then((res) => {
            if (res.success) {
              this.userAudio = res.data;
              // this.gotUserInfo();
            }
            this.flag = false;
          });
          this.$forceUpdate();
        };
      }
    },
    uploadFile(event) {
      let file = event.target.files[0];
      let that = this;
      if (file.size / 1024 > 5024) {
        this.$Message.error("请选择小于5M的图片");
        return;
      }
      if (file) {
        this.flag = true;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.userImg = reader.result;
          this.toupload(file).then((res) => {
            if (res.success) {
              this.userImg = res.data;
            }
            this.flag = false;
          });
          this.$forceUpdate();
        };
      }
    },
    toupload(file, name) {
      let data = new FormData();
      data.append("file", file);
      let das = "";
      let configs = {
        //添加请求头
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      return axios.post("napi/upload", data, configs);
    },
    async emailContrim() {
      if (this.form.userEmail === "") {
        this.$Message.warning("请输入邮箱");
        return;
      }
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      ); //正则表达式
      if (!reg.test(this.form.userEmail)) {
        //正则验证不通过，格式不对
        this.$Message.warning("邮箱格式不正确，请检查！");
        return;
      }
      if (this.form.userCode === "") {
        this.$Message.warning("请输入验证码");
        return;
      }
      let data = {
        userEmail: this.form.userEmail,
        userCode: this.form.userCode,
        Id: this.userData.Id,
      };
      let res = await updateEmail(data);
      if (res.success) {
        this.userEmail = this.form.userEmail;
        this.$Message.warning("修改成功！");
      } else {
        this.$Message.warning(res.data);
      }
      console.log(res);
    },
    async gotUserInfo() {
      if (!this.userData) return;
      try {
        let res = await getUserById({
          userId: this.userData.Id || "",
        });
        if (res.success) {
          this.info = res.data;
          this.setUserInfo(res.data);
          this.userImg = res.data.userImg;
          this.userName = res.data.userName;
          this.userEmail = res.data.userEmail;
          this.userSex = res.data.userSex || "";
          this.userIntro = res.data.userIntro;
          this.userTel = res.data.userTel;
          this.userAudio = res.data.userAudio;
          this.userServer = res.data.userServer;
          this.userVoice = res.data.userVoice;
          this.date = res.data.userBrith
            ? new Date(res.data.userBrith.split(" ")[0])
            : "";
          if (res.data.userBrith) {
            this.slectYear(res.data.userBrith);
          }
        }
      } catch (error) {}
    },
    async toAuth() {
      if (this.flag) {
        this.$Message.warning("图片正在上传，请稍等");
        return;
      }
      if (this.userName === "") {
        this.$Message.warning("请输入账号名称");
        return;
      }
      if (this.userTel === "") {
        this.$Message.warning("请输入手机号");
        return;
      }
      if (this.userImg === "" || this.userImg === null) {
        this.$Message.warning("请上传头像");
        return;
      }
      if (this.userSex === "") {
        this.$Message.warning("请选择性别");
        return;
      }
      if (this.date === "") {
        this.$Message.warning("请选择出生日期");
        return;
      }
      if (this.userIntro === "") {
        this.$Message.warning("请输入个性签名");
        return;
      }
      if (this.userData.userType == 1) {
        if (this.userServer === "") {
          this.$Message.warning("请输入服务范围");
          return;
        }
        if (this.userVoice === "") {
          this.$Message.warning("请输入声音特点");
          return;
        }
        if (this.userAudio === "") {
          this.$Message.warning("请上传声音音频");
          return;
        }
      }
      try {
        let userdata = {
          userSex: this.userSex,
          birthDate: this.date,
          userImg: this.userImg,
          userIntro: this.userIntro,
          userName: this.userName,
          userTel: this.userTel,
          userServer: this.userServer,
          userVoice: this.userVoice,
          userAudio: this.userAudio,
          Id: this.userData.Id,
        };
        let res = await updateUserInfo(userdata);
        if (res.success) {
          this.$Message.success("提交成功");
        }
        return;
      } catch (error) {}
    },
    slectYear(e) {
      let time = new Date(e);
      let m =
        time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1);
      let d = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();

      this.birthDate = `${time.getFullYear()}-${m}-${d}`;
    },
    handleClick(tab, event) {
      this.$router.push(tab.name);
      console.log(tab, event);
    },
  },
  watch: {
    userIntro(val) {
      this.userIntro = val.slice(0, 50);
    },
  },
};
</script>
<style lang='scss' scoped>
.btn-wrap {
  cursor: pointer;
  position: relative;
  width: 101px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 152, 0, 1);
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid rgba(250, 157, 17, 1);
  .filepath {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 201px;
    height: 38px;
    z-index: 9;
    opacity: 0;
  }
}
.detail {
  position: relative;
  width: 100%;
  .container {
    position: relative;
    width: 1200px;
    min-height: 670px;
    margin: 50px auto 0;
    padding: 87px 80px;
    background-color: #fff;
    z-index: 9;

    .user-base-info {
      position: relative;
      padding-bottom: 40px;
      padding-left: 23px;
      margin-bottom: 30px;
      border-bottom: 1px solid #dbdbdb;
      .head {
        position: relative;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        margin-right: 20px;
        z-index: 0;
      }
      .temp {
        position: absolute;
        top: 0;
        width: 66px;
        height: 66px;
        line-height: 66px;
        border-radius: 50%;
        text-align: center;
        z-index: 9;
        font-size: 30px;
        background-color: rgba(153, 153, 153, 0.5);
        .shak {
          animation: show 1s infinite linear;
        }
        @keyframes show {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }

      .upload-wrap {
        position: relative;
        p {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
        }
      }
      .text {
        cursor: pointer;
        position: relative;
        z-index: 0;
      }
      .btn-wrap {
        cursor: pointer;
        position: relative;
        width: 101px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: rgba(255, 152, 0, 1);
        border-radius: 6px;
        margin-bottom: 10px;
        border: 1px solid rgba(250, 157, 17, 1);
        .filepath {
          cursor: pointer;
          position: absolute;
          left: 0;
          top: 0;
          width: 101px;
          height: 38px;
          z-index: 9;
          opacity: 0;
        }
      }
    }
    .row {
      margin-bottom: 20px;
      padding-left: 23px;
      .star {
        margin-right: 10px;
      }
      .name {
        width: 74px;
        margin-right: 20px;
        .mr {
          margin-right: 4px;
        }
      }
      .nikename {
        width: 332px;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        border-radius: 6px;
        border: 1px solid rgba(216, 216, 216, 1);
        font-size: 14px;
      }
      .textarea {
        width: 332px;
        resize: none;
        padding: 10px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        border: 1px solid #d8d8d8;
        font-size: 14px;
      }
    }
    .btn {
      width: 333px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      margin: 140px auto 0;
      background: linear-gradient(
        180deg,
        rgba(240, 182, 52, 1) 0%,
        rgba(254, 146, 1, 1) 100%
      );
      border-radius: 25px;
    }
  }
}
.fl {
  float: left;
}
.lr {
  float: right;
}
</style>