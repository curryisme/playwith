import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)


VueRouter.prototype.openPage = function (link, query) {
  this.push({
    path: link,
    query: Object.assign({
    }, query)
  })
}


const routes = [{
  path: '/',
  name: 'Index',
  component: Index
},
{
  path: '/login',
  name: 'Login',
  component: () => import( /* webpackChunkName: "about" */ '../components/login.vue')
},
{
  path: '/playHall',
  name: 'PlayHall',
  meta: {
    title: ' 陪玩厅'
  },
  component: () => import( /* webpackChunkName: "about" */ '../views/PlayHall.vue')
},
{
  path: '/detail',
  name: 'detail',
  meta: {
    title: '详情'
  },
  component: () => import('../views/Detail.vue')
},
{
  path: '/mine',
  name: 'mine',
  meta: {
    title: '个人中心'
  },
  component: () => import('../views/Mine.vue')
},
{
  path: '/findpass',
  name: 'findpass',
  meta: {
    title: '找回密码'
  },
  component: () => import('../views/FindPass.vue')
},
{
  path: '/modifyUserInfo',
  name: 'modifyUserInfo',
  meta: {
    title: '修改用户信息'
  },
  component: () => import('../views/ModifyUserInfo.vue')
},
{
  path: '/pwCenter',
  name: 'pwCenter',
  meta: {
    title: '陪玩中心'
  },
  component: () => import('../views/pwCenter.vue')
},
{
  path: '/zhuwanganme',
  name: 'zhuwanganme',
  meta: {
    title: '主玩游戏'
  },
  component: () => import('../views/zhuwanganme.vue')
},
{
  path: '/baodanManage',
  name: 'baodanManage',
  meta: {
    title: '主玩游戏'
  },
  component: () => import('../views/baodanManage.vue')
},
{
  path: '/addbaodan',
  name: 'addbaodan',
  meta: {
    title: '我要报单'
  },
  component: () => import('../views/addbaodan.vue')
},


]
// getMoney
const router = new VueRouter({
  routes
})

export default router