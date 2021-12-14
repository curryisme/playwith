var userSqlMap = {
    update: 'UPDATE `user` SET `userName`=?,`userSex`=?,`userTel`=?, `userIntro`=?,`userImg`= ?,`userServer`=?, `userVoice`=?,`userAudio`= ?   WHERE `Id` = ? ; ',
    updatepwd: "UPDATE `user` SET `userPwd`= ? where Id = ?",
    getUser: "SELECT * FROM `user` WHERE userName = ?",
    getUserByEmail: "SELECT * FROM `user` WHERE userEmail = ?",
    getUserById: "SELECT * FROM `user` WHERE Id = ?",
    login: "SELECT * FROM `user` WHERE userName = ? AND userPwd = ?",
    register: "INSERT INTO `user`(`userName`, `userPwd`,userType,userIntro,userSex,userBrith,`Id`) VALUES (?,?,?,?,?,?,?)",
    updateCode: 'UPDATE `user` SET `userCode`=?,`userCodeTime`=? WHERE `Id` = ? ; ',
    updateEmailById: 'UPDATE `user` SET `userEmail`=? WHERE `Id` = ? ; ',
    getAllBaoban: "select Id,userName,userEmail,userImg,userSex from `user` WHERE userType = 2"
};

module.exports = userSqlMap;