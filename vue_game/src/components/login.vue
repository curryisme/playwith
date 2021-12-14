<template>
  <div class="Index">
    <cpNav class="top-nav" />
    <bjImage>
      <img src="../assets/img/public/3.jpeg" alt />
    </bjImage>
    <div style="display: flex; justify-content: center">
      <div class="content clearfix" style="width: 500px">
        <ul class="tab unselect">
          <li
            class="item login"
            :class="{ active: type == 1 }"
            @click="changeType(1)"
          >
            登录
          </li>
          <li class="line"></li>
          <li
            class="item registered"
            :class="{ active: type == 2 }"
            @click="changeType(2)"
          >
            注册
          </li>
        </ul>
        <div class="changeType unselect">
          <p v-if="type == 1">
            <span v-if="loginType == 1" @click="changeLoginType(2)"
              >账号密码登录</span
            >
          </p>
        </div>
        <div class="input-wrap clearfix">
          <img src="../assets/img/icon-phone.png" class="icon icon1" />
          <input
            type="text"
            placeholder="请输入账号"
            class="phone input"
            maxlength="11"
            v-model="phone"
          />
        </div>
        <div class="input-wrap clearfix" v-if="type == 1 && loginType == 2">
          <img src="../assets/img/icon-code.png" class="icon icon2" />
          <input
            type="password"
            placeholder="请输入密码"
            class="passw input"
            v-model="password"
          />
        </div>
        <div class="input-wrap clearfix" v-if="type == 2">
          <img src="../assets/img/icon-lock.png" class="icon icon2" />
          <input
            type="password"
            placeholder="请设置至少6位密码"
            class="passw input"
            v-model="userPwd"
          />
        </div>
        <div class="input-wrap clearfix" v-if="type == 2">
          <img
            src="../assets/img/icon-code.png"
            style="
              width: 21px;
              height: 19px;
              margin-left: -5px;
              margin-right: 16px;
            "
            class="icon icon3"
          />
          <input
            type="textarea"
            placeholder="请设置一段简短介绍"
            class="passw input"
            v-model="userIntro"
          />
        </div>
        <div class="input-wrap clearfix" v-if="type == 2">
          <el-date-picker
            v-model="userBrith"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div class="input-wrap clearfix" v-if="type == 2">
          <img
            src="../assets/img/icon-phone.png"
            style="height: 19px; margin-left: 27px; margin-right: 16px"
            class="icon icon3"
          />
          <el-select
            v-model="userSex"
            placeholder="请选择性别"
            style="width: 263px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              class="passw input"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="input-wrap clearfix" v-if="type == 2">
          <img
            src="../assets/img/icon-phone.png"
            style="height: 19px; margin-left: 27px; margin-right: 16px"
            class="icon icon3"
          />
          <el-select
            v-model="userType"
            placeholder="请选择身份"
            style="width: 263px"
          >
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              class="passw input"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="hint clearfix unselect" v-if="type == 1">
          <!-- <Checkbox v-model="saveInfo" class="fl">记住我</Checkbox>
          <span class="lr find" @click="findpass">忘记密码</span> -->
        </div>
        <div class="hint read unselect" v-if="type == 2">
          <Checkbox v-model="single" style="color: #fff">阅读并同意</Checkbox>
        </div>
        <!-- <div class="btn-login unselect btnclick" @click="login">
                <span v-if="type==2">立即注册</span>
                <span v-else>立即登录</span>
      </div>-->
        <Button class="btn-login unselect" @click="login" :loading="loading">
          <span v-if="type == 2">立即注册</span>
          <span v-else>立即登录</span>
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import { validateMobilePhone, validateMessageCode } from "../common/util/tools";
import { login, smsCode } from "../common/api/common";
import { register } from "../common/api/user";
import { mapMutations, mapGetters, mapActions } from "vuex";
import { getUserInfo } from "../common/api/user";
import Foot from "./foot.vue";
import bjImage from "../components/bjImage";
import cpNav from "../components/cp-nav";

