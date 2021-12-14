<template>
  <div>
    <Modal
      :value="showMatch"
      width="593"
      class="matching"
      class-name="vertical-center-modal"
      :closable="false"
      @on-ok="sure"
      @on-cancel="cancel"
    >
      <div slot="header"></div>
      <div class="content clearfix">
        <img :src="nowInfo.userImg" class="head fl" />
        <div class="info fl">
          <div class="wrap">
            <span class="name mr">{{ nowInfo.userName }}</span>
            <!-- <span class="charge">
              <span>¥</span>
              <span class="price">{{ nowInfo.pwprice }}</span>
              <span>/局</span>
            </span> -->
          </div>
          <div class="voice-wrap">
            <div
              style="
                height: 20px;
                width: 50px;
                border-radius: 15px;
                background: #abeaff;
              "
            >
              <img
                src="../assets/img/1635319999(1).jpg"
                class="icon"
                @click="play"
                style="height: 10px; width: 40px; margin-left: 5px"
              />
            </div>
            <!-- <img
                src="../assets/img/icon-voice-2.png"
                class="icon"
                @click="play"
              /> -->
            <audio
              :src="nowInfo.userAudio"
              ref="audio"
              preload="load"
              class="audio"
            >
              您的浏览器不支持音频播放
            </audio>
          </div>
          <div class="introduction fl">
            <span>陪玩介绍:</span>
            {{ nowInfo.userIntro || "暂无简介" }}
          </div>
        </div>
        <div class="specialty fl" v-if="gametype == 1">
          <p class="mb">
            <span>声音特点:</span>
            {{ nowInfo.userVoice }}
          </p>
          <p>
            <span>服务范围:</span>
            {{ nowInfo.userServer || "" }}
          </p>
          <!-- <div class="wechat-wrap clearfix">
            <div class="name fl">微信</div>
            <img :src="nowInfo.wechatImg" alt="微信号码" class="code fl" v-if="nowInfo.wechatImg" />
          </div> -->
        </div>

        <div class="btn-wrap clearfix unselect" :class="{ top: gametype == 2 }">
          <div class="btn fl btnclick" @click="next">继续匹配</div>
          <div class="btn talk lr btnclick" @click="buy(nowInfo.Id)">
            查看详情
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: {
    showMatch: {
      type: Boolean,
      default: false,
    },
    info: {
      type: [Object, Array],
    },
    pageNo: {
      type: [Number],
    },
  },
  name: "matching",
  data() {
    return {
      showPayMod: false,
      nowInfo: "",
      index: 0,
      ispalying: false,
    };
  },
  computed: {
    ...mapGetters(["gametype", "userData", "balance"]),
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setLoginFlag: "user/SET_LOGIN_FLAG",
    }),
    play() {
      if (!this.ispalying) {
        this.$refs.audio.play();
        this.ispalying = true;
      } else {
        this.$refs.audio.pause();
        this.ispalying = false;
      }
      this.$forceUpdate();
    },
    sure() {
      console.log("ssss");
    },
    cancel() {
      this.$refs.audio.pause();
      this.$emit("closed");
    },
    closed() {
      this.$refs.audio.pause();
      this.showPayMod = false;
    },
    next() {
      this.index++;
      this.$refs.audio.pause();
      if (this.index >= this.info.length) {
        this.index = 0;
        this.$emit("load");
      }
      this.nowInfo = Object.assign({}, this.info[this.index]);
    },
    buy(e) {
      console.log(e);
      const news = this.$router.resolve({
        name: "/detail",
        params: { id: e },
      });

      window.open(`index.html#/detail?id=${news.location.params.id}`, "_blank");
    },
  },
  watch: {
    info(val) {
      if (val && val.length > 0) {
        this.nowInfo = val[0];
      }
    },
    showMatch(val) {
      if (val && sessionStorage.getItem("_info")) {
        this.showPayMod = true;
        sessionStorage.removeItem("_info");
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.content {
  padding: 20px;
  min-height: 394px;
  .head {
    display: inline-block;
    width: 108px;
    height: 108px;
    margin: 21px 20px 0 29px;
    border-radius: 50%;
  }
  .info {
    position: relative;
    display: inline-block;
    width: 71%;
    height: 140px;
    .wrap {
      .name {
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
      }
      .mr {
        margin-right: 20px;
      }
      .charge {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        .price {
          font-size: 18px;
          color: #f96c9a;
        }
      }
    }
    .voice-wrap {
      cursor: pointer;
      width: 64px;
      height: 21px;
      margin: 10px 0;
      .icon {
        width: 64px;
        height: 21px;
      }
    }
    .introduction {
      width: 360px;
      height: 66px;
      overflow-y: auto;
      border-radius: 6px;
      padding: 4px 10px;
      border: 1px solid rgba(203, 203, 203, 1);
      font-size: 16px;
      color: #333;
      span {
        color: rgba(203, 203, 203, 1);
      }
    }
    .btn {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      width: 130px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(
        180deg,
        rgba(241, 181, 50, 1) 0%,
        rgba(254, 148, 3, 1) 100%
      );
      border-radius: 6px;
    }
  }
  .specialty {
    width: 100%;
    // height: 146px;
    padding: 36px 0 45px 29px;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
  }
  .wechat-wrap {
    margin-top: 20px;
    .name {
    }
    img {
      width: 100px;
      height: 100px;
      margin-left: 40px;
    }
  }
  .btn-wrap {
    width: 322px;
    height: 45px;
    margin: auto;
    clear: both;
    .btn {
      cursor: pointer;
      width: 130px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      border-radius: 6px;
      border: 1px solid rgba(153, 153, 153, 1);
      font-size: 18px;
      color: rgba(153, 153, 153, 1);
    }
    .talk {
      border: 1px solid rgba(251, 155, 13, 1);
      color: rgba(252, 154, 12, 1);
    }
  }
}
.top {
  margin: 280px auto 0 !important;
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
/deep/ .vertical-center-modal {
  display: flex;
  align-items: center;
  // justify-content: center;
  -webkit-justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
</style>