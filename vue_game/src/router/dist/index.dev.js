"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Index = _interopRequireDefault(require("../views/Index.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

_vueRouter["default"].prototype.openPage = function (link, query) {
  // let channel = Vue.prototype.cookies.get('channel') || 'sdxh5';
  // let comeFrom = Vue.prototype.cookies.get('comeFrom') || '';
  this.push({
    path: link,
    query: Object.assign({// 'channel': channel,
      // 'comeFrom': comeFrom
    }, query)
  });
};

var routes = [{
  path: '/',
  name: 'Index',
  component: _Index["default"]
}, {
  path: '/playHall',
  name: 'PlayHall',
  meta: {
    title: ' 陪玩厅'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/PlayHall.vue'));
    });
  }
}, {
  path: '/detail',
  name: 'detail',
  meta: {
    title: '详情'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Detail.vue'));
    });
  }
}, {
  path: '/order',
  name: 'order',
  meta: {
    title: '我的订单'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Order.vue'));
    });
  }
}, {
  path: '/comments',
  name: 'comments',
  meta: {
    title: '评论'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Comments.vue'));
    });
  }
}, {
  path: '/refund',
  name: 'refund',
  meta: {
    title: '退款'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Refund.vue'));
    });
  }
}, {
  path: '/mine',
  name: 'mine',
  meta: {
    title: '个人中心'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Mine.vue'));
    });
  }
}, {
  path: '/findpass',
  name: 'findpass',
  meta: {
    title: '找回密码'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/FindPass.vue'));
    });
  }
}, {
  path: '/modifyUserInfo',
  name: 'modifyUserInfo',
  meta: {
    title: '修改用户信息'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/ModifyUserInfo.vue'));
    });
  }
}, {
  path: '/chat',
  name: 'chat',
  meta: {
    title: '聊天页面'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Chat.vue'));
    });
  }
}]; // getMoney

var router = new _vueRouter["default"]({
  mode: 'history',
  // mode: 'hash',
  // base: process.env.BASE_URL,
  base: '/',
  routes: routes
});
var _default = router;
exports["default"] = _default;