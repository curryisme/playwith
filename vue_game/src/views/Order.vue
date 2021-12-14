<template>
  <div class="detail">
    <cpNav />
    <bjImage >
        <img src="../assets/img/public/3.jpeg" alt="">
      </bjImage>
    <div class="container">
      <div class="tab">我的订单</div>
      <div class="order-info">
        <div class="title">订单信息</div>
        <div class="wrap">
          <table class="table">
            <tr class="thead">
              <th width="150px">陪玩</th>
              <th>昵称</th>
              <th>服务类型</th>
              <th>单价（元/局)</th>
              <th>购买数量</th>
              <th width="200px">总量</th>
            </tr>
            <tr class="tbody">
              <td>
                <img :src="info.headImg" class="head" v-if="info.headImg" />
                <img src="../assets/img/loginu.png" class="head" v-else />
              </td>
              <td>{{info.nickName}}</td>
              <td>
                <span class="price" v-if="type==1">英雄联盟</span>
                <span class="price" v-else>云顶之弈</span>
              </td>
              <td>
                ¥
                <span class="price" v-if="type==1">{{(info.riftPrice/100).toFixed(2)}}</span>
                <span class="price" v-else>{{ (info.tacticsPrice/100).toFixed(2)}}</span>
              </td>
              <td>
                <div class="math">
                  <img
                    src="../assets/img/iocn-subtract.png"
                    class="icon"
                    :class="{opacity:num<=1}"
                    @click="subtract"
                  />
                  <input type="text" v-model="num" maxlength="2" />
                  <img src="../assets/img/icon-add.png" class="icon" @click="add" />
                </div>
              </td>
              <td>
                ¥
                <span class="price" v-if="type==1">{{((info.riftPrice/100)*num).toFixed(2)}}</span>
                <span class="price" v-else>{{ ((info.tacticsPrice/100)*num).toFixed(2)}}</span>
              </td>
            </tr>
          </table>
          <textarea id="textarea" placeholder="备注说明:" v-model="remark"></textarea>
        </div>
      </div>
      <!-- <div class="pay-weap">
                <div class="title">支付方式</div>
                <ul class="list unselect">
                    <li class="item" :class="{active:payMethod==1}" @click="payMethod=1">
                        <img src="../assets/img/icon-alipay.png" class="icon-pay" />
                        <p>支付宝支付</p>
                    </li>
                    <li class="item" :class="{active:payMethod==2}" @click="payMethod=2">
                        <img src="../assets/img/icon-wechat.png" class="icon-pay" />
                        <p>微信支付</p>
                    </li>
                </ul>
      </div>-->
      <div class="btn-wrap">
        <p>
          实付金额:
          <span>
            <span class="tag">¥</span>

            <span class="price" v-if="type==1">{{((info.riftPrice/100)*num).toFixed(2)}}</span>
            <span class="price" v-else>{{ ((info.tacticsPrice/100)*num).toFixed(2)}}</span>
          </span>
        </p>
        <button class="btnclick" type="default" :loading="loading" @click="toOrder">提交订单</button>
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
import { mapMutations, mapGetters } from "vuex";
import { order } from "../common/api/index";
import { getUserInfo } from "../common/api/user";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot ,bjImage},
  name: "Order",
  data() {
    return {
      num: 1,
      payMethod: 1,
      info: "",
      type: "",
      id: "",
      remark: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userData", "balance","userInfo"]),
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.info = sessionStorage.getItem("_playerInfos")
      ? JSON.parse(sessionStorage.getItem("_playerInfos"))
      : "";
    if (!this.info) {
      this.gotUserInfo();
    }
  },
  methods: {
    add() {},
    subtract() {
      if (this.num <= 1) {
        this.num = 1;
        return;
      }
      this.num--;
    },
    add() {
      this.num++;
    },
    async toOrder() {
      let price = this.type == 1 ? this.info.riftPrice : this.info.tacticsPrice;
      if (this.balance < price * this.num) {
        this.$Message.warning("账户余额不足,请充值");
        return;
      }
      try {
        this.loading = true;
        let orderMoney = this.num * price;
        let res = await order({
          orderMoney: orderMoney, //
          orderNum: this.num, //
          orderType: this.type, //
          price: price, //
          toUserId: this.id, //
          userId: this.userData.userId, //
          source: "", //
          remark: this.remark,
          isNew:this.userInfo.isNew||'0'
        });
        if (res.resultCode == "0000") {
          this.$Message.success("下单成功");
          this.$router.openPage("/orderList");
        } else {
          this.$Message.warning(res.message);
        }
      } catch (error) {}
    },
    async gotUserInfo() {
      if (!this.id) return;
      try {
        let res = await getUserInfo({
          userId: this.id || "",
        });
        if (res.resultCode == "0000") {
          this.info = res.data;
        }
      } catch (error) {}
    },
  },
  watch: {
    num(val) {
      this.num = val.replace(/[^\d]/g, "");
    },
  },
};
</script>
<style lang='scss' scoped>
.detail {
  position: relative;
  width: 100%;
  // background-attachment: fixed;
  // background-image: url("../assets/img/public/bj.jpg");
  // background-repeat: no-repeat;
  // background-size: cover;
  .container {
    position: relative;
    width: 1200px;
    margin: 50px auto 0;
    z-index: 9;
    .tab {
      width: 1200px;
      height: 60px;
      line-height: 60px;
      padding: 0 40px;
      background: rgba(255, 255, 255, 1);
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
    }
    .order-info {
      width: 1200px;
      height: 414px;
      margin-top: 15px;
      background: rgba(255, 255, 255, 1);
      .title {
        width: 100%;
        height: 45px;
        line-height: 45px;
        padding: 0 40px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid #e0e0e0;
      }
      .wrap {
        width: 1040px;
        margin: auto;
        height: 284px;
        margin-top: 35px;
        border: 1px solid rgba(223, 223, 223, 1);
        #textarea {
          width: 1038px;
          height: 119px;
          border: 0;
          padding: 15px 20px;
          resize: none;
        }
      }
      .table {
        width: 1040px;
        text-align: center;
        .thead {
          background: #dfdfdf;
          font-size: 14px;
          height: 60px;
          color: rgba(102, 102, 102, 1);
        }
        th {
          text-align: center;
        }
        .tbody {
          height: 102px;
          border-bottom: 1px solid rgba(223, 223, 223, 1);
          font-size: 18px;
          color: rgba(51, 51, 51, 1);
          .math {
            .icon {
              width: 22px;
              height: 22px;
              display: inline-block;
              cursor: pointer;
              transform: translateY(5px);
            }
            input {
              width: 38px;
              border: 0;
              font-size: 16px;
              color: rgba(141, 141, 141, 1);
              text-align: center;
              border-bottom: 1px solid #dfdfdf;
            }
            .opacity {
              opacity: 0.2;
            }
          }
        }
        .head {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    .pay-weap {
      width: 1200px;
      height: 180px;
      margin-top: 15px;
      background: rgba(255, 255, 255, 1);
      .title {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding: 0 40px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid #e0e0e0;
      }
      .list {
        padding: 12px 40px;
        .item {
          display: inline-block;
          font-size: 14px;
          width: 130px;
          height: 90px;
          padding-top: 10px;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          margin-right: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: pointer;
          .icon-pay {
            display: block;
            margin: auto;
            width: 44px;
            height: 44px;
            margin-bottom: 12px;
          }
        }
        .active {
          background: #f8f4f3;
          border: solid 1px #ff5d42;
          color: #ff5d42;
        }
      }
    }
    .btn-wrap {
      width: 1200px;
      height: 125px;
      margin-top: 15px;
      padding: 15px 40px;
      background: rgba(255, 255, 255, 1);
      p {
        text-align: right;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        span {
          color: #f96c9a;
          font-size: 18px;
          .tag {
            font-size: 14px;
          }
        }
      }
      button {
        float: right;
        width: 150px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        margin-top: 15px;
        background: linear-gradient(
          180deg,
          rgba(240, 182, 52, 1) 0%,
          rgba(254, 146, 1, 1) 100%
        );
        border-radius: 15px;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        border: 0;
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
</style>