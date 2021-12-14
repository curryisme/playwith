var pwoderSqlMap = {
    addBaodan: `INSERT INTO pworder(pwordertime,pworderduration,pworderprice,pworderlaobanid,pworderpwid,pworderxm, pwinfo, pworderlaobanUsername,pwordercreatetime) VALUES (?,?,?,?,?,?,?,?,?)`,
    passBaodan: "update pworder set pworderflag = ? where pworderid = ?",
    getOrderById: "select * from pworder where pworderpwid = ?",
    getBaodanByflag: "select * from pworder where pworderflag = ?",
    getAllBaodan: "select pworder.*, userName from `pworder`, `user` where `pworder`.pworderpwid = `user`.Id",
    getBaodanBypwid: "select * from pworder where pworderpwid = ?",
    getBaodanByflagAndpwid: "select * from pworder where pworderflag = ? and pworderpwid = ?",
    delBaodanById: "delete from pworder where pworderid = ?",
};
module.exports = pwoderSqlMap;