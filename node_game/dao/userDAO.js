var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
function promiseAjaxData(sql, arr) {
    return new Promise((resolved, rejected) => {

    });
}
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
module.exports = {
    update: function (user, callback) {
        pool.query(userSqlMap.update, user, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    updatepwd: function (user, callback) {
        pool.query(userSqlMap.updatepwd, user, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    login: function (user, callback) {
        pool.query(userSqlMap.login, user, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    getUser: function (user, callback) {
        return new Promise((resolved, rejected) => {
            pool.query(userSqlMap.getUser, user, function (error, result) {
                if (error) throw error;
                resolved(result);
            });
        });
    },
    getUserByEmail: function (user, callback) {
        return new Promise((resolved, rejected) => {
            pool.query(userSqlMap.getUserByEmail, user, function (error, result) {
                if (error) throw error;
                callback(result);
            });
        });

    },
    getUserByIdPromise: function (user) {
        return new Promise((resolved, rejected) => {
            pool.query(userSqlMap.getUserById, user, function (error, result) {
                if (error) throw error;
                resolved(result);
            });
        });
    },

    getUserById: function (user, callback) {
        return new Promise((resolved, rejected) => {
            pool.query(userSqlMap.getUserById, user, function (error, result) {
                if (error) throw error;
                callback(result);
            });
        });

    },
    register: function (user, callback) {
        this.getUser(user).then(res => {
            if (res.length > 0) {
                callback("用户名已经存在");
                return;
            }
            user = [...user, uuid()]
            console.log(user)
            pool.query(userSqlMap.register, user, function (error, result) {
                if (error) throw error;
                callback(result.affectedRows > 0);
            });
        })
    },
    updateEmailById: function (user) {
        return new Promise((resolved, rejected) => {
            pool.query(userSqlMap.updateEmailById, user, function (error, result) {
                if (error) throw error;
                resolved(result);
            });
        });
    },
    updateCode: function (user, callback) {
        pool.query(userSqlMap.updateCode, user, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    getAllBaoban: function (user, callback) {
        pool.query(userSqlMap.getAllBaoban, user, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
};
