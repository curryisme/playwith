<template>
    <div class="bind-phone" :class="{move:!show}">
        <div class="md-title flex align-items" @click="back">
            <Icon type="ios-arrow-back" size="25" />
            <span>绑定手机</span>
        </div>
        <div class="step-wrap">
            <ul class="list">
                <li class="item" :class="{active:step>=1}">1安全验证</li>
                <li class="item" :class="{active:step>=2}">2绑定手机号</li>
                <li class="item" :class="{active:step>=3}">3完成</li>
            </ul>
            <div class="bj-arr" :style="{width:(step*33.3)+'%'}">
                <i></i>
            </div>
        </div>
        <div class="hint" v-if="step==1">为了您的账号安全，请先验证当前手机号</div>
        <div class="hint" v-if="step==2">请设置新的手机</div>

        <div class="input-wrap flex align-items" v-if="step!=3">
            <div class="mr">手机</div>
            <div class="input-box">
                <input
                    type="text"
                    class="phone"
                    v-model="phone"
                    maxlength="11"
                    placeholder="请输入手机号码"
                />
            </div>
        </div>
        <div class="input-wrap flex align-items" v-if="step!=3">
            <div class="mr">验证码</div>
            <div class="code-wrap">
                <input type="text" class="code" v-model="code" placeholder="请输入验证码" />
            </div>
            <div class="btn btnclick unselect" @click="send">{{word}}</div>
        </div>
        <div class="end-wrap" v-if="step==3">
            <img src="../assets/img/icon-complate.png" class="complate" />
            <p class="success">手机更换成功</p>
            <p class="sub">以后可用该手机号登录哦</p>
        </div>
        <div class="next btnclick unselect" @click="next" v-if="step!=3">下一步</div>
        <div class="end btnclick unselect" v-if="step==3" @click="back">下一步</div>
    </div>
</template>

<script>
import { validateMobilePhone, validateMessageCode } from "../common/util/tools";
import { smsCode } from "../common/api/common";
import { checkCode, bindPhone } from "../common/api/user";
import { mapGetters, mapMutations } from "vuex";

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    name: "bindPhone",
    data() {
        return {
            step: 1,
            phone: "",
            code: "",
            word: "获取验证码",
            sendTimer: null,
            time: 60,
            sendMsgDisabled: false,
        };
    },
    computed: {
        ...mapGetters(["userData"]),
    },
    created() {},
    mounted() {
        this.phone = this.userData.phone || "";
    },
    methods: {
        ...mapMutations({
            setUserData: "user/SET_USER_DATA",
        }),
        back() {
            this.step = 1;
            this.code = "";
            this.word = "获取验证码";
            this.sendTimer = null;
            this.time = 60;
            this.sendMsgDisabled = false;
            this.phone = "";
            this.$emit("close");
        },
        //绑定手机 下一步
        async next() {
            if (!validateMobilePhone(this.phone)) {
                this.$Message.warning("请正确填写手机号码");
                return;
            }
            if (this.code == "") {
                this.$Message.warning("请正确填写手机验证码");
                return;
            }
            if (this.step == 1) {
                this.tocheckCode();
            } else {
                this.complate();
            }
        },
        async tocheckCode() {
            try {
                let res = await checkCode({
                    phone: this.phone,
                    code: this.code,
                });
                if (res.resultCode == "0000") {
                    this.$Message.success(res.message);
                    this.phone = "";
                    this.code = "";
                    clearInterval(this.sendTimer);
                    this.word = "获取验证码";
                    this.sendTimer = null;
                    this.time = 60;
                    this.sendMsgDisabled = false;
                    this.step += 1;
                } else {
                    this.$Message.warning(res.message);
                }
            } catch (error) {
                // this.$Message.warning(error.message);
            }
        },
        async complate() {
            try {
                let res = await bindPhone({
                    phone: this.phone, //用户账号（手机号）
                    code: this.code,
                    userId: this.userData.userId,
                });
                if (res.resultCode == "0000") {
                    clearInterval(this.sendTimer);
                    this.word = "获取验证码";
                    this.sendTimer = null;
                    this.time = 60;
                    this.sendMsgDisabled = false;
                    this.step += 1;
                    this.setUserData(
                        Object.assign(this.userData, {
                            phone: this.phone,
                        })
                    );
                    this.cookies.set(
                        "userData",
                        Object(this.userData, {
                            phone: this.phone,
                        })
                    );
                    this.$Message.success(res.message);
                } else {
                    this.$Message.warning(res.message);
                }
            } catch (error) {}
        },
        //发送短信
        async send() {
            if (!validateMobilePhone(this.phone)) {
                this.$Message.warning("请正确填写手机号码");
                return;
            }
            if (this.sendMsgDisabled) {
                return false;
            }
            let data = {
                phone: this.phone,
                type: 1, //1 身份验证验证码 6 信息变更验证码
            };
            if (this.step == 1) {
                data.type = 1;
            } else {
                data.type = 6;
            }
            try {
                this.sendMsgDisabled = true;
                let res = await smsCode(data);
                if (res.resultCode == "9999") {
                    this.word = "获取验证码";
                    clearInterval(that.sendTimer);
                    this.time = 60;
                    this.sendMsgDisabled = false;
                } else {
                    this.sendTimer = setInterval(() => {
                        this.sendMsgDisabled = true;
                        this.time--;
                        this.word = this.time;
                        if (this.time <= 0) {
                            this.sendMsgDisabled = false;
                            clearInterval(this.sendTimer);
                            this.word = "获取验证码";
                            this.time = 60;
                        }
                    }, 1000);
                }
                this.$Message.warning(res.message);
            } catch (err) {
                console.log(err);
            }
        },
    },
    watch: {
        show(val) {
            if (val) {
                this.step = 1;
                this.phone = this.userData.phone || "";
            }
        },
    },
};
</script>
<style lang='scss' scoped>
.bind-phone {
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
    .step-wrap {
        position: relative;
        width: 475px;
        height: 40px;
        margin: 45px auto 70px;
        background-color: #f2f2f2;
        overflow: hidden;
        .list {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            width: 475px;
            height: 40px;
            line-height: 40px;
            .item {
                display: inline-block;
                width: 33.33%;
                font-size: 14px;
                color: rgba(102, 102, 102, 1);
                text-align: center;
                color: #666666;
            }
            .active {
                color: #fff;
            }
        }
        .bj-arr {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            height: 40px;
            background-color: #b6ea29;
            transition: all 0.5s;
            > i {
                position: absolute;
                top: 0;
                right: -20px;
                border-left: 20px solid #b6ea29;
                border-top: 20px solid transparent;
                border-bottom: 20px solid transparent;
            }
        }
    }
    .hint {
        width: 100%;
        padding-left: 35.7%;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        // text-align: center;
        margin-bottom: 14px;
    }
    .input-wrap {
        width: 400px;
        height: 42px;
        margin: 0 auto 30px;
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
            width: 217px;
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
        transform: translateX(35px);
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
    .end-wrap {
        .complate {
            display: block;
            width: 52px;
            height: 52px;
            margin: 0 auto 20px;
        }
        .success {
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
            text-align: center;
            margin-bottom: 10px;
        }
        .sub {
            font-size: 14px;
            text-align: center;
            color: rgba(153, 153, 153, 1);
        }
    }

    .end {
        cursor: pointer;
        width: 139px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin: 40px auto 0;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(
            180deg,
            rgba(240, 182, 52, 1) 0%,
            rgba(254, 146, 1, 1) 100%
        );
        border-radius: 21px;
    }
}
</style>