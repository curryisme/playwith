<template>
  <div>
    <cpNav @search="search" />
    <bjImage>
      <img src="../assets/img/public/2.jpeg" alt />
    </bjImage>
    <div class="main">
      <div class="nav-wrap unselect">
        <div class="nav-item clearfix">
          <div class="head fl">游戏类型</div>
          <ul class="right-box fl clearfix">
            <li
              :class="{ active: gametype == 1 }"
              style="width: 20%"
              @click="setType(1)"
            >
              LOL
            </li>
            <li
              :class="{ active: gametype == 2 }"
              style="width: 20%"
              @click="setType(2)"
            >
              永劫无间
            </li>
            <li
              :class="{ active: gametype == 3 }"
              style="width: 20%"
              @click="setType(3)"
            >
              Valorant DOTA2
            </li>
            <li
              :class="{ active: gametype == 4 }"
              style="width: 20%"
              @click="setType(4)"
            >
              apex
            </li>
            <li
              :class="{ active: gametype == 5 }"
              style="width: 20%"
              @click="setType(5)"
            >
              cod
            </li>
            <li
              :class="{ active: gametype == 6 }"
              style="width: 20%"
              @click="setType(6)"
            >
              csgo
            </li>
            <li
              :class="{ active: gametype == 7 }"
              style="width: 20%"
              @click="setType(7)"
            >
              overwatch
            </li>
            <li
              :class="{ active: gametype == 8 }"
              style="width: 20%"
              @click="setType(8)"
            >
              pubg
            </li>
            <li
              :class="{ active: gametype == 9 }"
              style="width: 20%"
              @click="setType(9)"
            >
              Rainbow6
            </li>
            <li
              :class="{ active: gametype == 10 }"
              style="width: 20%"
              @click="setType(10)"
            >
              Steam小游戏
            </li>
          </ul>
          <div
            class="new unselect btnclick"
            v-if="userInfo.isNew == 1"
            @click="changeNewProt"
          >
            新人专享
          </div>
        </div>
        <div class="nav-item clearfix">
          <div class="head fl">陪玩性别</div>
          <ul class="right-box fl clearfix">
            <li :class="{ active: sex == 0 }" @click="changeSex(0)">不限</li>
            <li :class="{ active: sex == 1 }" @click="changeSex(1)">小哥哥</li>
            <li :class="{ active: sex == 2 }" @click="changeSex(2)">小姐姐</li>
          </ul>
        </div>
        <div class="nav-item clearfix">
          <div class="head end fl">选择价位</div>
          <ul class="right-box fl clearfix">
            <li
              :class="{ active: priceOrderBy == 0 }"
              @click="changePriceOrderBy(0)"
            >
              不限
            </li>
            <li
              :class="{ active: priceOrderBy == 1 }"
              @click="changePriceOrderBy(1)"
            >
              从高到低
            </li>
            <li
              :class="{ active: priceOrderBy == 2 }"
              @click="changePriceOrderBy(2)"
            >
              从低到高
            </li>
          </ul>
        </div>
      </div>
      <audio ref="audio" preload="load" class="audio">
        您的浏览器不支持音频播放
        <source :src="nowSrc" type="audio/mp3" />
      </audio>
      <div class="list-boxs">
        <div class="frame_red" v-for="(item, index) in list" :key="index">
          <!-- <img :src="item.headImg" class="pic" /> -->
          <el-image
            :src="item.userImg"
            lazy
            class="pic"
            @click="toDeail(item.Id)"
            :alt="item.userName"
          ></el-image>
          <div
            class="voice"
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
              @click="play(item.userAudio)"
              style="height: 10px; width: 40px; margin-left: 5px"
            />
          </div>
          <!-- <img
            src="../assets/img/icon-voice-2.png"
            class="voice"
            @click="play(item.userAudio)"
          />  -->
          <div class="info" @click="toDeail(item.Id)">
            <div class="user clearfix">
              <div class="name one-text" :title="item.nickName">
                {{ item.userName }}
              </div>
              <div class="status" v-if="item.userSex == 1">男</div>
              <div class="status" v-else>女</div>
            </div>
            <div class="about clearfix">
              <div class="price">
                <span>¥</span>
                <span class="num">{{ item.pwprice }}</span>
                <span>/时</span>
              </div>
              <div class="count">
                <img
                  src="../assets/img/icon-list.png"
                  style="
                    display: inline-block;
                    float: left;
                    margin-top: 2px;
                    margin-right: 0;
                  "
                  class="icon-list"
                />
                <div
                  style="
                    width: 90px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: inline-block;
                  "
                >
                  声音：{{ item.userIntro }}次
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <quickBtn />
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import { querPlayer } from "../common/api/index";
import { config } from "../common/config";
import { mapMutations, mapGetters } from "vuex";
import { getUserInfo } from "../common/api/user";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, bjImage },
  name: "playHall",
  data() {
    return {
      sex: 0,
      isHeight: "",
      pageNo: 1,
      pageSize: 20,
      priceOrderBy: "",
      rank: "",
      RankList: [],
      loadFlag: true,
      list: [],
      name: "",
      isNew: 0, //是否新人
      nowSrc: "",
    };
  },
  computed: {
    ...mapGetters(["gametype", "userData", "userInfo"]),
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  mounted() {
    if (sessionStorage.getItem("_search")) {
      this.name = sessionStorage.getItem("_search");
    }
    this.RankList = config.level;
    this.querPlayer();
  },
  methods: {
    ...mapMutations({
      setType: "user/SET_TYPE",
      setUserInfo: "user/SET_USER_INFO",
    }),
    search(name) {
      this.name = name;
      this.pageNo = 1;
      this.list = [];
      this.querPlayer();
    },
    //新人 优惠
    changeNewProt() {
      if (this.isNew == 0) {
        this.isNew = 1;
      } else {
        this.isNew = 0;
      }
      this.pageNo = 1;
      this.list = [];
      this.querPlayer();
    },
    play(src) {
      console.log(src);
      if (!this.nowSrc || this.nowSrc != src) {
        this.nowSrc = src;
        this.$refs.audio.src = this.nowSrc;
        this.$nextTick(() => {
          this.$refs.audio.load();
          this.$refs.audio.play();
          this.ispalying = true;
        });
      }
      if (!this.ispalying) {
        this.$refs.audio.play();
        this.ispalying = true;
      } else {
        this.$refs.audio.pause();
        this.ispalying = false;
      }
      this.$forceUpdate();
    },
    async querPlayer() {
      this.loadFlag = false;
      try {
        let res = await querPlayer({
          pwgameType: this.gametype,
          pwSex: this.sex,
          pwPrice: this.priceOrderBy,
        });

        if (res.success) {
          this.list = [...this.list, ...res.data];
        }
        this.loadFlag = true;
      } catch (error) {
        this.loadFlag = true;
      }
    },
    changeRank(num) {
      this.rank = num;
      this.pageNo = 1;
      this.list = [];
      this.querPlayer();
    },
    changePriceOrderBy(num) {
      this.priceOrderBy = num;
      this.pageNo = 1;
      this.list = [];
      this.querPlayer();
    },
    changeSex(num) {
      this.sex = num;
      this.pageNo = 1;
      this.list = [];
      this.querPlayer();
    },
    handleReachBottom() {
      if (this.loadFlag) {
        this.pageNo++;
        this.querPlayer();
      }
    },
    getHeight() {
      this.isHeight = window.innerHeight;
    },
    toDeail(e) {
      const news = this.$router.resolve({
        name: "/detail",
        params: { id: e },
      });
      console.log(news);
      window.open(`index.html#/detail?id=${news.location.params.id}`, "_blank");
    },
    async gotUserInfo() {
      if (!this.userData) return;
      try {
        let res = await getUserInfo({
          userId: this.userData.userId || "",
        });
        if (res.resultCode == "0000") {
          this.setUserInfo(res.data);
        }
      } catch (error) {}
    },
  },
  watch: {
    type(val) {
      this.pageNo = 1;
      this.list = [];
      this.querPlayer();
    },
    gametype(val) {
      this.pageNo = 1;
      this.list = [];
      this.querPlayer();
    },
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("_search");
    next();
  },
};
</script>
<style lang='scss' scoped>
.playHall {
  position: relative;
  width: 100%;
}
.audio {
  position: absolute;
  left: -9999999;
  top: 9999999;
  opacity: 0;
}
.main {
  position: relative;
  width: 1200px;
  margin: auto;
  padding-top: 50px;
  z-index: 9;
  .nav-wrap {
    width: 1200px;
    // height: 327px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #e0e0e0;
    .nav-item {
      position: relative;
      width: 100%;
      line-height: 108px;
      font-size: 16px;
      .head {
        width: 172px;
        height: inherit;
        color: rgba(51, 51, 51, 1);
        background-color: #f6f6f6;
        box-sizing: border-box;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
      }
      .end {
        border: 0;
      }
      .right-box {
        width: 1025px;
        > li {
          cursor: pointer;
          width: 10%;
          float: left;
          text-align: center;
        }
        .active {
          color: rgba(249, 108, 154, 1);
        }
      }
      .new {
        position: absolute;
        top: 30px;
        right: 40px;
        width: 130px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        z-index: 3;
        cursor: pointer;
        background: linear-gradient(
          180deg,
          rgba(241, 181, 50, 1) 0%,
          rgba(254, 148, 3, 1) 100%
        );
        border-radius: 6px;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
      }
    }
    .nav-item:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }
  }
  .list-boxs {
    width: 1200px;
    padding-top: 40px;
    .frame_red {
      display: inline-block;
      position: relative;
      cursor: pointer;
      width: 200px;
      height: 260px;
      padding-top: 200px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.5);
      margin-right: 50px;
      margin-bottom: 30px;
      .pic {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 200px;
        height: 200px;
      }
      .voice {
        position: absolute;
        left: 10px;
        top: 170px;
        width: 65px;
        height: 20px;
        z-index: 1;
      }
      .info {
        width: 100%;
        height: 60px;
        padding: 6px 10px;
        .user {
          height: 24px;
          line-height: 24px;
          .name {
            float: left;
            width: 76%;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
          }
          .status {
            position: relative;
            width: 24%;
            float: right;
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
            padding-left: 10px;
          }
          .status::after {
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -2px;
            content: "";
            width: 4px;
            height: 4px;
            background: green;
          }
        }
        .about {
          height: 24px;
          line-height: 24px;
          font-size: 12px;
          .price {
            // width: 30%;
            float: left;
            color: #999999;

            span {
              font-size: 12px;
            }
            .num {
              color: #f96c9a;
              font-size: 18px;
            }
          }
          .count {
            float: right;
            // width: 70%;
            font-size: 12px;
            color: rgba(153, 152, 153, 1);
            // padding-left: 20px;
            // background: url("../assets/img/icon-list.png") center left no-repeat;
            // background-size: 12px 14px;
            text-align: right;
            overflow: hidden;
            .icon-list {
              display: inline-block;
              width: 12px;
              height: 14px;
              // margin:2px 7px 0 0 ;
              margin-right: 7px;
              transform: translateY(2px);
            }
          }
        }
      }
    }
    .frame_red:nth-child(5n) {
      margin-right: 0;
    }
    .frame_red:hover {
      animation: pulse 0.5s;
    }
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  }
}
.fl {
  float: left;
}
/deep/ .ivu-scroll-content-loading {
  opacity: 1 !important;
}
/deep/ .ivu-scroll-loader:first-child {
  height: 0;
  // display: none !important;
}
</style>