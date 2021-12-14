<template>
  <div class="wechat">
    <div class="icon">
      <img src="../assets/img/public/log-1.png" class="img" alt="北美陪玩" />
      <p>北美陪玩</p>
    </div>
  </div>
</template>

<script>
import { bindWx, wxUserInfos, getUserInfo } from "../common/api/user";
import { config } from "../common/config";
export default {
  components: {},
  name: "wechatGetM",
  data() {
    return {
      userId: "",
      code: "",
      userInfo: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.userId = this.$route.query.userId || "";
    this.code = this.$route.query.code || "";

    this.$nextTick(() => {
      setTimeout(() => {
        if (!this.code) {
        } else {
          this.getWxUserInfo();
        }
      }, 1000);
    });
  },
  methods: {
    //获取用户微信信息
    async getWxUserInfo() {
      try {
        let res = await wxUserInfos({
          code: this.code,
        });
        if (res.resultCode == "0000") {
          this.bindConsumer(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async bindConsumer(data) {
      try {
        let res = await bindWx({
          userId: this.userId,
          openId: data.openid,
          nickName: data.nickname,
          headImg: data.headimageurl,
        });
        if (res.resultCode == "0000") {
          this.$Message.success("绑定成功，请到提现页面提取盈利");
        } else {
          console.log(error);
          this.$Message.erroe(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.wechat {
  width: 100%;
  height: 100vh;
  background: url("../assets/img/public/phone-bj.jpeg") center no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.img {
  display: block;
  width: 80px;
  margin: 30% auto 10px;
}
p {
  text-align: center;
  font-size: 20px;
}
</style>