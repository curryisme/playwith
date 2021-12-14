import fetch from '../axios'
import { config } from '../config';


export const getPWbyId = (params) => {
  let data = params
  return fetch.post('/napi/peiwan/getPWbyId', data)
};
export const getPWbyUserId = (params) => {
  let data = params
  return fetch.post('/napi/peiwan/getPWbyUserId', data)
};
export const addPwGameType = (params) => {
  let data = params
  return fetch.post('/napi/peiwan/addPwGameType', data)
};

export const delPwByid = (params) => {
  let data = params
  return fetch.post('/napi/peiwan/delPwByid', data)
};

export const getUserById = (params) => {
  let data = params
  return fetch.post('/napi/users/getUserById', data)
};
export const updateUserInfo = (params) => {
  let data = params
  return fetch.post('/napi/users/updateUserInfo', data)
};

export const sendCodeByEmail = (params) => {
  let data = params
  return fetch.post('/napi/users/email', data)
};

export const updateEmail = (params) => {
  let data = params
  return fetch.post('/napi/users/updateEmail', data)
};

export const getOrderById = (params) => {
  let data = params
  return fetch.post('/napi/order/getOrderById', data)
};

export const getAllBaoban = () => {
  return fetch.get('/napi/users/getAllBaoban')
};
export const addBaodan = (params) => {
  let data = params
  return fetch.post('/napi/order/addBaodan', data)
};
export const getBaodanBypwid = (params) => {
  let data = params
  return fetch.post('/napi/order/getBaodanBypwid', data)
};
export const getAllBaodan = (params) => {
  let data = params
  return fetch.post('/napi/order/getAllBaodan', data)
};
export const passBaodan = (params) => {
  let data = params
  return fetch.post('/napi/order/passBaodan', data)
};
export const updatepwd = (params) => {
  let data = params
  return fetch.post('/napi/users/updatepwd', data)
};
export const register = (params) => {
  let data = params
  return fetch.post('/napi/users/register', data)
};
//------------

//实名认证
export const auth = (params) => {
  let data = {
    cardBackImg: params.cardBackImg,//份证反面
    cardPreImg: params.cardPreImg,//份证正面
    code: params.code,
    idCard: params.idCard,
    phone: params.phone,
    userId: params.userId,
    userName: params.userName
  }
  return fetch.postFormData('user/auth', data)
};
//个人中心
export const getUserInfo = (params) => {
  let data = {
    userId: params.userId,//用户账号（手机号）
  }
  return fetch.get('user/getUserInfo', data)
};

//修改密码
export const updatePwd = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code,
    password: params.password,
    userId: params.userId,

  }
  return fetch.get('user/updatePwd', data)
};
//校验手机
export const checkCode = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code
  }
  return fetch.get('user/checkCode', data)
};

//绑定手机
export const bindPhone = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code,
    userId: params.userId
  }
  return fetch.get('user/bindPhone', data)
};



//文件上传
export const upload = (file) => {
  let data = {
    file: file,
  }
  return fetch.get('user/upload', data)
};
//找密码
export const forgotPwd = (params) => {
  let data = {
    phone: params.phone,
    code: params.code,
    pwd: params.pwd,
  }
  return fetch.post('user/forgotPwd', data)
};
//提现申请
export const withdraw = (params) => {
  let data = {
    userId: params.userId,
    amount: params.amount,//分
  }
  return fetch.get('consum/withdraw', data)
};
//绑定微信
export const bindWx = (params) => {
  let data = {
    userId: params.userId,
    appId: config.appid,
    openId: params.openId,
    nickName: params.nickName,
    headImg: params.headImg
  }
  return fetch.get('user/bindWx', data)
};

export const wxUserInfos = (params) => {
  console.log('appid=' + config);
  let data = {
    appId: config.appid,
    code: params.code,
  }
  return fetch.get('consum/getWxUserInfo', data)
};