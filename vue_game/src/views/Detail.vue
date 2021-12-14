<template>
  <div class="detail">
    <cpNav />
    <bjImage>
      <img src="../assets/img/public/2.jpeg" alt />
    </bjImage>
    <div class="container">
      <div class="user-about clearfix">
        <div class="pic-wrap fl">
          <img :src="info.userImg" style="margin-top: 12px" class="pic" />
        </div>
        <div class="status fl">
          <div class="name">
            <span>{{ info.userName }}</span>
            <img
              src="../assets/img/icon-girl.png"
              class="icon"
              v-if="info.userSex == 2"
            />
            <img
              src="../assets/img/boy.png"
              class="icon"
              v-if="info.userSex == 1"
            />
          </div>
          <p class="tag">
            TA的游戏池：
            <el-tag
              size="mini"
              v-for="(item, index) in taglist"
              :key="index"
              style="margin-right: 5px"
            >
              {{ item.gamesName }}</el-tag
            >
          </p>
          <p style="margin-top: 15px">ID：{{ info.Id }}</p>
        </div>
      </div>
      <div class="user-content clearfix">
        <div class="gamms lr">
          <div class="game-content">
            <div class="game-info clearfix" style="padding-top: 10px">
              <img :src="info.userImg" class="game-pic fl" v-if="type == 1" />
              <img
                :src="info.tacticsImg"
                class="game-pic fl"
                v-if="type == 2"
              />
              <div class="info fl">
                <p>
                  <span>邮箱：</span>
                  <span class="num">{{
                    info.userEmail == null ? "暂无" : info.userEmail
                  }}</span>
                </p>
                <div class="times">出生日期：{{ info.userBrith }}</div>
                <div class="voice">
                  <div style="height:20px;width:50px;border-radius: 15px;background:#abeaff">
                    <img
                      src="../assets/img/1635319999(1).jpg"
                      class="icon"
                      @click="play"
                      style="height:10px;width:40px;margin-left:5px"
                    />
                  </div> 
                  <!-- <img
                    src="../assets/img/icon-voice-2.png"
                    class="voice"
                    @click="play"
                  /> -->
                  <audio
                    :src="info.userAudio"
                    ref="audio"
                    preload="load"
                    class="audio"
                  >
                    您的浏览器不支持音频播放
                  </audio>
                </div>
              </div>
              <div class="interaction lr unselect" style="margin-right: 200px">
                <table>
                  <tr
                    v-for="item in taglist"
                    :key="item.peiwanid"
                    style="color: #eb2e15; height: 60px"
                  >
                    <td style="width: 50px">
                      <img
                        :src="item.gamesIco"
                        style="height: 40px; width: 40px"
                      />
                    </td>
                    <td>
                      <el-tag
                        style="
                          background-color: #ecf5ff;
                          border-color: #d9ecff;
                          display: inline-block;
                          height: 22px;
                          padding: 0 10px;
                          line-height: 22px;
                          font-size: 12px;
                          color: #409eff;
                          border-width: 1px;
                          border-style: solid;
                          -webkit-border-radius: 4px;
                          border-radius: 4px;
                          -webkit-box-sizing: border-box;
                          box-sizing: border-box;
                          white-space: nowrap;
                          margin-right: 10px;
                        "
                        size="mini"
                        >{{ item.gamesName }}</el-tag
                      >
                      ￥{{ info.pwprice == null ? "0" : info.pwprice }}/小时
                    </td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- <el-divider content-position="left">陪玩游戏列表</el-divider>
            <div class="skilled" style="border: none">
              <table>
                <tr
                  v-for="item in taglist"
                  :key="item.peiwanid"
                  style="color: #eb2e15; height: 60px"
                >
                  <td style="width: 50px">
                    <img
                      :src="item.gamesIco"
                      style="height: 40px; width: 40px"
                    />
                  </td>
                  <td>
                    <el-tag
                      style="
                        background-color: #ecf5ff;
                        border-color: #d9ecff;
                        display: inline-block;
                        height: 22px;
                        padding: 0 10px;
                        line-height: 22px;
                        font-size: 12px;
                        color: #409eff;
                        border-width: 1px;
                        border-style: solid;
                        -webkit-border-radius: 4px;
                        border-radius: 4px;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        white-space: nowrap;
                        margin-top: -10px;
                      "
                      size="mini"
                      >{{ item.gamesName }}</el-tag
                    >
                    ￥{{ info.pwprice == null ? "0" : info.pwprice }}/小时
                  </td>
                  <td></td>
                </tr>
              </table>
            </div> -->
            <el-divider content-position="left">声音与服务</el-divider>
            <div class="skilled">
              <p>
                <span class>声音特点:</span>
                {{ info.userVoice == null ? "暂无" : info.userVoice }}
              </p>
              <p>
                <span class>服务范围:</span>
                {{ info.userServer == null ? "暂无" : info.userServer }}
              </p>
            </div>
            <div class="introduce">
              <span style="padding-right: 10px">自我介绍: </span>
              {{ info.userIntro == null ? "暂无" : info.userIntro }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <quickBtn />
    <foot />
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import foot from "../components/foot";
import { getPWbyId, getPWbyUserId } from "../common/api/user";
import { mapMutations, mapGetters } from "vuex";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot, bjImage },
  name: "detail",
  data() {
    return {
      imgList: [],
      imgSrc: "",
      type: 1,
      num: 0,
      showPrev: true,
      id: "",
      info: "",
      pageNo: 1,
      commonList: [],
      ispalying: false,
      count: 0,
      taglist: [],
      timer: null,
      tempsrc: "",
    };
  },
  computed: {
    ...mapGetters(["userData", "userInfo"]),
  },
  created() {
    this.id = this.$route.query.id || "";
  },
  mounted() {
    this.gotUserInfo();
    this.getPWbyUserId();
  },
  methods: {
    ...mapMutations({
      setLoginFlag: "user/SET_LOGIN_FLAG",
    }),
    play() {
      if (!this.ispalying) {
        // this.info.userAudio = this.tempsrc;
        // this.$nextTick(() => {
        //   this.$refs.audio.play();
        //   this.ispalying = true;
        //   this.timer = setTimeout(() => {
        //     this.$refs.audio.pause();
        //     this.info.userAudio = "";
        //     this.ispalying = false;
        //   }, 8000);
        // });
        this.$refs.audio.play();
        this.ispalying = true;
      } else {
        this.$refs.audio.pause();
        this.ispalying = false;
      }
      this.$forceUpdate();
    },
    toOrder() {
      sessionStorage.setItem("_playerInfos", JSON.stringify(this.info));
      if (this.userData) {
        this.$router.openPage("/order?type=" + this.type + "&id=" + this.id);
      } else {
        this.setLoginFlag(true);
      }
    },

    async gotUserInfo() {
      if (!this.id) return;
      try {
        let res = await getPWbyId({
          pwuserid: this.id || "",
        });
        if (res.success) {
          this.info = res.data[0];
          this.tempsrc = res.data[0].userAudio;
          this.imgList = res.data[0].userImg;
          this.imgSrc = res.data[0].userImg;
          // this.imgSrc = this.imgList.length > 0 ? this.imgList[0] : "";
          if (this.info.tacticsRank && !this.info.riftRank) {
            this.type = 2;
          }
        }
      } catch (error) {}
    },
    async getPWbyUserId() {
      if (!this.id) return;
      if (!this.userData) return;
      try {
        let res = await getPWbyUserId({ pwuserid: this.userData.Id });
        if (res.success) {
          this.taglist = res.data;
        }
      } catch (error) {}
    },
    mathWidth(num) {
      return `width:${num * 80}px`;
    },
    moveLeft() {
      let node = this.$refs.content;
      let clientWidth = this.$refs.imgWrap.clientWidth;
      if (node.scrollLeft > 0) {
        node.scrollLeft = node.scrollLeft - 390;
      }
    },
    moveRight() {
      let node = this.$refs.content;
      let clientWidth = this.$refs.imgWrap.clientWidth;
      if (node.scrollLeft + 390 < clientWidth) {
        node.scrollLeft = node.scrollLeft + 390;
      }
    },
    imgEnter(e) {
      this.num = e.target.dataset.index;
      this.imgSrc = e.target.currentSrc;
    },
  },
};
</script>
<style lang='scss' scoped>
.detail {
  position: relative;
  width: 100%;

  .container {
    position: relative;
    width: 1200px;
    margin: 50px auto 0;
    z-index: 9;
    .user-about {
      width: 1200px;
      height: 110px;
      padding: 6px 0;
      background-color: #fff;
      .pic-wrap {
        width: 120px;
        height: 98px;
        .pic {
          display: block;
          width: 75px;
          height: 75px;
          margin: auto;
          border-radius: 50%;
        }
        .online {
          font-size: 14px;
          text-align: center;
          color: rgba(74, 183, 143, 1);
          span {
            position: relative;
            padding-left: 8px;
          }
          span::after {
            content: "";
            position: absolute;
            top: 50%;
            margin-top: -2px;
            left: 0;
            width: 4px;
            height: 4px;
            background-color: #4ab78f;
            border-radius: 50%;
          }
        }
      }
      .status {
        width: 80%;
        height: 98px;
        font-size: 12px;
        color: rgba(102, 102, 102, 1);
        .name {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 15px;
          .icon {
            display: inline-block;
            width: 19px;
            height: 19px;
            transform: translateY(3px);
          }
        }
        .tag {
          margin-top: 15px;
        }
      }
    }
    .user-content {
      width: 1200px;
      margin: 50px auto 0;
      .img-wrap {
        position: relative;
        width: 471px;
        height: 456px;
        background: rgba(255, 255, 255, 1);
        font-size: 0;
        .md-search {
          position: absolute;
          z-index: 5;
          right: 0;
          top: 346px !important;
          font-size: 25px;
          color: #fff;
          padding: 5px;
          width: 25px;
          height: 25px;
          background: rgba(0, 0, 0, 0.3);
          /deep/ .el-image {
            left: 0;
            top: 0;
            opacity: 0;
          }
        }
        .opacity {
          opacity: 0.2;
        }
        .ivu-icon {
          position: absolute;
          z-index: 3;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .ivu-icon-ios-arrow-back {
          left: 0;
        }
        .ivu-icon-ios-arrow-forward {
          right: 0;
        }
        .img {
          width: 471px;
          height: 365px;
        }

        .list-img-content {
          width: 385px;
          margin: auto;
          overflow: hidden;
        }
        .img-zoom-wrap {
          position: relative;
          width: 100%;
          height: 92px;
          padding: 16px 40px;
          overflow: hidden;
          transition: all 0.5s;

          .active {
            border: 1px solid #333;
          }
          .img-zoom {
            display: inline-block;
            width: 60px;
            height: 60px;
            margin-right: 20px;
            img {
              width: 100%;
              height: 60px;
            }
          }
        }
        /deep/ .swiper-container {
          width: 100%;
          height: 60px;
          padding: 0 40px;
          margin: 15px auto 0;
        }
        /deep/ .swiper-slide {
          width: 60px !important;
          height: 60px !important;
          margin-right: 20px;
        }
        .user-img {
          width: 60px;
          height: 60px;
        }
      }
      .gamms {
        width: 100%;
        padding: 20px 0;
        background: rgba(255, 255, 255, 1);
        .nav {
          padding: 0 40px;
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
          .nav-item {
            display: inline-block;
            height: 77px;
            line-height: 77px;
            margin-right: 30px;
            cursor: pointer;
            span {
              position: relative;
              padding: 3px;
            }
          }
          .active {
            font-size: 18px;
            color: rgba(254, 149, 4, 1);
          }
          .active span::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -25px;
            width: 50px;
            height: 2px;
            background: rgba(254, 149, 4, 1);
          }
        }
        .game-content {
          .game-info {
            padding: 0 40px 25px 40px;
            .game-pic {
              width: 164px;
              height: 142px;
              border-radius: 4px;
              margin-right: 20px;
            }
            .info {
              padding-top: 20px;
              p {
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
                margin-bottom: 15px;
                .num {
                  font-size: 21px;
                  color: #f96c9a;
                }
              }
              .times {
                padding-left: 20px;
                font-size: 12px;
                color: rgba(153, 152, 153, 1);
                background: url("../assets/img/icon-list.png") center left
                  no-repeat;
                background-size: 12px 14px;
              }
              .voice {
                cursor: pointer;
                width: 65px;
                height: 21px;
                margin-top: 10px;
                > img {
                  width: 65px;
                  height: 21px;
                }
              }
            }
            .interaction {
              margin-top: 19px;
              .talk,
              .order {
                cursor: pointer;
                width: 130px;
                height: 45px;
                line-height: 45px;
                border-radius: 6px;
                font-size: 18px;
                text-align: center;
                color: #fe9504;
                border: 1px solid rgba(253, 149, 5, 1);
              }
              .order {
                background: linear-gradient(
                  180deg,
                  rgba(241, 181, 50, 1) 0%,
                  rgba(254, 148, 3, 1) 100%
                );
                color: #fff;
                margin-top: 14px;
              }
            }
          }
          .skilled {
            padding: 10px 40px;
            border-bottom: 1px solid #e0e0e0;
            p {
              margin-bottom: 10px;
            }
            span {
              font-size: 16px;
              color: rgba(51, 51, 51, 1);
              margin-right: 20px;
            }
          }
          .introduce {
            padding: 10px 40px;
            span {
              font-size: 18px;
              color: rgba(51, 51, 51, 1);
            }
          }
        }
      }
    }
    .comment {
      width: 1200px;
      margin: 40px auto 0;
      background-color: #fff;
      .title {
        width: 100%;
        height: 80px;
        line-height: 80px;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        padding: 0 40px;
        border-bottom: 1px solid #e0e0e0;
      }
      .info {
        width: 100%;
        min-height: 80px;
        padding: 10px 40px;
        border-bottom: 1px solid #e0e0e0;
        .head {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 15px;
        }
        .user {
          width: 70%;
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
          .time {
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
          }
          .mes {
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
          }
        }
        .start {
          font-size: 40px;
        }
      }
      .pages {
        height: 60px;
        text-align: center;
        /deep/ .ivu-page {
          margin-top: 20px;
        }
      }
    }
  }
}
.fl {
  float: left;
}
.lr {
  float: right;
}
/deep/ [class^="el-icon-"] {
  color: #fff;
}
/deep/ .el-image-viewer__close {
  top: 120px;
}
</style>