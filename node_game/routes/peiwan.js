var express = require('express');
var router = express.Router();
var peiwanDAO = require('../dao/peiwanDAO');
var result = require('../model/result');
const isVailToken = require('../tokenHandle/isVailToken');
const isAdminToken = require('../tokenHandle/isAdminToken');
const isPwToken = require('../tokenHandle/isPwToken');

//获取陪玩列表
router.post('/getPWbyType', function (req, res) {
    let userdata = [parseInt(req.body.pwgameType), parseInt(req.body.pwSex), parseInt(req.body.pwPrice)]
    peiwanDAO.getPWbyType(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})


//添加陪玩
router.post('/addPwGameType', isPwToken, async function (req, res) {
    let userdata = [parseInt(req.body.gamestype), parseFloat(req.body.pwprice), req.body.pwuserid]
    let t1;
    t1 = await peiwanDAO.isExist([parseInt(req.body.gamestype), req.body.pwuserid]);
    if (t1.length > 0) {
        res.json(result.createResult(false, "已存在列表，不可重复添加"));
    } else {
        peiwanDAO.addPwGameType(userdata, function (userdata) {
        });
        res.json(result.createResult(true, "添加成功"));
    }

})

function isInteger(obj) {
    return typeof obj === 'number' && obj % 1 === 0
}
//获取陪玩详情
router.post('/getPWbyId', async function (req, res) {
    let userdata = [req.body.pwuserid]
    let t1;
    t1 = await peiwanDAO.getPWbyId(userdata);
    res.json(result.createResult(true, t1));
})
//获取我能陪玩的列表
router.post('/getPWbyUserId', isPwToken,async function (req, res) {
    let userdata = [req.body.pwuserid]
    let t1;
    t1 = await peiwanDAO.getPWbyUserId(userdata);
    res.json(result.createResult(true, t1));
})


module.exports = router;
