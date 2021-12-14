import fetch from '../axios'
import { tgCode, ghCode, hzCode } from "../config"
//登录
export const login = (params) => {
  let data = {
    userName: params.account,//用户账号
    type: params.type,//登录类型 a 手机验证登录 b 账号密码登录
    code: params.code,
    userPwd: params.password

  }
  return fetch.post('/napi/users/login', data)
};
//注册
export const register = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code,
    password: params.password,
    tgCode: tgCode(),
    ghCode: ghCode(),
    hzCode: hzCode(),

  }
  return fetch.get('/napi/user/register', data)
};
//发送验证码
export const smsCode = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    type: params.type

  }
  return fetch.get('user/smsCode', data)
};
//获取音色
export const soundList = () => {
  return fetch.get('u/getSoundList')
};