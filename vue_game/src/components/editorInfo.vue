<template>
  <div class="editorInfo bind-phone" ref="editorInfo">
    <div class="input-wrap flex align-items">
      <div class="mr">旧密码</div>
      <div class="code-wrap">
        <input
          type="text"
          class="phone"
          v-model="opwd"
          placeholder="请设置旧密码"
        />
      </div>
    </div>
    <div class="input-wrap flex align-items">
      <div class="mr">新密码</div>
      <div class="code-wrap">
        <input
          type="text"
          class="phone"
          v-model="npwd"
          placeholder="请设置至少6位密码"
        />
      </div>
    </div>
    <div class="next btnclick unselect" @click="contrixiugai">确定修改</div>
  </div>
</template>

<script>
import ImgCutter from "vue-img-cutter";
import { mapMutations, mapGetters } from "vuex";
import { updatepwd } from "../common/api/user";

export default {
  components: { ImgCutter },
  name: "editorInfo",
  data() {
    return {
      npwd: "",
      opwd: "",
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setUserInfo: "user/SET_USER_INFO",
    }),
    async contrixiugai() {
      if (!this.userData) return;
      if (this.opwd == "") {
        this.$Message.warning("请正确填写旧密码");
        return;
      }
      if (this.npwd == "" || this.npwd.length < 6) {
        this.$Message.warning("请设置至少6位密码");
        return;
      }
      let res = await updatepwd({
        opwd: this.opwd, //用户账号（手机号）
        npwd: this.npwd,
        userId: this.userData.Id,
        userName: this.userData.userName,
      });
      if (res.success) {
        this.$Message.success("修改成功！");
      } else {
        this.$Message.error(res.data);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.zindex {
  position: relative;
  z-index: 99;
}
.zindex1 {
  z-index: 2 !important;
}
.editorInfo {
  position: relative;
  width: 994px;
  min-height: 500px;
  padding: 40px;
  padding-right: 0;
  overflow: hidden;
  z-index: 0;
  .row {
    margin-bottom: 30px;
    .name {
      width: 85px;
      font-size: 16px;
      margin-right: 22px;
      text-align: right;
      color: rgba(51, 51, 51, 1);
    }
    .img-list {
      position: relative;
      width: 330px;
      height: 148px;
      background: rgba(247, 247, 247, 1);
      border: 1px solid rgba(216, 216, 216, 1);
      .zIndx {
        z-index: 99 !important;
      }
      .img-box {
        position: relative;
        z-index: 0;
        img {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
      }
      .box1 {
        width: 170px;
        height: 148px;
        line-height: 148px;
      }
      .box2 {
        position: absolute;
        width: 80px;
        height: 74px;
        line-height: 74px;
        z-index: 0;
      }
      .pos1 {
        top: 0;
        left: 170px;
      }
      .pos2 {
        top: 0;
        right: 0;
      }
      .pos3 {
        top: 74px;
        left: 170px;
      }
      .pos4 {
        top: 74px;
        right: 0;
      }
    }
    .level-list {
      .item {
        // position: relative;
        z-index: 0;
      }
    }
    .voice-list {
      .tag-type {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
      }
      .list {
        margin-top: 10px;
        margin-bottom: 26px;
        .item {
          cursor: pointer;
          display: inline-block;
          position: relative;
          width: 70px;
          height: 27px;
          line-height: 27px;
          text-align: center;
          margin-right: 10px;
          border-radius: 6px;
          border: 1px solid rgba(218, 218, 218, 1);
          .close {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            width: 12px;
            height: 12px;
          }
        }
        .active {
          background: rgba(244, 172, 38, 1);
          border: 1px solid rgba(244, 172, 38, 1);
          color: #fff;
        }
      }
    }
    .level-list {
      .item {
        margin-right: 20px;
        p {
          font-size: 14px;
          margin-bottom: 5px;
          color: rgba(102, 102, 102, 1);
        }
        .upload {
          position: relative;
          width: 173px;
          height: 110px;
          line-height: 110px;
          margin-top: 10px;
          background: rgba(231, 231, 231, 1);
          cursor: pointer;
          .img {
            position: absolute;
            left: 0;
            top: 0;
            width: 173px;
            height: 110px;
            z-index: 0;
          }
          .filepath {
            position: absolute;
            left: 0;
            top: 0;
            width: 173px;
            height: 110px;
            z-index: 3;
            opacity: 0;
          }
          .text {
            position: absolute;
            top: 50%;
            width: 100%;
            text-align: center;
            transform: translateY(-50%);
            z-index: 1;
          }
        }
      }
    }
    .play-pos {
      .list {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
    .textarea {
      width: 332px;
      height: 95px;
      background: rgba(247, 247, 247, 1);
      border-radius: 6px;
      padding: 10px 20px;
      font-size: 14px;
      border: 1px solid rgba(216, 216, 216, 1);
      resize: none;
    }
    .upload-voice {
      position: relative;
      cursor: pointer;
      width: 148px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      background: rgba(232, 232, 232, 1);
      border-radius: 6px;
      .temp-voice {
        position: absolute;
        top: 0;
        left: 0;
        width: 148px;
        height: 33px;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        border-radius: 6px;
      }
      .audio {
        opacity: 0;
        width: 1px;
        height: 0;
      }
      .upvoice {
        position: absolute;
        top: 0;
        left: 0;
        width: 148px;
        height: 33px;
        z-index: 1;
        opacity: 0;
        cursor: pointer;
      }
      .play-wrap {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 30px;
        width: 148px;
        height: 33px;
        z-index: 9;

        .reupload {
          cursor: pointer;
          position: relative;
          width: 60px;
          height: 33px;
          opacity: 0;
          z-index: 3;
        }
        .temps {
          position: absolute;
          top: 0;
          right: 30px;
          width: 60px;
          height: 33px;
          line-height: 33px;
          text-align: center;
          font-size: 14px;
          z-index: 0;
        }
      }
    }
  }
  .btn {
    cursor: pointer;
    width: 270px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-size: 18px;
    transform: translateX(85px);
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(
      180deg,
      rgba(240, 182, 52, 1) 0%,
      rgba(254, 146, 1, 1) 100%
    );
    border-radius: 21px;
  }
}
.wechat {
  position: relative;
  width: 150px;
  height: 150px;
  line-height: 150px;
  background: #e7e7e7;
  text-align: center;
  .filepath {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 150px;
    z-index: 9;
    opacity: 0;
  }
  .img {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 150px;
    height: 150px;
  }
  .text {
    width: 100%;
    position: absolute;
    z-index: 8;
    text-align: center;
  }
}
.fl {
  float: left;
}
.br {
  border-right: 1px solid #d8d8d8;
}
.bb {
  border-bottom: 1px solid #d8d8d8;
}
/deep/ .upImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  > .btn.btn-primary {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    padding: 0;
    text-align: center;
    color: #999;
    z-index: 0;
  }
}
.mart {
  margin-top: 4px;
}
.temp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  // border-radius: 50%;
  text-align: center;
  z-index: 9;
  font-size: 30px;
  background-color: rgba(153, 153, 153, 0.5);
  .shak {
    color: #111;
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
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang='scss' scoped>
.bind-phone {
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
    margin-bottom: 160px;
  }

  .input-wrap {
    width: 400px;
    height: 42px;
    margin: 0 auto 30px;
    .user-phone {
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      color: rgba(250, 157, 17, 1);
    }
    .mr {
      width: 70px;
      height: 42px;
      line-height: 42px;
      padding-right: 20px;
      text-align: right;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
    }
    .input-box {
      width: 328px;
      height: 42px;
      background: rgba(247, 247, 247, 1);
      border-radius: 6px;
      border: 1px solid rgba(216, 216, 216, 1);
    }
    input {
      display: block;
      width: 90%;
      height: 39px;
      margin: auto;
      color: #333;
      font-size: 14px;
      border: 0;
      background: rgba(247, 247, 247, 1);
      text-align: center;
    }
    .code-wrap {
      width: 317px;
      height: 42px;
      background: rgba(247, 247, 247, 1);
      border-radius: 6px;
      border: 1px solid rgba(216, 216, 216, 1);
    }
    .btn {
      cursor: pointer;
      width: 98px;
      height: 42px;
      line-height: 42px;
      margin-left: 13px;
      text-align: center;
      border-radius: 6px;
      border: 1px solid rgba(250, 157, 17, 1);
      font-size: 14px;
      color: rgba(255, 152, 0, 1);
    }
  }
  .next {
    cursor: pointer;
    width: 328px;
    height: 42px;
    margin: auto;
    line-height: 42px;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(240, 182, 52, 1) 0%,
      rgba(254, 146, 1, 1) 100%
    );
    border-radius: 21px;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>