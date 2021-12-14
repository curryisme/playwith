const e = require('express');
var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var peiwanSqlMap = require('./peiwanSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
function promiseAjaxData(sql, arr) {
    return new Promise((resolved, rejected) => {
    });
}

module.exports = {
    getPWbyType: function (user, callback) {
        console.log(user)
        let sexSql = "", pwPriceSql = ""
        if (user[1] !== 0) {
            sexSql = " and `user`.userSex =" + user[1]
        }
        //0 代表无限制，1代表从大到小 ，2代表从小到大
        if (user[2] === 1) {
            pwPriceSql = " order by `peiwang`.pwprice desc"
        } else if (user[2] === 2) {
            pwPriceSql = " order by `peiwang`.pwprice asc"
        }
        pool.query(peiwanSqlMap.getPWbyType + sexSql + pwPriceSql, [user[0]], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    isExist: function (user) {
        return new Promise((resolved, rejected) => {
            pool.query(peiwanSqlMap.isExist, user, function (error, result) {
                if (error) throw error;
                resolved(result);
            });
        })
    },
    addPwGameType: function (user) {
        return new Promise((resolved, rejected) => {
            pool.query(peiwanSqlMap.addPwGameType, user, function (error, result) {
                if (error) throw error;
                resolved(result);
            });
        })
    },
    getPWbyId: function (user) {
        return new Promise((resolved, rejected) => {
            pool.query(peiwanSqlMap.getPWbyId, user, function (error, result) {
                if (error) throw error;
                resolved(result);
            });
        })
    },
    getPWbyUserId: function (user) {
        return new Promise((resolved, rejected) => {
            pool.query(peiwanSqlMap.getPWbyUserId, user, function (error, result) {
                if (error) throw error;
                resolved(result);
            });
        })
    }
};
