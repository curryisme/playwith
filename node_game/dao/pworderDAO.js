const e = require('express');
var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var pwoderSqlMap = require('./pwoderSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
function promiseAjaxData(sql, arr) {
    return new Promise((resolved, rejected) => {

    });
}

module.exports = {
    addBaodan: function (user, callback) {
        pool.query(pwoderSqlMap.addBaodan, user, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    passBaodan: function (user, callback) {
        pool.query(pwoderSqlMap.passBaodan, user, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    getOrderById: function (user, callback) {
        pool.query(pwoderSqlMap.getOrderById, user, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    getBaodanByflag: function (user, callback) {
        pool.query(pwoderSqlMap.getBaodanByflag, user, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    getAllBaodan: function (user, callback) {
        pool.query(pwoderSqlMap.getAllBaodan, user, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    getBaodanByflagAndpwid: function (user, callback) {
        pool.query(pwoderSqlMap.getBaodanByflag, user, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    getBaodanBypwid: function (user, callback) {
        pool.query(pwoderSqlMap.getBaodanBypwid, user, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    delBaodanById: function (user, callback) {
        pool.query(pwoderSqlMap.delBaodanById, user, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
};
