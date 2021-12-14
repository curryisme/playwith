var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');
var result = require('../model/result');
const nodemailer = require('nodemailer');
var email = require('../conf/email');
const addTokenList = require('../tokenHandle/addTokenList');
const isVailToken = require('../tokenHandle/isVailToken');

//登陆页
router.post('/login', function (req, res) {
    let userdata = [req.body.userName, req.body.userPwd]
    userDAO.login(userdata, function (userdata) {
        if (userdata.length == 0) {
            res.json(result.createResult(false, "账号或者密码错误"));
        } else {
            console.log(req.body.userName, userdata[0].userType)
            let userToken = addTokenList(req.body.userName, userdata[0].userType)
            userdata[0].userToken = userToken
            res.json(result.createResult(true, userdata));
        }
    });
})

//修改密码
router.post('/updatepwd', isVailToken, function (req, res) {
    let userdata = [req.body.userName, req.body.opwd]
    let userdata2 = [req.body.npwd, req.body.userId]
    userDAO.login(userdata, function (userdata) {
        if (userdata.length == 0) {
            res.json(result.createResult(false, "旧密码错误"));
        } else {
            userDAO.updatepwd(userdata2, function (userdata) {
                res.json(result.createResult(true, userdata));
            });
        }
    });
})

//修改
router.post('/updateUserInfo', isVailToken, function (req, res) {
    let userdata = [req.body.userName, req.body.userSex, req.body.userTel, req.body.userIntro, req.body.userImg, req.body.userServer, req.body.userVoice, req.body.userAudio, req.body.Id]
    userDAO.update(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})

//注册
router.post('/register', function (req, res) {
    let userdata = [req.body.userName, req.body.userPwd, req.body.userType, req.body.userIntro, req.body.userSex, req.body.userBrith]
    userDAO.register(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})

router.post('/email', function (req, res) {

    //查找邮箱是否被注册
    userDAO.getUserByEmail([req.body.email], function (emailResult) {
        console.log(req.body.email)
        //查询邮箱是否被绑定
        if (emailResult.length == 0) {
            let transporter = nodemailer.createTransport({
                // host: 'smtp.ethereal.email',
                service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
                secureConnection: true,
                auth: {
                    user: '13414849536@163.com',//你的邮箱
                    // 这里密码不是qq密码，是你设置的smtp授权码
                    pass: 'MOIQBJXOLMWYVNHZ',
                }
            });

            let code = Math.floor(Math.random() * 1000000); //存入验证码
            let time = new Date().getTime(); //存入发送验证码的时间戳

            let mailOptions = {
                from: '官方<13414849536@163.com>', 
                to: `13414849536@163.com,${req.body.email}`, 
                subject: '官网', 
                html: email.getEmail(code, time) 
            };

            let userdata = [code, time, req.body.Id]
            console.log(userdata)
            userDAO.updateCode(userdata, function (userdata) {
                if (userdata) {
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        res.json(result.createResult(userdata, "success"));
                    });
                } else {
                    res.json(result.createResult(userdata, "success"));
                }
            });
        } else {
            res.json(result.createResult(false, "邮箱已经被绑定"));
        }
    });



});

//修改邮箱
router.post('/updateEmail', async function (req, res) {
    let userdata = [req.body.userEmail, req.body.Id]
    let userdata2 = [req.body.Id]
    let t1 = await userDAO.getUserByIdPromise(userdata2)
    if (t1.length > 0) {
        let e = t1[0].userCode
        if (e === req.body.userCode) {
            let t2 = await userDAO.updateEmailById(userdata)
            res.json(result.createResult(true, t1[0]));
        } else {
            res.json(result.createResult(false, "验证码错误"));
        }
    } else {
        res.json(result.createResult(false, "未知错误"));
    }
})



//登陆页
router.post('/getUserById', isVailToken, function (req, res) {
    let userdata = [req.body.userId]
    userDAO.getUserById(userdata, function (userdata) {
        if (userdata.length == 0) {
            res.json(result.createResult(false, "获取失败"));
        } else {
            res.json(result.createResult(true, userdata[0]));
        }
    });
})

//获取所有老板
router.get('/getAllBaoban', isVailToken, function (req, res) {
    let userdata = []
    userDAO.getAllBaoban(userdata, function (userdata) {
        res.json(result.createResult(true, userdata));
    });
})

module.exports = router;
