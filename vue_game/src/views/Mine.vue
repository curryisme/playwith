<template>
  <div class="detail">
    <cpNav />
    <bjImage>
      <img src="../assets/img/public/4.jpeg" alt />
    </bjImage>
    <div class="container clearfix">
      <div class="nav fl" :style="{ height: clientHeight + 'px' }">
        <div class="item" :class="{ active: type == 2 }" @click="type = 2">
          个人中心
        </div>
        <div class="item" :class="{ active: type == 3 }" @click="type = 3">
          修改密码
        </div>
      </div>
      <div class="content lr" ref="content">
        <setInfo v-if="type == 2" />
        <editorInfo v-if="type == 3" />
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
import setInfo from "../components/setInfo";
import editorInfo from "../components/editorInfo";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot, setInfo, editorInfo, bjImage },
  name: "mine",
  data() {
    return {
      type: 2,
      clientHeight: "",
    };
  },
  computed: {
    content() {
      if (this.$refs.content) {
        return this.$refs.content.clientHeight;
      }
    },
  },
  created() {
    this.type = this.$route.query.type || 2;
  },
  mounted() {},
  methods: {},
  watch: {
    type() {
      this.$nextTick(() => {
        if (this.$refs.content) {
          this.clientHeight = this.$refs.content.clientHeight;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.detail {
  position: relative;
  width: 100%;
  //   background-attachment: fixed;
  //   background-image: url("../assets/img/public/bj.jpg");
  //   background-repeat: no-repeat;
  //   background-size: cover;
  .container {
    position: relative;
    width: 1200px;
    min-height: 670px;
    margin: 50px auto 0;
    background-color: #fff;
    z-index: 9;
    .nav {
      width: 205px;
      min-height: 670px;
      height: 100%;
      background-color: #f2f2f2;
      .item {
        cursor: pointer;
        width: 205px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
      }
      .active {
        background: rgba(230, 230, 230, 1);
      }
    }
    .content {
      width: 995px;
      height: 100%;
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