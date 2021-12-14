import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import "./assets/css/reset.css"
Vue.config.productionTip = false
Vue.prototype.cookies = Cookies;
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import "./assets/css/animate.css"
import 'swiper/swiper-bundle.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { config } from "./common/config"
import VueQriously from 'vue-qriously'
import { MessageBox, Row, Col, Button, Input, Loading, Dialog, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

import Avatar from './components/avatar.vue'
import './assets/icon/iconfont.css'
import './assets/icon/tim.css'
window.store = store
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.$store = store
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.component('avatar', Avatar)


Vue.use(VueQriously)
Vue.use(ElementUI);
Vue.use(ViewUI);

if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;


router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  // console.log();
  window.scrollTo(0, 0);
})

Vue.filter('phone', (val) => {
  if (!val) return;
  return val.slice(0, 3) + '****' + val.slice(7, 11);
})
Vue.filter('posplayer', (val) => {
  if (!val) return;
  let arr = val.split(',');
  let arrays = [];
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < config.posPlayer.length; i++) {
      if (config.posPlayer[i].value == String(arr[j])) {
        arrays.push(config.posPlayer[i].label);
      }
    }
  }
  return arrays.join(',')

})
// birthDate
Vue.filter('birthDate', (val) => {
  if (!val) return '';
  let time = new Date();
  let y = time.getFullYear();
  let userY = val.split('-')[0];
  return y - userY

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
