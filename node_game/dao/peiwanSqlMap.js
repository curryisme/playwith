var peiwanSqlMap = {
    getPWbyType: "SELECT Id,peiwanid,pwgameType,pwprice,pwuserid,userAudio,userBrith,userServer,userImg,userIntro,userName,userSex,userVoice FROM `peiwang`,`user` WHERE pwgameType = ? and `user`.id = `peiwang`.pwuserid    ",
    getPWbyId: "SELECT * FROM `peiwang`,`user` WHERE pwgameType = 1 and `user`.id = `peiwang`.pwuserid   and   `peiwang`.pwuserid = ?",
    getPWbyUserId: "SELECT * FROM `peiwang`,`games` WHERE `games`.gamestype=`peiwang`.pwgameType and   `peiwang`.pwuserid = ?",
    login: "SELECT * FROM `user` WHERE userName = ? AND userPwd = ?",
    isExist: "SELECT * FROM `peiwang` where pwgameType=? and  pwuserid =?",
    register: "INSERT INTO `user`(`userName`, `userPwd`) VALUES (?,?)",
    addPwGameType: "INSERT INTO `peiwang`(`pwgameType`, `pwprice`, `pwuserid`) VALUES (?,?,?)"

};

module.exports = peiwanSqlMap;