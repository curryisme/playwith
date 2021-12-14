<template>
  <div class="pos">
    <div class="nav clearfix">
      <div class="page-title fl unselect" @click="$router.openPage('/')">
        北美陪玩
      </div>
      <ul class="lf-list fl clearfix unselect">
        <li
          class="item quick"
          :class="{ active: pathName == 'Index' }"
          @click="$router.openPage('/')"
        >
          速配厅
        </li>
        <li
          class="item"
          :class="{ active: pathName == 'PlayHall' }"
          @click="$router.openPage('/playHall')"
        >
          陪玩厅
        </li>
      </ul>
      <div class="lf clearfix">
        <!-- <div class="input-wrap fl clearfix flex align-items">
          <input
            type="password"
            name="password"
            class=""
            style="position: fixed; left: -9999px; opacity: 0"
          />
          <input
            type="text"
            class="search fl"
            placeholder="陪玩昵称 ID "
            v-model="name"
            @keyup.enter="search"
            autocomplete="off"
          />
          <img
            src="../assets/img/public/icon-search.png"
            class="icon-search fl"
            @click="search"
          />
        </div> -->
        <div class="center-wrap fr clearfix" v-if="userData">
          <img
            :src="userData.userImg"
            class="head fl"
            @mouseenter="emterUserInfo"
            @mouseleave="leaveUserInfo"
            v-if="userData.userImg"
          />
          <img
            src="../assets/img/public/icon-main2.png"
            class="head fl"
            v-else
            @mouseenter="emterUserInfo"
            @mouseleave="leaveUserInfo"
          />
          <div
            class="name fl one-text"
            @mouseenter="emterUserInfo"
            @mouseleave="leaveUserInfo"
            @click="tomine"
          >
            <span v-if="userData.userName">{{ userData.userName }}</span>
          </div>
          <span class="login-out unslect" @click="loginOut">注销</span>
        </div>
        <div class="center-wrap fr clearfix" v-else>
          <img src="../assets/img/public/icon-main2.png" class="head fl" />
          <span class="login-out unslect" @click="gologin(true)">登录</span>
        </div>

        <div
          class="user-info-wrap animated"
          @mouseenter="emterUserInfo"
          @mouseleave="leaveUserInfo"
          :class="[showUserInfo ? 'fadeIn' : 'fadeOut']"
          v-if="showUserInfo"
        >
          <div class="user-info clearfix">
            <img src="../assets/img/public/icon-main2.png" class="head fl" />
            <div class="info">
              <p class="name" @click="tomine">
                <span v-if="userData.userName">{{ userData.userName }}</span>
              </p>
              <p class="id">性别:{{ userData.userSex == 1 ? "男" : "女" }}</p>
            </div>
          </div>
          <div
            class="quick-btn-wrap clearfix unselect"
            style="margin-left: 16px; width: 100%"
          >
            <div class="btn-wrap mr fl" @click="tomine">
              <img src="../assets/img/icon-zl.png" class="icon1" />
              <span style="margin-left: 14px">资料</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {},
  name: "cpNav",
  data() {
    return {
      pathName: "",
      showUserInfo: false,
      time: null,
      name: "",
    };
  },
  computed: {
    ...mapGetters(["userData", "balance", "userInfo"]),
  },
  created() {},
  mounted() {
    this.pathName = this.$route.name;
    if (sessionStorage.getItem("_search")) {
      this.name = sessionStorage.getItem("_search");
    }
  },
  methods: {
    ...mapMutations({
      setLoginFlag: "user/SET_LOGIN_FLAG",
      setUserData: "user/SET_USER_DATA",
    }),
    gologin() {
      this.$router.push("/login");
    },
    tomine() {
      this.$router.openPage("/mine");
    },
    leaveUserInfo() {
      this.time = setTimeout(() => {
        this.showUserInfo = false;
      }, 1000);
    },
    emterUserInfo() {
      this.showUserInfo = true;
      clearTimeout(this.time);
    },
    toOrder() {
      if (this.userData) {
        this.$router.openPage("/orderList");
      } else {
        this.setLoginFlag(true);
      }
    },
    showMes() {
      this.$Message.warning("敬请期待");
    },
    loginOut() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定退出登录？</p>",
        onOk: () => {
          this.cookies.remove("userData");
          localStorage.removeItem("pwUserData");
          this.setUserData("");
          this.$router.openPage("/login");
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        },
      });
    },
    search() {
      if (this.$route.name == "PlayHall") {
        this.$emit("search", this.name);
      } else {
        this.$router.openPage("/playHall");
        sessionStorage.setItem("_search", this.name);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.pos {
  position: relative;
  height: 94px;
  width: 100%;
  z-index: 10;
  .user-info-wrap {
    position: absolute;
    right: 30px;
    top: 94px;
    width: 208px;
    // min-height: 165px;
    min-height: 100px;
    background: rgba(255, 255, 255, 1);
  }
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-width: 1200px;
  width: 100%;
  height: 94px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.2);
  .page-title {
    cursor: pointer;
    height: 94px;
    line-height: 94px;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    margin-left: 50px;
  }
  .lf-list {
    width: 600px;
    height: 94px;
    line-height: 94px;
    margin-left: 104px;
    // margin-left: 9%;

    .item {
      cursor: pointer;
      display: inline-block;
      font-size: 16px;
      color: rgba(255, 255, 255, 1);
      margin-right: 102px;
    }
    .quick {
      margin-right: 84px;
    }
    .item:last-child {
      margin-right: 0 !important;
    }
    .active {
      color: #fd9707;
    }
    .item:hover {
      color: #fd9707;
    }
  }
  .isLogin:hover {
    + .user-info-wrap {
      display: block;
    }
  }
  .lf {
    position: absolute;
    right: 0;
    top: 0;
    height: 94px;
    padding-top: 33px;
    margin-right: 50px;
    .user-info-wrap {
      padding: 10px 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      .user-info {
        width: 100%;
        height: 30px;
        .head {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 20px;
          margin-left: 17px;
        }
        .info {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
          .name {
            cursor: pointer;
          }
        }
      }
      .quick-btn-wrap {
        margin-top: 10px;

        .mr {
          // margin-right: 20px;
        }
        .btn-wrap {
          width: 50%;
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          height: 19px;
          line-height: 19px;
          cursor: pointer;
          text-align: center;
          margin-bottom: 10px;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          .icon1 {
            width: 23px;
            height: 19px;
            vertical-align: middle;
            margin-right: 10px;
          }
          .icon2 {
            vertical-align: middle;
            width: 16px;
            height: 19px;
            margin-right: 10px;
          }
        }
      }
      .level-wrap {
        font-size: 8px;
        text-align: center;
        color: rgba(153, 153, 153, 1);
        .hint {
          margin-bottom: 10px;
        }
        .slider-wrap {
          .start {
            margin-left: 3px;
          }
          .end {
            margin-right: 1px;
          }
        }
        .progress {
          position: relative;
          width: 162px;
          height: 4px;
          margin: auto;
          background: rgba(242, 242, 242, 1);
          margin-bottom: 3px;
          .bar {
            position: absolute;
            left: 0;
            top: 0;
            height: 4px;
            background-color: #ff7777;
          }
          span {
            font-size: 8px;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
      .deposit-wrap {
        margin-top: 5px;
        line-height: 17px;
        text-align: center;
        .money {
          width: 88px;
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
        }
        i {
          display: inline-block;
          vertical-align: middle;
          width: 2px;
          height: 14px;
          background-color: #979797;
          opacity: 0.5;
        }
        .btn {
          cursor: pointer;
          width: 47px;
          height: 17px;
          line-height: 17px;
          text-align: center;
          font-size: 12px;
          margin-left: 15px;
          color: rgba(255, 255, 255, 1);
          background: linear-gradient(
            180deg,
            rgba(240, 182, 52, 1) 0%,
            rgba(254, 146, 1, 1) 100%
          );
          border-radius: 5px;
        }
      }
    }
  }
  .input-wrap {
    width: 140px;
    height: 28px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    // padding-top: 6px;
    padding-left: 12px;
    .search {
      width: 75%;
      display: inline-block;
      font-size: 12px;
      color: #333;
      border: 0;
    }
    .search::placeholder {
      color: rgba(153, 153, 153, 1);
    }
    .icon-search {
      cursor: pointer;
      display: inline-block;
      width: 17px;
      height: 16px;
      margin-right: 12px;
    }
  }
  .center-wrap {
    position: relative;
    width: 175px;
    height: 30px;
    z-index: 2;
    margin-left: 47px;
    .head {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 13px;
    }
    .name {
      cursor: pointer;
      width: 80px;
      font-size: 16px;
      font-weight: 500;
      line-height: 30px;
      color: rgba(255, 255, 255, 1);
    }
    .login-out {
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      line-height: 30px;
      margin-left: 15px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.lf {
  float: right;
  position: relative;
  z-index: 2;
}
</style>