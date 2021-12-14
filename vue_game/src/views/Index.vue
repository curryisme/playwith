<template>
  <div class="Index">
    <cpNav class="top-nav" />
    <bjImage>
      <img src="../assets/img/public/3.jpeg" alt />
    </bjImage>
    <div class="main">
      <div class="content">
        <div class="icon">
          <img
            src="../assets/img/public/log-1.png"
            class="img"
            alt="北美陪玩"
          />
          <p>北美陪玩</p>
        </div>
        <ul
          class="list flex justify-content"
          :class="{ iswidth: gametype == 2 }"
        >
          <li class="item">
            <Select
              v-model="rank"
              style="width: 163px"
              placeholder="陪玩游戏类型"
            >
              <Option
                v-for="item in rankList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </li>
          <li class="item" v-if="gametype == 1">
            <Select v-model="position" style="width: 103px" placeholder="身份">
              <Option
                v-for="item in posPlayer"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </li>
          <li class="item">
            <Select
              v-model="priceOrderBy"
              style="width: 103px"
              placeholder="陪玩价格"
            >
              <Option
                v-for="item in privceList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </li>
        </ul>
        <Button
          class="start"
          type="default"
          :loading="loading"
          @click="toQuerPlayerSpeed"
          >开始陪玩</Button
        >

        <!-- <quickBtn class="links"/> -->
      </div>
    </div>
    <matching
      :showMatch="showMatch"
      @closed="closed"
      @load="load"
      :info="info"
      :pageNo="pageNo"
    />
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import matching from "../components/matching";
import bjImage from "../components/bjImage";
import { mapMutations, mapGetters } from "vuex";
import { config } from "../common/config";
import { soundList } from "../common/api/common";
import { querPlayer } from "../common/api/index";
import quickBtn from "../components/quickBtn";

