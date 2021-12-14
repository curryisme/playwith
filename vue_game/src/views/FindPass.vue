<template>
  <div class="recharge">
    <cpNav />
    <bjImage>
      <img src="../assets/img/public/3.jpeg" alt />
    </bjImage>
    <div class="container">
      <div class="title">找回密码</div>
      <div class="row flex align-items">
        <div class="name">手机号：</div>
        <input type="text" class="phone" maxlength="11" v-model="phone" placeholder="请输入手机号" />
      </div>
      <div class="row flex align-items">
        <div class="name">手机验证码：</div>
        <input type="text" class="code" v-model="code" placeholder="请输入手机验证码" />
        <div class="btn btnclick unselect" @click="send">{{word}}</div>
      </div>
      <div class="row flex align-items">
        <div class="name">设置新密码：</div>
        <input type="text" class="passw" v-model="passw1" placeholder="请设置新密码" />
      </div>
      <div class="row flex align-items">
        <div class="name">确认密码：</div>
        <input type="text" class="passw" v-model="passw2" placeholder="请确认密码" />
      </div>

      <div class="btn-sure unselect btnclick" @click="sure">确认修改</div>
    </div>

    <quickBtn />
    <foot />
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import foot from "../components/foot";
import { validateMobilePhone, validateMessageCode } from "../common/util/tools";
import { forgotPwd } from "../common/api/user";
import { smsCode } from "../common/api/common";
import { mapMutations, mapGetters, mapActions } from "vuex";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot, bjImage },
  name: "findpass",
  data() {
    return {
      phone: "",
      passw1: "",
      passw2: "",
      code: "",
      word: "获取验证码",
      sendTimer: null,
      time: 60,
      sendMsgDisabled: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setLoginFlag: "user/SET_LOGIN_FLAG",
    }),
    async sure() {
      if (!validateMobilePhone(this.phone)) {
        this.$Message.warning("请正确填写手机号码");
        return;
      }
      if (this.code == "" || !validateMessageCode(this.code)) {
        this.$Message.warning("请正确填写手机验证码");
        return;
      }
      if (this.passw2.length < 6) {
        this.$Message.warning("密码长度必须大于6");
        return;
      }
      if (this.passw1 != this.passw2) {
        // this.passw1 = "";
        // this.passw2 = "";
        this.$Message.warning("密码不一致");
        return;
      }
      if (!this.CheckPassWord(this.passw1)) {
        this.$Message.warning("请设置6-20位至少两种字符组合密码");
        return;
      }
      try {
        let res = await forgotPwd({
          phone: this.phone,
          code: this.code,
          pwd: this.passw2,
        });
        if (res.resultCode == "0000") {
          this.$Message.success("修改成功");
          this.$router.openPage("/");
          this.setLoginFlag(true);
        }
      } catch (error) {}
    },
    async send() {
      if (!validateMobilePhone(this.phone)) {
        this.$Message.warning("请正确填写手机号码");
        return;
      }
      if (this.sendMsgDisabled) {
        return false;
      }
      let data = {
        phone: this.phone,
        type: 5,
      };
      try {
        this.sendMsgDisabled = true;
        let res = await smsCode(data);
        if (res.resultCode == "9999") {
          this.word = "获取验证码";
          clearInterval(this.sendTimer);
          this.time = 60;
          this.sendMsgDisabled = false;
        } else {
          this.sendTimer = setInterval(() => {
            this.sendMsgDisabled = true;
            this.time--;
            this.word = this.time;
            if (this.time <= 0) {
              this.sendMsgDisabled = false;
              clearInterval(this.sendTimer);
              this.word = "获取验证码";
              this.time = 60;
            }
          }, 1000);
        }
        this.$Message.warning(res.message);
      } catch (err) {
        console.log(err);
      }
    },
    CheckPassWord(password) {
      //必须为字母加数字且长度不小于20位
      var str = password;
      if (str == "" || str.length > 20) {
        return false;
      }
      var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
      if (!reg1.test(str)) {
        return false;
      }
      var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
      if (reg.test(str)) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    passw1(val) {
      this.passw1 = val.slice(0, 20);
    },
    passw2(val) {
      this.passw2 = val.slice(0, 20);
    },
  },
};
</script>
<style lang='scss' scoped>
.recharge {
  position: relative;
  width: 100%;
  .container {
    position: relative;
    width: 1200px;
    height: 568px;
    background: rgba(255, 255, 255, 1);
    margin: 70px auto 0;
    padding: 90px 70px 0;
    z-index: 8;
    .title {
      width: 100%;
      height: 36px;
      font-size: 16px;
      padding-left: 22px;
      color: rgba(51, 51, 51, 1);
      line-height: 36px;
      border-bottom: 1px solid #dbdbdb;
      margin-bottom: 40px;
    }
    .row {
      padding-left: 22px;
      margin-bottom: 20px;
      .name {
        width: 85px;
        font-size: 14px;
        text-align: right;
        // padding-right: 15px;
        color: #666666;
      }
      .phone,
      .passw {
        width: 246px;
        height: 31px;
        line-height: 31px;
        padding: 0 20px;
        border-radius: 6px;
        border: 1px solid rgba(216, 216, 216, 1);
        font-size: 14px;
        color: #333;
      }
      input::placeholder {
        color: #999999;
      }
      .code {
        width: 160px;
        height: 31px;
        line-height: 31px;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        padding: 0 20px;
        border: 1px solid rgba(216, 216, 216, 1);
      }
      .btn {
        cursor: pointer;
        width: 80px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        font-size: 14px;
        color: rgba(255, 152, 0, 1);
        border-radius: 6px;
        margin-left: 5px;
        border: 1px solid rgba(255, 152, 0, 1);
      }
    }
    .btn-sure {
      cursor: pointer;
      width: 231px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      margin-top: 30px;
      margin-left: 80px;
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(
        180deg,
        rgba(240, 182, 52, 1) 0%,
        rgba(254, 146, 1, 1) 100%
      );
      border-radius: 25px;
    }
  }
}
</style>