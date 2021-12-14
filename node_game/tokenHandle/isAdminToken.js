const e = require('express');
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1];
    let decoded = jwt.decode(token);
    if (decoded == null) {
      res.json({
        success: false,
        token: false,
        error: '非法的token'
      });
    }
    else if (
      token &&
      decoded.exp !== undefined &&
      decoded.exp <= Date.now() / 1000
    ) {
      return res.json({
        success: false,
        token: false,
        error: '无效token，请登录'
      });
    } else if (decoded.exp == undefined) {
      res.json({
        success: false,
        token: false,
        error: '非法token'
      });
    } else {
      if(decoded.type == 3){
        next()
      }else{
        res.json({
          success: false,
          token: false,
          error: '权限不足'
        });
      }
    }
  } else {
    return res.json({
      success: false,
      token: false,
      error: '未提供token'
    });
  }
};
