<template>
  <div class="setInfo">
    <div class="flex align-items">
      <img :src="info.userImg" class="head" v-if="info.userImg" />
      <img src="../assets/img/loginu.png" class="head" v-else />
      <div class="info">
        <div class="info-box">
          <div class="nike-name flex align-items">
            <span v-if="info.userName">用户名：{{ info.userName }}</span>
            <!-- <img src="../assets/img/icon-editor.png" class="icon" /> -->
          </div>
          <p class="num">北美陪玩ID:{{ userData.Id || "" }}</p>
          <div class="get-money flex" v-if="info.userEmail">
            <span>我的邮箱: {{ info.userEmail || "暂无" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="base-info-wrap">
      <div class="title-wrap flex align-items">
        <span class="title">基础信息</span>
        <i class="line"></i>
        <div
          class="editor unselect flex align-items"
          @click="$router.openPage('/modifyUserInfo')"
          v-if="info.userType == 1 || info.userType == 3"
        >
          <img src="../assets/img/icon-editor.png" class="icon" />
          <span>编辑信息</span>
        </div>
      </div>
      <p class="pl age">
        出生:
        <span v-if="info && info.userBrith">{{ info.userBrith }}</span>
      </p>
      <div class="pl clearfix">
        <div class="fl gender">
          性别:
          <span v-if="info && info.userSex">{{
            info.userSex == 1 ? "男" : "女"
          }}</span>
        </div>
      </div>
      <div class="pl clearfix" style="margin-top: 20px">
        <div class="fl gender">
          个性签名:
          <span class="signature" v-if="info && info.userIntro">{{
            info.userIntro
          }}</span>
          <span class="signature" v-else>你还没编辑个性签名</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bindPhone from "./bindPhone";
import modifyPass from "./modifyPass";
import { mapGetters, mapMutations } from "vuex";
import { getUserById } from "../common/api/user";

export default {
  components: { bindPhone, modifyPass },
  name: "setInfo",
  data() {
    return {
      step: 1,
      phone: "",
      code: "",
      show: false, //修改手机号码
      showPss: false, //修改密码
      showGet: false, //提现
      showInfo: false,
      word: "获取验证码",
      sendTimer: null,
      time: 60,
      sendMsgDisabled: false,
      info: "",
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  created() {},
  mounted() {
    this.gotUserInfo();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/SET_USER_INFO",
    }),
    async gotUserInfo() {
      if (!this.userData) return;
      console.log(this.userData);
      try {
        let res = await getUserById({
          userId: this.userData.Id || "",
        });
        if (res.success) {
          this.info = res.data;
          this.setUserInfo(res.data);
        } else {
          this.$router.push("/login");
        }
      } catch (error) {}
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.step = 1;
      }
    },
    showPss(val) {},
  },
};
</script>
<style lang='scss' scoped>
.setInfo {
  position: relative;
  width: 994px;
  height: auto;
  padding: 40px;
  padding-right: 0;
  overflow: hidden;
  .head {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    margin-right: 30px;
  }
  .info {
    width: 100%;
    height: 92px;
    display: table;
    .info-box {
      width: 60%;
      display: table-cell;
      vertical-align: middle;
    }
    .nike-name {
      cursor: pointer;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      .icon {
        width: 12px;
        height: 12px;
        margin-left: 8px;
      }
    }
    .num {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      margin-top: 10px;
    }
    .get-money {
      margin-top: 10px;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      .btn {
        cursor: pointer;
        width: 70px;
        height: 21px;
        line-height: 21px;
        text-align: center;
        background: linear-gradient(
          180deg,
          rgba(241, 181, 50, 1) 0%,
          rgba(254, 148, 3, 1) 100%
        );
        border-radius: 6px;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        margin-left: 10px;
      }
    }
  }
  .base-info-wrap {
    margin-top: 50px;
    padding: 40px 0;
    .title-wrap {
      height: 21px;
      width: 100%;
      margin-bottom: 40px;
      .title {
        width: 80px;
        display: table-cell;
        vertical-align: middle;
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
      }
      .line {
        display: inline-block;
        width: 624px;
        height: 2px;
        background-color: #e0e0e0;
      }

      .editor {
        cursor: pointer;
        display: inline-block;
        padding-left: 20px;
        .icon {
          width: 12px;
          height: 12px;
          margin-right: 10px;
        }
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
      }
    }
    .age {
      margin-bottom: 20px;
    }
    .gender {
      width: 50%;
    }
    .genders {
      width: 50%;
      .signature {
        color: #333333;
      }
    }
    .pl {
      padding-left: 20px;
    }
  }
  .set {
    margin-top: 0 !important;
    padding-top: 0 !important;
    .line {
      width: 92% !important;
      margin: 0 !important;
    }

    .set-about {
      .item {
        position: relative;
        width: 50%;
        height: 50px;
        padding-left: 80px;
        padding-right: 100px;
        display: table;
        .img {
          position: absolute;
          right: 100px;
          top: 50%;
          margin-top: -14px;
          width: 83px;
          height: 27px;
          cursor: pointer;
        }
        .info {
          display: table-cell;
          vertical-align: middle;
          .name {
            font-size: 16px;
            color: rgba(102, 102, 102, 1);
          }
          .sub {
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            .red {
              color: #ff7f7f;
            }
          }
        }
      }
      .pbone {
        background: url("../assets/img/icon-phone 2.png") 20px center no-repeat;
        background-size: 41px 50px;
      }
      .passw {
        background: url("../assets/img/icon-lock-2.png") 20px center no-repeat;
        background-size: 41px 50px;
      }
    }
  }
  .move {
    transform: translateX(100%);
  }

  .setpass {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 994px;
    min-height: 626px;
    background-color: #fff;
    padding: 40px;
    transition: transform 0.5s ease;
    .md-title {
      cursor: pointer;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
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