export default {
  components: { cpNav, Foot, bjImage },
  name: "login",
  data() {
    return {
      type: 1, //1登录2注册
      loginType: 2, // 2密码登录 1短信登录
      phone: "",
      password: "",
      code: "",
      single: false, //阅读协议
      saveInfo: true, //用户信息保存更长  有点奇怪的设定
      word: "获取验证码",
      sendTimer: null,
      time: 60,
      sendMsgDisabled: false,
      loading: false,
      userBrith: "",
      userIntro: "",
      options: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 2,
          label: "女",
        },
      ],
      typeoptions: [
        {
          value: 1,
          label: "陪玩",
        },
        {
          value: 2,
          label: "老板",
        },
      ],
      userSex: "",
      userType: 2,
      userPwd: "",
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions({
      getBalance: "user/getBalance",
    }),
    ...mapMutations({
      setLoginFlag: "user/SET_LOGIN_FLAG",
      setUserData: "user/SET_USER_DATA",
      setUserInfo: "user/SET_USER_INFO",
      toggleIsLogin: "imInfo/toggleIsLogin",
      startComputeCurrent: "user/startComputeCurrent",
    }),
    changeType(num) {
      this.type = num;
      this.password = "";
      this.code = "";
      this.word = "获取验证码";
      this.wordsendTimer = null;
      this.wordtime = 60;
      this.wordsendMsgDisabled = false;
      this.single = false;
      this.saveInfo = false;
    },
    findpass() {
      this.setLoginFlag(false);
      this.$router.openPage("/findpass");
    },
    changeLoginType(num) {
      this.loginType = num;
    },
    sure() {
      this.setLoginFlag(false);
    },
    cancel() {
      this.setLoginFlag(false);
    },
    async login() {
      if (this.type == 2) {
        let data = {
          userName: this.phone,
          userPwd: this.userPwd,
          userIntro: this.userIntro,
          userSex: this.userSex,
          userBrith: this.userBrith,
          userType: this.userType,
        };
        console.log(data);
        if (this.phone == "") {
          this.$Message.warning("请输入账号");
          return;
        }
        if (this.userPwd.length < 6) {
          this.$Message.warning("密码长度必须大于6");
          return;
        }
        if (this.userIntro == "") {
          this.$Message.warning("请输入您的自我介绍");
          return;
        }
        if (this.userSex == "") {
          this.$Message.warning("请选择性别");
          return;
        }
        if (this.userBrith == "" || this.userBrith == null) {
          this.$Message.warning("请选择出生日期");
          return;
        }

        if (!this.single) {
          this.$Message.warning("请仔细阅读用户协议");
          return;
        }

        try {
          this.loading = true;
          let res = await register(data);
          console.log(res);
          if (res.success) {
            this.$Message.success("注册成功");
          } else {
            this.$Message.warning(res.data);
          }
          this.loading = false;
        } catch (error) {
          this.loading = false;
        }
      } else {
        if (this.phone == "") {
          this.$Message.warning("请正确填写账号码");
          return;
        }
        if (this.password.length < 6) {
          this.$Message.warning("请输入至少六位密码");
          return;
        }
        let data = {
          account: this.phone, //用户账号（账号）
          type: "b", //登录类型 a 手机验证登录 b 账号密码登录
          code: this.code,
          password: this.password,
        };
        console.log(data);

        if (this.loginType == 1) {
          data.type = "a";
        } else {
          data.type = "b";
        }

        try {
          this.loading = true;
          let res = await login(data);
          if (res.success) {
            localStorage.setItem("pwUserData", JSON.stringify(res.data[0]));
            this.isLoginDo(res);
          } else {
            this.$Message.warning(res.data);
          }
          this.loading = false;
        } catch (error) {}
      }
    },
    isLoginDo(res) {
      // this.imLogin(res.data);
      this.$Message.success("登录成功！");
      this.cookies.set("userData", res.data[0], {
        expires: this.saveInfo ? 30 : 1,
      });
      this.setUserData(res.data[0]);
      this.sure();
      setTimeout(() => {
        this.$router.openPage("/");
      }, 300);
    },
    async send() {
      if (!validateMobilePhone(this.phone)) {
        this.$Message.warning("请正确填写账号码");
        return;
      }
      if (this.sendMsgDisabled) {
        return false;
      }
      let data = {
        phone: this.phone,
        type: 2, //2 登录确认验证码 4 用户注册验证码
      };
      if (this.type == 2) {
        data.type = 4;
      } else {
        data.type = 2;
      }
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
    async gotUserInfo(userId) {
      try {
        let res = await getUserInfo({
          userId: userId || "",
        });
        if (res.resultCode == "0000") {
          this.setUserInfo(res.data);
        }
      } catch (error) {}
    },
  },
};
</script>
<style lang='scss' scoped>
/deep/ .el-input__inner {
  color: #fff;
}
/deep/ .el-input__icon {
  margin-left: 22px;
  font-size: 19px;
}
/deep/ .el-icon-date:before {
  color: #c7c0c0;
}