export default {
  components: { cpNav, matching, bjImage, quickBtn },
  name: "Index",
  data() {
    return {
      privceList: [
        {
          value: 1,
          label: "从高到低",
        },
        {
          value: 2,
          label: "从低到高",
        },
        {
          value: 0,
          label: "不限",
        },
      ],
      rankList: [
        {
          value: 1,
          label: "LOL",
        },
        {
          value: 2,
          label: "永劫无间",
        },
        {
          value: 3,
          label: "Valorant DOTA2",
        },
        {
          value: 4,
          label: "apex",
        },
        {
          value: 5,
          label: "cod",
        },
        {
          value: 6,
          label: "csgo",
        },
        {
          value: 7,
          label: "overwatch",
        },
        {
          value: 8,
          label: "pubg",
        },
        {
          value: 9,
          label: "Rainbow6",
        },
        {
          value: 10,
          label: "Steam小游戏",
        },
      ],

      posPlayer: [
        //1 上单 2 3中路 4.AD 5辅助
        { value: 0, label: "不限" },
        { value: 1, label: "小哥哥" },
        { value: 2, label: "小姐姐" },
      ],
      position: 0,
      rank: "",
      showMatch: false,
      priceOrderBy: 0,
      sound: "",
      haveSoundList: [],
      loading: false,
      info: [],
      pageNo: 1,
      loadflag: true,
      rotate: false,
      soundName: "陪玩音色",
    };
  },
  computed: {
    ...mapGetters(["gametype"]),
    newSoundList() {
      let arr = [];
      if (this.haveSoundList.length > 0) {
        arr = [
          ...this.haveSoundList[0].soundList,
          ...this.haveSoundList[1].soundList,
        ];
        arr.push({ value: "", name: "不限" });
        return arr;
      }
    },
  },
  created() {},
  mounted() {
    if (sessionStorage.getItem("_info")) {
      this.info.push(JSON.parse(sessionStorage.getItem("_info")));
      this.toQuerPlayerSpeed();
    }
  },
  methods: {
    ...mapMutations({
      setType: "user/SET_TYPE",
    }),
    start() {
      this.showMatch = true;
    },
    closed() {
      this.showMatch = false;
      this.pageNo = 1;
    },
    select(val, name) {
      console.log(val);
      this.sound = val;
      this.soundName = name;
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    async toQuerPlayerSpeed() {
      if (this.rank == "") {
        this.$Message.warning("请选择陪玩的游戏类型");
        return;
      }
      let data = {
        pwSex: this.position,
        pwPrice: this.priceOrderBy, //价格排序 1 从高到低 2 从低到高
        pwgameType: this.rank,
      };
      console.log(data);
      try {
        this.loading = true;
        this.loadflag = false;
        let res = await querPlayer(data);

        if (res.success) {
          let number = this.randomNum(0, res.data.length - 1);
          console.log(number);
          this.info = [res.data[number]];
          if (res.data.length > 0) {
            this.showMatch = true;
          } else {
            this.$Message.warning("没有匹配到合适陪玩");
          }
        }
        this.loading = false;
        this.loadflag = true;
      } catch (error) {
        this.loading = false;
        this.loadflag = true;
      }
    },
    load() {
      if (this.loadflag) {
        this.pageNo++;
        this.toQuerPlayerSpeed();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.Index {
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 96px;
  overflow-y: auto;
  .bj {
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 1500px;
    z-index: 0;
  }

  .top-nav {
    position: fixed;
    top: 0;
  }
  .main {
    position: relative;
    width: 1200px;
    height: 100%;
    margin: auto;
    z-index: 9;
  }
  .tab {
    position: absolute;
    left: 53px;
    top: 60px;
    height: 28px;
    width: 190px;
    line-height: 28px;
    border: 1px solid rgba(254, 149, 4, 1);
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    z-index: 2;
    .tab-item {
      width: 50%;
      float: left;
      text-align: center;
      cursor: pointer;
      height: 26px;
    }
    .active {
      color: #fff;
      background-color: #fe9504;
    }
  }
  .content {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 1200px;
    // min-height: 450px;
    height: auto;
    margin: auto;
    .icon {
      width: 108px;
      margin: auto;
      font-size: 24px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      .img {
        width: 108px;
        height: 106px;
        margin-bottom: 22px;
      }
    }
    .iswidth {
      width: 410px;
    }
    .list {
      margin: 60px auto 0;
      .item {
        position: relative;
        display: inline-block;
        /deep/ .ivu-select-placeholder {
          font-size: 16px;
          color: rgba(127, 127, 127, 1);
        }
        /deep/ .ivu-select-arrow {
          font-size: 20px;
        }
        /deep/ .ivu-select-item {
          position: relative;
          text-align: center;
          font-size: 12px;
        }
        /deep/ .ivu-select-item-selected {
          color: rgba(251, 153, 10, 1);
        }

        .select {
          // display: block;
          width: 101px;
          height: 30px;
          cursor: pointer;
          position: relative;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid #dcdee2;
          transition: all 0.2s ease-in-out;
          font-size: 20px;
          color: #7f7f7f;
          .ios-arrow-down-user {
            transition: transform 0.2s ease-in-out;
          }
          span {
            font-size: 16px;
          }
          .rotate {
            transform: rotate(180deg);
          }
        }
        .options {
          position: absolute;
          top: 32px;
          left: 0px;
          max-height: 200px;
          overflow: auto;
          margin: 5px 0;
          padding: 5px 0;
          background-color: #fff;
          box-sizing: border-box;
          border-radius: 4px;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
          transform-origin: center top;
          width: 101px;
          height: auto;
          background-color: #fff;
        }
        /deep/ .ivu-dropdown-menu {
          align-items: flex-start;
        }
        .dropList {
          width: 50px;
          height: inherit;
          text-align: center;
          /deep/ .ivu-dropdown-item {
            padding: 0 !important;
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .item:not(:last-child) {
        margin-right: 50px;
      }
    }
    .start {
      display: block;
      margin: 83px auto 0;
      cursor: pointer;
      width: 402px;
      height: 101px;
      line-height: 101px;
      text-align: center;
      background: linear-gradient(
        180deg,
        rgba(240, 182, 52, 1) 0%,
        rgba(254, 146, 1, 1) 100%
      );
      border-radius: 47px;
      font-size: 48px;
      color: rgba(255, 255, 255, 1);
      border: 0;
    }
    .start:hover {
      box-shadow: 0 0 10px rgba(254, 146, 1, 1);
    }
  }
}
.links {
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
  // bottom: 14%;
  margin: 5% auto 0 !important;
  padding: 0;
}
</style>