var express = require('express');
var router = express.Router();
var pworderDAO = require('../dao/pworderDAO');
var result = require('../model/result');
var time = require('../utils/time')
const isVailToken = require('../tokenHandle/isVailToken');
const isAdminToken = require('../tokenHandle/isAdminToken');
const isPwToken = require('../tokenHandle/isPwToken');

router.post('/addBaodan', isPwToken, function (req, res) {
    let { pwordertime,
        pworderduration,
        pworderprice,
        pworderlaobanid,
        pworderpwid,
        pworderxm,
        pwinfo,
        pworderlaobanUsername, pwordercreatetime
    } = req.body
    let userdata = [pwordertime, parseFloat(pworderduration), parseFloat(pworderprice), pworderlaobanid, pworderpwid, pworderxm, pwinfo, pworderlaobanUsername, time.getNowFormatDate()]
    pworderDAO.addBaodan(userdata, function (userdata) {
        res.json(result.createResult(true, "报单成功"));
    });
})

router.post('/getOrderById', isPwToken, function (req, res) {
    let { pworderpwid } = req.body
    let userdata = [pworderpwid]
    pworderDAO.getOrderById(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})


router.post('/passBaodan', isAdminToken, function (req, res) {
    let {
        pworderflag,
        pworderid
    } = req.body
    let userdata = [parseInt(pworderflag), parseInt(pworderid)]
    pworderDAO.passBaodan(userdata, function (userdata) {
        res.json(result.createResult(true, "操作成功"));
    });
})

//通过类型获取订单列表-admin
router.post('/getBaodanByflag', isVailToken, function (req, res) {
    let {
        pworderflag,
    } = req.body
    let userdata = [parseInt(pworderflag)]
    pworderDAO.getBaodanByflag(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})

//通过类型获取订单列表-admin
router.post('/getAllBaodan', isAdminToken, function (req, res) {
    pworderDAO.getAllBaodan([], function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})

//通过类型和陪玩id获取订单列表-陪玩
router.post('/getBaodanByflagAndpwid', isVailToken, function (req, res) {
    let {
        pworderflag,
        pworderpwid
    } = req.body
    let userdata = [parseInt(pworderflag), pworderpwid]
    pworderDAO.getBaodanByflagAndpwid(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})

//通过陪玩id获取订单列表-陪玩
router.post('/getBaodanBypwid', isPwToken, function (req, res) {
    let {
        pwuserid
    } = req.body
    let userdata = [pwuserid]
    pworderDAO.getBaodanBypwid(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})

//删除某条订单
router.post('/delBaodanById', isVailToken, function (req, res) {
    let {
        pworderid,
    } = req.body
    let userdata = [parseInt(pworderid)]
    pworderDAO.delBaodanById(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})


module.exports = router;
