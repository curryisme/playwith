<template>
    <div class="quickBtn">
        <div class="btn-wrap">
            <img src="../assets/img/icon-doogWithPlay.png" class="icon" />
            <p>优质陪玩</p>
        </div>
        <div class="btn-wrap">
            <img src="../assets/img/icon-quick.png" class="icon icon1" />
            <p>快速接单</p>
        </div>
        <div class="btn-wrap">
            <img src="../assets/img/icon-find.png" class="icon icon2" />
            <p>寻找伙伴</p>
        </div>
        <div class="btn-wrap">
            <img src="../assets/img/icon-boysAndgrils.png" class="icon icon3" />
            <p>男神女神</p>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    name: "quickBtn",
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang='scss' scoped>
.quickBtn {
    position: relative;
    width: 1200px;
    text-align: center;
    padding: 100px 0 50px;
    color: #fff;
    margin: auto;
    z-index: 9;
    .btn-wrap {
        cursor: pointer;
        display: inline-block;
        margin: 0 60px;
        text-align: center;
        .icon {
            display: block;
            width: 40px;
            height: 40px;
            margin: 0 auto 16px;
        }
        .icon1 {
            width: 35px;
        }
        .icon2 {
            width: 53px;
        }
        .icon3 {
            width: 67px;
        }
    }
}
</style>