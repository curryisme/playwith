<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script >
import Login from "./components/login";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getUserById } from "./common/api/user";

export default {
  components: { Login },
  name: "",
  data() {
    return {
      userData: "",
    };
  },
  created() {
    this.userData = this.cookies.get("userData")
      ? JSON.parse(this.cookies.get("userData"))
      : "";
    this.setUserData(this.userData);
  },
  computed: {
    ...mapGetters({
      current: "current",
    }),
  },
  mounted() {
    this.gotUserInfo();
  },
  watch: {
    $route(to, from) {},
  },
  methods: {
    ...mapActions({
      getBalance: "user/getBalance",
    }),
    ...mapMutations({
      setUserData: "user/SET_USER_DATA",
      setType: "user/SET_TYPE",
      setUserInfo: "user/SET_USER_INFO",
      startComputeCurrent: "user/startComputeCurrent",
      getuserInfo: "user/GET_USER_INFO",
    }),
    async gotUserInfo() {
      if (!this.userData) return;
      try {
        let res = await getUserById({
          userId: this.userData.Id || "",
        });
        if (res.result) {
          this.setUserInfo(res.data);
        }
      } catch (error) {}
    },
    imLogin() {},
  },
};
</script>
<style lang="scss">
// #app{
//   background: url("./assets/img/public/bj.jpg") center no-repeat;
//   background-size: cover;
// }
</style>
