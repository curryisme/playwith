import fetch from '../axios'
import { tgCode, ghCode, hzCode } from "../config"

//绑定手机
export const bindPhone = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code,
    userId: params.userId
  }
  return fetch.get('user/bindPhone', data)
};
//查询陪玩信息
export const querPlayer = (params) => {
  let data = params
  return fetch.post('napi/peiwan/getPWbyType', data)
};