/deep/ .el-input__inner {
  background: none;
  border: none;
}
/deep/ .el-input--suffix .el-input__inner {
  padding-left: 7px;
}
/deep/ .el-input--prefix .el-input__inner {
  padding-left: 65px;
  color: #fff;
}
#bg {
  z-index: -111;
}
.Index {
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 96px;
  overflow-y: auto;
}
.content {
  padding: 25px 33px;
  min-height: 350px;
  text-align: center;
  .tab {
    font-size: 18px;
    color: #fff;
    line-height: 24px;
    .item {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      width: 75px;
      height: 24px;
    }
    .line {
      display: inline-block;
      vertical-align: middle;
      width: 2px;
      height: 24px;
      background: #979797;
      opacity: 0.5;
    }
    .active {
      font-size: 18px;
      color: #fff;
    }
    .login {
      text-align: left;
    }
    .registered {
      text-align: right;
    }
  }
  .code {
    width: 60%;
  }
  .changeType {
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 14px;
    color: fff;
    span {
      cursor: pointer;
    }
  }
  .input-wrap {
    width: 332px;
    height: 42px;
    line-height: 41px;
    border-radius: 6px;
    margin: 0 auto 20px;
    border: 1px solid rgba(216, 216, 216, 1);
    .clear {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      width: 15px;
      height: 16px;
      // padding: 4px;
    }
    .input {
      display: inline-block;
      vertical-align: middle;
      height: 20px;
      line-height: 20px;
      border: 0;
      font-size: 14px;
      color: #fff;
      background: none;
    }
    .input::placeholder {
      color: #fff;
    }
    .icon {
      display: inline-block;
      vertical-align: middle;
      margin-left: 20px;
    }
    .icon1 {
      width: 17px;
      height: 22px;
      margin-right: 20px;
      margin-left: 0;
    }
    .icon2 {
      width: 21px;
      height: 19px;
      margin-left: -5px;
      margin-right: 16px;
    }
    .phone,
    .passw {
      width: 70%;
    }
  }
  .mes-wrap {
    border: 0;
    .mes-box {
      width: 226px;
      height: 42px;
      line-height: 41px;
      border-radius: 6px;
      border: 1px solid rgba(216, 216, 216, 1);
      .icon3 {
        width: 21px;
        height: 19px;
        margin-left: 20px;
        margin-right: 16px;
      }
    }
    .btn {
      cursor: pointer;
      width: 98px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border-radius: 6px;
      border: 1px solid rgba(250, 157, 17, 1);
      font-size: 14px;
      color: rgba(255, 152, 0, 1);
    }
    .btn:hover {
      box-shadow: 0 0 5px rgba(250, 157, 17, 0.5);
    }
    .btn:active {
      box-shadow: 0 0 5px rgba(250, 157, 17, 0.5) inset;
    }
  }
  .hint {
    color: #d8d8d8;
    /deep/ .ivu-checkbox-checked /deep/ .ivu-checkbox-inner {
      border-color: #ff9800;
      background-color: #ff9800;
    }
    /deep/ .ivu-checkbox {
      margin-top: -1px;
    }
    .find {
      cursor: pointer;
    }
  }
  .read {
    color: #333;
  }
  .btn-login {
    width: 333px;
    height: 42px;
    line-height: 42px;
    cursor: pointer;
    margin-top: 30px;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(240, 182, 52, 1) 0%,
      rgba(254, 146, 1, 1) 100%
    );
    border-radius: 21px;
    color: #fff;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
  }
}
/deep/ .ivu-modal-header,
/deep/ .ivu-modal-footer {
  height: 0;
  padding: 0;
  border: 0;
}
/deep/ .ivu-modal-body {
  padding: 0;
}
.fl {
  float: left;
}
.lr {
  float: right;
}
.mb {
  margin-bottom: 21px;
}
</style>
<style lang='scss' scoped>
.foot {
  position: relative;
  width: 1200px;
  margin: auto;
  text-align: center;
  padding-bottom: 30px;
  color: rgba(255, 255, 255, 1);
  z-index: 9;
  .intor {
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
    margin-top: 24px;
  }
}
</style>